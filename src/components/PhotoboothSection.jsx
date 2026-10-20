import React from "react";
import { motion } from "framer-motion";
import { FaCameraRetro, FaMagic } from "react-icons/fa";

export default function PhotoboothSection() {
  return (
    <div className="py-24 px-6 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/DSC07827.webp" 
          alt="Background Photobooth" 
          className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />
      </div>

      {/* Efek Cahaya Latar (Subtle Gold Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Content Card dengan relative z-10 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl w-full text-center space-y-6 relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto text-luxury-gold text-2xl border border-luxury-gold/20">
          <FaCameraRetro />
        </div>

        <div className="space-y-3">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 font-sans">
            Interactive Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white italic">
            Virtual <span className="text-luxury-gold">Photobooth</span>
          </h2>
          <div className="h-px w-16 bg-luxury-gold/50 mx-auto" />
        </div>

        <p className="text-sm md:text-base font-light text-stone-300 leading-relaxed">
          Abadikan momen kebahagiaan Anda bersama kami menggunakan bingkai spesial photobooth digital yang telah kami sediakan. Ambil foto terbaikmu sekarang!
        </p>

        <div className="pt-4">
          <a
            href="/photobooth" 
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-luxury-gold to-yellow-500 hover:from-yellow-500 hover:to-luxury-gold text-black font-semibold text-xs uppercase tracking-widest rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <FaMagic className="text-sm" />
            <span>Coba Photobooth Sekarang</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}