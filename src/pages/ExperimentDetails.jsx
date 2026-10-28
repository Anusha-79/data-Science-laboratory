import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { experiments } from '../data/experiments';

function ExperimentDetails() {
  const { id } = useParams();
  const experiment = experiments.find((entry) => String(entry.id) === String(id));

  if (!experiment) {
    return (
      <div className="page-section not-found-box">
        <h1>404 - Page Not Found</h1>
        <p>The requested experiment could not be found.</p>
        <Link to="/experiments" className="primary-button">Back to Experiments</Link>
      </div>
    );
  }

  return (
    <div className="page-section detail-layout">
      <div className="page-heading page-heading-inline">
        <div>
          <p className="eyebrow">Experiment {experiment.number}</p>
          <h1>{experiment.title}</h1>
        </div>
        <Link to="/experiments" className="secondary-button small-button">
          <ArrowLeft size={15} /> Back to Experiments
        </Link>
      </div>

      <div className="detail-card">
        <div className="detail-grid two-col">
          <div className="detail-panel">
            <h2>Aim</h2>
            <p>{experiment.aim}</p>
          </div>
          <div className="detail-panel">
            <h2>Objective</h2>
            <p>{experiment.objective}</p>
          </div>
        </div>
        <div className="detail-panel">
          <h2>Theory</h2>
          <p>{experiment.theory}</p>
        </div>
        <div className="detail-panel">
          <h2>Procedure</h2>
          <ol>{experiment.procedure.map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
        <div className="detail-panel video-panel">
          <h2>Experiment Overview</h2>
          <YouTubeEmbed url={experiment.youtubeUrl} title={experiment.title} />
        </div>
        <CodeEditor
          initialCode={experiment.code}
          experimentNumber={experiment.number}
          title={experiment.title}
          colabUrl={experiment.colabUrl}
        />
      </div>
    </div>
  );
}

export default ExperimentDetails;
