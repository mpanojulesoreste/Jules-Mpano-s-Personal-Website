export const siteConfig = {
  name: 'Jules Mpano',
  url: 'https://julesmpano.org',
  description:
    'Computer Science MSE student in Robotics and Human-Computer Interaction at Princeton University, working on monocular depth estimation for underwater robot navigation.',
  email: 'julesmpano@princeton.edu',
  links: {
    github: 'https://github.com/mpanojulesoreste',
    linkedin: 'https://linkedin.com/in/julesmpano',
    scholar: 'https://scholar.google.com/citations?user=TcrrXbgAAAAJ',
    medium: 'https://mpanojulesoreste.medium.com/',
    // Substack URL not yet available. When the client provides it, set the
    // SUBSTACK_URL env var -- the essays page and CTA activate automatically.
    substack: process.env.SUBSTACK_URL || '',
  },
  cvHref: '/resume.pdf',
} as const;

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/tools', label: 'Tools' },
  { href: '/essays', label: 'Essays' },
] as const;
