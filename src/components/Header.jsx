import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import { siteData } from '../data/siteData';

function Header({ searchTerm, onSearchChange, results }) {
  const handleLogoError = (event) => {
    if (event.currentTarget.src !== `${window.location.origin}/logo.png`) {
      event.currentTarget.src = '/logo.png';
    }
    event.currentTarget.onerror = null;
  };

  return (
    <header className="site-header">
      <div className="topbar-wrap">
        <Link to="/" className="brand-area" aria-label="Go to home page">
          <div className="brand-logo-wrap">
            <img
              src={siteData.collegeLogo || '/logo.png'}
              alt={`${siteData.collegeName} logo`}
              className="brand-logo"
              onError={handleLogoError}
            />
          </div>
          <div className="brand-copy">
            <span className="brand-name">{siteData.collegeName}</span>
            <span className="brand-lab">{siteData.laboratoryName}</span>
            <span className="brand-dept">{siteData.department}</span>
          </div>
        </Link>

        <div className="header-tools">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} results={results} />
          <div className="mini-chip">
            <Building2 size={15} />
            <span>{siteData.department}</span>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
