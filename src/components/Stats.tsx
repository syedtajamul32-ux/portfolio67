import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { STATS, SALE_PINGS } from '@/data';

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function SalePings() {
  const [visiblePing, setVisiblePing] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cycleTime = 4500;
    const showTimer = setTimeout(() => setShow(true), 2000);

    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setVisiblePing((i) => (i + 1) % SALE_PINGS.length);
        setShow(true);
      }, 400);
    }, cycleTime);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  const ping = SALE_PINGS[visiblePing];

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -30, y: 10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 rounded-2xl border border-stroke bg-surface/90 backdrop-blur-md px-4 py-3 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full accent-gradient">
              <TrendingUp className="w-4 h-4 text-bg" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text-primary font-medium truncate">
                {ping.project} · {ping.price}
              </p>
              <p className="text-[11px] text-muted truncate">
                {ping.client} · {ping.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Stats() {
  return (
    <>
      <SalePings />
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
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] sm:text-sm text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
