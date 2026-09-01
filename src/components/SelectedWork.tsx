import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

const halftoneStyle: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
  backgroundSize: '4px 4px',
};

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

function Card({
  project,
  className,
  delay = 0,
}: {
  project: (typeof PROJECTS)[number];
  className?: string;
  delay?: number;
}) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${className ?? ''}`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl transition-transform duration-500 group-hover:scale-105">
        <span>{project.emoji}</span>
      </div>
      <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={halftoneStyle} />
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-500 flex items-center justify-center p-6">
        <div className="relative rounded-full p-[2px]">
          <span className="absolute inset-0 rounded-full accent-gradient" style={gradientBorderStyle} />
          <span className="relative block rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium">
            View — <span className="font-display italic">{project.title}</span>
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between bg-gradient-to-t from-bg/80 to-transparent">
        <div>
          <h3 className="text-xl md:text-2xl font-display italic text-text-primary">
            {project.title}
          </h3>
          <p className="text-xs text-muted uppercase tracking-[0.2em] mt-1">
            {project.category}
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.a>
  );
}

export default function SelectedWork() {
  const featured = PROJECTS.slice(0, 4);
  const rest = PROJECTS.slice(4);

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...reveal} className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Selected Work
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight">
                Featured <span className="font-display italic">projects</span>
              </h2>
              <p className="text-sm md:text-base text-muted mt-4 max-w-md">
                A selection of projects I've shipped — from concept to launch.
              </p>
            </div>
            <a
              href={PROJECTS[0].url}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-full p-[2px] hidden md:inline-flex"
            >
              <span
                className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={gradientBorderStyle}
              />
              <span className="relative flex items-center gap-2 rounded-full border-2 border-stroke bg-bg text-text-primary px-5 py-2.5 text-sm group-hover:border-transparent transition-colors">
                View all work <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          <Card project={featured[0]} className="md:col-span-7 aspect-[16/10]" delay={0} />
          <Card project={featured[1]} className="md:col-span-5 aspect-[4/5] md:aspect-auto md:h-full" delay={0.1} />
          <Card project={featured[2]} className="md:col-span-5 aspect-[4/5] md:aspect-auto md:h-full" delay={0.1} />
          <Card project={featured[3]} className="md:col-span-7 aspect-[16/10]" delay={0.2} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-5 md:mt-6">
          {rest.map((p, i) => (
            <Card key={p.title} project={p} className="aspect-[16/7]" delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
