const storageKey = 'ds-lab-projects';

const defaultProjects = [];
const sampleProjectIds = new Set(['ds-lab-portal', 'student-portfolio']);

function normalizeProject(project) {
  return {
    id: project?.id || `project-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: project?.title || 'Untitled Project',
    image: project?.image || '/logo.png',
    description: project?.description || '',
    technologies: Array.isArray(project?.technologies) ? project.technologies : [],
    features: Array.isArray(project?.features) ? project.features : [],
    github: typeof project?.github === 'string' ? project.github : '',
    liveUrl: typeof project?.liveUrl === 'string' ? project.liveUrl : '',
  };
}

function loadProjects() {
  if (typeof window === 'undefined') {
    return defaultProjects.map((project) => normalizeProject(project));
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return defaultProjects.map((project) => normalizeProject(project));
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((project) => !sampleProjectIds.has(project?.id))
      .map((project) => normalizeProject(project));
  } catch {
    return [];
  }
}

export let projects = loadProjects();

export function getProjects() {
  return projects;
}

export function saveProjects(nextProjects) {
  const normalized = Array.isArray(nextProjects) ? nextProjects.map((project) => normalizeProject(project)) : defaultProjects.map((project) => normalizeProject(project));
  projects = normalized;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(projects));
  }

  return projects;
}
