import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/modules', label: 'Modules' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/tools', label: 'Tools' },
  { to: '/resources', label: 'Resources' },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">{siteData.collegeName}</div>
          <p>{siteData.department}</p>
          <p>Data Science</p>
          <p>{siteData.laboratoryName}</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Data Science Subject Laboratory</div>
    </footer>
  );
}

export default Footer;
