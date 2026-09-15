import React from 'react';
import { motion } from 'framer-motion';
import alex from '../assets/alex.JPG';

export default function CoupleSection() {
  return (
    <div className="py-32 px-6 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/RPW_0286.JPG" 
          alt="Background Couple" 
          className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-xl text-center space-y-4 mb-20 relative z-10"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans">
          The Groom & The Bride
        </p>
        <p className="text-sm md:text-base font-light leading-relaxed text-stone-300">
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk turut merayakan hari berbahagia pernikahan kami.
        </p>
        <div className="h-px w-20 bg-luxury-gold/40 mx-auto pt-4" />
      </motion.div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl w-full items-center relative z-10">
        
       
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center group"
        >
          {/* Frame Foto Portrait Elegan dengan Efek Glassmorphism */}
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/40 backdrop-blur-sm mb-8 transition-transform duration-700 group-hover:scale-[1.02]">
            <img 
              src={alex} 
              alt="Alex Tarigan" 
              className="w-full h-full object-cover filter contrast-115 brightness-95" 
            />
            <div className="absolute inset-3 border border-luxury-gold/30 rounded-xl pointer-events-none" />
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
              Alex Tarigan
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-sans">
              The Groom
            </p>
            <div className="h-px w-12 bg-luxury-gold/30 mx-auto" />
            <p className="text-xs md:text-sm font-light text-stone-300 leading-relaxed max-w-xs">
              Putra dari Bpk. Y. Tarigan <br className="hidden md:block"/>& Ibu H. Br. Sihotang
            </p>
          </div>
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center group"
        >
         
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/40 backdrop-blur-sm mb-8 transition-transform duration-700 group-hover:scale-[1.02]">
            <img 
              src={'/assets/gallery/IMG_5571.JPG'} 
              alt="Resi Oktavia" 
              className="w-full h-full object-cover filter contrast-115 brightness-95" 
            />
            <div className="absolute inset-3 border border-luxury-gold/30 rounded-xl pointer-events-none" />
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
              Resi Oktavia
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-sans">
              The Bride
            </p>
            <div className="h-px w-12 bg-luxury-gold/30 mx-auto" />
            <p className="text-xs md:text-sm font-light text-stone-300 leading-relaxed max-w-xs">
              Putri dari Bpk. H. Lumban Tobing <br className="hidden md:block"/>& Ibu R. Br. Panggabean
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}