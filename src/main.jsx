import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Photobooth from './components/Photobooth.jsx' // Sesuaikan path jika berbeda

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/photobooth" element={<Photobooth />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)