import React from 'react';
import { FiX, FiHome, FiCreditCard, FiMapPin, FiUser, FiInfo, FiHome as FiHomeIcon, FiDollarSign, FiPackage, FiHelpCircle, FiGlobe } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, onPageChange }) => {
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
    
    // Oteller sayfası için özel işlem
    if (section === 'Oteller') {
      if (onPageChange) {
        onPageChange('oteller');
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
    { name: 'Oteller', icon: FiMapPin, action: () => handleMenuClick('Oteller') },
    { name: 'Profil', icon: FiUser, action: () => handleMenuClick('Profil') },
    { name: 'Biz Kimiz', icon: FiInfo, action: () => handleMenuClick('Biz Kimiz') },
    { name: 'Merak Edilenler', icon: FiHelpCircle, action: () => handleMenuClick('Merak Edilenler') },
    { name: 'Fuzul Ev', icon: FiHomeIcon, action: () => handleMenuClick('Fuzul Ev') },
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

