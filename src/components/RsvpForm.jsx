import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RsvpForm() {
  const [formData, setFormData] = useState({ name: '', attendance: 'hadir', pax: 1, message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Pastikan URL mengarah ke port Laravel Anda (default 8000)
      const response = await fetch('http://localhost:8000/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', attendance: 'hadir', pax: 1, message: '' });
      } else {
        const errorData = await response.json();
        console.error("Validasi gagal:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Koneksi gagal:", error);
      setStatus('error');
    }
  };

  return (
    <div className="py-24 px-6 bg-black flex justify-center text-stone-300">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-serif text-luxury-gold mb-6 text-center italic">RSVP & Wishes</h2>
        
        {status === 'success' ? (
          <p className="text-center text-green-400">Terima kasih atas konfirmasi Anda!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-stone-400">Nama Lengkap</label>
              <input 
                type="text" required
                className="w-full bg-transparent border-b border-stone-600 focus:border-luxury-gold outline-none py-2 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-stone-400">Kehadiran</label>
              <select 
                className="w-full bg-black/50 border border-stone-600 rounded p-2 text-stone-300 outline-none"
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: e.target.value})}
              >
                <option value="hadir">Akan Hadir</option>
                <option value="tidak_hadir">Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>

            {formData.attendance === 'hadir' && (
              <div>
                <label className="block text-sm mb-2 text-stone-400">Jumlah Orang (Max 5)</label>
                <input 
                  type="number" min="1" max="5" required
                  className="w-full bg-transparent border-b border-stone-600 focus:border-luxury-gold outline-none py-2"
                  value={formData.pax}
                  onChange={(e) => setFormData({...formData, pax: parseInt(e.target.value)})}
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-stone-400">Pesan & Doa</label>
              <textarea 
                rows="4" required
                className="w-full bg-transparent border border-stone-600 focus:border-luxury-gold rounded p-3 outline-none transition-colors"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full py-3 bg-luxury-gold text-black font-semibold rounded hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Mengirim...' : 'Kirim RSVP'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}