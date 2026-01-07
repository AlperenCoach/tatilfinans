import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLogOut } from 'react-icons/fi';
import './Profil.css';
import TatilFinansmanForm from './TatilFinansmanForm';

const Profil = ({ onPageChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [kullaniciBilgileri, setKullaniciBilgileri] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    adres: ''
  });

  const handleFormSubmit = (formData) => {
    // Form gönderildiğinde kullanıcı bilgilerini kaydet
    setKullaniciBilgileri({
      adSoyad: formData.adSoyad,
      email: formData.email,
      telefon: formData.telefon,
      adres: ''
    });
    setShowForm(false);
    alert('Profil bilgileriniz kaydedildi ve başvurunuz alındı!');
  };

  // Eğer form gösterilecekse formu göster
  if (showForm) {
    return <TatilFinansmanForm onFormSubmit={handleFormSubmit} />;
  }

  return (
    <div className="profil-page">
      <div className="page-header">
        <h1>Profil</h1>
        <p>Hesap bilgilerinizi yönetin ve tatil finansmanı başvurusu yapın</p>
      </div>

      <div className="profil-container">
        {!kullaniciBilgileri.adSoyad ? (
          <div className="hesap-olustur-section">
            <div className="hesap-olustur-kart">
              <FiUser className="hesap-icon" />
              <h2>Hesap Oluşturun</h2>
              <p>Tatil finansmanı başvurusu yapmak için önce hesap oluşturmanız gerekiyor.</p>
              <button 
                className="hesap-olustur-btn"
                onClick={() => setShowForm(true)}
              >
                Hesap Oluştur ve Başvur
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="profil-bilgileri">
              <div className="profil-kart">
                <div className="profil-header">
                  <div className="profil-avatar">
                    <FiUser />
                  </div>
                  <h2>{kullaniciBilgileri.adSoyad}</h2>
                  <button className="duzenle-btn">
                    <FiEdit2 />
                    Düzenle
                  </button>
                </div>
                <div className="profil-detaylar">
                  <div className="detay-item">
                    <FiMail className="detay-icon" />
                    <div>
                      <span className="detay-label">E-posta</span>
                      <span className="detay-value">{kullaniciBilgileri.email}</span>
                    </div>
                  </div>
                  <div className="detay-item">
                    <FiPhone className="detay-icon" />
                    <div>
                      <span className="detay-label">Telefon</span>
                      <span className="detay-value">{kullaniciBilgileri.telefon}</span>
                    </div>
                  </div>
                  <div className="detay-item">
                    <FiMapPin className="detay-icon" />
                    <div>
                      <span className="detay-label">Adres</span>
                      <span className="detay-value">{kullaniciBilgileri.adres || 'Belirtilmemiş'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="basvuru-section">
              <div className="basvuru-kart">
                <h3>Tatil Finansmanı Başvurusu</h3>
                <p>Yeni bir tatil finansmanı başvurusu yapmak için aşağıdaki butona tıklayın.</p>
                <button 
                  className="basvuru-btn"
                  onClick={() => setShowForm(true)}
                >
                  Yeni Başvuru Yap
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profil;

