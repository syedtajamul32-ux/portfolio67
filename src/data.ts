export const PROFILE = {
  name: 'Tajamul Reyaz',
  initial: 'TR',
  age: 15,
  location: 'Kashmir, India',
  roles: ['AI Tools Specialist', 'Creative', 'Fullstack', 'Founder'],
  eyebrow: "PORTFOLIO '26",
  description:
    'Building seamless digital experiences — websites, apps, AI agents, and products that actually work.',
  email: 'syedtajamul32@gmail.com',
  github: 'https://github.com/syedtajamul32-ux',
  linkedin: 'https://www.linkedin.com/in/tajamul-reyaz-496592322',
  instagram: 'https://www.instagram.com/tajamullll.__',
  portfolio: 'https://syedtajamul32-ux.github.io/portfolio7/',
};

export type Project = {
  title: string;
  category: string;
  description: string;
  url: string;
  emoji: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Battle Bunker',
    category: 'Gaming Platform',
    description: 'A competitive gaming & battle platform built for fast-paced play.',
    url: 'https://syedtajamul32-ux.github.io/Battlebunker1/',
    emoji: '💻',
  },
  {
    title: 'Kashmir AI',
    category: 'AI Application',
    description: 'An AI-powered application tailored for the Kashmir ecosystem.',
    url: 'https://kashmirai.lovable.app',
    emoji: '🤖',
  },
  {
    title: 'SplitOne',
    category: 'Utility Tool',
    description: 'A clean split utility & tool app for everyday workflows.',
    url: 'https://splitone.bolt.host',
    emoji: '🧑\u200d💻',
  },
  {
    title: 'Humanize AI',
    category: 'AI Tool',
    description: 'An AI humanization tool that refines machine-generated text.',
    url: 'https://humanize-ai.bolt.host',
    emoji: '🪄',
  },
  {
    title: 'Durable AI Site',
    category: 'Business Website',
    description: 'A business website built end-to-end with Durable AI.',
    url: 'https://brcombinescom.durable.site',
    emoji: '🌍',
  },
  {
    title: 'Deepsex Unisex Salon',
    category: 'Salon & Booking',
    description: 'A full unisex salon website with online booking and service showcase.',
    url: 'https://syedtajamul32-ux.github.io/DeepunisexSalon/',
    emoji: '✂️',
  },
  {
    title: 'Old Portfolio',
    category: 'Previous Portfolio',
    description: 'My earlier portfolio site — the version before this one.',
    url: 'https://syedtajamul32-ux.github.io/portfolio7/',
    emoji: '🗂',
  },
];

export type JournalEntry = {
  title: string;
  date: string;
  readTime: string;
  tag: string;
};

export const JOURNAL: JournalEntry[] = [
  {
    title: 'Shipping AI agents that actually work',
    date: 'Aug 2026',
    readTime: '6 min',
    tag: 'AI',
  },
  {
    title: 'Building products at 15 — what I learned',
    date: 'Jul 2026',
    readTime: '4 min',
    tag: 'Build',
  },
  {
    title: 'The Kashmir tech scene is waking up',
    date: 'Jun 2026',
    readTime: '5 min',
    tag: 'Community',
  },
  {
    title: 'Why I choose tools over frameworks',
    date: 'May 2026',
    readTime: '3 min',
    tag: 'Craft',
  },
];

export type Exploration = {
  label: string;
  tag: string;
};

export const EXPLORATIONS: Exploration[] = [
  { label: 'Generative UI', tag: 'Design' },
  { label: 'Agent Flows', tag: 'AI' },
  { label: 'Motion Studies', tag: 'Animation' },
  { label: 'Brand Systems', tag: 'Identity' },
  { label: '3D Explorations', tag: 'WebGL' },
  { label: 'Type Play', tag: 'Typography' },
];

export const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Shipped' },
  { value: '15', label: 'Years Old' },
];

export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/syedtajamul32-ux' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tajamul-reyaz-496592322' },
  { label: 'Instagram', url: 'https://www.instagram.com/tajamullll.__' },
  { label: 'Email', url: 'mailto:syedtajamul32@gmail.com' },
];

export const HLS_SRC =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
