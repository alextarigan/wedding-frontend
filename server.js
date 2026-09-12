import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';


// Import handler menggunakan ES Module
import uploadHandler from './api/upload-photo.js';



const app = express();
app.use(cors());
app.use(express.json());

app.all('/api/upload-photo', async (req, res) => {
  try {
    await uploadHandler(req, res);
  } catch (err) {
    console.error('Local Server Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local bridge server berjalan di http://localhost:${PORT}`);
});