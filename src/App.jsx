import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import EventSection from './components/EventSection';
import GiftSection from './components/GiftSection';
import RsvpForm from './components/RsvpForm';
import MusicPlayer from './components/MusicPlayer';
import GallerySection from './components/GallerySection';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameFromUrl = queryParams.get('to');
    if (nameFromUrl) {
      setGuestName(nameFromUrl);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="font-sans antialiased bg-[#121212] selection:bg-luxury-gold selection:text-black">
      <AnimatePresence>
        {!isOpen && <WelcomeScreen guestName={guestName} onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      <HeroSection />
      <CoupleSection />
      <EventSection />
      <GallerySection />
      <GiftSection />
      <RsvpForm />
      
      {isOpen && <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} />}
    </div>
  );
}