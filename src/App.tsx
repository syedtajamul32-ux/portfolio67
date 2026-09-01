import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import Reviews from '@/components/Reviews';
import Journal from '@/components/Journal';
import Explorations from '@/components/Explorations';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';

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
        <Journal />
        <Explorations />
        <Stats />
        <Contact />
      </main>
    </div>
  );
}
