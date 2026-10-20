import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import Reviews from '@/components/Reviews';
import Journal from '@/components/Journal';
import Explorations from '@/components/Explorations';
import Stats from '@/components/Stats';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import Compare from '@/components/Compare';
import BeforeAfter from '@/components/BeforeAfter';
import Contact from '@/components/Contact';
import CursorTour from '@/components/CursorTour';
import { ClickSuccessLayer } from '@/components/ClickSuccess';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
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
        <Compare />
        <Journal />
        <Explorations />
        <Stats />
        <Contact />
      </main>
      <CursorTour />
      <ClickSuccessLayer />
    </div>
  );
}
