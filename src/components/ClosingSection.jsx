import React from "react";
import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <div className="py-32 px-6 md:px-12 bg-[#0a0a0a] flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/DSC07543.webp" 
          alt="Background Closing" 
          className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />
      </div>

      {/* Efek Cahaya Halus di Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl space-y-10 relative z-10"
      >
        {/* Copywriting Penutup */}
        <div className="space-y-6">
          <p className="text-sm md:text-base font-light leading-relaxed text-stone-300">
            Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <p className="text-sm md:text-base font-light leading-relaxed text-stone-400">
            Di antara langkah-langkah yang membawa kami pada hari ini, kehadiran Anda adalah jejak terindah yang akan selalu kami kenang. Terima kasih telah menjadi saksi bersatunya dua keping hati dalam sebuah janji keabadian.
          </p>
        </div>

        {/* Bagian Tanda Tangan & Nama */}
        <div className="space-y-4 pt-6">
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-luxury-gold font-sans">
            Kami Yang Berbahagia
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide pt-4">
            Alex <span className="text-luxury-gold italic">&</span> Resi
          </h2>
        </div>

        {/* Garis Pembatas Gradient Elegan */}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent mx-auto mt-12" />

        {/* Footer / Copyright */}
        <p className="text-[10px] md:text-xs tracking-[0.2em] text-stone-500 uppercase pt-8 font-sans">
          © 2026 Alex & Resi Wedding.
        </p>
      </motion.div>
    </div>
  );
}