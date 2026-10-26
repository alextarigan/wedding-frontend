import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Setup direktori untuk ES Module (karena Vite menggunakan type="module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi folder input (foto asli) dan output (foto hasil kompresi)
const inputFolder = path.join(__dirname, 'raw_images');
const outputFolder = path.join(__dirname, 'public/assets/gallery');

// Pastikan folder output sudah ada, jika belum maka buat otomatis
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const compressImages = async () => {
  // Cek apakah folder raw_images sudah dibuat
  if (!fs.existsSync(inputFolder)) {
    console.log("❌ Folder 'raw_images' tidak ditemukan. Silakan buat folder ini sejajar dengan package.json dan masukkan foto asli Anda.");
    return;
  }

  // Ambil semua file dari folder raw_images
  const files = fs.readdirSync(inputFolder);
  const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i));

  if (imageFiles.length === 0) {
    console.log("⚠️ Tidak ada gambar di dalam folder 'raw_images'.");
    return;
  }

  console.log(`🚀 Menemukan ${imageFiles.length} gambar. Memulai proses kompresi...`);

  // Proses kompresi satu per satu
  for (const file of imageFiles) {
    const inputPath = path.join(inputFolder, file);
    const fileNameWithoutExt = path.parse(file).name;
    const outputPath = path.join(outputFolder, `${fileNameWithoutExt}.webp`);

    try {
      await sharp(inputPath)
        // Mengecilkan resolusi maksimal lebar 1080px, tinggi menyesuaikan rasio
        .resize({ width: 1080, withoutEnlargement: true })
        // Mengubah ke format WebP dengan kualitas 75 (optimal)
        .webp({ quality: 75 })
        .toFile(outputPath);
      
      console.log(`✅ Berhasil: ${file} -> ${fileNameWithoutExt}.webp`);
    } catch (error) {
      console.error(`❌ Gagal memproses ${file}:`, error.message);
    }
  }
  
  console.log('🎉 Selesai! Semua gambar telah dikompresi ke WebP dan disimpan di public/assets/gallery/');
};

// Jalankan fungsi utama
compressImages();