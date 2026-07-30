// Single source of truth for site copy, drawn verbatim from the client brief.
// No invented facts, testimonials, or filler copy beyond what's listed here.

export const bio =
  "I am a Computer Science MSE student in Robotics and Human-Computer Interaction at Princeton University. I am currently advised by professor Radhika Nagpal and professor Parastoo Abtahi.";

// Hero h1: the short opening line only, at normal heading size.
export const bioShort =
  'I am a Computer Science MSE student in Robotics and Human-Computer Interaction at Princeton University.';

// Full expanded bio, rendered as body copy below the hero headline. Each
// paragraph is a list of text/link segments so real <a> tags can be
// rendered without embedding raw HTML in content data.
export interface BioSegment {
  text: string;
  href?: string;
}

export const bioParagraphs: BioSegment[][] = [
  [
    { text: 'I am currently advised by Professor ' },
    { text: 'Radhika Nagpal', href: 'https://www.radhikanagpal.org/' },
    { text: ' and Professor ' },
    { text: 'Parastoo Abtahi', href: 'https://parastooabtahi.com/' },
    { text: '. I am interested in bio-inspired multi-robot systems and human-computer and human-robot interaction, especially in assistive robotics.' },
  ],
  [
    { text: 'I work in the ' },
    { text: 'Self-Organizing Swarms & Robotics Lab', href: 'https://ssr.princeton.edu/' },
    { text: ', where I build vision-based perception and navigation systems for CoralBot, a fin-actuated robotic fish designed for coral-reef monitoring. My senior thesis, ' },
    {
      text: 'Designing Vision-Based Navigation Policies for Resource-Constrained Underwater Robots',
      href: 'https://theses-dissertations.princeton.edu/handle/88435/dsp01zp38wh14v',
    },
    { text: ', developed an end-to-end navigation pipeline for CoralBot. I am also a member of the ' },
    { text: 'Situated Interactions Lab (Ψ Lab)', href: 'https://parastooabtahi.com/' },
    { text: ', part of the ' },
    { text: 'Princeton HCI Group', href: 'https://hci.princeton.edu/' },
    { text: ', where I co-authored ' },
    { text: 'SorryIMissedThis', href: 'https://doi.org/10.1145/3772363.3799073' },
    { text: ', published in the CHI 2026 Extended Abstracts. You can find my work on ' },
    { text: 'Google Scholar', href: 'https://scholar.google.com/citations?user=TcrrXbgAAAAJ' },
    { text: '.' },
  ],
  [
    { text: 'Prior to this, during my undergrad at Princeton, I worked at ' },
    { text: 'Our Kids Read', href: 'https://www.ourkidsread.org/' },
    { text: ' as a Software Engineer and Product Manager intern. I was also a researcher in Professor ' },
    { text: 'Ruha Benjamin', href: 'https://www.ruhabenjamin.com/' },
    { text: "'s " },
    { text: 'Ida B. Wells Just Data Lab', href: 'https://www.thejustdatalab.com/' },
    { text: ', analyzing predictive-policing algorithms and criminal-justice data.' },
  ],
  [
    { text: 'I enjoy traveling, video production, and blogging. Check out my ' },
    { text: 'Essays', href: '/essays' },
    { text: '!' },
  ],
];

export const thesisTitle = 'Designing Vision-Based Navigation Policies for Resource-Constrained Underwater Robots';

export const thesisAbstract =
  'Coral-reef monitoring requires autonomous platforms capable of sustained, fine-grained data collection in environments where human divers cannot persist. Bio-inspired underwater robots such as CoralBot -- a fish-shaped platform with fin-based actuation, dual fisheye cameras, and an onboard Raspberry Pi 5 -- offer a compelling path forward, but enabling autonomous navigation on such resource-constrained hardware requires solving perception, control, and validation challenges simultaneously. This thesis presents an end-to-end vision-based navigation pipeline for CoralBot, beginning with a systematic evaluation of the Depth Anything V2 monocular depth foundation model on underwater fisheye imagery, including input size studies and calibration analysis. The depth pipeline feeds a six-region detection system that triggers heuristic obstacle avoidance, validated through physical pool deployment on CoralBot at two venues. To extend behavior beyond reactive avoidance, we develop a hardware-matched HoloOcean simulation in which the constrained HoveringAUV agent serves as a CoralBot proxy and train a twelve-model behavioral cloning sweep across input modality (depth versus RGB), lighting augmentation, backbone initialization, and training budget. Closed-loop evaluation across seen and held-out trajectories produces two ImageNet-pretrained depth policies that achieve 10/10 and 9/10 trajectory survival with collision rates of 0.1% and 0.2%, and identifies depth-channel mode collapse as the binding constraint on tasks requiring vertical motion. As a downstream application, we benchmark COLMAP-based 3D reconstruction across terrestrial, in-air, and underwater datasets, characterize the failure modes that prevent recognizable underwater reconstructions, and propose a SIFT-based feasibility diagnostic. The thesis concludes with a proposed deployment architecture for physical CoralBot and mitigations for the sim-to-real gap and the mode-collapse limitation.';

export const currentWork = [
  {
    id: 'thesis',
    eyebrow: 'SENIOR THESIS · SELF-ORGANIZING SWARMS & ROBOTICS LAB',
    title: 'Designing Vision-Based Navigation Policies for Resource-Constrained Underwater Robots',
    description:
      'An end-to-end vision-based navigation pipeline for CoralBot: monocular depth evaluation on fisheye imagery, six-region obstacle avoidance validated in physical pool deployment, and a twelve-model behavioral cloning sweep in a hardware-matched HoloOcean simulation.',
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
