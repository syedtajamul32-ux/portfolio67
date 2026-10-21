import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useChat, type ChatMessage } from './ChatContext';

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted/60"
          style={{
            animation: `chat-bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          isUser ? 'bg-stroke' : 'accent-gradient'
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-text-primary" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-bg" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? 'bg-stroke text-text-primary'
            : 'bg-surface border border-stroke text-text-primary'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

type ChatPanelProps = {
  variant: 'popup' | 'embedded';
};

export default function ChatPanel({ variant }: ChatPanelProps) {
  const { messages, isTyping, error, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  const heightClass =
    variant === 'popup'
      ? 'h-[420px] max-h-[60vh]'
      : 'h-[460px] sm:h-[520px]';

  return (
    <div className="flex flex-col rounded-xl border border-stroke bg-bg overflow-hidden">
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-3 py-4 space-y-4 ${heightClass}`}
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg accent-gradient">
              <Bot className="w-3.5 h-3.5 text-bg" />
            </div>
            <div className="rounded-lg bg-surface border border-stroke">
              <TypingDots />
            </div>
          </div>
        )}
        {error && (
          <p className="text-[11px] text-red-400/80 px-1">{error}</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-stroke p-2.5"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pricing, projects, timelines…"
            disabled={isTyping}
            className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-muted/60 outline-none px-2 py-1.5 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg accent-gradient transition-opacity disabled:opacity-30 enabled:hover:opacity-80"
          >
            <Send className="w-3.5 h-3.5 text-bg" />
          </button>
        </div>
        <p className="mt-1.5 px-2 text-[10px] text-muted/50">
          AI assistant. Confirm important details with Tajamul directly.
        </p>
      </form>
    </div>
  );
}
