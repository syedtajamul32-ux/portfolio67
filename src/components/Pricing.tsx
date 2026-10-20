import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { PRICING_PLANS, PROFILE, type PricingPlan } from '@/data';

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

function PriceRoll({ plan }: { plan: PricingPlan }) {
  const [price, setPrice] = useState(plan.minPrice);
  const [rolling, setRolling] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = plan.minPrice;
    const interval = setInterval(() => {
      setRolling(true);
      const next =
        current === plan.minPrice ? plan.maxPrice : plan.minPrice;
      const duration = 800;
      const start = performance.now();
      const startVal = current;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(startVal + (next - startVal) * eased);
        setPrice(val);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          current = next;
          setRolling(false);
        }
      };
      requestAnimationFrame(tick);
    }, 3000);
    return () => clearInterval(interval);
  }, [started, plan.minPrice, plan.maxPrice]);

  return (
    <span ref={ref} className={`tabular-nums transition-opacity ${rolling ? 'opacity-70' : 'opacity-100'}`}>
      ₹{price.toLocaleString('en-IN')}
    </span>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bg py-12 sm:py-16 md:py-24">
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
              Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight mb-4">
            Website <span className="font-display italic">Development</span> Plans
          </h2>
          <p className="text-sm md:text-base text-muted max-w-2xl">
            Every business is different, so pick the plan that fits where your business is today.
            Not sure which one you need? Message me and I'll help you choose.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative rounded-3xl border p-6 md:p-8 flex flex-col ${
                plan.highlighted
                  ? 'border-text-primary/30 bg-surface'
                  : 'border-stroke bg-surface/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full accent-gradient px-4 py-1.5 text-xs font-medium text-bg">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular
                </div>
              )}

              <h3 className="text-xl md:text-2xl font-display italic text-text-primary mb-2">
                {plan.name}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6 min-h-[3em]">
                {plan.audience}
              </p>

              <div className="mb-1">
                <span className="text-3xl md:text-4xl font-display italic text-text-primary">
                  <PriceRoll plan={plan} />
                </span>
              </div>
              <p className="text-xs text-muted mb-6">{plan.priceRange}</p>

              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-xs text-muted mb-5 pb-5 border-b border-stroke">
                <Clock className="w-4 h-4" />
                <span>Delivery in {plan.delivery}</span>
              </div>

              <a
                href={`mailto:${PROFILE.email}?subject=Inquiry: ${plan.name}`}
                className="group relative rounded-full p-[2px] hover:scale-[1.02] transition-transform duration-300"
              >
                <span
                  className="absolute inset-0 rounded-full accent-gradient"
                  style={plan.highlighted ? gradientBorderStyle : undefined}
                />
                <span
                  className={`relative flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm transition-colors ${
                    plan.highlighted
                      ? 'bg-bg text-text-primary group-hover:bg-surface'
                      : 'border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent'
                  }`}
                >
                  Get started <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
