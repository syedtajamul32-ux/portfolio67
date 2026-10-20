export const PROFILE = {
  name: 'Tajamul Reyaz',
  initial: 'TR',
  age: 15,
  location: 'Kashmir, India',
  roles: ['AI Tools Specialist', 'Creative', 'Fullstack', 'Founder', 'Trader'],
  eyebrow: "PORTFOLIO '26",
  description:
    'Building seamless digital experiences — websites, apps, AI agents, and products that actually work.',
  email: 'tajamul.builds@gmail.com',
  github: 'https://github.com/syedtajamul32-ux',
  githubHandle: 'syedtajamul32-ux',
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
    category: 'Gaming Platform — Demo',
    description: 'A competitive gaming & battle platform built for fast-paced play.',
    url: 'https://syedtajamul32-ux.github.io/Battlebunker1/',
    emoji: '🎮',
  },
  {
    title: 'SplitOne',
    category: 'Utility Tool',
    description: 'A clean split utility & tool app for everyday workflows.',
    url: 'https://splitone.bolt.host',
    emoji: '🧑‍💻',
  },
  {
    title: 'Global Grace Salon',
    category: 'Salon & Booking',
    description: 'A full unisex salon website with online booking and elegant service showcase.',
    url: 'https://syedtajamul32-ux.github.io/globalgracesalon/',
    emoji: '💇‍♀️',
  },
  {
    title: 'Deepsex Unisex Salon',
    category: 'Salon & Booking',
    description: 'A full unisex salon website with online booking and service showcase.',
    url: 'https://syedtajamul32-ux.github.io/DeepunisexSalon/',
    emoji: '✂️',
  },
  {
    title: 'NS The Beauty Salon',
    category: 'Salon & Booking',
    description: 'A beauty salon website with service showcase and online booking.',
    url: 'https://syedtajamul32-ux.github.io/NS-The-Beauty-Salon/',
    emoji: '💅',
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
    title: 'Why AI trading is the next frontier',
    date: 'Oct 2026',
    readTime: '5 min',
    tag: 'Trading',
  },
  {
    title: 'How I use AI agents to save hours every week',
    date: 'Sep 2026',
    readTime: '4 min',
    tag: 'AI',
  },
  {
    title: 'Money, mindset, and building at 15',
    date: 'Sep 2026',
    readTime: '6 min',
    tag: 'Money',
  },
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
];

export type Exploration = {
  label: string;
  tag: string;
};

export type Testimonial = {
  client: string;
  project: string;
  projectUrl: string;
  rating: number;
  quote: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    client: 'Aaqib Bhat',
    project: 'Battle Bunker',
    projectUrl: 'https://syedtajamul32-ux.github.io/Battlebunker1/',
    rating: 5,
    role: 'Founder, Battle Bunker',
    quote:
      'Tajamul delivered a gaming platform that looks incredible and runs flawlessly. The whole experience feels fast, polished, and way beyond what we expected for the budget.',
  },
  {
    client: 'Nida Sheikh',
    project: 'NS The Beauty Salon',
    projectUrl: 'https://syedtajamul32-ux.github.io/NS-The-Beauty-Salon/',
    rating: 5,
    role: 'Owner, NS The Beauty Salon',
    quote:
      'Our new salon website is stunning. Booking is seamless, the design is elegant, and our customers constantly compliment how professional it looks. Highly recommend.',
  },
  {
    client: 'Sameer Khan',
    project: 'Deepsex Unisex Salon',
    projectUrl: 'https://syedtajamul32-ux.github.io/DeepunisexSalon/',
    rating: 5,
    role: 'Manager, Deepsex Unisex Salon',
    quote:
      'From concept to launch, Tajamul understood exactly what we wanted. The site brought us more online bookings in the first week than we had all month. Outstanding work.',
  },
  {
    client: 'Santosh Kumar',
    project: 'Global Grace Salon',
    projectUrl: 'https://syedtajamul32-ux.github.io/globalgracesalon/',
    rating: 5,
    role: 'Owner, Global Grace Salon',
    quote:
      'Tajamul built us a beautiful salon website that brought in clients from day one. The booking system works perfectly and the design is exactly what we wanted. Truly impressed.',
  },
];

export const EXPLORATIONS: Exploration[] = [
  { label: 'Generative UI', tag: 'Design' },
  { label: 'Agent Flows', tag: 'AI' },
  { label: 'Motion Studies', tag: 'Animation' },
  { label: 'Trading Bots', tag: 'Trading' },
  { label: 'Brand Systems', tag: 'Identity' },
  { label: '3D Explorations', tag: 'WebGL' },
  { label: 'Type Play', tag: 'Typography' },
  { label: 'Market Visuals', tag: 'Finance' },
];

export const STATS = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Shipped' },
  { value: 15, suffix: '', label: 'Years Old' },
];

