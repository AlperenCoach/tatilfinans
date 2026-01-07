import React, { useState } from 'react';
import { FiUser, FiDollarSign, FiCalendar, FiMapPin, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';
import './TatilFinansmanForm.css';

const TatilFinansmanForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    adSoyad: '',
    telefon: '',
    email: '',
    aylikGelir: '',
    tatilPaketi: 'maldivler',
    tutar: 50000,
    vade: 12,
    meslek: '',
    yas: ''
  });

  const [hesaplamaYapildi, setHesaplamaYapildi] = useState(false);
  const [oneri, setOneri] = useState(null);

  const tatilPaketleri = [
    { value: 'maldivler', label: 'Maldivler Paketi', icon: '🏝️' },
    { value: 'egzotik', label: 'Egzotik Destinasyonlar', icon: '🌴' },
    { value: 'lüks', label: 'Lüks Tatil Paketi', icon: '⭐' },
    { value: 'aile', label: 'Aile Paketi', icon: '👨‍👩‍👧‍👦' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      vade: parseInt(e.target.value)
    }));
  };

  const handleTutarChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    setFormData(prev => ({
      ...prev,
      tutar: value ? parseInt(value) : 0
    }));
  };

  const formatTutar = (tutar) => {
    return new Intl.NumberFormat('tr-TR').format(tutar);
  };

  const hesapla = () => {
    const { aylikGelir, tutar, vade } = formData;
    
    if (!aylikGelir || !tutar || !vade) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    const aylikGelirNum = parseInt(aylikGelir.replace(/[^\d]/g, ''));
    const tutarNum = parseInt(tutar);
    const vadeNum = parseInt(vade);

    // Aylık ödeme hesaplama (basit formül)
    const aylikOdeme = Math.round(tutarNum / vadeNum);
    const gelirOrani = (aylikOdeme / aylikGelirNum) * 100;

    // Öneri belirleme
    let oneriDurum = '';
    let oneriMesaj = '';
    let oneriRenk = '';

    if (gelirOrani <= 20) {
      oneriDurum = 'Uygun';
      oneriMesaj = 'Bu paket bütçenize çok uygun! Hemen başvurabilirsiniz.';
      oneriRenk = '#28a745';
    } else if (gelirOrani <= 35) {
      oneriDurum = 'Orta';
      oneriMesaj = 'Bu paket bütçenize uygun. Vadeyi uzatarak daha rahat ödeyebilirsiniz.';
      oneriRenk = '#ffc107';
    } else {
      oneriDurum = 'Dikkat';
      oneriMesaj = 'Bu paket bütçenizi zorlayabilir. Daha düşük tutarlı paketleri değerlendirebilirsiniz.';
      oneriRenk = '#dc3545';
    }

    setOneri({
      aylikOdeme,
      gelirOrani: gelirOrani.toFixed(1),
      durum: oneriDurum,
      mesaj: oneriMesaj,
      renk: oneriRenk
    });

    setHesaplamaYapildi(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form gönderildi:', formData);
    
    if (onFormSubmit) {
      onFormSubmit(formData);
    } else {
      alert('Başvurunuz alındı! En kısa sürede size dönüş yapacağız.');
    }
  };

  return (
    <div className="tatil-finansman-form-page">
      <div className="form-page-header">
        <h1>Tatil Finansmanı Başvuru Formu</h1>
        <p>Hayalinizdeki tatili gerçekleştirmek için başvurunuzu tamamlayın</p>
      </div>

      <div className="form-container-wrapper">
        <div className="promo-section">
          <div className="promo-banner">
            <FiClock className="promo-icon" />
            <span>VAKİT KAYBETMEYİN!</span>
          </div>
          <div className="promo-content">
            <p className="promo-text">
              En yakın şubemizde size özel ödeme yöntemiyle hayalinizdeki tatil paketine sahip olun.
            </p>
            <p className="promo-urgency">
              Aylık kontenjanımız dolmak üzere...
            </p>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}>
                  <span className="progress-label">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hesaplama-section">
          <h2 className="hesaplama-baslik">Tatil Finansmanı Hesaplama Aracı</h2>
          
          <div className="paket-selector">
            {tatilPaketleri.map((paket) => (
              <button
                key={paket.value}
                className={`paket-btn ${formData.tatilPaketi === paket.value ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tatilPaketi: paket.value }))}
              >
                <span className="paket-icon">{paket.icon}</span>
                <span>{paket.label}</span>
              </button>
            ))}
          </div>

          <div className="tutar-input-wrapper">
            <div className="input-icon-wrapper">
              <FiMapPin className="input-icon" />
            </div>
            <input
              type="text"
              className="tutar-input"
              value={formatTutar(formData.tutar)}
              onChange={handleTutarChange}
              placeholder="Tutar girin"
            />
            <span className="tutar-suffix">TL</span>
          </div>

          <div className="vade-slider-wrapper">
            <div className="vade-labels">
              <span>12 Ay</span>
              <span className="selected-vade" style={{ 
                left: `${((formData.vade - 12) / (60 - 12)) * 100}%` 
              }}>
                {formData.vade} Ay Vade
              </span>
              <span>60 Ay</span>
            </div>
            <input
              type="range"
              min="12"
              max="60"
              step="6"
              value={formData.vade}
              onChange={handleSliderChange}
              className="vade-slider"
              style={{
                '--slider-progress': `${((formData.vade - 12) / (60 - 12)) * 100}%`
              }}
            />
          </div>

          <button className="hesapla-btn" onClick={hesapla}>
            Hesapla
          </button>

          {hesaplamaYapildi && oneri && (
            <div className="oneri-kutusu" style={{ borderColor: oneri.renk }}>
              <div className="oneri-header" style={{ background: oneri.renk }}>
                <h3>Öneri: {oneri.durum}</h3>
              </div>
              <div className="oneri-icerik">
                <div className="oneri-satir">
                  <span>Aylık Ödeme:</span>
                  <strong>{formatTutar(oneri.aylikOdeme)} TL</strong>
                </div>
                <div className="oneri-satir">
                  <span>Gelir Oranı:</span>
                  <strong>%{oneri.gelirOrani}</strong>
                </div>
                <p className="oneri-mesaj">{oneri.mesaj}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2 className="form-baslik">Kişisel Bilgiler</h2>
        <form onSubmit={handleSubmit} className="basvuru-formu">
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FiUser className="form-icon" />
                Ad Soyad
              </label>
              <input
                type="text"
                name="adSoyad"
                value={formData.adSoyad}
                onChange={handleInputChange}
                required
                placeholder="Adınız ve soyadınız"
              />
            </div>

            <div className="form-group">
              <label>
                <FiDollarSign className="form-icon" />
                Aylık Gelir
              </label>
              <input
                type="text"
                name="aylikGelir"
                value={formatTutar(formData.aylikGelir)}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d]/g, '');
                  setFormData(prev => ({ ...prev, aylikGelir: value }));
                }}
                required
                placeholder="Aylık geliriniz"
              />
            </div>

            <div className="form-group">
              <label>
                <FiCalendar className="form-icon" />
                Telefon
              </label>
              <input
                type="tel"
                name="telefon"
                value={formData.telefon}
                onChange={handleInputChange}
                required
                placeholder="05XX XXX XX XX"
              />
            </div>

            <div className="form-group">
              <label>
                <FiUser className="form-icon" />
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="ornek@email.com"
              />
            </div>

            <div className="form-group">
              <label>
                <FiUser className="form-icon" />
                Meslek
              </label>
              <input
                type="text"
                name="meslek"
                value={formData.meslek}
                onChange={handleInputChange}
                required
                placeholder="Mesleğiniz"
              />
            </div>

            <div className="form-group">
              <label>
                <FiCalendar className="form-icon" />
                Yaş
              </label>
              <input
                type="number"
                name="yas"
                value={formData.yas}
                onChange={handleInputChange}
                required
                min="18"
                max="100"
                placeholder="Yaşınız"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            <FiCheckCircle className="submit-icon" />
            Başvuruyu Tamamla
          </button>
        </form>
      </div>
    </div>
  );
};

export default TatilFinansmanForm;

