import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    "/assets/gallery/RPW_9784.webp",
    "/assets/gallery/RPW_9738.webp",
    "/assets/gallery/IMG_5046.JPG",
    "/assets/gallery/IMG_5047.JPG",
    "/assets/gallery/IMG_6034.JPG",
    "/assets/gallery/IMG_6070.JPG",
    "/assets/gallery/IMG_6075.JPG",
    "/assets/gallery/IMG_6104.JPG",
    "/assets/gallery/IMG_6108.JPG",
    "/assets/gallery/IMG_6261.JPG",
    "/assets/gallery/DSC07543.webp",
    "/assets/gallery/DSC07739.webp",
    "/assets/gallery/DSC07827.webp",
    "/assets/gallery/DSC07878.webp",
  ];

  return (
    <div className="py-32 px-6 md:px-12 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Efek Cahaya Latar Lembut (Subtle Glow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Galeri */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-4 mb-20 relative z-10"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-luxury-gold font-sans">
          Captured Moments
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
          Our <span className="text-luxury-gold italic">Gallery</span>
        </h2>
        <div className="h-px w-20 bg-luxury-gold/40 mx-auto pt-2" />
      </motion.div>

      {/* Masonry-Style Grid (Kolom Asimetris Elegan) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl w-full space-y-6 relative z-10">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            onClick={() => setSelectedImage(photo)}
            className="break-inside-avoid overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl group relative cursor-zoom-in"
          >
            {/* Foto dengan transisi zoom halus */}
            <img
              src={photo}
              alt={`Gallery ${index + 1}`}
              loading="lazy"
              className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-110 brightness-95"
            />

            {/* Bingkai Emas Tipis di Dalam Foto (Mewah) */}
            <div className="absolute inset-3 border border-luxury-gold/20 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Overlay Mewah saat Disorot */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white text-[11px] tracking-[0.3em] uppercase font-sans border border-white/40 px-5 py-2.5 rounded-full bg-black/30 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                View Photo
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal (Preview Full Layar ala Pameran Seni) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Tombol Close Elegan */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-luxury-gold transition-colors p-3 rounded-full bg-white/5 border border-white/10"
              aria-label="Tutup Preview"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Gambar Modal */}
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10"
              alt="Preview Full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}