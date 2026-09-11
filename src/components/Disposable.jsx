import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Film, Volume2, Download, Trash2 } from 'lucide-react';

const MAX_SHOTS = 14;

export default function Disposable() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [stream, setStream] = useState(null);
  const [shotsLeft, setShotsLeft] = useState(MAX_SHOTS);
  const [photos, setPhotos] = useState([]);
  const [isDeveloping, setIsDeveloping] = useState(false);
  const [flash, setFlash] = useState(false);
  const [viewMode, setViewMode] = useState('camera'); // 'camera' | 'gallery'

  // Nyalakan Webcam saat pertama kali dimuat
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
      alert("Pastikan izin akses kamera diaktifkan di browser Anda.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  // Efek Suara Jepretan (Opsional/Visual Simulation)
  const triggerFlashEffect = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  // Ambil Foto (Shutter)
  const takePhoto = () => {
    if (shotsLeft <= 0 || !videoRef.current) return;

    triggerFlashEffect();

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Gambar video ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Terapkan filter analog sederhana (sepia / kontras tinggi) di canvas
    applyAnalogFilter(context, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/jpeg');
    
    // Simpan ke daftar foto sementara
    setPhotos(prev => [...prev, { id: Date.now(), url: imageUrl, date: getAnalogDate() }]);
    setShotsLeft(prev => prev - 1);
  };

  // Tambah cap tanggal ala kamera analog (Warna oranye digital)
  const applyAnalogFilter = (ctx, width, height) => {
    // Tambah sedikit efek vignette / penggelapan pinggir
    const gradient = ctx.createRadialGradient(width / 2, height / 2, width / 4, width / 2, height / 2, width / 1.5);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Cetak timestamp ala kamera jadul di pojok kanan bawah
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#ff7b00';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fillText(getAnalogDate(), width - 240, height - 30);
  };

  const getAnalogDate = () => {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `'${yy} ${mm} ${dd}`;
  };

  // Simulasi Proses Cuci Film (Development)
  const handleDevelopFilm = () => {
    setIsDeveloping(true);
    setTimeout(() => {
      setIsDeveloping(false);
      setViewMode('gallery');
    }, 3000); // Tunggu 3 detik seperti proses cuci rol film
  };

  const resetCamera = () => {
    setShotsLeft(MAX_SHOTS);
    setPhotos([]);
    setViewMode('camera');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col items-center justify-center p-4 select-none font-sans">
      
      {/* Efek Kilatan Lampu Flash */}
      {flash && <div className="fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-75"></div>}

      {/* Header / Judul */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-serif tracking-widest text-amber-500 uppercase">DISPOSABLE CAM</h1>
        <p className="text-xs text-stone-400">Kodak FunSaver Edition • {shotsLeft} shots remaining</p>
      </div>

      {/* Tampilan Utama Kamera */}
      {viewMode === 'camera' ? (
        <div className="relative w-full max-w-md bg-amber-600 rounded-3xl p-6 shadow-2xl border-4 border-amber-700 flex flex-col items-center">
          
          {/* Viewfinder & Lensa */}
          <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden border-4 border-stone-800 shadow-inner">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover filter contrast-125 saturate-75"
            />
            
            {/* Bingkai Garis Viewfinder */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none flex justify-between items-start p-2">
              <span className="text-[10px] text-amber-400 font-mono tracking-widest">ISO 400</span>
              <span className="text-[10px] text-amber-400 font-mono">{shotsLeft}/{MAX_SHOTS}</span>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Kontrol Badan Kamera */}
          <div className="w-full mt-6 flex items-center justify-between px-4">
            
            {/* Indikator / Tombol Gulung (Roller) */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-stone-300 border-4 border-stone-500 shadow-md flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-stone-400 border border-stone-600"></div>
              </div>
              <span className="text-[10px] mt-1 font-mono text-amber-100">WIND</span>
            </div>

            {/* Tombol Shutter Utama (Jepret) */}
            <button
              onClick={takePhoto}
              disabled={shotsLeft <= 0}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 border-4 ${
                shotsLeft > 0 
                  ? 'bg-red-600 border-red-800 text-white cursor-pointer hover:bg-red-500' 
                  : 'bg-stone-600 border-stone-700 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Camera size={28} />
              <span className="text-[9px] font-bold tracking-tighter mt-0.5">SHUTTER</span>
            </button>

            {/* Tombol Aksi: Cuci Film jika habis atau ingin lihat */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleDevelopFilm}
                disabled={photos.length === 0}
                className={`p-3 rounded-xl border flex flex-col items-center transition ${
                  photos.length > 0 
                    ? 'bg-amber-500 border-amber-400 text-stone-900 hover:bg-amber-400 cursor-pointer' 
                    : 'bg-stone-800 border-stone-700 text-stone-500 cursor-not-allowed'
                }`}
                title="Cuci Film"
              >
                <Film size={20} />
                <span className="text-[9px] font-bold mt-1">DEVELOP</span>
              </button>
            </div>

          </div>

          {/* Catatan Bawah Kamera */}
          <div className="mt-4 text-center">
            {shotsLeft === 0 ? (
              <p className="text-xs text-amber-200 animate-pulse font-medium">Film habis! Klik tombol "DEVELOP" untuk mencuci foto.</p>
            ) : (
              <p className="text-[11px] text-amber-200/80">Arahkan ke objek lalu tekan tombol merah.</p>
            )}
          </div>
        </div>
      ) : (
        /* Galeri / Hasil Cuci Film */
        <div className="w-full max-w-2xl bg-stone-800 rounded-2xl p-6 shadow-xl border border-stone-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-serif text-amber-400">Hasil Cuci Film Analog</h2>
            <button 
              onClick={() => setViewMode('camera')}
              className="text-xs bg-stone-700 hover:bg-stone-600 px-3 py-1.5 rounded-lg text-stone-300 flex items-center gap-1 transition"
            >
              <RefreshCw size={14} /> Ambil Kamera Lagi
            </button>
          </div>

          {photos.length === 0 ? (
            <p className="text-center text-stone-400 py-12">Belum ada foto yang diambil.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
              {photos.map((photo, index) => (
                <div key={photo.id} className="bg-white p-2 pb-6 shadow-md transform rotate-1 hover:rotate-0 transition duration-300">
                  <div className="aspect-[4/3] bg-black overflow-hidden relative">
                    <img src={photo.url} alt={`Shot ${index + 1}`} className="w-full h-full object-cover filter contrast-110 sepia-[0.1]" />
                  </div>
                  <div className="mt-2 flex justify-between items-center px-1">
                    <span className="text-[10px] font-mono text-stone-500">#{index + 1}</span>
                    <a 
                      href={photo.url} 
                      download={`disposable-shot-${index + 1}.jpg`}
                      className="text-stone-700 hover:text-black"
                      title="Unduh Foto"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button 
              onClick={resetCamera}
              className="text-xs bg-red-900/40 hover:bg-red-900 text-red-200 px-4 py-2 rounded-lg border border-red-700/50 transition flex items-center gap-2"
            >
              <Trash2 size={14} /> Muat Rol Film Baru (Reset)
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay saat Proses Cuci Film */}
      {isDeveloping && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-serif text-amber-400 text-lg tracking-widest animate-pulse">MEMPROSES / MENCUCI FILM...</p>
          <p className="text-xs text-stone-400 mt-2">Mohon tunggu, cairan kimia sedang bereaksi.</p>
        </div>
      )}

    </div>
  );
}