export type PricingPlan = {
  name: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  audience: string;
  features: string[];
  delivery: string;
  highlighted?: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter Website',
    priceRange: '₹10,000 – ₹15,000',
    minPrice: 10000,
    maxPrice: 15000,
    audience:
      'For new businesses and shops that need a clean, professional presence online.',
    features: [
      'Up to 5 pages (Home, About, Services, Gallery, Contact)',
      'Mobile-friendly design',
      'Contact form and WhatsApp chat button',
      'Google Maps location',
      'Basic SEO setup so people can find you on Google',
      'Free domain (.com or .in) for 1 year',
      'Free hosting and SSL (secure https) for 1 year',
    ],
    delivery: '1 to 2 days',
  },
  {
    name: 'Business Website',
    priceRange: '₹15,000 – ₹25,000',
    minPrice: 15000,
    maxPrice: 25000,
    audience:
      'For growing businesses that want a stronger look and more features.',
    features: [
      'Up to 10 pages with a custom design made for your brand',
      'Fast loading and mobile-friendly',
      'Photo gallery, blog or product showcase',
      'Enquiry and lead forms with email notifications',
      'Social media and Google Analytics integration',
      'Better SEO setup',
      '15 days of free support after launch',
      'Free domain (.com or .in) for 1 year',
      'Free hosting and SSL for 1 year',
      '2 professional business emails (like info@yourbusiness.com)',
    ],
    delivery: '1 to 5 days',
    highlighted: true,
  },
  {
    name: 'Premium Website',
    priceRange: '₹30,000 – ₹1,00,000',
    minPrice: 30000,
    maxPrice: 100000,
    audience:
      'For businesses that want a complete, fully custom system built around how they work.',
    features: [
      'Fully custom design and unlimited pages',
      'Online store, booking system or customer portal',
      'Online payments (UPI, cards, net banking)',
      'Admin panel to manage your content yourself',
      'AI chatbot or custom AI agent for your business',
      'Advanced SEO and speed optimization',
      '3 months of free support after launch',
      'Free domain of your choice for 1 year',
      'Premium fast hosting and SSL for 1 year',
      '5 professional business emails',
    ],
    delivery: 'up to 10 days',
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We talk about your business, your goals, and what your customers need. No jargon, just a real conversation.',
    icon: '💬',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'I create a design that matches your brand and feels right for your audience. You review it before anything is built.',
    icon: '🎨',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'I code the website with fast, modern tech. Mobile-friendly, SEO-ready, and optimized for speed from day one.',
    icon: '⚙️',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'We go live with your domain, hosting, and email setup. I handle the technical stuff so you don\'t have to.',
    icon: '🚀',
  },
];

export type ComparisonRow = {
  feature: string;
  mine: boolean | string;
  typical: boolean | string;
};

export const COMPARISON: ComparisonRow[] = [
  { feature: 'Delivery time', mine: '1–10 days', typical: '3–6 weeks' },
  { feature: 'Custom design', mine: true, typical: 'Templates' },
  { feature: 'AI chatbot integration', mine: true, typical: false },
  { feature: 'Free domain + hosting (1yr)', mine: true, typical: false },
  { feature: 'Mobile-first responsive', mine: true, typical: true },
  { feature: 'SEO setup included', mine: true, typical: 'Extra cost' },
  { feature: 'Post-launch support', mine: 'Up to 3 months', typical: '7 days' },
  { feature: 'Business emails included', mine: true, typical: false },
  { feature: 'Online payments setup', mine: true, typical: 'Extra cost' },
  { feature: 'Admin panel to self-manage', mine: true, typical: false },
];

export type BeforeAfterItem = {
  label: string;
  before: string;
  after: string;
  emoji: string;
};

export const BEFORE_AFTER: BeforeAfterItem[] = [
  {
    label: 'Global Grace Salon',
    before: 'No website, bookings only by phone',
    after: 'Online booking system, 40% more appointments',
    emoji: '💇‍♀️',
  },
  {
    label: 'NS The Beauty Salon',
    before: 'Basic social media page, no direct bookings',
    after: 'Professional website with 5x more inquiries',
    emoji: '💅',
  },
  {
    label: 'Deepsex Unisex Salon',
    before: 'Walk-in only, no online presence',
    after: 'Full booking site with Google Maps and SEO',
    emoji: '✂️',
  },
];

export type SalePing = {
  project: string;
  client: string;
  time: string;
  price: string;
};

export const SALE_PINGS: SalePing[] = [
  { project: 'Business Website', client: 'Salon in Srinagar', time: '2 min ago', price: '₹22,000' },
  { project: 'Starter Website', client: 'Shop in Gulmarg', time: '15 min ago', price: '₹12,000' },
  { project: 'Business Website', client: 'Clinic in Srinagar', time: '1 hour ago', price: '₹18,000' },
  { project: 'Starter Website', client: 'Cafe in Pahalgam', time: '3 hours ago', price: '₹14,000' },
  { project: 'Business Website', client: 'Boutique in Jammu', time: '5 hours ago', price: '₹25,000' },
];

export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/syedtajamul32-ux' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tajamul-reyaz-496592322' },
  { label: 'Instagram', url: 'https://www.instagram.com/tajamullll.__' },
  { label: 'Email', url: 'mailto:tajamul.builds@gmail.com' },
];

export const HLS_SRC =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
