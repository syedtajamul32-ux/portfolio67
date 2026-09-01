import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BackgroundVideo from './BackgroundVideo';
import { PROFILE } from '@/data';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % PROFILE.roles.length),
      2000
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.name-reveal', {
          opacity: 0,
          y: 50,
          duration: 1.2,
          delay: 0.1,
        })
        .from(
          '.blur-in',
          {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20,
            duration: 1,
            stagger: 0.1,
            delay: 0.3,
          },
          '-=1'
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
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          {PROFILE.eyebrow}
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          {PROFILE.name}
        </h1>

        <p className="blur-in text-lg md:text-2xl text-muted mb-6">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {PROFILE.roles[roleIndex]}
          </span>{' '}
          in {PROFILE.location}.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          {PROFILE.description}
        </p>

        <div className="blur-in inline-flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToWork}
            className="group relative rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
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
            className="group relative rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
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
