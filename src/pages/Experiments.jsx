import { useEffect, useState } from 'react';
import { experiments as defaultExperiments, getExperiments } from '../data/experiments';
import ExperimentCard from '../components/ExperimentCard';

function Experiments() {
  const [experimentList, setExperimentList] = useState(defaultExperiments);

  useEffect(() => {
    const handleExperimentUpdate = () => {
      setExperimentList(getExperiments());
    };

    window.addEventListener('experiment-updated', handleExperimentUpdate);
    return () => window.removeEventListener('experiment-updated', handleExperimentUpdate);
  }, []);

  return (
    <div className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Practical Work</p>
        <h1>Experiments</h1>
      </div>

      <div className="cards-grid experiments-grid">
        {experimentList.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </div>
  );
}

export default Experiments;
