import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Images klasöründeki resimler ve içerikleri
  const slides = [
    {
      image: '/images/1.jpg',
      title: 'Maldivler\'de Unutulmaz Bir Tatil',
      description: 'Kristal berraklığında sular ve lüks su üstü oteller',
      slogan: 'Tatil Finansmanı ile Maldivler Tatili Artık Çok Yakın!'
    },
    {
      image: '/images/2.jpg',
      title: 'Egzotik Destinasyonlar',
      description: 'Dünya\'nın en güzel tatil cennetlerini keşfedin',
      slogan: 'Tatil Finansmanı ile Hayalinizdeki Maldivler Tatilini Gerçeğe Dönüştürün'
    },
    {
      image: '/images/3.jpg',
      title: 'Lüks Tatil Deneyimi',
      description: 'Size özel tasarlanmış tatil paketleri'
    },
    {
      image: '/images/4.jpg',
      title: 'Hayalinizdeki Tatil',
      description: 'Unutulmaz anılar biriktirin'
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

