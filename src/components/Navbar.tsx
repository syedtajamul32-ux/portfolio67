import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/data';

const LINKS = ['Home', 'Work', 'Reviews', 'Resume'];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = ['home', 'work', 'reviews', 'resume'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(id.charAt(0).toUpperCase() + id.slice(1));
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (label: string) => {
    setActive(label);
    const id = label.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <button
          onClick={() => handleNav('Home')}
          className="relative h-9 w-9 rounded-full p-[2px] transition-transform duration-300 hover:scale-110"
          onMouseEnter={() => {
            if (ringRef.current)
              ringRef.current.style.animationDirection = 'reverse';
          }}
          onMouseLeave={() => {
            if (ringRef.current) ringRef.current.style.animationDirection = 'normal';
          }}
        >
          <div
            ref={ringRef}
            className="accent-gradient absolute inset-0 rounded-full"
            style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease infinite' }}
          />
          <div className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">
              {PROFILE.initial}
            </span>
          </div>
        </button>

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        <nav className="hidden sm:flex items-center">
          {LINKS.map((label) => (
            <button
              key={label}
              onClick={() => handleNav(label)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                active === label
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        <a
          href={`mailto:${PROFILE.email}`}
          className="relative group rounded-full p-[2px] text-xs sm:text-sm"
        >
          <span
            className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
          />
          <span className="relative block bg-surface rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary">
            Say hi <span className="inline-block">↗</span>
          </span>
        </a>
      </div>
    </div>
  );
}
