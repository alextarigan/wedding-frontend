import dotenv from 'dotenv';
dotenv.config(); // Tambahkan ini di baris paling atas agar aman saat dites lokal maupun Vercel

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Inisialisasi Cloudinary menggunakan variabel lingkungan
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Debugging opsional untuk memastikan variabel terbaca di terminal
    if (!process.env.CLOUDINARY_API_KEY) {
      throw new Error("CLOUDINARY_API_KEY kosong di process.env");
    }

    await runMiddleware(req, res, upload.single('photo'));

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File foto tidak ditemukan.' });
    }

    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'wedding-disposable-camera' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const cloudResult = await uploadToCloudinary(req.file.buffer);

    return res.status(200).json({ 
      success: true, 
      message: 'Foto berhasil disimpan!', 
      url: cloudResult.secure_url 
    });

  } catch (error) {
    console.error('Error Detail:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}