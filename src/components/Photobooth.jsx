import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { frames } from "../framesConfig";

const Photobooth = () => {
  const [step, setStep] = useState("SELECT_FRAME"); 
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const nextFrame = () => {
    setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
  };

  const prevFrame = () => {
    setCurrentFrameIndex((prev) => (prev - 1 + frames.length) % frames.length);
  };

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const takePhoto = () => {
    if (countdown !== null) return;
    setCountdown(3);

    let timer = 3;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer > 0 ? timer : null);
      if (timer === 0) {
        clearInterval(interval);
        const imageSrc = webcamRef.current.getScreenshot();
        const newPhotos = [...photos, imageSrc];

        if (newPhotos.length === selectedFrame.slots) {
          setPhotos(newPhotos);
          setStep("RESULT");
        } else {
          setPhotos(newPhotos);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (step === "RESULT" && photos.length === selectedFrame.slots) {
      generateFinalImage();
    }
  }, [step]);

  const generateFinalImage = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = selectedFrame.width;
    canvas.height = selectedFrame.height;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    for (let i = 0; i < selectedFrame.slots; i++) {
      const userPhotoImg = await loadImage(photos[i]);
      const box = selectedFrame.boxes[i];
      ctx.drawImage(userPhotoImg, box.x, box.y, box.width, box.height);
    }

    const frameImg = await loadImage(selectedFrame.imageUrl);
    ctx.drawImage(frameImg, 0, 0, selectedFrame.width, selectedFrame.height);

    setFinalImage(canvas.toDataURL("image/png"));
  };

  const resetBooth = () => {
    setPhotos([]);
    setFinalImage(null);
    setStep("SELECT_FRAME");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
      {step === "SELECT_FRAME" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-3 tracking-wide drop-shadow-sm">
              Pilih Frame
            </h1>
            <p className="text-neutral-400 font-light">
              Gunakan panah untuk menggeser koleksi frame
            </p>
          </div>

          <div className="relative w-full flex items-center justify-center gap-4 md:gap-12">
            <button
              onClick={prevFrame}
              className="p-4 md:p-5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white backdrop-blur-md transition-all z-10 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="w-72 md:w-[400px] h-[550px] relative flex justify-center items-center perspective-1000">
              <motion.div
                key={currentFrameIndex}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute flex flex-col items-center w-full cursor-pointer group"
                onClick={() => {
                  setSelectedFrame(frames[currentFrameIndex]);
                  setStep("CAMERA");
                }}
              >
                <div className="relative w-full p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group-hover:border-amber-400/50 group-hover:bg-white/10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                  <div className="w-full h-[400px] flex items-center justify-center bg-neutral-900/50 rounded-xl overflow-hidden shadow-inner">
                    <img
                      src={frames[currentFrameIndex].imageUrl}
                      alt={frames[currentFrameIndex].name}
                      className="h-[90%] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-serif text-neutral-100 group-hover:text-amber-400 transition-colors">
                      {frames[currentFrameIndex].name}
                    </h3>
                    <p className="text-sm font-medium text-amber-200/60 mt-2 bg-amber-400/10 inline-block px-4 py-1 rounded-full">
                      {frames[currentFrameIndex].slots} FOTO • KLIK UNTUK
                      MEMILIH
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <button
              onClick={nextFrame}
              className="p-4 md:p-5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white backdrop-blur-md transition-all z-10 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {step === "CAMERA" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white/20">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full max-w-3xl rounded-xl transform scale-x-[-1]" 
            />
            {countdown && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-9xl font-bold">
                {countdown}
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-6">
            <p className="text-xl">
              Foto: {photos.length} / {selectedFrame.slots}
            </p>
            <button
              onClick={takePhoto}
              disabled={countdown !== null}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Ambil Foto
            </button>
          </div>
        </motion.div>
      )}

      {step === "RESULT" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl font-serif mb-6 text-gold-400">
            Hasil Foto Anda
          </h2>

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          {finalImage ? (
            <div className="flex flex-col items-center gap-8">
              {/* <img
                src={finalImage}
                alt="Final Photobooth"
                className="h-[70vh] rounded-xl shadow-2xl shadow-white/10"
              /> */}
              <img
                src={finalImage}
                alt="Final Photobooth"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />
              <div className="flex gap-4">
                <a
                  href={finalImage}
                  download={`wedding-alex-resi-${Date.now()}.png`}
                  className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-500 transition-colors"
                >
                  Unduh Gambar
                </a>
                <button
                  onClick={resetBooth}
                  className="px-8 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors"
                >
                  Ulangi
                </button>
              </div>
            </div>
          ) : (
            <p className="animate-pulse text-xl">Memproses gambar...</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Photobooth;
