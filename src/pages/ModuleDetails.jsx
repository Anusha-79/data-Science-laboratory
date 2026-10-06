import { ArrowLeft, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import DownloadButton from '../components/DownloadButton';
import { modules } from '../data/modules';

function ModuleDetails() {
  const { id } = useParams();
  const module = modules.find((entry) => String(entry.id) === String(id));

  if (!module) {
    return (
      <div className="page-section not-found-box">
        <h1>404 - Page Not Found</h1>
        <p>The requested module could not be found.</p>
        <Link to="/modules" className="primary-button">Back to Modules</Link>
      </div>
    );
  }

  return (
    <div className="page-section detail-layout">
      <div className="page-heading page-heading-inline">
        <div>
          <p className="eyebrow">Module {module.number}</p>
          <h1>{module.title}</h1>
        </div>
        <Link to="/modules" className="secondary-button small-button">
          <ArrowLeft size={15} /> Back to Modules
        </Link>
      </div>

      <div className="detail-card">
        <p className="detail-description">{module.description}</p>

        <div className="detail-grid two-col">
          <div className="detail-panel">
            <h3>Learning Objectives</h3>
            <ul>
              {module.learningObjectives.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="detail-panel">
            <h3>Important Concepts</h3>
            <ul>
              {module.importantConcepts.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="detail-grid two-col">
          <div className="detail-panel">
            <h3>Syllabus Topics</h3>
            <ul>
              {module.syllabusTopics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
          </div>

          <div className="detail-panel">
            <h3>Related Resources</h3>
            <ul>
              {module.relatedResources.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="detail-actions">
          <DownloadButton
            label="Download Module"
            href={module.downloadLink || '/resources/module-placeholder.txt'}
            filename={`module-${String(module.number).padStart(2, '0')}.pdf`}
            className="primary-button"
          />
        </div>
      </div>
    </div>
  );
}

export default ModuleDetails;
