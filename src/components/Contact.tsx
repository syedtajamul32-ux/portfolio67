import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo';
import { PROFILE, SOCIALS } from '@/data';

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <BackgroundVideo flip overlay="bg-black/60" />

      <div className="relative z-10">
        <div className="overflow-hidden mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90 px-6"
              >
                Building the future{' '}
                <span className="text-muted">•</span>{' '}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight mb-8">
            Let's build something.
          </h2>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative inline-flex rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
          >
            <span className="absolute inset-0 rounded-full accent-gradient" style={gradientBorderStyle} />
            <span className="relative flex items-center gap-2 rounded-full bg-bg text-text-primary px-8 py-4 text-base md:text-lg">
              {PROFILE.email} <ArrowUpRight className="w-5 h-5" />
            </span>
          </a>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-stroke pt-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">
              Available for projects
            </span>
          </div>

          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted">
            © 2026 {PROFILE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
