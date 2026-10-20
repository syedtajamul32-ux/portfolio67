import { useEffect, useCallback, useState } from 'react';
import { Check } from 'lucide-react';

type Ripple = {
  id: number;
  x: number;
  y: number;
};

let rippleId = 0;

export function ClickSuccessLayer() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((x: number, y: number) => {
    const id = rippleId++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        addRipple(e.clientX, e.clientY);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [addRipple]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute"
          style={{ left: r.x, top: r.y }}
        >
          <div className="click-ripple" />
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: 0, top: 0 }}
          >
            <div className="click-success-icon">
              <Check className="w-3.5 h-3.5 text-bg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
