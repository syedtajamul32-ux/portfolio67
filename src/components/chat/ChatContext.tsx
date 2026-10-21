import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatContextValue = {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  error: string | null;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Hey, I'm Tajamul's assistant. Ask me about his work, pricing, or how to get in touch. I promise I'm more useful than I look.",
};

const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageTimestamps = useRef<number[]>([]);

  const isRateLimited = () => {
    const now = Date.now();
    messageTimestamps.current = messageTimestamps.current.filter(
      (t) => now - t < RATE_WINDOW
    );
    return messageTimestamps.current.length >= RATE_LIMIT;
  };

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    if (isRateLimited()) {
      setError("You're sending messages too fast. Give me a minute to catch up.");
      return;
    }

    messageTimestamps.current.push(Date.now());
    setError(null);

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }

      const data = await response.json();
      if (!data.reply) throw new Error('No reply from assistant');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I hit a snag there. Try again, or reach Tajamul directly at tajamul.builds@gmail.com.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping]);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((v) => !v), []);

  const resetChat = useCallback(() => {
    setMessages([GREETING]);
    setError(null);
    messageTimestamps.current = [];
  }, []);

  return (
    <ChatContext.Provider
      value={{ messages, isOpen, isTyping, error, openChat, closeChat, toggleChat, sendMessage, resetChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
