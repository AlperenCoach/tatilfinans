import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Images klasöründeki slider resimleri ve içerikleri
  const slides = [
    {
      image: '/images/slider1-1.jpg',
      title: 'Tatil Finansmanı ile Ödeme Kolaylığı',
      description: 'Kristal berraklığında sular ve lüks su üstü oteller',
      slogan: 'Tatil Finansmanı ile Ödeme Kolaylığı'
    },
    {
      image: '/images/slider1-2.jpeg',
      title: 'Planınız Tatil Finansla',
      description: 'Dünya\'nın en güzel tatil cennetlerini keşfedin',
      slogan: 'Planınız Tatil Finansla'
    },
    {
      image: '/images/slider1-4.jpeg',
      title: 'Tatil Finansmanı ile Ödeme Kolaylığı',
      description: 'Unutulmaz anılar biriktirin',
      slogan: 'Tatil Finansmanı ile Ödeme Kolaylığı'
    },
    {
      image: '/images/slider1-5.jpeg',
      title: 'Faizsiz Taksit İmkanı',
      description: 'Bütçenize uygun ödeme planlarıyla hayalinizdeki tatili gerçekleştirin',
      slogan: 'Faizsiz Taksit İmkanı'
    },
    {
      image: '/images/slider1-6.jpg',
      title: 'Dünya\'nın En Güzel Yerleri',
      description: 'Maldivler\'den Paris\'e, her bütçeye uygun seçenekler',
      slogan: 'Dünya\'nın En Güzel Yerleri'
    },
    {
      image: '/images/slider1-7.jpg',
      title: 'Deniz, Kum, Güneş',
      description: 'Ege ve Akdeniz\'in eşsiz kıyılarında unutulmaz tatiller',
      slogan: 'Deniz, Kum, Güneş'
    },
    {
      image: '/images/slider1-10.jpeg',
      title: 'Güvenli Rezervasyon',
      description: 'Tüm rezervasyonlarınız güvence altında, esnek iptal seçenekleri',
      slogan: 'Güvenli Rezervasyon'
    },
    {
      image: '/images/slider1-12.jpeg',
      title: 'Geniş Destinasyon Seçenekleri',
      description: 'Yurt içi ve yurt dışı birçok destinasyonda unutulmaz tatil deneyimleri',
      slogan: 'Geniş Destinasyon Seçenekleri'
    },
    {
      image: '/images/slider1-13.jpeg',
      title: 'Esnek Ödeme Planları',
      description: 'Bütçenize uygun taksit seçenekleriyle tatil planlarınızı kolaylaştırın',
      slogan: 'Esnek Ödeme Planları'
    },
    {
      image: '/images/slider1-14.jpeg',
      title: 'Premium Konaklama',
      description: 'Lüks otellerden butik tesislere kadar geniş konaklama seçenekleri',
      slogan: 'Premium Konaklama'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-description">{slide.description}</p>
              {slide.slogan && <p className="slide-slogan">{slide.slogan}</p>}
            </div>
          </div>
        ))}
        <button className="slider-button prev" onClick={goToPrevious}>
          <FiChevronLeft />
        </button>
        <button className="slider-button next" onClick={goToNext}>
          <FiChevronRight />
        </button>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

