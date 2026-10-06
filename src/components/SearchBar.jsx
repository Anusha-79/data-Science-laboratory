import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function SearchBar({ searchTerm, onSearchChange, results }) {
  return (
    <div className="search-box-wrap">
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search modules, experiments, tools..."
          aria-label="Search across the website"
        />
        {searchTerm && (
          <button type="button" className="clear-search" onClick={() => onSearchChange('')} aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>

      {searchTerm && (
        <div className="search-panel" aria-live="polite">
          {results.length > 0 ? (
            <>
              {results.map((item, index) => (
                <Link key={`${item.type}-${item.label}-${index}`} to={item.to} className="search-item" onClick={() => onSearchChange('')}>
                  <span className="search-tag">{item.type}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </>
          ) : (
            <div className="search-empty">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
