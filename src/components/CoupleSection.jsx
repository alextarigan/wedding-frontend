import React from 'react';
import { motion } from 'framer-motion';
import alex from '../assets/alex.JPG';
import resi from '../assets/resi.JPG';

export default function CoupleSection() {
  return (
    <div className="py-24 px-6 bg-[#121212] text-stone-300 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-xl space-y-6 mb-16"
      >
        <p className="text-stone-400 font-sans tracking-widest text-sm uppercase">Kepada Bapak/Ibu/Saudara/i,</p>
        <p className="text-stone-300 font-light leading-relaxed">
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk merayakan hari berbahagia pernikahan kami.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl w-full items-center">
        {/* Groom */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-luxury-gold/50 shadow-xl">
            <img src={alex} alt="Groom" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-3xl font-serif text-luxury-gold italic">Alex Tarigan</h3>
          <p className="text-sm font-light text-stone-400">Putra dari Bpk. Yusuf Tarigan & Ibu Herlina Br. Sihotang</p>
        </motion.div>

        {/* Bride */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-luxury-gold/50 shadow-xl">
            <img src={'/assets/gallery/resi.jpeg'} alt="Bride" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-3xl font-serif text-luxury-gold italic">Resi Oktavia</h3>
          <p className="text-sm font-light text-stone-400">Putri dari Bpk. Horas Tobing & Ibu Risma Br. Panggabean</p>
        </motion.div>
      </div>
    </div>
  );
}