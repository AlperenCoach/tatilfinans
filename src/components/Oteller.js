import React, { useState } from 'react';
import { FiMapPin, FiUsers, FiCalendar, FiSearch, FiChevronRight } from 'react-icons/fi';
import './Oteller.css';

const Oteller = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    dateRange: '',
    guests: '2 Yetişkin, 0 Çocuk'
  });

  const handleSearch = () => {
    console.log('Arama yapılıyor:', searchData);
    // Arama işlemi burada yapılacak
  };

  // Kategori verileri
  const categories = [
    {
      id: 'yurtici',
      title: 'Yurtiçi Otelleri',
      destinations: [
        { id: 1, name: 'Antalya Otelleri', image: '/images/slider1-1.jpg' },
        { id: 2, name: 'Side Otelleri', image: '/images/1.jpg' },
        { id: 3, name: 'Kemer Otelleri', image: '/images/kemer.jpg' },
        { id: 4, name: 'Bodrum Otelleri', image: '/images/bodrum.jpg' },
        { id: 5, name: 'Marmaris Otelleri', image: '/images/3.jpg' },
        { id: 6, name: 'Alanya Otelleri', image: '/images/4.jpg' }
      ],
      exploreText: 'Tüm Yurtiçi Otelleri Keşfedin'
    },
    {
      id: 'kibris',
      title: 'Kıbrıs Otelleri',
      destinations: [
        { id: 1, name: 'Magosa Otelleri', image: '/images/1.jpg' },
        { id: 2, name: 'Girne Otelleri', image: '/images/girne.jpg' },
        { id: 3, name: 'Bafra Otelleri', image: '/images/3.jpg' },
        { id: 4, name: 'Lefkoşa Otelleri', image: '/images/4.jpg' },
        { id: 5, name: 'Kıbrıs Balayı Otelleri', image: '/images/kıbrısbalayı.jpg' },
        { id: 6, name: 'Kıbrıs Uçaklı Paketler', image: '/images/slider1-3.jpg' }
      ],
      exploreText: 'Tüm Kıbrıs Otellerini Keşfedin'
    },
    {
      id: 'sehir',
      title: 'Şehir Otelleri',
      destinations: [
        { id: 1, name: 'İstanbul Otelleri', image: '/images/istanbul.jpg' },
        { id: 2, name: 'Kapadokya Otelleri', image: '/images/kapadokya.jpg' },
        { id: 3, name: 'İzmir Otelleri', image: '/images/izmir.jpg' },
        { id: 4, name: 'Selimiye Otelleri', image: '/images/selimiye.jpg' },
        { id: 5, name: 'Kaş Otelleri', image: '/images/1.jpg' },
        { id: 6, name: 'Akyaka Otelleri', image: '/images/akyaka.jpg' }
      ],
      exploreText: 'Tüm Şehir Otellerini Keşfedin'
    },
    {
      id: 'yurtdisi',
      title: 'Yurtdışı Otelleri',
      destinations: [
        { id: 1, name: 'Amsterdam Otelleri', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop&q=80' },
        { id: 2, name: 'Barselona Otelleri', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop&q=80' },
        { id: 3, name: 'Roma Otelleri', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&h=300&fit=crop&q=80' },
        { id: 4, name: 'Dubai Otelleri', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=80' },
        { id: 5, name: 'Paris Otelleri', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop&q=80' },
        { id: 6, name: 'Prag Otelleri', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop&q=80' }
      ],
      exploreText: 'Tüm Yurtdışı Otelleri Keşfedin'
    }
  ];

  return (
    <div className="oteller-page">
      {/* Hero Section with Search Engine */}
      <section className="hero-section" style={{ backgroundImage: 'url(/images/slider1-1.jpg)' }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Hayalindeki Oteli Faizsiz Taksitle Keşfet</h1>
          
          {/* Arama Kutusu */}
          <div className="search-engine">
            <div className="search-field">
              <label className="search-label">Gidilecek Yer</label>
              <div className="search-input-wrapper">
                <FiMapPin className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Şehir, Bölge veya Otel Adı" 
                  className="search-input"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>
            </div>
            
            <div className="search-field">
              <label className="search-label">Giriş - Çıkış Tarihi</label>
              <div className="search-input-wrapper">
                <FiCalendar className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Tarih Seçiniz" 
                  className="search-input"
                  value={searchData.dateRange}
                  onChange={(e) => setSearchData({...searchData, dateRange: e.target.value})}
                />
              </div>
            </div>
            
            <div className="search-field">
              <label className="search-label">Kişi Sayısı</label>
              <div className="search-input-wrapper">
                <FiUsers className="search-icon" />
                <select 
                  className="search-select"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                >
                  <option>2 Yetişkin, 0 Çocuk</option>
                  <option>1 Yetişkin</option>
                  <option>2 Yetişkin, 1 Çocuk</option>
                  <option>2 Yetişkin, 2 Çocuk</option>
                  <option>3 Yetişkin</option>
                  <option>4 Yetişkin</option>
                </select>
              </div>
            </div>
            
            <button className="search-button" onClick={handleSearch}>
              <FiSearch className="search-button-icon" />
              ARA
            </button>
          </div>
        </div>
      </section>

      {/* Content / SEO Section */}
      <section className="content-seo-section">
        <h2 className="content-seo-title">Tatil Finansman ile Konaklama Ayrıcalığı</h2>
        <div className="content-seo-grid">
          <div className="content-seo-text">
            <p className="content-seo-paragraph">
              Tatil Finansman Modeli ile artık otel rezervasyonlarınız için banka kredisi çekmenize gerek yok. Geleneksel yardımlaşma modelini modern turizmle birleştirerek, "faizsiz" ve "peşinatsız" konaklama imkanı sunuyoruz. Hayalinizdeki tatil destinasyonuna, bütçenize uygun taksit planlarıyla ulaşabilirsiniz.
            </p>
            <p className="content-seo-paragraph">
              Maldivler'den Türkiye'nin en güzel kıyılarına, dünya çapında seçkin otellerden butik konaklama tesislerine kadar geniş bir yelpazede hizmet veriyoruz. Rezervasyon sürecinizde esneklik, ödeme planlarınızda rahatlık ve tatil deneyiminizde unutulmaz anılar garantiliyoruz.
            </p>
          </div>
          <div className="content-seo-text">
            <p className="content-seo-paragraph">
              Sistemimiz sayesinde, önceden belirlenmiş bir ödeme planıyla tatil rezervasyonunuzu yapabilir, taksitlerinizi düzenli olarak ödeyerek hayalinizdeki tatili gerçekleştirebilirsiniz. Faizsiz finansman modelimiz, İslami finans prensiplerine uygun olarak tasarlanmıştır.
            </p>
            <p className="content-seo-paragraph">
              Müşteri hizmetlerimiz 7/24 hizmetinizdedir. Rezervasyon öncesi ve sonrası tüm sorularınız için uzman ekibimizle iletişime geçebilir, size özel çözümler bulabilirsiniz. Tatil planlarınızı ertelemeyin, bugün rezervasyonunuzu yapın ve hayalinizdeki tatili gerçekleştirin.
            </p>
          </div>
        </div>
      </section>

      {/* Kategoriler Bölümü */}
      <section className="categories-section">
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <h2 className="category-title">{category.title}</h2>
              <div className="destinations-grid">
                {category.destinations.map((destination) => (
                  <div key={destination.id} className="destination-card">
                    <div className="destination-image-wrapper">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="destination-image"
                      />
                    </div>
                    <div className="destination-info">
                      <h3 className="destination-title">{destination.name}</h3>
                      <p className="destination-subtitle">{destination.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="explore-button">
                {category.exploreText} <FiChevronRight className="explore-icon" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Oteller;
