import { Download } from 'lucide-react';

function DownloadButton({ label, href, filename, className = 'primary-button', fallbackHref }) {
  const targetHref = href || fallbackHref || '#';
  const isExternal = targetHref.startsWith('http');

  return (
    <a
      href={targetHref}
      className={className}
      download={!isExternal ? filename || 'download.txt' : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <Download size={15} />
      {label}
    </a>
  );
}

export default DownloadButton;
