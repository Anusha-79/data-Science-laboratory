import { BookOpen, Download, ExternalLink } from 'lucide-react';

function ResourceCard({ resource, onReadBook }) {
  const isExternal = /^https?:\/\//i.test(resource.href);
  const Card = resource.bookId ? 'div' : 'a';

  return (
    <Card
      className={`resource-card card-hover${resource.bookId ? '' : ' resource-card-link'}`}
      {...(!resource.bookId ? {
        href: resource.href,
        target: isExternal ? '_blank' : undefined,
        rel: isExternal ? 'noopener noreferrer' : undefined,
        download: !isExternal ? resource.name.replace(/\s+/g, '-').toLowerCase() + '.txt' : undefined,
        'aria-label': isExternal
          ? `Visit ${resource.name} (opens in a new tab)`
          : `Download ${resource.name}`,
      } : {})}
    >
      <div className="resource-head">
        <div>
          <p className="resource-type">{resource.type}</p>
          <h3>{resource.name}</h3>
        </div>
        {!resource.bookId && (
          <span className="resource-action-icon" aria-hidden="true">
            {isExternal ? <ExternalLink size={18} /> : <Download size={18} />}
          </span>
        )}
      </div>
      <p>{resource.description}</p>

      {resource.bookId ? (
        <button type="button" className="primary-button small-button" onClick={() => onReadBook(resource.bookId)}>
          <BookOpen size={15} /> Read notes
        </button>
      ) : (
        <span className="secondary-button small-button resource-card-action">
          {isExternal ? <><ExternalLink size={15} /> Open website</> : <><Download size={15} /> Download resource</>}
        </span>
      )}
    </Card>
  );
}

export default ResourceCard;
