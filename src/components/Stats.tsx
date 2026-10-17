import { motion } from 'framer-motion';
import { STATS } from '@/data';

export default function Stats() {
  return (
    <section className="bg-bg py-12 sm:py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center text-center border-t border-stroke pt-4 sm:pt-8"
            >
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary leading-none mb-2 sm:mb-4">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-sm text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
