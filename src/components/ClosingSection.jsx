import React from 'react';
import { motion } from 'framer-motion';

export default function ClosingSection() {
  return (
    <div className="py-24 px-6 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center text-center space-y-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-lg space-y-6">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 font-sans">Terima Kasih</p>
        <p className="text-sm font-light leading-relaxed text-stone-300">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
        </p>
        <h2 className="text-4xl font-serif text-luxury-gold italic pt-4">Alex & Resi</h2>
        <div className="h-px w-24 bg-luxury-gold/50 mx-auto pt-6" />
        <p className="text-xs text-stone-500 pt-4">© 2026 Alex & Resi Wedding. All Rights Reserved.</p>
      </motion.div>
    </div>
  );
}