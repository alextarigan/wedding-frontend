import React from 'react';
import { motion } from 'framer-motion';

export default function GallerySection() {
  // Ganti path foto sesuai dengan aset yang Anda miliki di folder src/assets atau public/assets
  const photos = [
    '../assets/gallery/RPW_0189.jpg',
    '../assets/gallery/RPW_9519.jpg',
    '/assets/gallery/RPW_9708.jpg',
    '/assets/gallery/RPW_9732.jpg',
    '/assets/gallery/RPW_9739.jpg',
    '/assets/gallery/RPW_9926.jpg',
  ];

  return (
    <div className="py-24 px-6 bg-[#121212] text-stone-300 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full text-center space-y-4 mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 font-sans">Our Moments</p>
        <h2 className="text-4xl md:text-5xl font-serif text-luxury-gold italic">Gallery</h2>
        <div className="h-px w-24 bg-luxury-gold/50 mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl group relative h-80 bg-black/40"
          >
            <img 
              src={photo} 
              alt={`Gallery ${index + 1}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}