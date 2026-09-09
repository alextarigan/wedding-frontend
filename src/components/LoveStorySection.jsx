import React from "react";
import { motion } from "framer-motion";

export default function LoveStorySection() {
  const stories = [
    {
      year: "2016",
      title: "Awal Perkenalan",
      desc: "Bermula dari sapaan sederhana di gereja semasa sekolah. Dari interaksi yang biasa saja, perlahan muncul kecocokan yang membuat hubungan menjadi semakin dekat.",
    },
    {
      year: "2021",
      title: "Memulai Kembali",
      desc: "Sempat berjalan sendiri-sendiri, waktu akhirnya mempertemukan kembali di masa kuliah. Lembaran baru pun dimulai dengan komitmen dan tujuan yang lebih matang.",
    },
    {
      year: "6 November 2026",
      title: "Hari Bahagia",
      desc: "Setelah melewati banyak fase dan proses, tiba waktunya untuk meresmikan langkah. Sebuah keputusan untuk mengikat janji dan terus berdampingan seumur hidup.",
    },
  ];

  return (
    <div className="py-32 px-6 bg-[#0a0a0a] text-stone-300 relative overflow-hidden flex flex-col items-center">
      {/* Efek Cahaya Latar (Subtle Glow) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

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
        {/* Garis Tengah Lembut (Vertical Line) */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent md:-translate-x-1/2" />

        <div className="space-y-16 md:space-y-24">
          {stories.map((item, index) => {
            // Logika untuk zig-zag pada desktop
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
                {/* Titik (Node) Emas Minimalis */}
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