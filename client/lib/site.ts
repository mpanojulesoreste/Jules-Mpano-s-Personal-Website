export const siteConfig = {
  name: 'Jules Mpano',
  // Full name for search/identity signals (title, description, structured data).
  // Kept distinct from `name` so branding stays "Jules Mpano" while SEO carries the
  // exact query "Jules Oreste Mpano".
  fullName: 'Jules Oreste Mpano',
  url: 'https://julesmpano.org',
  description:
    'Jules Oreste Mpano is a Computer Science MSE student in Robotics and Human-Computer Interaction at Princeton University, working on vision-based navigation for underwater robots.',
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
