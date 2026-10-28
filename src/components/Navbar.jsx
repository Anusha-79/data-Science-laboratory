import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/modules', label: 'Modules' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/tools', label: 'Tools' },
  { to: '/resources', label: 'Resources' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
