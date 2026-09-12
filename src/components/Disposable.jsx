import React, { useState, useRef, useEffect } from 'react';
import { Camera, Film, RefreshCw, Trash2, Check, X, SwitchCamera, Disc } from 'lucide-react';

const MAX_SHOTS = 12;

export default function Disposable() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [stream, setStream] = useState(null);
  const [shotsLeft, setShotsLeft] = useState(MAX_SHOTS);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState({});
  const [isDeveloping, setIsDeveloping] = useState(false);
  const [flash, setFlash] = useState(false);
  const [viewMode, setViewMode] = useState('camera'); // 'camera' | 'review' | 'gallery'
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedGallery, setUploadedGallery] = useState([]);
  const [facingMode, setFacingMode] = useState('user');
  
  // State untuk 6 mode rol film yang diatur via tombol WIND
  const [filterMode, setFilterMode] = useState('classic'); // 'classic', 'mono', 'warm', 'cyber', 'toy', 'fade'

  useEffect(() => {
    if (viewMode === 'camera') {
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [viewMode, facingMode]);

  const startCamera = async (currentFacingMode) => {
    stopCamera();
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }, 
          facingMode: currentFacingMode 
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
      alert("Pastikan izin akses kamera diaktifkan.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const toggleCameraDirection = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  // Siklus urutan 6 mode rol film saat tombol WIND diklik
  const handleWindFilm = () => {
    const modes = ['classic', 'mono', 'warm', 'cyber', 'toy', 'fade'];
    const currentIndex = modes.indexOf(filterMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFilterMode(modes[nextIndex]);
  };

  const getFilterDisplayName = () => {
    switch (filterMode) {
      case 'classic': return 'Classic Vintage';
      case 'mono': return 'B&W Mono';
      case 'warm': return 'Warm Golden';
      case 'cyber': return 'Cyber Neon';
      case 'toy': return 'Toy Camera (Lofi)';
      case 'fade': return 'Faded Nostalgia';
      default: return 'Classic Vintage';
    }
  };

  const triggerFlashEffect = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  const takePhoto = () => {
    if (shotsLeft <= 0 || !videoRef.current) return;
    triggerFlashEffect();

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const targetWidth = 800;
    const targetHeight = Math.round((video.videoHeight / video.videoWidth) * targetWidth) || 600;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    if (facingMode === 'user') {
      context.translate(targetWidth, 0);
      context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0, targetWidth, targetHeight);
    
    if (facingMode === 'user') {
      context.setTransform(1, 0, 0, 1, 0, 0);
    }

    applyAnalogFilter(context, targetWidth, targetHeight, filterMode);

    canvas.toBlob((blob) => {
      const file = new File([blob], `shot_${Date.now()}.jpg`, { type: 'image/jpeg' });
      const newPhotoId = Date.now();
      
      setPhotos(prev => [...prev, { id: newPhotoId, file, previewUrl: URL.createObjectURL(blob) }]);
      setSelectedPhotos(prev => ({ ...prev, [newPhotoId]: true }));
      setShotsLeft(prev => prev - 1);
    }, 'image/jpeg', 0.85);
  };

  const applyAnalogFilter = (ctx, width, height, mode) => {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    if (mode === 'mono') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; data[i + 1] = avg; data[i + 2] = avg;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (mode === 'cyber') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.2);     
        data[i + 2] = Math.min(255, data[i + 2] * 1.4); 
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (mode === 'toy') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.3);
        data[i + 1] = Math.min(255, data[i + 1] * 0.9);
        data[i + 2] = Math.min(255, data[i + 2] * 1.2);
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (mode === 'fade') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 0.9 + 30;
        data[i + 1] = data[i + 1] * 0.9 + 30;
        data[i + 2] = data[i + 2] * 0.9 + 30;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (mode === 'warm') {
      ctx.fillStyle = 'rgba(255, 180, 50, 0.15)';
      ctx.fillRect(0, 0, width, height);
    }

    const gradient = ctx.createRadialGradient(width / 2, height / 2, width / 4, width / 2, height / 2, width / 1.3);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = (mode === 'mono' || mode === 'cyber') ? '#ffffff' : '#ff7b00';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fillText(getAnalogDate(), width - 180, height - 25);
  };

  const getAnalogDate = () => {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `'${yy} ${mm} ${dd}`;
  };

  const toggleSelectPhoto = (id) => {
    setSelectedPhotos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const removePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    setShotsLeft(prev => prev + 1);
  };

  const handleUploadSelectedPhotos = async () => {
    const photosToUpload = photos.filter(p => selectedPhotos[p.id]);
    
    if (photosToUpload.length === 0) {
      alert("Pilih setidaknya 1 foto untuk dicuci dan disimpan!");
      return;
    }

    setIsDeveloping(true);
    setUploadStatus(`Mengunggah ${photosToUpload.length} foto terpilih ke galeri...`);

    try {
      const uploadedUrls = [];

      for (let i = 0; i < photosToUpload.length; i++) {
        const formData = new FormData();
        formData.append('photo', photosToUpload[i].file);

        const response = await fetch('/api/upload-photo', {
          method: 'POST',
          body: formData,
        });

        const responseText = await response.text();
        const result = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
          throw new Error(result.message || `Gagal mengunggah foto ke-${i + 1}`);
        }

        uploadedUrls.push(result.url);
      }

      setUploadedGallery(uploadedUrls);
      setUploadStatus('Berhasil! Rol film selesai dicuci.');
      
      setTimeout(() => {
        setIsDeveloping(false);
        setViewMode('gallery');
      }, 1000);

    } catch (err) {
      setIsDeveloping(false);
      alert(`Gagal memproses rol film: ${err.message}`);
    }
  };

  const resetCamera = () => {
    setShotsLeft(MAX_SHOTS);
    setPhotos([]);
    setSelectedPhotos({});
    setUploadedGallery([]);
    setViewMode('camera');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col items-center justify-center p-4 select-none font-sans">
      {flash && <div className="fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-75"></div>}

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-serif tracking-widest text-amber-500 uppercase">WEDDING DISPOSABLE CAM</h1>
        <p className="text-xs text-stone-400">Abadikan momen serumu • Sisa film: {shotsLeft}</p>
      </div>

      {/* VIEW 1: KAMERA UTAMA */}
      {viewMode === 'camera' && (
        <div className="relative w-full max-w-md bg-amber-600 rounded-3xl p-6 shadow-2xl border-4 border-amber-700 flex flex-col items-center">
          
          <div className="absolute top-9 right-9 z-10">
            <button
              onClick={toggleCameraDirection}
              className="bg-black/60 hover:bg-black text-amber-400 p-2 rounded-full backdrop-blur-sm transition border border-amber-400/30 flex items-center gap-1.5 text-xs px-3 cursor-pointer"
              title="Ganti Kamera Depan/Belakang"
            >
              <SwitchCamera size={16} />
              <span className="font-mono text-[10px] uppercase">{facingMode === 'user' ? 'Depan' : 'Belakang'}</span>
            </button>
          </div>

          <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden border-4 border-stone-800 shadow-inner">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover filter contrast-125 saturate-75 ${facingMode === 'user' ? 'scale-x-[-1]' : ''} ${
                filterMode === 'mono' ? 'grayscale' : 
                filterMode === 'cyber' ? 'hue-rotate-90 contrast-150' : 
                filterMode === 'toy' ? 'contrast-125 saturate-150' : 
                filterMode === 'fade' ? 'brightness-110 saturate-50' : 
                filterMode === 'warm' ? 'sepia-[0.3]' : ''
              }`} 
            />
            <div className="absolute inset-4 border border-white/20 pointer-events-none flex justify-between items-start p-2">
              <span className="text-[10px] text-amber-400 font-mono tracking-widest">ISO 400</span>
              <span className="text-[10px] text-amber-400 font-mono">{shotsLeft}/{MAX_SHOTS}</span>
            </div>
            
            <div className="absolute bottom-2 left-3 pointer-events-none">
              <span className="text-[9px] bg-black/70 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                Mode: {getFilterDisplayName()}
              </span>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="w-full mt-6 flex items-center justify-between px-4">
            
            <div className="flex flex-col items-center">
              <button 
                onClick={handleWindFilm}
                className="w-12 h-12 rounded-full bg-stone-300 border-4 border-stone-500 shadow-md flex items-center justify-center hover:bg-stone-200 active:rotate-45 transition cursor-pointer"
                title="Putar untuk Ganti Filter Rol Film"
              >
                <Disc size={20} className="text-stone-700 animate-spin-slow" />
              </button>
              <span className="text-[10px] mt-1 font-mono text-amber-100 font-bold">WIND FILTER</span>
            </div>

            <button
              onClick={takePhoto}
              disabled={shotsLeft <= 0}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 border-4 ${
                shotsLeft > 0 ? 'bg-red-600 border-red-800 text-white cursor-pointer hover:bg-red-500' : 'bg-stone-600 border-stone-700 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Camera size={28} />
              <span className="text-[9px] font-bold tracking-tighter mt-0.5">SHUTTER</span>
            </button>

            <div className="flex flex-col items-center">
              <button
                onClick={() => setViewMode('review')}
                disabled={photos.length === 0}
                className={`p-3 rounded-xl border flex flex-col items-center transition ${
                  photos.length > 0 ? 'bg-amber-500 border-amber-400 text-stone-900 hover:bg-amber-400 cursor-pointer' : 'bg-stone-800 border-stone-700 text-stone-500 cursor-not-allowed'
                }`}
                title="Pilih & Cuci Film"
              >
                <Film size={20} />
                <span className="text-[9px] font-bold mt-1">DEVELOP</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-[11px] text-amber-200/80">Klik tombol <b>WIND</b> untuk mengganti gaya filter rol film.</p>
          </div>
        </div>
      )}

      {/* VIEW 2: REVIEW */}
      {viewMode === 'review' && (
        <div className="w-full max-w-xl bg-stone-800 rounded-2xl p-6 shadow-xl border border-stone-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-serif text-amber-400">Pilih Foto untuk Dicetak</h2>
              <p className="text-xs text-stone-400">Centang foto yang ingin disimpan ke galeri pernikahan.</p>
            </div>
            <button 
              onClick={() => setViewMode('camera')}
              className="text-xs bg-stone-700 hover:bg-stone-600 px-3 py-1.5 rounded-lg text-stone-300 transition cursor-pointer"
            >
              Kembali ke Kamera
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto p-2">
            {photos.map((photo, index) => {
              const isSelected = selectedPhotos[photo.id];
              return (
                <div key={photo.id} className={`relative bg-white p-2 pb-6 shadow-md transition duration-200 ${isSelected ? 'ring-2 ring-amber-500' : 'opacity-60'}`}>
                  
                  <button 
                    onClick={() => toggleSelectPhoto(photo.id)}
                    className={`absolute top-4 left-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition cursor-pointer ${
                      isSelected ? 'bg-amber-500 text-stone-900' : 'bg-stone-700/80 text-white'
                    }`}
                  >
                    {isSelected ? <Check size={16} /> : <X size={16} />}
                  </button>

                  <button 
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer"
                    title="Hapus foto"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="aspect-[4/3] bg-black overflow-hidden relative">
                    <img src={photo.previewUrl} alt={`Shot ${index + 1}`} className="w-full h-full object-cover filter contrast-110 sepia-[0.1]" />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-mono text-stone-600">Jepretan #{index + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-between items-center pt-4 border-t border-stone-700">
            <span className="text-xs text-stone-300">
              Terpilih: <b>{Object.values(selectedPhotos).filter(Boolean).length}</b> dari {photos.length} foto
            </span>
            <button
              onClick={handleUploadSelectedPhotos}
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Film size={16} /> Simpan Foto Terpilih
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: GALLERY */}
      {viewMode === 'gallery' && (
        <div className="w-full max-w-2xl bg-stone-800 rounded-2xl p-6 shadow-xl border border-stone-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-serif text-amber-400">Rol Film Berhasil Dicetak & Disimpan!</h2>
            <button 
              onClick={resetCamera}
              className="text-xs bg-stone-700 hover:bg-stone-600 px-3 py-1.5 rounded-lg text-stone-300 flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw size={14} /> Ambil Rol Baru
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
            {uploadedGallery.map((url, index) => (
              <div key={index} className="bg-white p-2 pb-6 shadow-md transform rotate-1">
                <div className="aspect-[4/3] bg-black overflow-hidden relative">
                  <img src={url} alt={`Cloud Shot ${index + 1}`} className="w-full h-full object-cover filter contrast-110 sepia-[0.1]" />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[10px] font-mono text-stone-500">Tersimpan di Cloud #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {isDeveloping && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-serif text-amber-400 text-lg tracking-widest animate-pulse">MENCUCI ROL FILM...</p>
          <p className="text-xs text-stone-400 mt-2 text-center">{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}