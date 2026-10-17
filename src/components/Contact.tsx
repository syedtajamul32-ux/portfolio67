import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Github, Mail, Linkedin, Instagram } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo';
import { PROFILE, SOCIALS } from '@/data';

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

const ICONS: Record<string, React.ElementType> = {
  GitHub: Github,
  Email: Mail,
  LinkedIn: Linkedin,
  Instagram: Instagram,
};

const MARQUEE_PHRASES = [
  'Building the future',
  'AI agents that work',
  'Trade smart',
  'Ship fast',
  'Design bold',
  'Build for real',
];

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
        <div className="overflow-hidden mb-12 md:mb-20">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90 px-4 sm:px-6 flex items-center gap-4 sm:gap-6"
              >
                {MARQUEE_PHRASES.map((phrase, j) => (
                  <span key={j} className="flex items-center gap-4 sm:gap-6">
                    {phrase}
                    <span className="text-muted text-2xl sm:text-4xl md:text-5xl">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight mb-6 md:mb-8">
            Let's build something.
          </h2>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative inline-flex rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
          >
            <span className="absolute inset-0 rounded-full accent-gradient" style={gradientBorderStyle} />
            <span className="relative flex items-center gap-2 rounded-full bg-bg text-text-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg">
              <span className="hidden sm:inline">{PROFILE.email}</span>
              <span className="sm:hidden">Get in touch</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </a>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t border-stroke pt-6 md:pt-8">
          <div className="flex items-center gap-3 order-2 md:order-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">
              Available for projects
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 order-1 md:order-2">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.label];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                  <span className="hidden sm:inline">{s.label}</span>
                </a>
              );
            })}
          </div>

          <p className="text-xs text-muted order-3">
            © 2026 {PROFILE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
