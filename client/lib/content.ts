// Single source of truth for site copy, drawn verbatim from the client brief.
// No invented facts, testimonials, or filler copy beyond what's listed here.

export const bio =
  "I am a Computer Science MSE student in Robotics and Human-Computer Interaction at Princeton University. I am currently advised by professor Radhika Nagpal and professor Parastoo Abtahi.";

export const currentWork = [
  {
    id: 'thesis',
    eyebrow: 'SENIOR THESIS · SELF-ORGANIZING SWARMS & ROBOTICS LAB',
    title: 'Monocular Depth Estimation & 3D Reconstruction for Underwater Robot Navigation',
    description:
      'Deploying Depth Anything V2 for real-time obstacle avoidance on a Raspberry Pi 5 aboard a bio-inspired robotic fish, alongside a 3D-reconstruction benchmark spanning COLMAP, MapAnything, and Depth-Anything-V3 on underwater datasets.',
    href: '/research#thesis',
    advisor: 'Advised by Prof. Radhika Nagpal',
  },
  {
    id: 'sorry-i-missed-this',
    eyebrow: "CHI '26 · ACM · PRINCETON HCI GROUP",
    title: 'SorryIMissedThis',
    description:
      'AI-powered relationship maintenance: a three-stage LLM pipeline generating context-aware prompts from conversation history, evaluated in an N=15 within-subjects study.',
    href: '/research#sorryimissedthis',
    advisor: 'Advised by Prof. Parastoo Abtahi',
  },
] as const;

export interface ProjectEntry {
  id: string;
  name: string;
  dates: string;
  stack: string[];
  description: string;
  outcomes: string[];
  href?: string;
}

// LexAI, Edu-Sports Academy, Our Kids Read only, per brief scope. Fish
// Tracking Simulator and Nine Men's Morris are intentionally dropped --
// see final report for the judgment call.
export const projects: ProjectEntry[] = [
  {
    id: 'lexai',
    name: 'LexAI',
    dates: '2024',
    stack: ['GPT-4.1', 'TypeScript', 'Next.js', 'CUDA'],
    description:
      'AI legal document pipeline combining OCR with multi-stage verification. Optimized model inference on NVIDIA RTX 3060 GPUs through CUDA acceleration.',
    outcomes: ['+65% inference throughput', '-37% legal document review time'],
  },
  {
    id: 'edu-sports-academy',
    name: 'Edu-Sports Academy',
    dates: '2023',
    stack: ['React', 'Dashboards'],
    description: 'Management platform dashboards for a golf academy, serving 500+ users.',
    outcomes: ['-40% load time', '500+ users served'],
  },
  {
    id: 'our-kids-read',
    name: 'Our Kids Read',
    dates: '2023',
    stack: ['Node.js', 'Express', 'React', 'Twilio', 'MongoDB', 'JWT'],
    description:
      'Full-stack SMS reminder system sending 1,000+ daily reminders, with JWT auth and a MongoDB schema optimized for retrieval speed.',
    outcomes: ['+40% attendance', '1,000+ daily reminders', '+30% retrieval speed'],
  },
];

export const chiPaperDoi = 'https://doi.org/10.1145/3772363.3799073';
