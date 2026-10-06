import {
  BarChart3,
  BrainCircuit,
  Calculator,
  ChartColumn,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Github,
  ImageIcon,
  Layers3,
  NotebookPen,
  Sigma,
  Table2,
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { tools } from '../data/tools';

const iconMap = {
  Code2,
  NotebookPen,
  Cloud,
  Sigma,
  Table2,
  ChartColumn,
  BarChart3,
  BrainCircuit,
  Calculator,
  Cpu,
  Layers3,
  ImageIcon,
  Database,
  GitBranch,
  Github,
};

function Tools() {
  return (
    <div className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Data Science Tools</p>
        <h1>Data Science Laboratory Tools</h1>
      </div>

      <div className="cards-grid tools-grid">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} iconMap={iconMap} />
        ))}
      </div>
    </div>
  );
}

export { iconMap };

export default Tools;
