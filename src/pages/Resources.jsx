import ResourceCard from '../components/ResourceCard';
import { resources } from '../data/resources';

function Resources() {
  return (
    <div className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Course Materials</p>
        <h1>Resources</h1>
      </div>

      <div className="resources-layout">
        {resources.map((group) => (
          <section key={group.category} className="resource-group">
            <h2>{group.category}</h2>
            <div className="cards-grid resources-grid">
              {group.items.map((resource) => (
                <ResourceCard key={resource.name} resource={resource} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Resources;
