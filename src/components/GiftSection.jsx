import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegCopy, FaCheck } from 'react-icons/fa';

export default function GiftSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 px-6 bg-[#0d0d0d] text-stone-300 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-serif text-luxury-gold italic">Tanda Kasih</h2>
        <p className="text-sm font-light text-stone-400">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih, dapat melalui:
        </p>

        <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-luxury-gold font-sans">OCBC</p>
          <p className="text-xl font-mono tracking-wider">693813003656</p>
          <p className="text-xs text-stone-400">a.n. Alexander Radianta Tarigan</p>

          <button 
            onClick={handleCopy}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />} 
            {copied ? 'Berhasil Disalin!' : 'Salin Nomor Rekening'}
          </button>
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-luxury-gold font-sans">MANDIRI</p>
          <p className="text-xl font-mono tracking-wider">1720003714609</p>
          <p className="text-xs text-stone-400">a.n. Resi Oktavia</p>

          <button 
            onClick={handleCopy}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />} 
            {copied ? 'Berhasil Disalin!' : 'Salin Nomor Rekening'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}