import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';

function Modules() {
  return (
    <div className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Academic Structure</p>
        <h1>Modules</h1>
      </div>

      <div className="cards-grid modules-grid">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

export default Modules;
