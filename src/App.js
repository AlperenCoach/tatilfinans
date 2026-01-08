import React, { useState, useEffect } from 'react';
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
import Bakiye from './components/Bakiye';
import MerakEdilenler from './components/MerakEdilenler';
import Istatistikler from './components/Istatistikler';
import AIChatBubble from './components/AIChatBubble';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedOtel, setSelectedOtel] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [user, setUser] = useState(null);

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgisini yükle
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // URL'den sayfa bilgisini oku
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Hash'ten sayfa adını çıkar (query parametrelerini veya ekstra bilgileri yok say)
      const pageName = hash.split('?')[0].split('-')[0] === 'taksit' ? 'taksit-secenekleri' : 
                       hash.split('?')[0].split('-')[0] === 'otel' && hash.includes('finansman') ? 'otel-finansman-detay' :
                       hash.split('?')[0];
      
      // Eğer hash sadece sayı veya "ay" içeriyorsa, taksit-secenekleri sayfasında olduğumuzu varsay
      if (/^\d+-?ay?$/.test(hash) || hash.includes('taksit')) {
        setCurrentPage('taksit-secenekleri');
        const otelData = localStorage.getItem('selectedOtel');
        const modelData = localStorage.getItem('selectedModel');
        if (otelData) {
          setSelectedOtel(JSON.parse(otelData));
        }
        if (modelData) {
          setSelectedModel(JSON.parse(modelData));
        }
      } else {
        setCurrentPage(pageName);
        // Otel finansman detay veya taksit seçenekleri sayfasıysa localStorage'dan verileri yükle
        if (pageName === 'otel-finansman-detay') {
          const otelData = localStorage.getItem('selectedOtel');
          if (otelData) {
            setSelectedOtel(JSON.parse(otelData));
          }
        } else if (pageName === 'taksit-secenekleri') {
          const otelData = localStorage.getItem('selectedOtel');
          const modelData = localStorage.getItem('selectedModel');
          if (otelData) {
            setSelectedOtel(JSON.parse(otelData));
          }
          if (modelData) {
            setSelectedModel(JSON.parse(modelData));
          }
        }
      }
    } else {
      // Hash yoksa home sayfasını ayarla ve URL'yi güncelle
      setCurrentPage('home');
      window.history.replaceState({ page: 'home' }, '', window.location.pathname);
    }

    // Tarayıcı ileri/geri tuşlarını dinle
    const handlePopState = (event) => {
      const hash = window.location.hash.replace('#', '');
      // Hash'ten sayfa adını çıkar (query parametrelerini veya ekstra bilgileri yok say)
      const pageName = hash.split('?')[0].split('-')[0] === 'taksit' ? 'taksit-secenekleri' : 
                       hash.split('?')[0].split('-')[0] === 'otel' && hash.includes('finansman') ? 'otel-finansman-detay' :
                       hash.split('?')[0];
      
      if (pageName && pageName !== '') {
        // Eğer hash sadece sayı veya "ay" içeriyorsa, taksit-secenekleri sayfasında olduğumuzu varsay
        if (/^\d+-?ay?$/.test(hash) || hash.includes('taksit')) {
          setCurrentPage('taksit-secenekleri');
          const otelData = localStorage.getItem('selectedOtel');
          const modelData = localStorage.getItem('selectedModel');
          if (otelData) {
            setSelectedOtel(JSON.parse(otelData));
          }
          if (modelData) {
            setSelectedModel(JSON.parse(modelData));
          }
        } else {
          setCurrentPage(pageName);
          // Otel finansman detay veya taksit seçenekleri sayfasıysa localStorage'dan verileri yükle
          if (pageName === 'otel-finansman-detay') {
            const otelData = localStorage.getItem('selectedOtel');
            if (otelData) {
              setSelectedOtel(JSON.parse(otelData));
            }
          } else if (pageName === 'taksit-secenekleri') {
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
        }
      } else {
        setCurrentPage('home');
        setSelectedOtel(null);
        setSelectedModel(null);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (userData) => {
    const userWithLogin = { ...userData, isLoggedIn: true };
    setUser(userWithLogin);
    localStorage.setItem('user', JSON.stringify(userWithLogin));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
    
    // URL'yi güncelle (tarayıcı geçmişine ekle)
    if (page === 'home') {
      window.history.pushState({ page: 'home' }, '', window.location.pathname);
    } else {
      window.history.pushState({ page }, '', `#${page}`);
    }
    
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
        return <TaksitSecenekleri modelData={selectedModel} otelData={selectedOtel} onPageChange={handlePageChange} user={user} />;
      case 'bakiye':
        return <Bakiye onPageChange={handlePageChange} user={user} onLogin={handleLogin} onLogout={handleLogout} />;
      case 'merak-edilenler':
        return <MerakEdilenler />;
      case 'home':
      default:
        return (
          <>
            <Slider />
            <div className="content-section">
              <h1>TatilFinans'a Hoş Geldiniz</h1>
              <p>Dünya'nın en güzel tatil destinasyonlarını keşfedin ve unutulmaz bir tatil deneyimi yaşayın.</p>
            </div>
            <Istatistikler />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} onPageChange={handlePageChange} user={user} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} onPageChange={handlePageChange} user={user} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      <DraggableContactForm />
      <AIChatBubble />
    </div>
  );
}

export default App;

