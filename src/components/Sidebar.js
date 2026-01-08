import React from 'react';
import { FiX, FiHome, FiCreditCard, FiMapPin, FiUser, FiInfo, FiHome as FiHomeIcon, FiDollarSign, FiPackage, FiHelpCircle, FiGlobe } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, onPageChange, user }) => {
  const handleMenuClick = (section) => {
    console.log(`${section} sayfasına yönlendiriliyor...`);
    
    // Tatil Konumları sayfası için özel işlem
    if (section === 'Tatil Konumları') {
      if (onPageChange) {
        onPageChange('tatil-konumlari');
      }
      closeSidebar();
      return;
    }
    
    // Ürünler Ve Ödeme Planları sayfası için özel işlem
    if (section === 'Ürünler Ve Ödeme Planları') {
      if (onPageChange) {
        onPageChange('odeme-planlari');
      }
      closeSidebar();
      return;
    }
    
    // Tatil Rezervasyonları sayfası için özel işlem
    if (section === 'Tatil Rezervasyonları' || section === 'Oteller') {
      if (onPageChange) {
        onPageChange('oteller');
      }
      closeSidebar();
      return;
    }
    
    // Tasarruf Finansman Modeli Nedir? sayfası için özel işlem
    if (section === 'Tasarruf Finansman Modeli Nedir?') {
      if (onPageChange) {
        onPageChange('tasarruf-finansman');
      }
      closeSidebar();
      return;
    }
    
    // Profil sayfası için özel işlem
    if (section === 'Profil') {
      if (onPageChange) {
        onPageChange('profil');
      }
      closeSidebar();
      return;
    }
    
    // Bakiye sayfası için özel işlem
    if (section === 'Bakiye') {
      if (onPageChange) {
        onPageChange('bakiye');
      }
      closeSidebar();
      return;
    }
    
    // Sıkça Sorulan Sorular sayfası için özel işlem
    if (section === 'Sıkça Sorulan Sorular' || section === 'Merak Edilenler') {
      if (onPageChange) {
        onPageChange('merak-edilenler');
      }
      closeSidebar();
      return;
    }
    
    // Ana Sayfa için özel işlem
    if (section === 'Ana Sayfa') {
      if (onPageChange) {
        onPageChange('home');
      }
      closeSidebar();
      return;
    }
    
    // Diğer sayfalar için alert
    alert(`${section} sayfasına yönlendiriliyor...`);
    closeSidebar();
  };

  const menuItems = [
    { name: 'Ana Sayfa', icon: FiHome, action: () => handleMenuClick('Ana Sayfa') },
    { name: 'Tasarruf Finansman Modeli Nedir?', icon: FiDollarSign, action: () => handleMenuClick('Tasarruf Finansman Modeli Nedir?') },
    { name: 'Ürünler Ve Ödeme Planları', icon: FiPackage, action: () => handleMenuClick('Ürünler Ve Ödeme Planları') },
    { name: 'Tatil Konumları', icon: FiGlobe, action: () => handleMenuClick('Tatil Konumları') },
    { name: 'Tatil Destinasyonları', icon: FiMapPin, action: () => handleMenuClick('Tatil Destinasyonları') },
    { name: 'Profil', icon: FiUser, action: () => handleMenuClick('Profil') },
    ...(user && user.isLoggedIn ? [{ name: 'Bakiye', icon: FiDollarSign, action: () => handleMenuClick('Bakiye') }] : []),
    { name: 'Biz Kimiz', icon: FiInfo, action: () => handleMenuClick('Biz Kimiz') },
    { name: 'S.S.S', icon: FiHelpCircle, action: () => handleMenuClick('Sıkça Sorulan Sorular') },
    
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>TatilFinans</h2>
          <button className="sidebar-close" onClick={closeSidebar}>
            <FiX />
          </button>
        </div>
        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="sidebar-menu-item"
              onClick={item.action}
            >
              <item.icon className="sidebar-icon" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

