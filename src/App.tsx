import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Database,
  FlaskConical,
  GraduationCap,
  PencilLine,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  UserCircle2,
  Users,
} from 'lucide-react';

type Status = 'Active' | 'Planning' | 'Archived';
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

type Experiment = {
  id: string;
  title: string;
  category: string;
  status: Status;
  objective: string;
  description: string;
  dataset: string;
  method: string;
  duration: string;
  owner: string;
  lastUpdated: string;
  difficulty: Difficulty;
  tags: string[];
  metrics: {
    runs: number;
    accuracy: number;
    contributors: number;
  };
};

type Profile = {
  name: string;
  role: string;
  department: string;
  email: string;
  location: string;
  interests: string;
};

type ExperimentForm = {
  title: string;
  category: string;
  status: Status;
  objective: string;
  description: string;
  dataset: string;
  method: string;
  duration: string;
  owner: string;
  difficulty: Difficulty;
  tags: string;
};

const defaultProfile: Profile = {
  name: 'Your Name',
  role: 'Data Science Lab Director',
  department: 'Department of Data Science',
  email: 'your.name@college.edu',
  location: 'Research Block, Campus Center',
  interests: 'AI, analytics, applied data science, and research innovation',
};

const sampleExperiments: Experiment[] = [
  {
    id: 'exp-101',
    title: 'Predictive Urban Mobility Model',
    category: 'Applied ML',
    status: 'Active',
    objective: 'Forecast commuter demand across districts to optimize transit allocation.',
    description:
      'Model time-series travel demand using historical sensor and ridership data across multiple districts.',
    dataset: 'City Mobility Dataset',
    method: 'Gradient boosting + feature engineering + temporal validation',
    duration: '4 weeks',
    owner: 'Dr. Rahman',
    lastUpdated: '2025-01-14',
    difficulty: 'Advanced',
    tags: ['forecasting', 'transport', 'time-series'],
    metrics: { runs: 28, accuracy: 92, contributors: 6 },
  },
  {
    id: 'exp-102',
    title: 'Stress Detection from Multimodal Signals',
    category: 'AI Systems',
    status: 'Active',
    objective: 'Classify stress indicators by combining physiological and behavioral patterns.',
    description:
      'Build multimodal ML pipelines for wearable sensor signals, voice features, and response sequences.',
    dataset: 'Wearable Health Lab Dataset',
    method: 'XGBoost + CNN embeddings + ensemble calibration',
    duration: '6 weeks',
    owner: 'Maya Chen',
    lastUpdated: '2025-01-09',
    difficulty: 'Advanced',
    tags: ['health AI', 'signals', 'classification'],
    metrics: { runs: 21, accuracy: 89, contributors: 7 },
  },
  {
    id: 'exp-103',
    title: 'Bias Audit for Hiring Recommendation Engine',
    category: 'Responsible AI',
    status: 'Planning',
    objective: 'Evaluate fairness and interpretability of automated hiring recommendation scores.',
    description:
      'Assess fairness metric drift, subgroup parity, and explainability thresholds before deployment.',
    dataset: 'Synthetic hiring benchmark',
    method: 'Counterfactual analysis + fairness dashboards + explainability review',
    duration: '3 weeks',
    owner: 'Ibrahim Noor',
    lastUpdated: '2025-01-02',
    difficulty: 'Intermediate',
    tags: ['ethics', 'fairness', 'audit'],
    metrics: { runs: 12, accuracy: 84, contributors: 4 },
  },
  {
    id: 'exp-104',
    title: 'Sentiment and Policy Signal Tracker',
    category: 'NLP',
    status: 'Archived',
    objective: 'Track sentiment change and emerging policy narratives from public discourse.',
    description:
      'Train transformer-based classifiers and topic models on long-form public comments and policy text.',
    dataset: 'Public discourse archive',
    method: 'Transformer fine-tuning + topic modeling + semantic clustering',
    duration: '5 weeks',
    owner: 'Alicia Gomez',
    lastUpdated: '2024-12-15',
    difficulty: 'Intermediate',
    tags: ['nlp', 'policy', 'clustering'],
    metrics: { runs: 17, accuracy: 87, contributors: 5 },
  },
];

