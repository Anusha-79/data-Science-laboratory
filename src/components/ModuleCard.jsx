import { ArrowRight, BookOpenText } from 'lucide-react';
import { Link } from 'react-router-dom';

function ModuleCard({ module }) {
  return (
    <div className="module-card card-hover">
      <div className="module-card-header">
        <span className="module-badge">MODULE {module.number}</span>
        <BookOpenText size={18} className="module-icon" />
      </div>

      <h3>{module.title}</h3>
      <p>{module.description}</p>

      <div className="stats-row">
        <span>Topics: {module.topics}</span>
      </div>

      <Link to={`/modules/${module.id}`} className="text-link">
        View Module <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default ModuleCard;
