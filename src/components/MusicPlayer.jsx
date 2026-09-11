import React, { useEffect, useRef } from 'react';
import { FaMusic, FaPause } from 'react-icons/fa';

export default function MusicPlayer({ isPlaying, togglePlay }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay diblokir oleh browser:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* File MP3 Lokal */}
      <audio 
        ref={audioRef} 
        src="/assets/bgm.mp3" 
        loop 
        preload="auto"
      />

      <button 
        onClick={togglePlay}
        className="p-4 bg-luxury-gold text-black rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-white/20 cursor-pointer"
        aria-label="Toggle Music"
      >
        {isPlaying ? <FaPause className="animate-pulse" /> : <FaMusic className="animate-spin" />}
      </button>
    </div>
  );
}