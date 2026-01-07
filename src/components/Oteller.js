import React from 'react';
import { FiStar, FiMapPin, FiCoffee, FiWifi, FiUmbrella, FiUsers, FiCalendar, FiDollarSign } from 'react-icons/fi';
import './Oteller.css';

const Oteller = () => {
  // OdemePlanlari sayfasındaki oteller
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
      rating: 4.8,
      location: 'Noonu Atolü, Maldivler',
      amenities: ['Spa & Wellness', 'Dalış Merkezi', 'Çocuk Kulübü', 'Restoranlar', 'Bar & Lounge', 'Fitness Center'],
      roomTypes: ['Su Üstü Villa', 'Plaj Villası', 'Aile Villası']
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
      rating: 4.9,
      location: 'Raa Atolü, Maldivler',
      amenities: ['Spa & Wellness', 'Sualtı Restoran', 'Sanat Galerisi', 'Premium Bar', 'Yoga Stüdyosu', 'Özel Plaj'],
      roomTypes: ['Su Üstü Villa', 'Plaj Suites', 'Presidential Villa']
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
      rating: 4.7,
      location: 'Gaafu Alifu Atolü, Maldivler',
      amenities: ['Spa & Wellness', 'Tropik Orman Yürüyüşü', 'Lagün Aktiviteleri', 'Fine Dining', 'Wine Bar', 'Fitness'],
      roomTypes: ['Lagün Villası', 'Plaj Villası', 'Su Üstü Villa']
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
      rating: 4.6,
      location: 'North Male Atolü, Maldivler',
      amenities: ['Spa & Wellness', 'Dalış Merkezi', 'Yetişkinlere Özel', 'Restoran', 'Bar', 'Sualtı Restoran'],
      roomTypes: ['Su Üstü Villa', 'Plaj Villası']
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
      rating: 4.5,
      location: 'North Male Atolü, Maldivler',
      amenities: ['Spa & Wellness', 'Eğlence Aktiviteleri', 'Restoranlar', 'Bar', 'Dalış', 'Su Sporları'],
      roomTypes: ['Plaj Villası', 'Su Üstü Villa', 'Aile Villası']
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
      rating: 4.4,
      location: 'Gaafu Dhaalu Atolü, Maldivler',
      amenities: ['Spa & Wellness', 'Özel Havuzlu Villalar', 'Gün Batımı Manzarası', 'Restoranlar', 'Bar', 'Fitness'],
      roomTypes: ['Su Üstü Villa', 'Plaj Villası', 'Havuzlu Villa']
    }
  ];

  return (
    <div className="oteller-page">
      <div className="page-header">
        <h1>Oteller</h1>
        <p>Maldivler'in en lüks ve konforlu otellerini keşfedin</p>
      </div>

      <div className="oteller-container">
        <div className="oteller-grid">
          {oteller.map((otel) => (
            <div key={otel.id} className="otel-kart-detay">
              <div className="otel-resim-wrapper">
                <img src={otel.image} alt={otel.name} className="otel-resim-detay" />
                <div className="otel-rating-badge">
                  <FiStar className="star-icon-filled" />
                  <span>{otel.rating}</span>
                </div>
                <div className="otel-fiyat-badge">
                  <span className="fiyat-sembol">$</span>
                  <span className="fiyat-rakam">{otel.price.replace('$ ', '')}</span>
                </div>
              </div>

              <div className="otel-detay-icerik">
                <div className="otel-baslik-bolumu">
                  <h2 className="otel-isim-detay">{otel.name}</h2>
                  <div className="otel-konum">
                    <FiMapPin className="konum-icon" />
                    <span>{otel.location}</span>
                  </div>
                </div>

                <div className="otel-bilgi-kutulari">
                  <div className="bilgi-kutu">
                    <FiUsers className="bilgi-icon" />
                    <div>
                      <span className="bilgi-label">Konaklama</span>
                      <span className="bilgi-value">{otel.nights}</span>
                    </div>
                  </div>
                  <div className="bilgi-kutu">
                    <FiCalendar className="bilgi-icon" />
                    <div>
                      <span className="bilgi-label">Tarih Aralığı</span>
                      <span className="bilgi-value-small">{otel.dateRange}</span>
                    </div>
                  </div>
                  <div className="bilgi-kutu">
                    <FiDollarSign className="bilgi-icon" />
                    <div>
                      <span className="bilgi-label">Fiyat</span>
                      <span className="bilgi-value">{otel.price}</span>
                    </div>
                  </div>
                </div>

                <div className="otel-ozellikler-detay">
                  <h3>Özellikler</h3>
                  <div className="ozellikler-grid">
                    {otel.features.map((feature, index) => (
                      <div key={index} className="ozellik-badge">
                        <FiStar className="ozellik-star" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="otel-amenities">
                  <h3>Otel Olanakları</h3>
                  <div className="amenities-list">
                    {otel.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <FiCoffee className="amenity-icon" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="otel-oda-tipleri">
                  <h3>Oda Tipleri</h3>
                  <div className="oda-tipleri-list">
                    {otel.roomTypes.map((room, index) => (
                      <div key={index} className="oda-tipi-badge">
                        {room}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="otel-aciklama-detay">
                  <p>{otel.description}</p>
                </div>

                <button className="rezervasyon-btn">
                  Rezervasyon Yap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Oteller;

