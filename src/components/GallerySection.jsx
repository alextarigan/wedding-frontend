import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    "/assets/gallery/RPW_9784.webp",
    "/assets/gallery/RPW_0008.webp",
    "/assets/gallery/RPW_9738.webp",
    "/assets/gallery/RPW_9939.webp",
    "/assets/gallery/RPW_9962.webp",
    "/assets/gallery/RPW_9971.webp",
    "/assets/gallery/RPW_0071.webp",
    "/assets/gallery/RPW_0147.webp",
  ];

  return (
    <div className="py-24 px-6 bg-[#121212] text-stone-300 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full text-center space-y-4 mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 font-sans">
          Our Moments
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-luxury-gold italic">
          Gallery
        </h2>
        <div className="h-px w-24 bg-luxury-gold/50 mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {photos.map((photo, index) => {
          const isLastOddItem = photos.length % 2 !== 0 && index === photos.length - 1;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => setSelectedImage(photo)}
              className={`overflow-hidden rounded-2xl border border-white/10 shadow-2xl group relative bg-black/40 cursor-zoom-in ${
                isLastOddItem ? "md:col-span-2 h-[400px]" : "h-80"
              }`}
            >
              <img
                src={photo}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              {/* Overlay Hover Icon */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm tracking-widest uppercase font-light border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  Lihat Foto
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal (Preview Full Foto) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2"
              aria-label="Tutup Preview"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.img
              src={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              alt="Preview Full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}