import { BookOpen, Download, ExternalLink } from 'lucide-react';

function ResourceCard({ resource, onReadBook }) {
  const isExternal = resource.href.startsWith('http');

  return (
    <div className="resource-card card-hover">
      <div className="resource-head">
        <div>
          <p className="resource-type">{resource.type}</p>
          <h3>{resource.name}</h3>
        </div>
      </div>
      <p>{resource.description}</p>

      {resource.bookId ? (
        <button type="button" className="primary-button small-button" onClick={() => onReadBook(resource.bookId)}>
          <BookOpen size={15} /> Read notes
        </button>
      ) : (
        <a
          href={resource.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
          download={!isExternal ? resource.name.replace(/\s+/g, '-').toLowerCase() + '.txt' : undefined}
          className="primary-button small-button"
        >
          {isExternal ? <><ExternalLink size={15} /> Open</> : <><Download size={15} /> Download</>}
        </a>
      )}
    </div>
  );
}

export default ResourceCard;
