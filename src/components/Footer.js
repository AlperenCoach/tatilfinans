import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>TatilFinans</h3>
          <p>Türkiye'nin en güzel tatil destinasyonlarını keşfedin ve unutulmaz bir tatil deneyimi yaşayın. Size en iyi hizmeti sunmak için buradayız.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Hızlı Linkler</h4>
          <ul>
            <li><a href="#home">Ana Sayfa</a></li>
            <li><a href="#hotels">Oteller</a></li>
            <li><a href="#payment">Ödeme Planları</a></li>
            <li><a href="#about">Biz Kimiz</a></li>
            <li><a href="#profile">Profil</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Hizmetlerimiz</h4>
          <ul>
            <li><a href="#services">Otel Rezervasyonu</a></li>
            <li><a href="#services">Tatil Paketleri</a></li>
            <li><a href="#services">Transfer Hizmetleri</a></li>
            <li><a href="#services">Tur Rehberliği</a></li>
            <li><a href="#services">VIP Hizmetler</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>İletişim</h4>
          <ul className="contact-info">
            <li>
              <FiMapPin className="contact-icon" />
              <span>İstanbul, Türkiye, Turizm Caddesi No:123</span>
            </li>
            <li>
              <FiPhone className="contact-icon" />
              <span>+90 212 123 45 67</span>
            </li>
            <li>
              <FiMail className="contact-icon" />
              <span>info@tatilfinans.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2026 TatilFinans. Tüm hakları saklıdır.</p>
          <div className="footer-links">
            <a href="#privacy">Gizlilik Politikası</a>
            <a href="#terms">Kullanım Şartları</a>
            <a href="#cookies">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

