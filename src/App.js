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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tatil-konumlari':
        return <TatilKonumlari />;
      case 'odeme-planlari':
        return <OdemePlanlari />;
      case 'oteller':
        return <Oteller />;
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

