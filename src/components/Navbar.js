import React, { useState } from 'react';
import { FiMenu, FiX, FiPhone, FiGlobe, FiDollarSign } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ toggleSidebar, onPageChange, user }) => {
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
    
    // Tatil Rezervasyonları sayfası için özel işlem
    if (section === 'Tatil Rezervasyonları' || section === 'Oteller') {
      if (onPageChange) {
        onPageChange('oteller');
      }
      return;
    }
    
    // Tasarruf Finansman Modeli Nedir? sayfası için özel işlem
    if (section === 'Tasarruf Finansman Modeli Nedir?') {
      if (onPageChange) {
        onPageChange('tasarruf-finansman');
      }
      return;
    }
    
    // Profil sayfası için özel işlem
    if (section === 'Profil') {
      if (onPageChange) {
        onPageChange('profil');
      }
      return;
    }
    
    // Bakiye sayfası için özel işlem
    if (section === 'Bakiye') {
      if (onPageChange) {
        onPageChange('bakiye');
      }
      return;
    }
    
    // Sıkça Sorulan Sorular sayfası için özel işlem
    if (section === 'Sıkça Sorulan Sorular' || section === 'Merak Edilenler') {
      if (onPageChange) {
        onPageChange('merak-edilenler');
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
          <li><button onClick={() => handleNavClick('Biz Kimiz')}>Biz Kimiz</button></li>
          <li><button onClick={() => handleNavClick('Tasarruf Finansman Modeli Nedir?')}>Tasarruf Finansman Modeli Nedir?</button></li>
          <li><button onClick={() => handleNavClick('Ürünler Ve Ödeme Planları')}>Ürünler Ve Ödeme Planları</button></li>
          <li><button onClick={() => handleNavClick('Tatil Konumları')}>Tatil Konumları</button></li>
          <li><button onClick={() => handleNavClick('Tatil Rezervasyonları')}>Tatil Planları</button></li>
          <li><button onClick={() => handleNavClick('Profil')}>Profil</button></li>
          <li><button onClick={() => handleNavClick('Sıkça Sorulan Sorular')}>S.S.S</button></li>
          
        </ul>
        <div className="navbar-right">
          {user && user.isLoggedIn && (
            <button 
              onClick={() => handleNavClick('Bakiye')} 
              className="navbar-bakiye"
              title="Bakiye"
            >
              <FiDollarSign className="bakiye-icon" />
              <span>Bakiye</span>
            </button>
          )}
          <div className="navbar-contact-group">
            <a href="tel:4446313" className="navbar-phone">
              <FiPhone className="phone-icon" />
              <span>444 00 73</span>
            </a>
            <a href="#" className="navbar-online-sub">
              <FiGlobe className="online-icon" />
              <span>Online Şube</span>
            </a>
          </div>
          <button className="navbar-toggle" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

