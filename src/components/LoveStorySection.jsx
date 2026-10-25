import React from "react";
import { motion } from "framer-motion";

export default function LoveStorySection() {
  const stories = [
    {
      year: "2016",
      title: "Awal Perkenalan",
      desc: "Perjalanan kami dimulai dari masa SMA, cerita sederhana yang berawal dari teman menjadi tempat berbagi. Namun, garis takdir meminta kami berpisah alur. Selama 4 tahun, kami melangkah di jalan masing-masing, belajar, bertumbuh, dan mendewasakan diri ditempat yang berbeda.",
    },
    {
      year: "2021",
      title: "Memulai Kembali",
      desc: "Sejauh apapun kita berputar, takdir selalu tahu kemana ia harus kembali. Tuhan menuntun langkah kami untuk berpapasan lagi bukan sekedar mengenang masa lalu tetapi untuk merajut masa depan, karena setiap penantian punya cerita, setiap doa punya waktu, dan Tuhan yang mengatur setiap langkahnya.",
    },
    {
      year: "6 November 2026",
      title: "Hari Bahagia",
      desc: "Setelah perjalanan panjang yang mengajarkan kami tentang kesabaran, kini kami siap melangkah ke tujuan yang sama. Melangkah bersama dalam ikatan suci pernikahan sebagai suami & istri.",
    },
  ];

  return (
    <div className="py-32 px-6 bg-[#0a0a0a] text-stone-300 relative overflow-hidden flex flex-col items-center">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/IMG_6034.JPG" 
          alt="Background Love Story" 
          className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />
      </div>

      {/* Efek Pendaran Emas Latar (Subtle Glow) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center space-y-4 mb-24 relative z-10"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-luxury-gold/70 font-sans">
          Our Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-white">
          Love <span className="text-luxury-gold italic">Story</span>
        </h2>
      </motion.div>

      {/* Timeline Container */}
      <div className="max-w-4xl w-full relative z-10">
        {/* Garis Tengah Vertical Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent md:-translate-x-1/2" />

        <div className="space-y-16 md:space-y-24">
          {stories.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                className="relative flex flex-col md:flex-row items-start md:items-center group"
              >
                {/* Titik Node Emas */}
                <div className="absolute left-[15px] md:left-1/2 top-1 md:top-1/2 w-2.5 h-2.5 bg-luxury-gold rounded-full transform -translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_rgba(212,175,55,0.6)]" />

                {/* Konten Teks */}
                <div
                  className={`w-full md:w-1/2 pl-10 md:pl-0 ${
                    isEven
                      ? "md:pr-16 md:text-right" 
                      : "md:pl-16 md:ml-auto md:text-left" 
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-luxury-gold/80 font-sans">
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-stone-400 font-light leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