const emptyForm: ExperimentForm = {
  title: '',
  category: 'Applied ML',
  status: 'Active',
  objective: '',
  description: '',
  dataset: '',
  method: '',
  duration: '',
  owner: '',
  difficulty: 'Beginner',
  tags: '',
};

function loadStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function formatDate(dateInput: string) {
  return new Date(dateInput).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function App() {
  const [experiments, setExperiments] = useState<Experiment[]>(() =>
    loadStoredValue('ds-lab-experiments', sampleExperiments),
  );
  const [profile, setProfile] = useState<Profile>(() =>
    loadStoredValue('ds-lab-profile', defaultProfile),
  );

  useEffect(() => {
    window.localStorage.setItem('ds-lab-experiments', JSON.stringify(experiments));
  }, [experiments]);

  useEffect(() => {
    window.localStorage.setItem('ds-lab-profile', JSON.stringify(profile));
  }, [profile]);

  const totalRuns = useMemo(
    () => experiments.reduce((sum, experiment) => sum + experiment.metrics.runs, 0),
    [experiments],
  );
  const activeCount = experiments.filter((experiment) => experiment.status === 'Active').length;
  const avgAccuracy =
    experiments.length > 0
      ? Math.round(
          experiments.reduce((sum, experiment) => sum + experiment.metrics.accuracy, 0) /
            experiments.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-pageBg text-textPrimary">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                experiments={experiments}
                profile={profile}
                totalRuns={totalRuns}
                activeCount={activeCount}
                avgAccuracy={avgAccuracy}
              />
            }
          />
          <Route
            path="/experiments"
            element={<ExperimentsPage experiments={experiments} setExperiments={setExperiments} />}
          />
          <Route path="/experiments/:id" element={<ExperimentDetailPage experiments={experiments} setExperiments={setExperiments} />} />
          <Route path="/profile" element={<ProfilePage profile={profile} setProfile={setProfile} />} />
        </Routes>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-slate-200 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-navy text-lg font-bold text-white shadow-soft">
            DL
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-navy">Data Science Lab</div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Research Portal</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex">
          {[
            ['/', 'Overview'],
            ['/experiments', 'Experiments'],
            ['/profile', 'Profile'],
          ].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-navy'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/experiments"
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-navyLight"
        >
          <Plus className="h-4 w-4" />
          New Experiment
        </Link>
      </div>
    </header>
  );
}

function DashboardPage({
  experiments,
  profile,
  totalRuns,
  activeCount,
  avgAccuracy,
}: {
  experiments: Experiment[];
  profile: Profile;
  totalRuns: number;
  activeCount: number;
  avgAccuracy: number;
}) {
  const featured = experiments.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] bg-gradient-to-br from-navy via-navyLight to-teal p-8 text-white shadow-soft sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              Research Intelligence
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
              Discover, test, and scale the next generation of data science breakthroughs.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-200">
              Monitor active experiments, guide student collaboration, and keep every research pipeline aligned with the university’s data strategy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/experiments"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100"
              >
                View experiments
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Faculty profile
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Principal investigator</p>
                <h2 className="mt-2 text-2xl font-bold">{profile.name}</h2>
              </div>
              <div className="rounded-full bg-emerald-400/15 p-3 text-emerald-200">
                <UserCircle2 className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-100">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Department</span>
                <span className="font-semibold">{profile.department}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Focus area</span>
                <span className="font-semibold">{profile.interests}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>Research labs</span>
                <span className="font-semibold">{experiments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<FlaskConical className="h-5 w-5" />} label="Active labs" value={String(activeCount)} accent="teal" />
        <StatCard icon={<Database className="h-5 w-5" />} label="Total runs" value={String(totalRuns)} accent="navy" />
        <StatCard icon={<BarChart3 className="h-5 w-5" />} label="Avg. performance" value={`${avgAccuracy}%`} accent="cyan" />
        <StatCard icon={<Users className="h-5 w-5" />} label="Contributors" value={String(experiments.reduce((sum, exp) => sum + exp.metrics.contributors, 0))} accent="emerald" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Featured research</p>
              <h2 className="mt-2 text-2xl font-bold text-navy">Experiment highlights</h2>
            </div>
            <Link to="/experiments" className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-tealHover">
              Explore all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {featured.map((experiment) => (
              <Link key={experiment.id} to={`/experiments/${experiment.id}`} className="group block rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                      {experiment.category}
                    </div>
                    <h3 className="text-xl font-bold text-navy">{experiment.title}</h3>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(experiment.status)}`}>
                    {experiment.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{experiment.objective}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                  {experiment.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-navy p-3 text-white">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Lab capabilities</p>
              <h3 className="mt-1 text-xl font-bold text-navy">Core toolkit</h3>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              ['Applied ML', 'Model testing, deployment strategy, and evaluation tracking.'],
              ['Responsible AI', 'Fairness review, model audit, and governance workflows.'],
              ['Data engineering', 'Pipeline integrity, feature stores, and reproducible processing.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-navy">{title}</h4>
                  <Target className="h-4 w-4 text-teal" />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ExperimentsPage({
  experiments,
  setExperiments,
}: {
  experiments: Experiment[];
  setExperiments: React.Dispatch<React.SetStateAction<Experiment[]>>;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<ExperimentForm>(emptyForm);

  const categories = ['All', ...Array.from(new Set(experiments.map((exp) => exp.category)))];

  const filteredExperiments = useMemo(() => {
    return experiments.filter((experiment) => {
      const matchesQuery =
        experiment.title.toLowerCase().includes(query.toLowerCase()) ||
        experiment.objective.toLowerCase().includes(query.toLowerCase()) ||
        experiment.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = category === 'All' || experiment.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, experiments, query]);

  function openCreateForm() {
    setEditingId(null);
    setFormState(emptyForm);
    setShowForm(true);
  }

  function openEditForm(experiment: Experiment) {
    setEditingId(experiment.id);
    setFormState({
      title: experiment.title,
      category: experiment.category,
      status: experiment.status,
      objective: experiment.objective,
      description: experiment.description,
      dataset: experiment.dataset,
      method: experiment.method,
      duration: experiment.duration,
      owner: experiment.owner,
      difficulty: experiment.difficulty,
      tags: experiment.tags.join(', '),
    });
    setShowForm(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle || !formState.objective.trim() || !formState.description.trim()) {
      return;
    }

    const payload: Experiment = {
      id: editingId ?? `exp-${Date.now()}`,
      title: trimmedTitle,
      category: formState.category,
      status: formState.status,
      objective: formState.objective.trim(),
      description: formState.description.trim(),
      dataset: formState.dataset.trim() || 'Internal research dataset',
      method: formState.method.trim() || 'Hybrid workflow',
      duration: formState.duration.trim() || '2 weeks',
      owner: formState.owner.trim() || 'Staff researcher',
      lastUpdated: new Date().toISOString(),
      difficulty: formState.difficulty,
      tags: formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      metrics: editingId
        ? (() => {
            const current = experiments.find((exp) => exp.id === editingId);
            return current?.metrics ?? { runs: 0, accuracy: 0, contributors: 1 };
          })()
        : { runs: 0, accuracy: 0, contributors: 1 },
    };

    setExperiments((prev) => {
      if (editingId) {
        return prev.map((exp) => (exp.id === editingId ? payload : exp));
      }
      return [payload, ...prev];
    });

    setShowForm(false);
    setEditingId(null);
    setFormState(emptyForm);
  }

  function handleDelete(id: string) {
    setExperiments((prev) => prev.filter((experiment) => experiment.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Research database</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-navy">Experiment library</h1>
          </div>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navyLight"
          >
            <Plus className="h-4 w-4" />
            Launch new experiment
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topic, tag, or objective"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-teal focus:bg-white"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((option) => (
              <button
                key={option}
                onClick={() => setCategory(option)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  category === option
                    ? 'bg-navy text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-navy'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredExperiments.map((experiment) => (
          <div key={experiment.id} className="rounded-3xl border border-slate-200 bg-surface p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                  {experiment.category}
                </div>
                <h2 className="mt-3 text-xl font-bold text-navy">{experiment.title}</h2>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(experiment.status)}`}>
                {experiment.status}
              </span>
            </div>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{experiment.objective}</p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
              <div className="rounded-xl bg-slate-50 px-2 py-3">
                <div className="font-bold text-navy">{experiment.metrics.accuracy}%</div>
                <div>Accuracy</div>
              </div>
              <div className="rounded-xl bg-slate-50 px-2 py-3">
                <div className="font-bold text-navy">{experiment.metrics.runs}</div>
                <div>Runs</div>
              </div>
              <div className="rounded-xl bg-slate-50 px-2 py-3">
                <div className="font-bold text-navy">{experiment.metrics.contributors}</div>
                <div>Team</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {experiment.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
              <Link to={`/experiments/${experiment.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-tealHover">
                Details
                <ChevronRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditForm(experiment)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal hover:text-teal"
                  aria-label={`Edit ${experiment.title}`}
                >
                  <PencilLine className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(experiment.id)}
                  className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  aria-label={`Delete ${experiment.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-surface p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{editingId ? 'Update' : 'New'} experiment</p>
                <h3 className="mt-2 text-2xl font-bold text-navy">{editingId ? 'Edit research record' : 'Create research record'}</h3>
              </div>
              <button onClick={() => setShowForm(false)} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:text-navy">
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Experiment title</span>
                <input
                  value={formState.title}
                  onChange={(event) => setFormState({ ...formState, title: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                  placeholder="Predictive network optimization"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Category</span>
                <input
                  value={formState.category}
                  onChange={(event) => setFormState({ ...formState, category: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <select
                  value={formState.status}
                  onChange={(event) => setFormState({ ...formState, status: event.target.value as Status })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Planning">Planning</option>
                  <option value="Archived">Archived</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Objective</span>
                <textarea
                  value={formState.objective}
                  onChange={(event) => setFormState({ ...formState, objective: event.target.value })}
                  className="min-h-[80px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                  placeholder="What question is this experiment trying to answer?"
                  required
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Description</span>
                <textarea
                  value={formState.description}
                  onChange={(event) => setFormState({ ...formState, description: event.target.value })}
                  className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                  placeholder="Summarize the design, context, and research value."
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Dataset</span>
                <input
                  value={formState.dataset}
                  onChange={(event) => setFormState({ ...formState, dataset: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Method</span>
                <input
                  value={formState.method}
                  onChange={(event) => setFormState({ ...formState, method: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Owner</span>
                <input
                  value={formState.owner}
                  onChange={(event) => setFormState({ ...formState, owner: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Duration</span>
                <input
                  value={formState.duration}
                  onChange={(event) => setFormState({ ...formState, duration: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Difficulty</span>
                <select
                  value={formState.difficulty}
                  onChange={(event) => setFormState({ ...formState, difficulty: event.target.value as Difficulty })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Tags</span>
                <input
                  value={formState.tags}
                  onChange={(event) => setFormState({ ...formState, tags: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:bg-white"
                  placeholder="forecasting, transport, time-series"
                />
              </label>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-navy">
                  Cancel
                </button>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navyLight">
                  <Save className="h-4 w-4" />
                  {editingId ? 'Save changes' : 'Create record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ExperimentDetailPage({
  experiments,
  setExperiments,
}: {
  experiments: Experiment[];
  setExperiments: React.Dispatch<React.SetStateAction<Experiment[]>>;
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const experiment = experiments.find((entry) => entry.id === id);

  if (!experiment) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-surface p-10 text-center shadow-card">
        <h1 className="text-3xl font-black text-navy">Experiment not found</h1>
        <p className="mt-3 text-slate-600">The requested research record could not be located.</p>
        <Link to="/experiments" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navyLight">
          Return to library
        </Link>
      </div>
    );
  }

  function handleDelete() {
    const currentExperiment = experiment;
    if (!currentExperiment) return;

    setExperiments((prev) => prev.filter((entry) => entry.id !== currentExperiment.id));
    navigate('/experiments');
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        <Link to="/experiments" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to library
        </Link>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
              {experiment.category}
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-navy">{experiment.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/experiments')}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-navy"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Objective</p>
            <p className="mt-3 text-lg leading-8 text-slate-700">{experiment.objective}</p>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {experiment.description}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
            <h2 className="text-xl font-bold text-navy">Technical summary</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InfoTile label="Dataset" value={experiment.dataset} />
              <InfoTile label="Method" value={experiment.method} />
              <InfoTile label="Duration" value={experiment.duration} />
              <InfoTile label="Owner" value={experiment.owner} />
              <InfoTile label="Difficulty" value={experiment.difficulty} />
              <InfoTile label="Updated" value={formatDate(experiment.lastUpdated)} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Performance</p>
            <div className="mt-5 space-y-4">
              <MetricRow label="Model accuracy" value={`${experiment.metrics.accuracy}%`} />
              <MetricRow label="Simulation runs" value={String(experiment.metrics.runs)} />
              <MetricRow label="Contributors" value={String(experiment.metrics.contributors)} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Keywords</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {experiment.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}) {
  const [form, setForm] = useState(profile);

  useEffect(() => setForm(profile), [profile]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setProfile(form);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-navy text-2xl font-black text-white">
            {profile.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Research lead</p>
            <h1 className="mt-1 text-2xl font-black text-navy">{profile.name}</h1>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-semibold text-navy">Role</div>
            <div className="mt-1">{profile.role}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-semibold text-navy">Department</div>
            <div className="mt-1">{profile.department}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-semibold text-navy">Email</div>
            <div className="mt-1">{profile.email}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Faculty profile</p>
            <h2 className="mt-2 text-2xl font-bold text-navy">Edit personal details</h2>
          </div>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Full name</span>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-teal focus:bg-white focus:outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Role</span>
            <input
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-teal focus:bg-white focus:outline-none"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Department</span>
            <input
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-teal focus:bg-white focus:outline-none"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-teal focus:bg-white focus:outline-none"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Location</span>
            <input
              value={form.location}
              onChange={(event) => setForm({ ...form, location: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-teal focus:bg-white focus:outline-none"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Research interests</span>
            <textarea
              value={form.interests}
              onChange={(event) => setForm({ ...form, interests: event.target.value })}
              className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-teal focus:bg-white focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navyLight">
            <Save className="h-4 w-4" />
            Save profile
          </button>
        </div>
      </form>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: 'teal' | 'navy' | 'cyan' | 'emerald';
}) {
  const colors = {
    teal: 'bg-teal/10 text-teal',
    navy: 'bg-navy/10 text-navy',
    cyan: 'bg-cyan-100 text-cyan-700',
    emerald: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-surface p-5 shadow-card">
      <div className={`inline-flex rounded-xl p-3 ${colors[accent]}`}>{icon}</div>
      <div className="mt-4 text-3xl font-black text-navy">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-lg font-bold text-navy">{value}</span>
      </div>
    </div>
  );
}

function statusClasses(status: Status) {
  const map: Record<Status, string> = {
    Active: 'bg-emerald-100 text-emerald-700',
    Planning: 'bg-amber-100 text-amber-700',
    Archived: 'bg-slate-200 text-slate-700',
  };
  return map[status];
}

export default App;
