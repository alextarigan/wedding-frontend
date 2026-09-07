import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function EventSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target waktu: 06 November 2026 pukul 08:00 WIB
    const targetDate = new Date('2026-11-06T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const events = [
    {
      title: "Martumpol",
      date: "Jumat, 23 Oktober 2026",
      time: "08:00 WIB - Selesai",
      location: "Sopo Sonang, Duri-Riau",
      gmapUrl: "https://maps.app.goo.gl/b7wfqg7HVWza1Az59"
    },
    {
      title: "Maba Belo Selambar",
      date: "Jumat, 23 Oktober 2026",
      time: "19:00 WIB - Selesai",
      location: "Aula GBKP, Duri-Riau",
      gmapUrl: "https://maps.app.goo.gl/Y5A2UzvbUJ2J1JHYA"
    },
    {
      title: "Pemberkatan Nikah",
      date: "Jumat, 06 November 2026",
      time: "08:00 WIB - Selesai",
      location: "GKPI Bethesda, Duri-Riau",
      gmapUrl: "https://maps.app.goo.gl/vMYgHkcPn8Vim4T5A"
    },
    {
      title: "Pesta Adat",
      date: "Jumat, 06 November 2026",
      time: "10:00 WIB - Selesai",
      location: "Sopo Dame, Duri-Riau",
      gmapUrl: "https://maps.app.goo.gl/5CcNiZQtMwKfyhsq8"
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-dark text-stone-300 py-24 px-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl w-full text-center space-y-4 mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 font-sans">Save The Date</p>
        <h2 className="text-4xl md:text-5xl font-serif text-luxury-gold italic">Rangkaian Acara</h2>
        <div className="h-px w-24 bg-luxury-gold/50 mx-auto" />

        {/* Countdown Timer Box */}
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto pt-8">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg">
              <div className="text-2xl md:text-3xl font-serif text-luxury-gold font-bold">{item.value}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-sans mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl flex flex-col justify-between hover:border-luxury-gold/40 transition-colors group"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-luxury-gold italic group-hover:scale-[1.02] transition-transform origin-left">
                {event.title}
              </h3>
              
              <div className="space-y-2 text-sm text-stone-300 font-light">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-luxury-gold shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-luxury-gold shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-luxury-gold shrink-0 mt-1" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={event.gmapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white/10 hover:bg-luxury-gold hover:text-black text-xs uppercase tracking-widest font-sans rounded-xl transition-all"
              >
                Lihat Lokasi (Google Maps)
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}