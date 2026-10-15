import { useMemo, useState } from 'react';
import { ExternalLink, GitBranch, Globe, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { getProjects, saveProjects } from '../data/projects';

const emptyProject = {
  id: '',
  title: '',
  image: '',
  description: '',
  technologies: '',
  features: '',
  github: '',
  liveUrl: '',
};

function Projects() {
  const [projectList, setProjectList] = useState(getProjects());
  const [draft, setDraft] = useState(emptyProject);
  const [editingId, setEditingId] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const sortedProjects = useMemo(() => [...projectList].sort((a, b) => a.title.localeCompare(b.title)), [projectList]);

  const openCreateForm = () => {
    setEditingId('');
    setDraft(emptyProject);
    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingId(project.id);
    setIsFormOpen(true);
    setDraft({
      id: project.id,
      title: project.title,
      image: project.image,
      description: project.description,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      features: Array.isArray(project.features) ? project.features.join(', ') : '',
      github: project.github || '',
      liveUrl: project.liveUrl || '',
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const nextProject = {
      id: editingId || `project-${Date.now()}`,
      title: draft.title.trim(),
      image: draft.image.trim() || '/logo.png',
      description: draft.description.trim(),
      technologies: draft.technologies.split(',').map((item) => item.trim()).filter(Boolean),
      features: draft.features.split(',').map((item) => item.trim()).filter(Boolean),
      github: draft.github.trim(),
      liveUrl: draft.liveUrl.trim(),
    };

    if (!nextProject.title || !nextProject.description) {
      return;
    }

    const nextProjects = editingId
      ? projectList.map((project) => (project.id === editingId ? nextProject : project))
      : [nextProject, ...projectList];

    const saved = saveProjects(nextProjects);
    setProjectList(saved);
    setDraft(emptyProject);
    setEditingId('');
    setIsFormOpen(false);
    window.dispatchEvent(new Event('site-data-updated'));
  };

  const handleDelete = (projectId) => {
    const nextProjects = projectList.filter((project) => project.id !== projectId);
    const saved = saveProjects(nextProjects);
    setProjectList(saved);
    if (editingId === projectId) {
      setDraft(emptyProject);
      setEditingId('');
      setIsFormOpen(false);
    }
    window.dispatchEvent(new Event('site-data-updated'));
  };

  return (
    <div className="page-section project-page">
      <div className="page-heading page-heading-inline">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Projects</h1>
        </div>
        <button type="button" className="primary-button small-button" onClick={openCreateForm}>
          <Plus size={15} /> Add New Project
        </button>
      </div>

      {isFormOpen && (
        <section className="info-card editor-panel">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Project Editor</p>
              <h3>{editingId ? 'Edit project' : 'Add new project'}</h3>
            </div>
            <button type="button" className="secondary-button small-button" onClick={() => { setDraft(emptyProject); setEditingId(''); setIsFormOpen(false); }}>
              <X size={15} /> Close
            </button>
          </div>

          <form className="details-form" onSubmit={handleSave}>
            <div className="form-grid">
              <label>
                Project Title
                <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
              </label>
              <label>
                Thumbnail Image URL
                <input value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} />
              </label>
              <label className="full-width">
                Short Description
                <textarea rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
              </label>
              <label>
                Technologies Used
                <input value={draft.technologies} onChange={(event) => setDraft({ ...draft, technologies: event.target.value })} placeholder="React, Python, Pandas" />
              </label>
              <label>
                Key Features
                <input value={draft.features} onChange={(event) => setDraft({ ...draft, features: event.target.value })} placeholder="Data analysis, Dashboard, Deployment" />
              </label>
              <label>
                GitHub URL
                <input value={draft.github} onChange={(event) => setDraft({ ...draft, github: event.target.value })} placeholder="https://github.com/..." />
              </label>
              <label>
                Live Demo URL
                <input value={draft.liveUrl} onChange={(event) => setDraft({ ...draft, liveUrl: event.target.value })} placeholder="https://example.com" />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                <Save size={15} /> Save Project
              </button>
              <button type="button" className="secondary-button" onClick={() => { setDraft(emptyProject); setEditingId(''); setIsFormOpen(false); }}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {sortedProjects.length > 0 ? (
        <div className="cards-grid projects-grid">
          {sortedProjects.map((project) => (
          <article key={project.id} className="project-card card-hover">
            <div className="project-image-wrap">
              {project.image ? (
                <img src={project.image} alt={project.title} className="project-image" />
              ) : (
                <div className="project-image fallback-project-image">
                  <GitBranch size={32} />
                </div>
              )}
            </div>

            <div className="project-card-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tech-stack">
                {project.technologies.map((tech) => (
                  <span key={`${project.id}-${tech}`} className="project-badge">{tech}</span>
                ))}
              </div>

              <ul className="project-feature-list">
                {project.features.map((feature) => (
                  <li key={`${project.id}-${feature}`}>{feature}</li>
                ))}
              </ul>

              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer noopener" className="secondary-button small-button">
                    <GitBranch size={15} /> GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="secondary-button small-button">
                    <Globe size={15} /> Live Demo
                  </a>
                )}
              </div>

              <div className="project-actions">
                <button type="button" className="secondary-button small-button" onClick={() => openEditForm(project)}>
                  <Pencil size={15} /> Edit
                </button>
                <button type="button" className="secondary-button small-button danger-button" onClick={() => handleDelete(project.id)}>
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </article>
          ))}
        </div>
      ) : (
        <section className="projects-empty-state" aria-labelledby="projects-empty-title">
          <div className="projects-empty-mark" aria-hidden="true">
            <GitBranch size={28} />
          </div>
          <p className="eyebrow">Your portfolio</p>
          <h2 id="projects-empty-title">Your projects will be showcased here</h2>
          <p>Add a project when you’re ready. Your work, images, technologies, and project links will appear on this page.</p>
          <button type="button" className="primary-button" onClick={openCreateForm}>
            <Plus size={16} /> Add your first project
          </button>
        </section>
      )}
    </div>
  );
}

export default Projects;
