import { experiments } from '../data/experiments';
import ExperimentCard from '../components/ExperimentCard';

function Experiments() {
  return (
    <div className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Practical Work</p>
        <h1>Experiments</h1>
      </div>

      <div className="cards-grid experiments-grid">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </div>
  );
}

export default Experiments;
