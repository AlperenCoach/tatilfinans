import React from 'react';
import { FiStar, FiWifi, FiCoffee, FiCar, FiUmbrella, FiUsers } from 'react-icons/fi';
import './OdemePlanlari.css';

const OdemePlanlari = () => {
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

  const handleOdemePlani = (otelId, otelName) => {
    console.log(`${otelName} için ödeme planı seçiliyor...`);
    alert(`${otelName} için ödeme planı sayfasına yönlendiriliyor...`);
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
                  <span className="fiyat-tutar">{otel.price}</span>
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
                  onClick={() => handleOdemePlani(otel.id, otel.name)}
                >
                  Ödeme Planını Belirle
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

