import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegCopy, FaCheck } from 'react-icons/fa';

export default function GiftSection() {
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="py-24 px-6 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/DSC07878.webp" 
          alt="Background Gift" 
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
        className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl space-y-6 relative z-10"
      >
        <h2 className="text-3xl font-serif text-luxury-gold italic">Tanda Kasih</h2>
        <p className="text-sm font-light text-stone-400 leading-relaxed">
          Doa restu Bapak/Ibu merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih, dapat melalui:
        </p>

        {/* Rekening 1: OCBC */}
        <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-luxury-gold font-sans">OCBC</p>
          <p className="text-xl font-mono tracking-wider">693813003656</p>
          <p className="text-xs text-stone-400">a.n. Alexander Radianta Tarigan</p>

          <button 
            onClick={() => handleCopy('693813003656')}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            {copiedAccount === '693813003656' ? <FaCheck className="text-green-400" /> : <FaRegCopy />} 
            {copiedAccount === '693813003656' ? 'Berhasil Disalin!' : 'Salin Nomor Rekening'}
          </button>
        </div>

        {/* Rekening 2: MANDIRI */}
        <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-luxury-gold font-sans">MANDIRI</p>
          <p className="text-xl font-mono tracking-wider">1720003714609</p>
          <p className="text-xs text-stone-400">a.n. Resi Oktavia</p>

          <button 
            onClick={() => handleCopy('1720003714609')}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            {copiedAccount === '1720003714609' ? <FaCheck className="text-green-400" /> : <FaRegCopy />} 
            {copiedAccount === '1720003714609' ? 'Berhasil Disalin!' : 'Salin Nomor Rekening'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}