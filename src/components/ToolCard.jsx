import { ArrowUpRight } from 'lucide-react';

function ToolCard({ tool, iconMap }) {
  const Icon = iconMap[tool.icon] || iconMap.Python;

  return (
    <div className="tool-card card-hover">
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

      <a href={tool.website} target="_blank" rel="noreferrer" className="secondary-button">
        Official Website <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

export default ToolCard;
