import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ toggleSidebar, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    console.log(`${section} sayfasına yönlendiriliyor...`);
    
    // Tatil Konumları sayfası için özel işlem
    if (section === 'Tatil Konumları') {
      if (onPageChange) {
        onPageChange('tatil-konumlari');
      }
      return;
    }
    
    // Ürünler Ve Ödeme Planları sayfası için özel işlem
    if (section === 'Ürünler Ve Ödeme Planları') {
      if (onPageChange) {
        onPageChange('odeme-planlari');
      }
      return;
    }
    
    // Oteller sayfası için özel işlem
    if (section === 'Oteller') {
      if (onPageChange) {
        onPageChange('oteller');
      }
      return;
    }
    
    // Ana Sayfa için özel işlem
    if (section === 'Ana Sayfa' || section === 'TatilFinans') {
      if (onPageChange) {
        onPageChange('home');
      }
      return;
    }
    
    // Diğer sayfalar için alert (ileride sayfalar eklendiğinde buraya eklenebilir)
    alert(`${section} sayfasına yönlendiriliyor...`);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavClick('Ana Sayfa')} style={{ cursor: 'pointer' }}>
          <h2>TatilFinans</h2>
        </div>
        <ul className="navbar-menu">
          <li><button onClick={() => handleNavClick('Tasarruf Finansman Modeli Nedir?')}>Tasarruf Finansman Modeli Nedir?</button></li>
          <li><button onClick={() => handleNavClick('Ürünler Ve Ödeme Planları')}>Ürünler Ve Ödeme Planları</button></li>
          <li><button onClick={() => handleNavClick('Tatil Konumları')}>Tatil Konumları</button></li>
          <li><button onClick={() => handleNavClick('Oteller')}>Oteller</button></li>
          <li><button onClick={() => handleNavClick('Profil')}>Profil</button></li>
          <li><button onClick={() => handleNavClick('Biz Kimiz')}>Biz Kimiz</button></li>
          <li><button onClick={() => handleNavClick('Merak Edilenler')}>Merak Edilenler</button></li>
          <li><button onClick={() => handleNavClick('Fuzul Ev')}>Fuzul Ev</button></li>
        </ul>
        <button className="navbar-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

