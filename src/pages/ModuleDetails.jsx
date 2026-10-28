import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Download, PlayCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { modules } from '../data/modules';

function ModuleDetails() {
  const { id } = useParams();
  const module = modules.find((entry) => String(entry.id) === String(id));
  const [pageIndex, setPageIndex] = useState(0);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const currentPage = module?.pages[pageIndex] || null;

  const progress = useMemo(() => {
    if (!module) return 0;
    return ((pageIndex + 1) / module.pages.length) * 100;
  }, [module, pageIndex]);

  const handleModulePdf = () => {
    if (!module) return;
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 36;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const title = `${module.number}. ${module.title}`;

    let y = 40;
    pdf.setFillColor(232, 242, 255);
    pdf.rect(0, 0, pageWidth, 80, 'F');
    pdf.setTextColor(30, 41, 59);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text(title, margin, 48);
    pdf.setFontSize(12);
    pdf.text('Data Science Laboratory Study Notes', margin, 68);

    let pageNumber = 1;
    module.pages.forEach((page, index) => {
      if (index > 0) {
        pdf.addPage();
        pageNumber += 1;
        y = 44;
      }
      pdf.setTextColor(79, 70, 229);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text(`Page ${index + 1} — ${page.title}`, margin, y);
      y += 22;
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(page.overview || page.objective || '', pageWidth - margin * 2);
      pdf.text(lines, margin, y);
      y += lines.length * 14 + 8;
      if (page.bullets && page.bullets.length) {
        page.bullets.forEach((bullet) => {
          const wrapped = pdf.splitTextToSize(`• ${bullet}`, pageWidth - margin * 2 - 12);
          if (y + wrapped.length * 12 > pageHeight - 44) {
            pdf.addPage();
            pageNumber += 1;
            y = 44;
          }
          pdf.text(wrapped, margin + 10, y);
          y += wrapped.length * 12 + 4;
        });
      }
      if (page.code) {
        if (y + 40 > pageHeight - 24) {
          pdf.addPage();
          pageNumber += 1;
          y = 44;
        }
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(9);
        const codeLines = pdf.splitTextToSize(page.code, pageWidth - margin * 2);
        pdf.text(codeLines, margin, y);
      }
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99);
      pdf.text(`Generated for: ${module.title}`, margin, pageHeight - 20);
      pdf.text(`Page ${pageNumber}`, pageWidth - 60, pageHeight - 20);
    });

    pdf.save(`${module.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-study-notes.pdf`);
  };

  if (!module) {
    return (
      <div className="page-section not-found-box">
        <h1>404 - Page Not Found</h1>
        <p>The requested module could not be found.</p>
        <Link to="/modules" className="primary-button">Back to Modules</Link>
      </div>
    );
  }

  return (
    <div className="page-section detail-layout">
      <div className="page-heading page-heading-inline">
        <div>
          <p className="eyebrow">Module {module.number}</p>
          <h1>{module.title}</h1>
        </div>
        <Link to="/modules" className="secondary-button small-button">
          <ArrowLeft size={15} /> Back to Modules
        </Link>
      </div>

      <div className="detail-card">
        <p className="detail-description">{module.description}</p>

        <div className="detail-grid two-col">
          <div className="detail-panel">
            <h3>Learning Objectives</h3>
            <ul>{module.learningObjectives.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="detail-panel">
            <h3>Important Concepts</h3>
            <ul>{module.importantConcepts.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <div className="detail-grid two-col">
          <div className="detail-panel">
            <h3>Syllabus Topics</h3>
            <ul>{module.syllabusTopics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
          </div>
          <div className="detail-panel">
            <h3>Related Resources</h3>
            <ul>{module.relatedResources.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <div className="detail-actions">
          <button type="button" className="primary-button" onClick={() => setIsReaderOpen(true)}>
            <BookOpen size={16} /> Read Module Notes
          </button>
          <button type="button" className="secondary-button" onClick={handleModulePdf}>
            <Download size={16} /> Download Study PDF
          </button>
        </div>
      </div>

      <div className="detail-card">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Video Lessons</p>
            <h2>Relevant learning videos</h2>
          </div>
        </div>
        <div className="video-grid">
          {module.videos.map((video) => (
            <a key={video.url} href={video.url} target="_blank" rel="noopener noreferrer" className="video-card">
              <div className="video-thumb">
                <PlayCircle size={28} />
              </div>
              <div>
                <h4>{video.title}</h4>
                <p>{video.channel}</p>
                <span>{video.description}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="detail-card">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Practice</p>
            <h2>Connected experiments</h2>
          </div>
        </div>
        <div className="practice-links">
          {module.relatedExperiments.map((expId) => ( 
            <Link key={expId} to={`/experiments/${expId}`} className="secondary-button small-button">
              Open Experiment {expId}
            </Link>
          ))}
        </div>
      </div>

      {isReaderOpen && (
        <div className="book-reader-overlay">
          <div className="book-reader" role="dialog" aria-modal="true">
            <header className="book-reader-toolbar">
              <div>
                <strong>{module.title}</strong>
                <span>Page {pageIndex + 1} of {module.pages.length}</span>
              </div>
              <button type="button" className="book-icon-button" onClick={() => setIsReaderOpen(false)} aria-label="Close notes">×</button>
            </header>

            <div className="reader-progress-wrap">
              <div className="reader-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="book-stage">
              <article className="book-page">
                <span className="book-page-kicker">DS LABORATORY · STUDY NOTES</span>
                <h2>{currentPage.title}</h2>
                <div className="book-page-content">
                  <p>{currentPage.objective}</p>
                  <p>{currentPage.overview}</p>
                  <ul>
                    {(currentPage.bullets || []).map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  {currentPage.code && <pre><code>{currentPage.code}</code></pre>}
                  <div className="page-qa">
                    <strong>Practice questions</strong>
                    <ul>
                      {(currentPage.questions || []).map((question) => <li key={question}>{question}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            </div>

            <footer className="book-reader-controls">
              <div className="book-page-controls">
                <button type="button" className="secondary-button small-button" onClick={() => setPageIndex((p) => Math.max(0, p - 1))} disabled={pageIndex === 0}>
                  <ArrowLeft size={16} /> Previous
                </button>
                <select value={pageIndex} onChange={(event) => setPageIndex(Number(event.target.value))}>
                  {module.pages.map((page, idx) => (
                    <option value={idx} key={`${module.id}-${page.title}`}>Page {idx + 1}: {page.title}</option>
                  ))}
                </select>
                {pageIndex === module.pages.length - 1 ? (
                  <button type="button" className="primary-button small-button" onClick={() => setIsReaderOpen(false)}>
                    Finish Module
                  </button>
                ) : (
                  <button type="button" className="primary-button small-button" onClick={() => setPageIndex((p) => Math.min(module.pages.length - 1, p + 1))}>
                    Next <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleDetails;
