import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Wrench, Code2, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
              CS Student & Researcher
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in">
            Hi, I'm Jules Mpano
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Building technology that benefits humanity through robotics and machine learning.
            Currently working on autonomous underwater robot navigation at Princeton's Self-Organizing Swarms Lab.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
            <a
              href="https://github.com/mpanojulesoreste"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
            
            <a
              href="https://linkedin.com/in/julesmpano"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Contact</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/tools"
              className="group p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive tools for computer vision and image processing
              </p>
            </Link>

            <Link
              to="/projects"
              className="group p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Research and development work in robotics and ML
              </p>
            </Link>

            <a
              href="https://mpanojulesoreste.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Blog
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thoughts on technology, entrepreneurship, and more
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Current Focus
          </h2>
          
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-900/50">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Monocular Depth Estimation & 3D Reconstruction
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Developing autonomous underwater robot navigation systems using foundation models like 
              Depth Anything V2 for real-time obstacle avoidance while simultaneously capturing 
              imagery for high-quality 3D reconstruction of marine environments.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                Computer Vision
              </span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                Robotics
              </span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                Deep Learning
              </span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                Embedded Systems
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;