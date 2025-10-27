import { Mail, Linkedin, Github, MapPin, BookOpen } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'julesmpano@princeton.edu',
      link: 'mailto:julesmpano@princeton.edu',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/julesmpano',
      link: 'https://linkedin.com/in/julesmpano',
      color: 'text-blue-700 dark:text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/mpanojulesoreste',
      link: 'https://github.com/mpanojulesoreste',
      color: 'text-gray-900 dark:text-gray-100'
    },
    {
      icon: BookOpen,
      label: 'Medium Blog',
      value: 'mpanojulesoreste.medium.com',
      link: 'https://mpanojulesoreste.medium.com/',
      color: 'text-green-700 dark:text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Princeton, New Jersey',
      color: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's chat!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-start gap-4 p-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-900/50">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Interests & Collaborations
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          I'm particularly interested in:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
            <span>Robotics and autonomous systems for scientific applications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
            <span>Computer vision and embedded machine learning</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
            <span>Technology for social good and community impact</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
            <span>Entrepreneurship and product development</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;