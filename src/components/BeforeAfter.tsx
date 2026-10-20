import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BEFORE_AFTER } from '@/data';

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

export default function BeforeAfter() {
  return (
    <section id="results" className="bg-bg py-12 sm:py-16 md:py-24">
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
              Results
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight">
            Before <span className="font-display italic">&amp; after</span>
          </h2>
          <p className="text-sm md:text-base text-muted mt-4 max-w-md">
            The real impact my work has on businesses — from nothing to a thriving online presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {BEFORE_AFTER.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group rounded-3xl border border-stroke bg-surface overflow-hidden"
            >
              <div className="flex items-center justify-center h-32 sm:h-36 text-5xl sm:text-6xl bg-stroke/30">
                {item.emoji}
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-display italic text-text-primary mb-4">
                  {item.label}
                </h3>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-stroke/50 bg-bg/50 p-3">
                    <span className="text-[10px] text-muted uppercase tracking-[0.2em] mb-1 block">
                      Before
                    </span>
                    <p className="text-sm text-muted">{item.before}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative rounded-full p-[2px]">
                      <span className="absolute inset-0 rounded-full accent-gradient" style={gradientBorderStyle} />
                      <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-surface">
                        <ArrowRight className="w-4 h-4 text-text-primary" />
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-text-primary/15 bg-text-primary/5 p-3">
                    <span className="text-[10px] text-text-primary uppercase tracking-[0.2em] mb-1 block">
                      After
                    </span>
                    <p className="text-sm text-text-primary font-medium">{item.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
