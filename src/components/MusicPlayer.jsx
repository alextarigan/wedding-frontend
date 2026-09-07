import React from 'react';
import { FaMusic, FaPause } from 'react-icons/fa';

export default function MusicPlayer({ isPlaying, togglePlay }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isPlaying && (
        <iframe
          title="BGM"
          src="https://www.youtube.com/embed/cFJ7B1wNIFg?autoplay=1&loop=1&playlist=cFJ7B1wNIFg"
          className="hidden"
          allow="autoplay"
        />
      )}

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