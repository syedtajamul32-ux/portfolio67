import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import { PROFILE } from '@/data';

const nameWords = PROFILE.name.split(' ');

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setRoleIndex((i) => (i + 1) % PROFILE.roles.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.name-word', {
        opacity: 0,
        y: 60,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.2,
      })
        .from(
          '.blur-in',
          {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20,
            duration: 1,
            stagger: 0.1,
            delay: 0.1,
          },
          '-=0.4'
        )
        .from(
          '.cta-btn',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.6'
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollToWork = () =>
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <BackgroundVideo overlay="bg-black/20" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 sm:mb-8">
          {PROFILE.eyebrow}
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-4 sm:mb-6 [perspective:600px]">
          {nameWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-3 sm:mr-4">
              <span className="name-word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        <p className="blur-in text-base sm:text-lg md:text-2xl text-muted mb-4 sm:mb-6 flex items-center flex-wrap justify-center gap-x-2">
          <span>A</span>
          <span className="relative inline-flex h-[1.4em] overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.span
                key={roleIndex}
                custom={direction}
                initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-display italic text-text-primary inline-block whitespace-nowrap"
              >
                {PROFILE.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>in {PROFILE.location}.</span>
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-8 sm:mb-12">
          {PROFILE.description}
        </p>

        <div className="inline-flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToWork}
            className="cta-btn group relative rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
            />
            <span className="relative block rounded-full bg-text-primary text-bg px-7 py-3.5 text-sm group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300">
              See Works
            </span>
          </button>

          <a
            href={`mailto:${PROFILE.email}`}
            className="cta-btn group relative rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
            />
            <span className="relative block rounded-full border-2 border-stroke bg-bg text-text-primary px-7 py-3.5 text-sm group-hover:border-transparent transition-colors duration-300">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute top-0 left-0 w-px h-4 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
