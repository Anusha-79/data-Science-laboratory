import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function ExperimentCard({ experiment }) {
  return (
    <div className="experiment-card card-hover">
      <div className="experiment-thumb">
        {experiment.youtubeUrl && experiment.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/) ? (
          <img
            src={`https://img.youtube.com/vi/${experiment.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)[1]}/hqdefault.jpg`}
            alt={`${experiment.title} thumbnail`}
          />
        ) : (
          <a className="thumb-placeholder" href={experiment.youtubeUrl} target="_blank" rel="noreferrer">
            <PlayCircle size={26} />
            <span>Watch on YouTube</span>
          </a>
        )}
      </div>

      <div className="experiment-card-body">
        <div className="experiment-tag-line">
          <span className="experiment-number">Experiment {experiment.number}</span>
          <span className={`level-badge ${experiment.difficulty.toLowerCase()}`}>{experiment.difficulty}</span>
        </div>

        <h3>{experiment.title}</h3>
        <p>{experiment.objective}</p>

        <Link to={`/experiments/${experiment.id}`} className="primary-button small-button">
          View Experiment <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ExperimentCard;
