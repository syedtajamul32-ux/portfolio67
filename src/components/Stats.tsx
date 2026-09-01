import { motion } from 'framer-motion';
import { STATS } from '@/data';

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center text-center md:items-start md:text-left border-t border-stroke pt-8"
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary leading-none mb-4">
                {stat.value}
              </span>
              <span className="text-sm text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
