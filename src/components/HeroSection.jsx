import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/wedding.jpg';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-luxury-dark text-stone-200 overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE MENGGUNAKAN TAG IMG */}
      <img 
        src={bgImage} 
        alt="Wedding Background" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. OVERLAY GELAP (Agar gambar tidak menutupi teks) */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* 3. GLASSMORPHISM CONTAINER (Perhatikan tambahan z-10) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center p-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl max-w-lg w-[90%]"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-sans text-stone-400"
        >
          The Wedding Of
        </motion.p>
        
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="text-5xl md:text-7xl font-serif italic text-luxury-gold mb-6 text-center"
        >
          Alex & Resi
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="h-px w-24 bg-luxury-gold/50 mb-6"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-lg font-light tracking-widest font-sans"
        >
          06 . 11 . 2026
        </motion.p>
      </motion.div>
    </div>
  );
}