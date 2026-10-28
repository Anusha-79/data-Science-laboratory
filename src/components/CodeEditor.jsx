import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Download, RotateCcw, Play, Trash2, Check, Github } from 'lucide-react';

let pyodidePromise;

function loadPyodideRuntime() {
  if (window.pyodide) return Promise.resolve(window.pyodide);
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = new Promise((resolve, reject) => {
    const initializeRuntime = async () => {
      try {
        const runtime = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        });
        window.pyodide = runtime;
        resolve(runtime);
      } catch (error) {
        reject(error);
      }
    };

    if (window.loadPyodide) {
      initializeRuntime();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
    script.onload = initializeRuntime;
    script.onerror = () => reject(new Error('Failed to load Python runtime.'));
    document.body.appendChild(script);
  }).catch((error) => {
    pyodidePromise = null;
    throw error;
  });

  return pyodidePromise;
}

function CodeEditor({ initialCode, experimentNumber, title, colabUrl }) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [plots, setPlots] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loadingRuntime, setLoadingRuntime] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadPyodideRuntime()
      .then((runtime) => {
        if (!cancelled) setPyodide(runtime);
      })
      .catch((error) => {
        if (!cancelled) setOutput(`Python runtime could not be loaded: ${error.message}`);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      setOutput('Copy failed. Please select the code manually.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `experiment-${String(experimentNumber).padStart(2, '0')}.py`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    const pdf = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 28;
    const lines = pdf.splitTextToSize(code || 'No code available', pageWidth - margin * 2);
    pdf.setFont('courier', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Python exercise: ${title}`, margin, 32);
    pdf.text(lines, margin, 54);
    pdf.save(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-code.pdf`);
  };

  const handleRun = async () => {
    setLoadingRuntime(true);
    setOutput('Preparing Python runtime...');
    try {
      const runtime = pyodide || await loadPyodideRuntime();
      const packageMap = [
        [/\b(?:from|import)\s+numpy\b/, 'numpy'],
        [/\b(?:from|import)\s+pandas\b/, 'pandas'],
        [/\b(?:from|import)\s+matplotlib\b/, 'matplotlib'],
        [/\b(?:from|import)\s+sklearn\b/, 'scikit-learn'],
      ];
      const packages = packageMap
        .filter(([pattern]) => pattern.test(code))
        .map(([, packageName]) => packageName);

      if (packages.length) {
        setOutput(`Loading Python packages: ${packages.join(', ')}...`);
        await runtime.loadPackage(packages);
      }

      runtime.globals.set('user_code', code);
      const result = await runtime.runPythonAsync(`
import io
import json
import base64
from contextlib import redirect_stdout

buf = io.StringIO()
with redirect_stdout(buf):
    try:
        exec(user_code, {})
    except Exception as exc:
        print(f"Error: {type(exc).__name__}: {exc}")

plots = []
if "matplotlib" in user_code:
    import matplotlib.pyplot as plt
    for figure_number in plt.get_fignums():
        image = io.BytesIO()
        plt.figure(figure_number).savefig(image, format="png", bbox_inches="tight")
        plots.append(base64.b64encode(image.getvalue()).decode("ascii"))
        plt.close(figure_number)

result = json.dumps({"output": buf.getvalue(), "plots": plots})
result
`);

      const execution = JSON.parse(String(result));
      setOutput(execution.output);
      setPlots(execution.plots);
    } catch (error) {
      setOutput(`Execution failed: ${error.message}`);
      setPlots([]);
    } finally {
      setLoadingRuntime(false);
    }
  };

  return (
    <div className="code-editor-shell">
      <div className="section-heading-row">
        <div>
          <h3>Code</h3>
          <p className="code-editor-hint">Edit the example or write your own Python code, then run it.</p>
        </div>
        <div className="button-row right-align">
          <button type="button" className="secondary-button small-button" onClick={handleCopy}>
            {copied ? <><Check size={15} /> Code copied!</> : <><Copy size={15} /> Copy Code</>}
          </button>
          <button type="button" className="secondary-button small-button" onClick={() => setCode(initialCode)}>
            <RotateCcw size={15} /> Reset Code
          </button>
          <button type="button" className="primary-button small-button" onClick={handleDownload}>
            <Download size={15} /> Download Code
          </button>
          <button type="button" className="secondary-button small-button" onClick={handleExportPdf}>
            <Download size={15} /> Save as PDF
          </button>
        </div>
      </div>

      <div className="editor-wrap">
        <Editor
          height="340px"
          language="python"
          value={code}
          theme="vs-light"
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>

      <div className="output-actions">
        <button type="button" className="primary-button small-button" onClick={handleRun} disabled={loadingRuntime}>
          <Play size={15} /> {loadingRuntime ? 'Loading Python...' : 'RUN'}
        </button>
        <button type="button" className="secondary-button small-button" onClick={() => { setOutput(''); setPlots([]); }}>
          <Trash2 size={15} /> Clear Output
        </button>
        <a
          href="https://github.com/Anusha-79/data-Science-laboratory/blob/main/src/data/experiments.js"
          target="_blank"
          rel="noopener noreferrer"
          className="secondary-button small-button"
          aria-label={`View ${title} source code on GitHub`}
        >
          <Github size={15} /> View Code on GitHub
        </a>
        {colabUrl && (
          <a href={colabUrl} target="_blank" rel="noopener noreferrer" className="secondary-button small-button">
            Open in Google Colab
          </a>
        )}
      </div>

      <div className="output-panel">
        <h4>Output</h4>
        <pre>{output || 'No output yet.'}</pre>
        {plots.map((plot, index) => (
          <img
            key={`${experimentNumber}-${index}`}
            className="execution-plot"
            src={`data:image/png;base64,${plot}`}
            alt={`${title} output plot ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CodeEditor;
