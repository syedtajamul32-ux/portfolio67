import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X, ArrowRight } from 'lucide-react';

type TourStep = {
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'center';
};

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to my portfolio',
    description: "Let me take you on a quick tour of what I can build for your business.",
    target: 'body',
    position: 'center',
  },
  {
    title: 'My Work',
    description: "These are real projects I've shipped — salon websites, utility tools, and more.",
    target: '#work',
    position: 'top',
  },
  {
    title: 'Client Reviews',
    description: "Don't just take my word for it — here's what my clients say about working with me.",
    target: '#clients',
    position: 'top',
  },
  {
    title: 'Pricing Plans',
    description: 'Transparent pricing for every budget — from starter websites to full custom systems.',
    target: '#pricing',
    position: 'top',
  },
  {
    title: "Let's build together",
    description: "Ready to start? Click any of the contact buttons and let's make your website happen.",
    target: '#contact',
    position: 'bottom',
  },
];

export default function CursorTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [box, setBox] = useState<DOMRect | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dismissed) {
      localStorage.setItem('tour-dismissed', '1');
      return;
    }
    const seen = localStorage.getItem('tour-dismissed');
    if (!seen) {
      const timer = setTimeout(() => setActive(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  useEffect(() => {
    if (!active) return;
    const updateBox = () => {
      const currentStep = TOUR_STEPS[step];
      const el = currentStep.target === 'body'
        ? document.body
        : document.querySelector(currentStep.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        setBox(rect);

        if (currentStep.target !== 'body' && cursorRef.current) {
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          cursorRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
          cursorRef.current.style.opacity = '1';
        } else if (cursorRef.current) {
          cursorRef.current.style.opacity = '0';
        }
      }
    };
    updateBox();
    window.addEventListener('scroll', updateBox);
    window.addEventListener('resize', updateBox);
    return () => {
      window.removeEventListener('scroll', updateBox);
      window.removeEventListener('resize', updateBox);
    };
  }, [active, step]);

  const close = () => {
    setActive(false);
    setDismissed(true);
  };

  const next = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      close();
    }
  };

  const skip = () => close();

  const currentStep = TOUR_STEPS[step];
  const isCenter = currentStep?.position === 'center';

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const cardWidth = isMobile ? window.innerWidth - 32 : 340;
  const maxLeft = isMobile ? 16 : window.innerWidth - cardWidth - 16;

  let cardTop: number;
  let cardLeft: number;

  if (isCenter) {
    cardTop = window.innerHeight / 2 - 80;
    cardLeft = Math.max(16, Math.min(maxLeft, window.innerWidth / 2 - cardWidth / 2));
  } else if (box) {
    if (currentStep.position === 'bottom') {
      cardTop = Math.min(box.bottom + 16, window.innerHeight - 200);
    } else {
      cardTop = Math.max(80, box.top - 120);
    }
    cardLeft = Math.max(16, Math.min(maxLeft, box.left + box.width / 2 - cardWidth / 2));
  } else {
    cardTop = 80;
    cardLeft = 16;
  }

  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] pointer-events-auto"
            style={{
              background: box && !isCenter
                ? `radial-gradient(circle 250px at ${box.left + box.width/2}px ${box.top + box.height/2}px, transparent 0%, rgba(0,0,0,0.7) 100%)`
                : 'rgba(0,0,0,0.6)',
            }}
            onClick={skip}
          />

          <motion.div
            ref={cursorRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isCenter ? 0 : 1, scale: 1 }}
            className="fixed top-0 left-0 z-[510] pointer-events-none transition-transform duration-700 ease-out"
            style={{ opacity: 0 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full border-2 border-text-primary/60 animate-ping" />
              <div className="absolute inset-0 w-10 h-10 rounded-full accent-gradient flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-bg" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-[520] pointer-events-auto"
            style={{ top: cardTop, left: cardLeft, width: cardWidth }}
          >
            <div className="rounded-2xl border border-stroke bg-surface backdrop-blur-xl p-4 sm:p-5 shadow-2xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full accent-gradient">
                    <span className="text-[10px] font-bold text-bg">{step + 1}</span>
                  </div>
                  <span className="text-xs text-muted">{step + 1} of {TOUR_STEPS.length}</span>
                </div>
                <button onClick={skip} className="text-muted hover:text-text-primary transition-colors p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-base sm:text-lg font-display italic text-text-primary mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                {currentStep.description}
              </p>
              <div className="flex items-center justify-between gap-3">
                <button onClick={skip} className="text-xs text-muted hover:text-text-primary transition-colors shrink-0">
                  Skip tour
                </button>
                <button
                  onClick={next}
                  className="group relative rounded-full p-[2px] hover:scale-105 transition-transform shrink-0"
                >
                  <span
                    className="absolute inset-0 rounded-full accent-gradient"
                    style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
                  />
                  <span className="relative flex items-center gap-1.5 rounded-full bg-bg text-text-primary px-4 py-2 text-xs">
                    {step < TOUR_STEPS.length - 1 ? 'Next' : 'Done'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
