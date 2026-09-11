import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Photobooth from './components/Photobooth.jsx' // Sesuaikan jalur foldernya jika berbeda

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Halaman Utama Undangan */}
        <Route path="/" element={<App />} />
        
        {/* Halaman Photobooth */}
        <Route path="/photobooth" element={<Photobooth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)