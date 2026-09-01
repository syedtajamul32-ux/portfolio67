import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { EXPLORATIONS } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const EMOJIS = ['🎨', '🤖', '🎬', '🖌', '🧊', '🔤'];

const halftoneStyle: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
  backgroundSize: '4px 4px',
};

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colLeft = useRef<HTMLDivElement>(null);
  const colRight = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.to(colLeft.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      gsap.fromTo(
        colRight.current,
        { yPercent: -30 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const left = EXPLORATIONS.filter((_, i) => i % 2 === 0);
  const right = EXPLORATIONS.filter((_, i) => i % 2 !== 0);

  const renderCard = (item: (typeof EXPLORATIONS)[number], idx: number, realIdx: number) => (
    <button
      key={item.label}
      onClick={() => setLightbox(realIdx)}
      style={{ transform: `rotate(${idx % 2 === 0 ? -3 : 3}deg)` }}
      className="group relative block aspect-square max-w-[320px] w-full rounded-3xl border border-stroke bg-surface overflow-hidden hover:rotate-0 transition-transform duration-500"
    >
      <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl">
        {EMOJIS[realIdx]}
      </div>
      <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={halftoneStyle} />
      <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <div>
          <p className="text-xs text-muted uppercase tracking-[0.2em]">{item.tag}</p>
          <p className="text-lg font-display italic text-text-primary">{item.label}</p>
        </div>
      </div>
    </button>
  );

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      <div ref={contentRef} className="h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Explorations
              </span>
              <div className="w-8 h-px bg-stroke" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display italic text-text-primary leading-tight mb-6">
              Visual <span className="font-display italic">playground</span>
            </h2>
            <p className="text-sm md:text-base text-muted mb-8 max-w-md mx-auto">
              Experiments in motion, interface, and AI — the in-between work that keeps the craft sharp.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10">
          <div className="grid grid-cols-2 gap-12 md:gap-40">
            <div ref={colLeft} className="flex flex-col gap-12 md:gap-20 pointer-events-auto">
              {left.map((item, i) => renderCard(item, i, i * 2))}
            </div>
            <div ref={colRight} className="flex flex-col gap-12 md:gap-20 pt-32 pointer-events-auto">
              {right.map((item, i) => renderCard(item, i, i * 2 + 1))}
            </div>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-bg/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative aspect-square max-w-[520px] w-full rounded-3xl border border-stroke bg-surface flex items-center justify-center">
            <span className="text-9xl">{EMOJIS[lightbox]}</span>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs text-muted uppercase tracking-[0.2em]">
                {EXPLORATIONS[lightbox].tag}
              </p>
              <p className="text-2xl font-display italic text-text-primary">
                {EXPLORATIONS[lightbox].label}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
