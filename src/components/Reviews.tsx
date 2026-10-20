import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight, Quote, Shuffle } from 'lucide-react';
import { TESTIMONIALS } from '@/data';

function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  const maskPart = (p: string) => {
    if (p.length <= 2) return p;
    const chars = `${p.charAt(0)}${'*'.repeat(p.length - 2)}${p.charAt(p.length - 1)}`;
    return chars.split('').join('-');
  };
  return parts.map(maskPart).join(' – ');
}

function StarRow({ value, size = 'sm' }: { value: number; size?: 'sm' | 'md' }) {
  const dim = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${dim} ${
            n <= value ? 'fill-amber-400 text-amber-400' : 'text-stroke'
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [order, setOrder] = useState<number[]>(
    TESTIMONIALS.map((_, i) => i)
  );

  const shuffle = () => {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      if (next.join(',') === prev.join(',')) {
        [next[0], next[1]] = [next[1], next[0]];
      }
      return next;
    });
  };

  useEffect(() => {
    const id = setInterval(shuffle, 6000);
    return () => clearInterval(id);
  }, []);

  const avg =
    TESTIMONIALS.length > 0
      ? TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length
      : 0;

  return (
    <section id="clients" className="bg-bg py-12 sm:py-16 md:py-24">
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
              Happy Customers
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight">
                Clients who <span className="font-display italic">trust</span>{' '}
                my work
              </h2>
              <p className="text-sm md:text-base text-muted mt-4 max-w-md">
                Real feedback from the businesses I've built for. Every project
                shipped with care, every client left satisfied.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-display italic text-text-primary">
                  {avg.toFixed(1)}
                </span>
                <StarRow value={Math.round(avg)} size="md" />
                <span className="text-xs text-muted mt-1">
                  {TESTIMONIALS.length} happy clients
                </span>
              </div>
              <button
                onClick={shuffle}
                className="group relative rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
              >
                <span
                  className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
                />
                <span className="relative flex items-center gap-2 rounded-full border-2 border-stroke bg-bg text-text-primary px-4 py-2.5 text-xs group-hover:border-transparent transition-colors">
                  <Shuffle className="w-3.5 h-3.5" /> Shuffle
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {order.map((idx, i) => {
              const t = TESTIMONIALS[idx];
              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <a
                    href={t.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-3xl border border-stroke bg-surface p-5 sm:p-6 flex flex-col gap-4 hover:border-text-primary/20 transition-colors duration-300 block h-full"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full accent-gradient flex items-center justify-center text-bg font-display text-lg">
                          {t.client.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {maskName(t.client)}
                          </p>
                          <p className="text-xs text-muted">{t.role}</p>
                        </div>
                      </div>
                      <StarRow value={t.rating} size="sm" />
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-1 w-5 h-5 text-stroke" />
                      <p className="text-sm text-muted leading-relaxed pl-5">
                        {t.quote}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-stroke mt-auto">
                      <span className="text-xs text-muted uppercase tracking-[0.2em]">
                        {t.project}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary transition-colors" />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
