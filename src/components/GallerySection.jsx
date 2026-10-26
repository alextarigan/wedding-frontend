import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // State untuk mengontrol jumlah foto yang ditampilkan
  const INITIAL_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const photos = [
    "/assets/gallery/RPW_9784.webp",
    "/assets/gallery/RPW_9939.webp",
    "/assets/gallery/RPW_9787.webp",
    "/assets/gallery/RPW_9803.webp",
    "/assets/gallery/RPW_9686.webp",
    "/assets/gallery/RPW_9738.webp",
    "/assets/gallery/IMG_6261.webp",
    "/assets/gallery/IMG_5046.webp",
    "/assets/gallery/IMG_5047.webp",
    "/assets/gallery/RPW_0202.webp",
    "/assets/gallery/IMG_6034.webp",
    "/assets/gallery/IMG_6070.webp",
    "/assets/gallery/IMG_6075.webp",
    "/assets/gallery/IMG_6104.webp",
    "/assets/gallery/IMG_6108.webp",
    "/assets/gallery/RPW_0189.webp",
    "/assets/gallery/DSC07458.webp",
    "/assets/gallery/DSC07564.webp",
    "/assets/gallery/DSC07323.webp",
    "/assets/gallery/DSC07739.webp",
    "/assets/gallery/DSC07543.webp",
    "/assets/gallery/DSC07878.webp",
    "/assets/gallery/DSC07827.webp",
  ];

  // Fungsi menambah jumlah foto yang dimuat
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, photos.length));
  };

  // Fungsi Geser Kanan (Next)
  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  // Fungsi Geser Kiri (Prev)
  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  // Navigasi Keyboard
  const handleKeyDown = useCallback(
    (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    },
    [selectedIndex, handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="py-32 bg-[#0a0a0a] text-stone-300 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/gallery/DSC07564.webp" 
          alt="Background Gallery" 
          className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />
      </div>

      {/* Efek Cahaya Latar Lembut */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Header Galeri */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-4 mb-16 relative z-10 px-6 md:px-12"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-luxury-gold font-sans">
          Captured Moments
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
          Our <span className="text-luxury-gold italic">Gallery</span>
        </h2>
        <div className="h-px w-20 bg-luxury-gold/40 mx-auto pt-2" />
      </motion.div>

      {/* Full-Width Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-2 w-full px-1 md:px-2 relative z-10">
        {photos.slice(0, visibleCount).map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (index % 5) * 0.08, ease: "easeOut" }}
            onClick={() => setSelectedIndex(index)}
            className="overflow-hidden bg-black/40 group relative cursor-zoom-in aspect-square sm:aspect-[4/5]"
          >
            <img
              src={photo}
              alt={`Gallery ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110 filter contrast-110 brightness-95"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans border border-white/40 px-4 py-2 sm:px-6 sm:py-3 rounded-none sm:rounded-full bg-black/20 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                View
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-luxury-gold group-hover:w-full transition-all duration-700 ease-out" />
          </motion.div>
        ))}
      </div>

      {/* Tombol Show More */}
      {visibleCount < photos.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 relative z-10 text-center"
        >
          <button
            onClick={handleShowMore}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.3em] font-sans text-luxury-gold border border-luxury-gold/40 hover:border-luxury-gold hover:bg-luxury-gold hover:text-black rounded-full transition-all duration-500 shadow-xl group flex items-center gap-3 mx-auto"
          >
            <span>Show More</span>
            <span className="text-[10px] opacity-60 group-hover:opacity-100">
              ({photos.length - visibleCount} Left)
            </span>
          </button>
        </motion.div>
      )}

      {/* Lightbox Modal Slider + Drag/Swipe */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-8 select-none"
          >
            {/* Tombol Tutup */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/60 hover:text-luxury-gold transition-colors p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 z-[110]"
              aria-label="Tutup Preview"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Tombol Kiri */}
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-4 sm:left-8 text-white/60 hover:text-luxury-gold transition-colors p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 z-[110]"
              aria-label="Foto Sebelumnya"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Tombol Kanan */}
            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-4 sm:right-8 text-white/60 hover:text-luxury-gold transition-colors p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 z-[110]"
              aria-label="Foto Berikutnya"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Area Gambar Utama */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={photos[selectedIndex]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="w-auto h-auto max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing touch-pan-y"
                alt={`Preview ${selectedIndex + 1}`}
              />

              {/* Indikator Urutan Foto */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <span className="text-white/70 text-xs tracking-widest font-sans">
                  {selectedIndex + 1} / {photos.length}
                </span>
                <span className="text-[10px] text-white/40 tracking-wider font-sans sm:hidden">
                  ← usap untuk geser →
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}