import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetails from './pages/ModuleDetails';
import Experiments from './pages/Experiments';
import ExperimentDetails from './pages/ExperimentDetails';
import Tools from './pages/Tools';
import Resources from './pages/Resources';
import Attendance from './pages/Attendance';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import { modules } from './data/modules';
import { experiments } from './data/experiments';
import { tools } from './data/tools';
import { resources } from './data/resources';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [siteRefresh, setSiteRefresh] = useState(0);

  useEffect(() => {
    const handleSiteDataUpdate = () => setSiteRefresh((value) => value + 1);
    window.addEventListener('site-data-updated', handleSiteDataUpdate);
    return () => window.removeEventListener('site-data-updated', handleSiteDataUpdate);
  }, []);

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return [];
    }

    const resultMap = [];

    modules.forEach((module) => {
      const label = `Module ${module.number}: ${module.title}`;
      if (label.toLowerCase().includes(query) || module.description.toLowerCase().includes(query)) {
        resultMap.push({ label, type: 'Module', to: `/modules/${module.id}` });
      }
    });

    experiments.forEach((experiment) => {
      const label = `Experiment ${experiment.number}: ${experiment.title}`;
      if (label.toLowerCase().includes(query) || experiment.objective.toLowerCase().includes(query)) {
        resultMap.push({ label, type: 'Experiment', to: `/experiments/${experiment.id}` });
      }
    });

    tools.forEach((tool) => {
      if (tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query)) {
        resultMap.push({ label: tool.name, type: 'Tool', to: '/tools' });
      }
    });

    resources.forEach((group) => {
      group.items.forEach((item) => {
        if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
          resultMap.push({ label: item.name, type: group.category, to: '/resources' });
        }
      });
    });

    return resultMap.slice(0, 8);
  }, [searchTerm]);

  return (
    <div className="app-shell" key={siteRefresh}>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} results={searchResults} />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:id" element={<ModuleDetails />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/:id" element={<ExperimentDetails />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
