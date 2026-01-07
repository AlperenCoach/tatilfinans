import React, { useState, useEffect } from 'react';
import { FiStar, FiWifi, FiCoffee, FiCar, FiUmbrella, FiUsers } from 'react-icons/fi';
import './OdemePlanlari.css';

const OdemePlanlari = ({ onPageChange }) => {
  // Döviz kurları - gerçek zamanlı
  const [kurBilgileri, setKurBilgileri] = useState({
    usd: 33.50, // USD/TL kuru (varsayılan)
    eur: 36.20  // EUR/TL kuru (varsayılan)
  });

  // Gerçek zamanlı döviz kurlarını çek
  useEffect(() => {
    const kurlariCek = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        const usdToTry = data.rates.TRY || 33.50;
        const eurToUsd = 1 / data.rates.EUR;
        const eurToTry = usdToTry / eurToUsd;
        
        setKurBilgileri({
          usd: usdToTry,
          eur: eurToTry
        });
      } catch (error) {
        console.error('Döviz kurları yüklenirken hata oluştu:', error);
      }
    };

    kurlariCek();
    const interval = setInterval(kurlariCek, 5 * 60 * 1000); // Her 5 dakikada bir güncelle
    
    return () => clearInterval(interval);
  }, []);

  // Fiyat hesaplama fonksiyonu
  const hesaplaFiyatlar = (usdPrice) => {
    const usdAmount = parseFloat(usdPrice.replace('$', '').trim());
    const tlAmount = Math.round(usdAmount * kurBilgileri.usd);
    const eurAmount = (tlAmount / kurBilgileri.eur).toFixed(2);
    return {
      usd: usdAmount,
      tl: tlAmount,
      eur: parseFloat(eurAmount)
    };
  };

  // Sayı formatlama
  const formatPara = (amount, paraBirimi) => {
    if (paraBirimi === 'USD' || paraBirimi === 'EUR') {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // 6 farklı otel - her otelden sadece 1 tane
  const oteller = [
    {
      id: 1,
      name: 'Siyam World',
      image: '/images/siyam.jpg',
      price: '$ 3645',
      nights: '2 Kişi / 5 Gece',
      dateRange: '01.05.2026 / 30.09.2026',
      features: ['Herşey Dahil', 'Deniz Uçağı', 'Ücretsiz İptal'],
      description: 'Dhigurah adasında, Noonu Atolü\'ndeki 1,5 km\'lik resifin üzerinde yer alan Siyam World Maldives, eğlenceli maceraların yer aldığı 54 hektarlık zengin bir doğal adada ada kaçamağı deneyiminin çok ötesinde bir deneyim sunmaktadır.',
      rating: 4.8
    },
    {
      id: 2,
      name: 'RAAYA by Atmosphere',
      image: '/images/raaya.jpg',
      price: '$ 3166',
      nights: '2 Kişi / 4 Gece',
      dateRange: '01.05.2026 / 30.09.2026',
      features: ['Herşey Dahil', 'Deniz Uçağı', 'Ücretsiz İptal'],
      description: 'RAAYA Plan™️, konaklamanızı dünya mutfaklarının en iyileri, premium içecekler, spa ve wellness terapileri, okyanus deneyimleri ve özenle seçilmiş sanatsal dokunuşlarla kusursuz bir şekilde birleştirir.',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Pullman Maldives',
      image: '/images/pullman.jpg',
      price: '$ 4595',
      nights: '2 Kişi / 5 Gece',
      dateRange: '01.04.2026 / 30.09.2026',
      features: ['Herşey Dahil', 'İç Hat Uçuşu + Hız Teknesi', 'Ücretsiz İptal'],
      description: 'Güney Maldivler\'de Gaafu Alifu Atolü\'nde bulunan Pullman Maldives Maamutaa, güzel bir tropik ormanın ve doğal lagünün ortasında hizmet vermektedir.',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Adaaran Prestige Vadoo',
      image: '/images/adaaran.jpg',
      price: '$ 3520',
      nights: '2 Kişi / 4 Gece',
      dateRange: '08.05.2026 / 31.10.2026',
      features: ['Herşey Dahil', 'Hız Teknesi', 'Ücretsiz İptal'],
      description: 'Adaaran Prestige Vadoo, Malé Uluslararası Havalimanı\'na yalnızca 15 dakikalık sürat teknesi yolculuğu ile ulaşılabilen yetişkinlere özel bir adadır.',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Oblu Xperience Ailafushi',
      image: '/images/oblu.jpg',
      price: '$ 2106',
      nights: '2 Kişi / 4 Gece',
      dateRange: '01.05.2026 / 31.10.2026',
      features: ['Herşey Dahil', 'Hız Teknesi', 'Ücretsiz İptal'],
      description: 'OBLU XPERIENCE Ailafushi, değer odaklı tropik ada yaşamını yükseltiyor, eğlenceli tasarım ve akıllı teknoloji. Maldivlerde Dhivehi dilinde \'Aila\' aile, \'Fushi\' ise ada anlamına gelir.',
      rating: 4.5
    },
    {
      id: 6,
      name: 'Mercure Maldives Kooddoo Resort',
      image: '/images/mercure.jpg',
      price: '$ 3895',
      nights: '2 Kişi / 5 Gece',
      dateRange: '01.04.2026 / 30.09.2026',
      features: ['Herşey Dahil', 'İç Hat Uçuşu', 'Ücretsiz İptal'],
      description: 'Tesisin su üzerindeki (43 adet) ve sahil kenarındaki (25 adet) konaklama birimlerinin çoğu nefes kesen gün batımı manzarasına sahiptir. Ayrıca 20 adet villada özel havuz vardır. Göz alıcı renkler eşliğinde şık ve çağdaş bir şekilde dekore edilmiş villalarda USB şarj girişleri, evrensel elektrik prizleri ve ücretsiz Wi-Fi erişimi mevcuttur.',
      rating: 4.4
    }
  ];

  const handleOdemePlani = (otel) => {
    console.log(`${otel.name} için finansman modelleri sayfasına yönlendiriliyor...`);
    if (onPageChange) {
      // Otel bilgilerini localStorage'a kaydet
      localStorage.setItem('selectedOtel', JSON.stringify(otel));
      onPageChange('otel-finansman-detay');
    }
  };

  return (
    <div className="odeme-planlari-page">
      <div className="page-header">
        <h1>Ürünler ve Ödeme Planları</h1>
        <p>Size en uygun tatil paketini seçin ve esnek ödeme planlarından yararlanın</p>
      </div>

      <div className="oteller-container">
        <div className="oteller-grid">
          {oteller.map((otel) => (
            <div key={otel.id} className="otel-kart">
              <div className="otel-resim-container">
                <img src={otel.image} alt={otel.name} className="otel-resim" />
                <div className="otel-rating">
                  <FiStar className="star-icon" />
                  <span>{otel.rating}</span>
                </div>
                <div className="otel-fiyat">
                  {(() => {
                    const fiyatlar = hesaplaFiyatlar(otel.price);
                    return (
                      <div className="fiyat-container">
                        <span className="fiyat-tutar fiyat-tl">{formatPara(fiyatlar.tl, 'TL')} ₺ TL'den başlayan fiyatlarla</span>
                        <span className="fiyat-tutar fiyat-usd">$ {formatPara(fiyatlar.usd, 'USD')}</span>
                        <span className="fiyat-tutar fiyat-eur">€ {formatPara(fiyatlar.eur, 'EUR')}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              <div className="otel-icerik">
                <h3 className="otel-isim">{otel.name}</h3>
                
                <div className="otel-bilgiler">
                  <div className="bilgi-item">
                    <span className="bilgi-label">Konaklama:</span>
                    <span className="bilgi-deger">{otel.nights}</span>
                  </div>
                  <div className="bilgi-item">
                    <span className="bilgi-label">Tarih:</span>
                    <span className="bilgi-deger">{otel.dateRange}</span>
                  </div>
                </div>
                
                <div className="otel-ozellikler">
                  {otel.features.map((feature, index) => (
                    <div key={index} className="ozellik-item">
                      <FiStar className="ozellik-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="otel-aciklama">
                  <p>{otel.description}</p>
                </div>

                <button 
                  className="odeme-plani-btn"
                  onClick={() => handleOdemePlani(otel)}
                >
                  Tatil Finansını Belirle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OdemePlanlari;

