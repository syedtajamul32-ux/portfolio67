import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import ChatPanel from './ChatPanel';

export default function ChatSection() {
  return (
    <section id="assistant" className="bg-bg py-12 sm:py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Ask Away
            </span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl accent-gradient mt-1">
              <Bot className="w-5 h-5 text-bg" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-text-primary leading-tight">
                Talk to my <span className="font-display italic">assistant</span>
              </h2>
              <p className="text-sm text-muted mt-3 max-w-md">
                Curious about pricing, timelines, or what I can build for you?
                Ask away — it knows the important stuff.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ChatPanel variant="embedded" />
        </motion.div>
      </div>
    </section>
  );
}
