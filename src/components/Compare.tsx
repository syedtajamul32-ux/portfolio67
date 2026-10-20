import { motion } from 'framer-motion';
import { Check, X, Minus, ArrowUpRight } from 'lucide-react';
import { COMPARISON, PROFILE } from '@/data';

function renderValue(val: boolean | string) {
  if (val === true) {
    return <Check className="w-5 h-5 text-green-400" />;
  }
  if (val === false) {
    return <X className="w-5 h-5 text-red-400/50" />;
  }
  if (val === 'Extra cost') {
    return <span className="text-xs text-amber-400/80">{val}</span>;
  }
  if (val === 'Templates') {
    return <span className="text-xs text-muted">{val}</span>;
  }
  return <span className="text-xs text-text-primary font-medium">{val}</span>;
}

export default function Compare() {
  return (
    <section id="compare" className="bg-bg py-12 sm:py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Why me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight">
            Me vs <span className="font-display italic">typical agencies</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-stroke bg-surface/50 overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-stroke">
            <div className="p-4 sm:p-6">
              <span className="text-xs text-muted uppercase tracking-[0.2em] hidden sm:inline">Feature</span>
            </div>
            <div className="p-4 sm:p-6 text-center border-l border-stroke bg-text-primary/5">
              <p className="font-display italic text-lg sm:text-xl text-text-primary">Me</p>
            </div>
            <div className="p-4 sm:p-6 text-center border-l border-stroke">
              <p className="font-display italic text-lg sm:text-xl text-muted">Typical Agency</p>
            </div>
          </div>

          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-stroke/50 last:border-b-0 ${
                i % 2 === 0 ? 'bg-surface/20' : ''
              }`}
            >
              <div className="p-3 sm:p-5 text-xs sm:text-sm text-muted flex items-center">
                {row.feature}
              </div>
              <div className="p-3 sm:p-5 flex items-center justify-center border-l border-stroke/50">
                {renderValue(row.mine)}
              </div>
              <div className="p-3 sm:p-5 flex items-center justify-center border-l border-stroke/50">
                {renderValue(row.typical)}
              </div>
            </div>
          ))}

          {/* CTA footer */}
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stroke">
            <p className="text-sm text-muted text-center sm:text-left">
              See the difference? Let's build your website the right way.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="group relative rounded-full p-[2px] hover:scale-105 transition-transform duration-300 shrink-0"
            >
              <span
                className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
              />
              <span className="relative flex items-center gap-2 rounded-full border-2 border-stroke bg-bg text-text-primary px-5 py-2.5 text-sm group-hover:border-transparent transition-colors">
                Start a project <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
