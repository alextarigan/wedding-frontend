import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaQuoteLeft } from 'react-icons/fa';
import { supabase } from '../supabaseClient'; // Sesuaikan path jika perlu

export default function WishesSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengambil data ucapan dari Supabase saat komponen dimuat
  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false }); // Urutkan dari yang terbaru
    
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

    // Mengirim data ke Supabase
    const { error } = await supabase
      .from('wishes')
      .insert([{ name: name, message: message }]);

    if (error) {
      console.error('Error inserting wish:', error);
      alert('Gagal mengirim pesan, silakan coba lagi.');
    } else {
      setName('');
      setMessage('');
      fetchWishes(); // Refresh daftar ucapan setelah berhasil mengirim
    }
    setIsSubmitting(false);
  };

  // Fungsi untuk memformat tanggal (misal: "1 Okt 2026")
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="py-32 px-6 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl text-center space-y-4 mb-16 relative z-10"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-luxury-gold font-sans">
          Wedding Wishes
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-white">
          Doa & <span className="text-luxury-gold italic">Restu</span>
        </h2>
        <div className="h-px w-20 bg-luxury-gold/40 mx-auto pt-2" />
      </motion.div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Form Input */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">
            <h3 className="text-2xl font-serif text-white mb-6">Kirimkan Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400">Nama Anda</label>
                <input
                  type="text" required
                  placeholder="Contoh: Keluarga Budi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-luxury-gold text-white px-0 py-2 outline-none transition-colors placeholder:text-stone-700 font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400">Pesan & Doa</label>
                <textarea
                  required rows="4"
                  placeholder="Tuliskan doa terbaik Anda untuk kedua mempelai..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 focus:border-luxury-gold text-white p-4 rounded-xl outline-none transition-colors placeholder:text-stone-700 font-light resize-none mt-2"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-4 bg-luxury-gold text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}</span>
                {!isSubmitting && <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Daftar Pesan Scrollable */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xl font-serif text-white">Pesan Masuk</h3>
            <span className="text-xs font-sans text-luxury-gold border border-luxury-gold/30 px-3 py-1 rounded-full bg-luxury-gold/10">
              {wishes.length} Pesan
            </span>
          </div>

          <div className="flex-1 max-h-[500px] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-luxury-gold/30 scrollbar-track-transparent">
            {wishes.length === 0 ? (
              <p className="text-stone-500 text-sm italic text-center mt-10">Belum ada ucapan. Jadilah yang pertama!</p>
            ) : (
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/40 border border-white/5 p-6 rounded-2xl relative group hover:border-luxury-gold/30 transition-colors"
                  >
                    <FaQuoteLeft className="absolute top-6 right-6 text-white/5 text-2xl group-hover:text-luxury-gold/10 transition-colors" />
                    <h4 className="text-luxury-gold font-serif text-lg mb-1">{wish.name}</h4>
                    <p className="text-[10px] text-stone-500 font-sans tracking-wider mb-3">
                      {formatDate(wish.created_at)}
                    </p>
                    <p className="text-sm font-light text-stone-300 leading-relaxed">
                      "{wish.message}"
                    </p>
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