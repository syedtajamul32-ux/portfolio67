import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { useChat } from './ChatContext';
import ChatPanel from './ChatPanel';

export default function ChatPopup() {
  const { isOpen, toggleChat, closeChat } = useChat();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-20 right-3 sm:right-4 z-[200] w-[calc(100vw-24px)] sm:w-[380px]"
        >
          <div className="rounded-xl border border-stroke bg-bg shadow-2xl shadow-black/40 overflow-hidden">
            <div className="flex items-center justify-between border-b border-stroke px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg accent-gradient">
                  <MessageCircle className="w-3.5 h-3.5 text-bg" />
                </div>
                <span className="text-[13px] font-medium text-text-primary">
                  Chat with Tajamul's assistant
                </span>
              </div>
              <button
                onClick={closeChat}
                className="text-muted hover:text-text-primary transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ChatPanel variant="popup" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
