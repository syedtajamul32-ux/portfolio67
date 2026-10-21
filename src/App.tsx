import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import Reviews from '@/components/Reviews';
import Journal from '@/components/Journal';
import Stats from '@/components/Stats';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import Compare from '@/components/Compare';
import BeforeAfter from '@/components/BeforeAfter';
import Contact from '@/components/Contact';
import CursorTour from '@/components/CursorTour';
import { ClickSuccessLayer } from '@/components/ClickSuccess';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPopup from '@/components/chat/ChatPopup';
import ChatSection from '@/components/chat/ChatSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ChatProvider>
      <div className="relative bg-bg text-text-primary font-body antialiased overflow-x-hidden">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <Navbar />
        <main>
          <Hero />
          <SelectedWork />
          <Reviews />
          <Process />
          <Pricing />
          <BeforeAfter />
          <ChatSection />
          <Compare />
          <Journal />
          <Stats />
          <Contact />
        </main>
        <CursorTour />
        <ClickSuccessLayer />
        <ChatPopup />
      </div>
    </ChatProvider>
  );
}
