import { ArrowUpRight, ExternalLink } from 'lucide-react';

function ToolCard({ tool, iconMap }) {
  const Icon = iconMap[tool.icon] || iconMap.Python;

  return (
    <a
      className="tool-card card-hover tool-card-link"
      href={tool.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${tool.name} official website (opens in a new tab)`}
    >
      <div className="tool-card-head">
        <div className="tool-icon-wrap">
          <Icon size={22} />
        </div>
        <div className="tool-name-block">
          <h3>{tool.name}</h3>
        </div>
      </div>

      <p>{tool.description}</p>
      <div className="tool-use">
        <span>Main use</span>
        <strong>{tool.use}</strong>
      </div>

      <span className="secondary-button tool-card-action">
        Visit Official Website <ExternalLink size={15} aria-hidden="true" /> <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </a>
  );
}

export default ToolCard;
