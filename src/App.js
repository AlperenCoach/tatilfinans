import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import DraggableContactForm from './components/DraggableContactForm';
import TatilKonumlari from './components/TatilKonumlari';
import OdemePlanlari from './components/OdemePlanlari';
import Oteller from './components/Oteller';
import TasarrufFinansman from './components/TasarrufFinansman';
import TatilFinansmanForm from './components/TatilFinansmanForm';
import Profil from './components/Profil';
import OtelFinansmanDetay from './components/OtelFinansmanDetay';
import TaksitSecenekleri from './components/TaksitSecenekleri';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedOtel, setSelectedOtel] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
    
    // Otel finansman detay sayfasına geçerken localStorage'dan otel bilgisini al
    if (page === 'otel-finansman-detay') {
      const otelData = localStorage.getItem('selectedOtel');
      if (otelData) {
        setSelectedOtel(JSON.parse(otelData));
      }
    } else if (page === 'taksit-secenekleri') {
      // Taksit seçenekleri sayfasına geçerken model ve otel bilgilerini al
      const otelData = localStorage.getItem('selectedOtel');
      const modelData = localStorage.getItem('selectedModel');
      if (otelData) {
        setSelectedOtel(JSON.parse(otelData));
      }
      if (modelData) {
        setSelectedModel(JSON.parse(modelData));
      }
    } else {
      setSelectedOtel(null);
      setSelectedModel(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tatil-konumlari':
        return <TatilKonumlari />;
      case 'odeme-planlari':
        return <OdemePlanlari onPageChange={handlePageChange} />;
      case 'oteller':
        return <Oteller />;
      case 'tasarruf-finansman':
        return <TasarrufFinansman onPageChange={handlePageChange} />;
      case 'tatil-finansman-form':
        return <TatilFinansmanForm />;
      case 'profil':
        return <Profil onPageChange={handlePageChange} />;
      case 'otel-finansman-detay':
        return <OtelFinansmanDetay otelData={selectedOtel} onPageChange={handlePageChange} />;
      case 'taksit-secenekleri':
        return <TaksitSecenekleri modelData={selectedModel} otelData={selectedOtel} onPageChange={handlePageChange} />;
      case 'home':
      default:
        return (
          <>
            <Slider />
            <div className="content-section">
              <h1>TatilFinans'a Hoş Geldiniz</h1>
              <p>Türkiye'nin en güzel tatil destinasyonlarını keşfedin ve unutulmaz bir tatil deneyimi yaşayın.</p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} onPageChange={handlePageChange} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} onPageChange={handlePageChange} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      <DraggableContactForm />
    </div>
  );
}

export default App;

