import { useState } from 'react';
import BookReader from '../components/BookReader';
import ResourceCard from '../components/ResourceCard';
import { noteBooks } from '../data/notes';
import { resources } from '../data/resources';

function Resources() {
  const [activeBookId, setActiveBookId] = useState(null);
  const activeBook = activeBookId ? noteBooks[activeBookId] : null;

  return (
    <div className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Course Materials</p>
        <h1>Resources</h1>
        <p className="resources-intro">Open the course notes as a page-turning book, or download them for offline study.</p>
      </div>

      <div className="resources-layout">
        {resources.map((group) => (
          <section key={group.category} className="resource-group">
            <h2>{group.category}</h2>
            <div className="cards-grid resources-grid">
              {group.items.map((resource) => (
                <ResourceCard
                  key={resource.name}
                  resource={resource}
                  onReadBook={setActiveBookId}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      {activeBook && <BookReader key={activeBookId} book={activeBook} onClose={() => setActiveBookId(null)} />}
    </div>
  );
}

export default Resources;
