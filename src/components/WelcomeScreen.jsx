import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/wedding.jpg';

export default function WelcomeScreen({ guestName, onOpen }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#121212] text-stone-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
    >
      {/* Background Image */}
      <img 
        src={bgImage} 
        alt="Welcome Background" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl">
        <p className="text-xs tracking-[0.4em] uppercase mb-4 text-stone-400 font-sans">The Wedding Of</p>
        <h1 className="text-4xl md:text-6xl font-serif italic text-luxury-gold mb-6">Alex & Resi</h1>
        
        <div className="space-y-2 mb-8">
          <p className="text-sm font-light text-stone-300">Kepada Yth. Bapak/Ibu/Saudara/i,</p>
          <h2 className="text-2xl md:text-3xl font-serif text-white font-semibold">{guestName}</h2>
        </div>
        
        <button
          onClick={onOpen}
          className="px-8 py-3 bg-luxury-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-all tracking-wider text-sm cursor-pointer"
        >
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}