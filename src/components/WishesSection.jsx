import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaQuoteRight } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

export default function WishesSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching wishes:', error);
    } else {
      setWishes(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from('wishes')
      .insert([{ name: name, message: message }]);

    if (error) {
      console.error('Error inserting wish:', error);
      alert('Gagal mengirim pesan, silakan coba lagi.');
    } else {
      setName('');
      setMessage('');
      fetchWishes();
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateString) => {
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return `${date.toLocaleDateString('id-ID', optionsDate)} • ${date.toLocaleTimeString('id-ID', optionsTime)}`;
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="py-32 px-6 lg:px-12 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/DSC07739.webp" 
          alt="Background Wishes" 
          className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />
      </div>

      {/* Efek Cahaya Ambient */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl text-center space-y-5 mb-20 relative z-10"
      >
        <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-[#D4AF37] font-sans">
          Wedding Wishes
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
          Doa & <span className="text-[#D4AF37] italic">Restu</span>
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto pt-2" />
      </motion.div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* Kolom Kiri: Form Input */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h3 className="text-2xl font-serif text-white mb-2">Kirimkan Pesan</h3>
            <p className="text-xs text-stone-500 font-light mb-8">Tinggalkan jejak kebahagiaan untuk perjalanan baru kami.</p>
            
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Nama Anda</label>
                <input
                  type="text" required
                  placeholder="Contoh: Keluarga Budi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] text-white px-0 py-3 outline-none transition-all duration-300 placeholder:text-stone-700 font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Pesan & Doa</label>
                <textarea
                  required rows="4"
                  placeholder="Tuliskan doa terbaik Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 focus:border-[#D4AF37] hover:border-white/20 text-white p-4 rounded-2xl outline-none transition-all duration-300 placeholder:text-stone-700 font-light resize-none mt-2 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 mt-6 bg-[#D4AF37] hover:bg-[#e5c04d] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 border border-[#ffe596]/40 shadow-[0_4px_25px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                <span className="relative z-10">{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}</span>
                {!isSubmitting && <FaPaperPlane className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Kolom Kanan: Daftar Pesan */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col h-[550px]"
        >
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-2xl font-serif text-white">Pesan Masuk</h3>
            <span className="text-[10px] tracking-widest uppercase font-sans text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#D4AF37]/5">
              {wishes.length} Pesan
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-4 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] pb-12
            [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/50 transition-colors"
          >
            {wishes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                <FaQuoteRight className="text-4xl text-[#D4AF37]/30" />
                <p className="text-sm font-light">Belum ada ucapan. <br/>Jadilah yang pertama memberikan doa restu.</p>
              </div>
            ) : (
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/[0.03] backdrop-blur-sm border border-white/5 p-6 rounded-3xl relative group hover:border-[#D4AF37]/20 hover:bg-white/[0.05] transition-all duration-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-black border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-serif text-xl shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                        {getInitials(wish.name)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-white font-serif text-lg tracking-wide">{wish.name}</h4>
                          <FaQuoteRight className="text-white/5 text-lg group-hover:text-[#D4AF37]/10 transition-colors" />
                        </div>
                        <p className="text-[10px] text-[#D4AF37]/70 font-sans tracking-widest mb-3 mt-0.5">
                          {formatDate(wish.created_at)}
                        </p>
                        <p className="text-sm md:text-base font-light text-stone-300 leading-relaxed italic opacity-90">
                          "{wish.message}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}