import { ArrowLeft, Edit2, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { experiments } from '../data/experiments';

function ExperimentDetails() {
  const { id } = useParams();
  const [experiment, setExperiment] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedObjective, setEditedObjective] = useState('');
  const [editedAim, setEditedAim] = useState('');

  useEffect(() => {
    const foundExperiment = experiments.find((entry) => String(entry.id) === String(id));
    if (foundExperiment) {
      setExperiment({ ...foundExperiment });
      setEditedTitle(foundExperiment.title);
      setEditedObjective(foundExperiment.objective);
      setEditedAim(foundExperiment.aim);
    }
  }, [id]);

  const handleSaveChanges = () => {
    if (experiment) {
      const updatedExperiment = {
        ...experiment,
        title: editedTitle,
        objective: editedObjective,
        aim: editedAim,
      };
      setExperiment(updatedExperiment);
      setIsEditingTitle(false);
      window.dispatchEvent(new CustomEvent('experiment-updated', { detail: updatedExperiment }));
    }
  };

  const handleCancel = () => {
    setEditedTitle(experiment.title);
    setEditedObjective(experiment.objective);
    setEditedAim(experiment.aim);
    setIsEditingTitle(false);
  };

  if (!experiment) {
    return (
      <div className="page-section not-found-box">
        <h1>404 - Page Not Found</h1>
        <p>The requested experiment could not be found.</p>
        <Link to="/experiments" className="primary-button">Back to Experiments</Link>
      </div>
    );
  }

  return (
    <div className="page-section detail-layout">
      <div className="page-heading page-heading-inline">
        <div>
          <p className="eyebrow">Experiment {experiment.number}</p>
          <div className="edit-title-container">
            {isEditingTitle ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input title-input"
                  placeholder="Enter experiment title"
                />
              </div>
            ) : (
              <div className="title-display">
                <h1>{experiment.title}</h1>
                <button
                  className="edit-button-icon"
                  onClick={() => setIsEditingTitle(true)}
                  title="Edit experiment name"
                >
                  <Edit2 size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="heading-actions">
          {isEditingTitle && (
            <div className="edit-actions">
              <button
                className="primary-button small-button"
                onClick={handleSaveChanges}
              >
                <Save size={16} /> Save
              </button>
              <button
                className="secondary-button small-button"
                onClick={handleCancel}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          )}
          {!isEditingTitle && (
            <Link to="/experiments" className="secondary-button small-button">
              <ArrowLeft size={15} /> Back to Experiments
            </Link>
          )}
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-grid two-col">
          <div className="detail-panel">
            <div className="detail-header">
              <h3>Aim</h3>
              {isEditingTitle && (
                <button
                  className="edit-button-icon small"
                  onClick={() => setIsEditingTitle(true)}
                  title="Edit aim"
                >
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            {isEditingTitle ? (
              <textarea
                value={editedAim}
                onChange={(e) => setEditedAim(e.target.value)}
                className="edit-input textarea-input"
                placeholder="Enter experiment aim"
              />
            ) : (
              <p>{experiment.aim}</p>
            )}
          </div>

          <div className="detail-panel">
            <div className="detail-header">
              <h3>Objective</h3>
              {isEditingTitle && (
                <button
                  className="edit-button-icon small"
                  onClick={() => setIsEditingTitle(true)}
                  title="Edit objective"
                >
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            {isEditingTitle ? (
              <textarea
                value={editedObjective}
                onChange={(e) => setEditedObjective(e.target.value)}
                className="edit-input textarea-input"
                placeholder="Enter experiment objective"
              />
            ) : (
              <p>{experiment.objective}</p>
            )}
          </div>
        </div>

        <div className="detail-panel">
          <h3>Theory</h3>
          <p>{experiment.theory}</p>
        </div>

        <div className="detail-panel">
          <h3>Procedure</h3>
          <ol>
            {experiment.procedure.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>

        <div className="detail-panel video-panel">
          <h3>Experiment Overview</h3>
          <YouTubeEmbed url={experiment.youtubeUrl} title={experiment.title} />
        </div>

        <CodeEditor
          initialCode={experiment.code}
          experimentNumber={experiment.number}
          title={experiment.title}
          colabUrl={experiment.colabUrl}
        />
      </div>
    </div>
  );
}

export default ExperimentDetails;
