import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Loader2, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

const gradientBorderStyle: React.CSSProperties = {
  backgroundSize: '200% 200%',
  animation: 'gradient-shift 6s ease infinite',
};

function StarRow({
  value,
  onChange,
  size = 'md',
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'lg' ? 'w-9 h-9' : size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={`${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <Star
            className={`${dim} ${
              n <= value ? 'fill-amber-400 text-amber-400' : 'text-stroke'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, rating, comment, created_at')
      .order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setReviews((data ?? []) as Review[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name.trim() || !comment.trim()) return;
    setSubmitting(true);
    setError(null);
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: name.trim(),
        rating,
        comment: comment.trim(),
      })
      .select('id, name, rating, comment, created_at')
      .single();
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setReviews([data as Review, ...reviews]);
    setName('');
    setRating(0);
    setComment('');
    setOpen(false);
  };

  return (
    <section id="reviews" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
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
              Reviews
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary leading-tight">
                What people <span className="font-display italic">say</span>
              </h2>
              <p className="text-sm md:text-base text-muted mt-4 max-w-md">
                Real feedback from clients and collaborators. Leave a review to share your experience.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {reviews.length > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-display italic text-text-primary">
                    {avg.toFixed(1)}
                  </span>
                  <StarRow value={Math.round(avg)} size="sm" />
                  <span className="text-xs text-muted mt-1">
                    {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <button
                onClick={() => setOpen(true)}
                className="group relative inline-flex rounded-full p-[2px] hover:scale-105 transition-transform duration-300"
              >
                <span
                  className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={gradientBorderStyle}
                />
                <span className="relative flex items-center gap-2 rounded-full bg-text-primary text-bg px-5 py-2.5 text-sm group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300">
                  <Star className="w-4 h-4" /> Leave a review
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 text-muted animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-muted py-16">
            Couldn't load reviews. Please try again later.
          </p>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-stroke rounded-3xl">
            <p className="text-muted text-sm md:text-base">
              No reviews yet — be the first to leave one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-3xl border border-stroke bg-surface p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full accent-gradient flex items-center justify-center text-bg font-display text-lg">
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{r.name}</p>
                      <p className="text-xs text-muted">
                        {new Date(r.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <StarRow value={r.rating} size="sm" />
                </div>
                <p className="text-sm text-muted leading-relaxed">{r.comment}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-bg/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-stroke bg-surface p-8"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-muted hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-display italic text-text-primary mb-1">
                Leave a review
              </h3>
              <p className="text-sm text-muted mb-6">
                Share your experience working with me.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs text-muted uppercase tracking-[0.2em] mb-2 block">
                    Your rating
                  </label>
                  <div
                    className="flex gap-1"
                    onMouseLeave={() => setHover(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        className="hover:scale-110 transition-transform"
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                      >
                        <Star
                          className="w-8 h-8 transition-colors"
                          style={{
                            fill: n <= (hover || rating) ? '#fbbf24' : 'transparent',
                            color: n <= (hover || rating) ? '#fbbf24' : 'hsl(var(--stroke))',
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted uppercase tracking-[0.2em] mb-2 block">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={60}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-stroke bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-text-primary/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted uppercase tracking-[0.2em] mb-2 block">
                    Your review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Tell me about your experience..."
                    className="w-full rounded-xl border border-stroke bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-text-primary/40 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || rating === 0 || !name.trim() || !comment.trim()}
                  className="group relative inline-flex rounded-full p-[2px] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span
                    className="absolute inset-0 rounded-full accent-gradient"
                    style={gradientBorderStyle}
                  />
                  <span className="relative flex items-center justify-center gap-2 rounded-full bg-bg text-text-primary px-6 py-3 text-sm">
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Submit review <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
