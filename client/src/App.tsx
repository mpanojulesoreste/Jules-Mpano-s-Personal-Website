import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import FeatureExtractor from './tools/FeatureExtractor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navigation />
        
        <main className="pt-16">
          <div className="px-4 py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/feature-extractor" element={<FeatureExtractor />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="mb-2">
                © {new Date().getFullYear()} Jules Mpano.
              </p>
              <p className="text-sm">
                Princeton University • Computer Science '26
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;