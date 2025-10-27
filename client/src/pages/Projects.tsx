import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Monocular Depth Estimation for Underwater Robots',
      description: 'Developing autonomous navigation for underwater robotic fish using Depth Anything V2 on Raspberry Pi 5, enabling real-time obstacle avoidance and 3D environmental reconstruction.',
      tags: ['Computer Vision', 'Robotics', 'Deep Learning', 'Embedded Systems'],
      status: 'in-progress',
      affiliation: 'Self-Organizing Swarms Lab, Princeton'
    },
    {
      title: 'Fish Tracking Simulator',
      description: 'Engineered and deployed a functional fish tracking system combining Depth Anything V2 and YOLO v8-nano, reducing inference time by 40% while maintaining 85% detection accuracy.',
      tags: ['YOLO', 'Computer Vision', 'Real-time Detection'],
      status: 'completed',
      affiliation: 'Self-Organizing Swarms Lab, Princeton'
    },
    {
      title: 'LexAI - Legal Document Assistant',
      description: 'Developed AI-powered document processing pipeline using GPT-4.1 and TypeScript, optimizing model inference on NVIDIA GPUs through CUDA acceleration. Reduced legal document review time by 37%.',
      tags: ['TypeScript', 'Next.js', 'GPT-4', 'CUDA'],
      status: 'completed',
      github: 'https://github.com/mpanojulesoreste'
    },
    {
      title: 'Nine Men\'s Morris with LEDs',
      description: 'Built an interactive board game where a user plays against an AI opponent using physical pieces while the AI uses LEDs. Developed as part of Professor Radhika Nagpal\'s robotics seminar.',
      tags: ['Robotics', 'Game AI', 'Hardware', 'Embedded Systems'],
      status: 'completed',
      affiliation: 'Princeton University'
    },
    {
      title: 'Our Kids Read - Attendance System',
      description: 'Led development of full-stack solution with automated SMS reminders via Twilio API. Managed 1,000+ daily reminders, boosting session attendance by 40%.',
      tags: ['Node.js', 'React.js', 'MongoDB', 'Twilio API'],
      status: 'completed',
      link: 'https://ourkidsread.org'
    },
    {
      title: 'Edu-Sports Academy Management',
      description: 'Led front-end development of responsive dashboard for golf academy management platform serving 500+ users, optimizing UI across desktop and mobile devices.',
      tags: ['React.js', 'TypeScript', 'Responsive Design'],
      status: 'completed'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Research and development work spanning robotics, machine learning, and full-stack development
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                {project.affiliation && (
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                    {project.affiliation}
                  </p>
                )}
              </div>
              
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                  project.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                }`}
              >
                {project.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.link || project.github) && (
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Site</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;