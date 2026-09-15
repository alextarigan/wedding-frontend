import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelopeOpenText } from 'react-icons/fa';

export default function HeroSection({ onOpenInvitation }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col justify-between py-16 px-6 md:px-16 text-stone-100">

      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          src="/assets/gallery/RPW_0060.JPG"
          alt="Alex & Resi Cover"
          className="w-full h-full object-cover filter brightness-[0.6] contrast-125"
        />
       
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex justify-between items-center w-full max-w-5xl mx-auto border-b border-white/10 pb-6"
      >
        <div>
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-luxury-gold font-sans block mb-1">
            The Sacred Matrimony
          </span>
          <span className="text-xl md:text-2xl font-serif tracking-widest text-stone-200 italic">
            Semper Amemus
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-stone-400 font-sans block mb-1">
            Date
          </span>
          <span className="text-xs md:text-sm font-serif tracking-wider text-luxury-gold">
            06 . 11 . 2026
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto w-full text-center space-y-6 my-auto"
      >
        <p className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-stone-300 font-light">
          The Wedding Of
        </p>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight text-white drop-shadow-2xl">
          Alex <span className="text-luxury-gold font-serif italic font-normal">&</span> Resi
        </h1>

        <div className="w-12 h-[1px] bg-luxury-gold/60 mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md mx-auto w-full text-center pb-4"
      >
        {onOpenInvitation && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenInvitation}
            className="group relative inline-flex items-center justify-center gap-4 w-full py-4 px-8 bg-white/10 hover:bg-luxury-gold text-white hover:text-black font-sans text-xs uppercase tracking-[0.35em] rounded-full backdrop-blur-md border border-white/20 transition-all duration-500 cursor-pointer shadow-2xl overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <FaEnvelopeOpenText className="text-xs relative z-10" />
            <span className="relative z-10 font-medium">Buka Undangan</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}