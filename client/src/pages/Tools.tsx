import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { apiClient } from '../utils/api';
import type { Tool } from '../types';

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const data = await apiClient.getTools();
      setTools(data);
    } catch (err: any) {
      setError('Failed to load tools. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
          <h3 className="text-lg font-semibold mb-2 text-red-900 dark:text-red-200">
            Connection Error
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchTools}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Interactive Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore computer vision and image processing tools. More tools are being added regularly!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 transition-all ${
              tool.status === 'active'
                ? 'hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg'
                : 'opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              {tool.status === 'coming-soon' && (
                <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-medium rounded-full">
                  Coming Soon
                </span>
              )}
            </div>

            <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {tool.description}
            </p>

            {tool.methods && tool.methods.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.methods.map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {method}
                  </span>
                ))}
              </div>
            )}

            {tool.status === 'active' ? (
              <Link
                to={`/tools/${tool.id}`}
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all"
              >
                Try it now
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="text-gray-400 dark:text-gray-600 font-medium">
                Coming soon
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Tools Section */}
      <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-900/50">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          More Tools Coming Soon
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          I'm actively working on adding more computer vision and machine learning tools. 
          Future additions will include image segmentation, depth estimation, object detection, simulators, and more!
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            Image Segmentation
          </span>
          <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            Depth Estimation
          </span>
          <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            Object Detection
          </span>
          <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            Pose Estimation
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tools;