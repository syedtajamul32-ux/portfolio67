import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { JOURNAL } from '@/data';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

const TAG_EMOJI: Record<string, string> = {
  AI: '🤖',
  Build: '🛠',
  Community: '🌍',
  Craft: '✦',
};

export default function Journal() {
  return (
    <section id="resume" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...reveal} className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Journal
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight">
                Recent <span className="font-display italic">thoughts</span>
              </h2>
              <p className="text-sm md:text-base text-muted mt-4 max-w-md">
                Notes on building, AI, and growing up shipping software.
              </p>
            </div>
            <button className="group relative rounded-full p-[2px] hidden md:inline-flex">
              <span
                className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={gradientBorderStyle}
              />
              <span className="relative flex items-center gap-2 rounded-full border-2 border-stroke bg-bg text-text-primary px-5 py-2.5 text-sm group-hover:border-transparent transition-colors">
                View all <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-3 md:gap-4">
          {JOURNAL.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-300"
            >
              <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full bg-stroke text-lg">
                {TAG_EMOJI[entry.tag] ?? '✦'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-xl font-display italic text-text-primary truncate">
                  {entry.title}
                </h3>
                <p className="text-xs text-muted mt-1">{entry.tag}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-xs text-muted">
                <span>{entry.date}</span>
                <span>{entry.readTime}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-text-primary transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
