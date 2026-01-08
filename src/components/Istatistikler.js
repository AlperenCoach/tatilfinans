import React, { useState, useEffect, useRef } from 'react';
import { FiCalendar, FiSmile, FiHome } from 'react-icons/fi';
import { WiDayHaze } from 'react-icons/wi';
import './Istatistikler.css';

const Istatistikler = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Sayfa yüklendiğinde kısa bir gecikme ile animasyonu başlat
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Ayrıca Intersection Observer da ekle (scroll için)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const istatistikler = [
    {
      id: 1,
      icon: FiCalendar,
      sayi: 15,
      metin: 'yıldır TatilFinans olarak hizmet vermekteyiz',
      animasyonHizi: 'yavas' // 1'den başlayıp yavaşça artacak
    },
    {
      id: 2,
      icon: FiSmile,
      sayi: 150, // Test için küçük sayı - animasyonu görmek için
      metin: 'mutlu aile',
      animasyonHizi: 'hizli' // Hızlı animasyon
    },
    {
      id: 3,
      icon: FiHome,
      sayi: 20,
      metin: 'otel',
      animasyonHizi: 'normal'
    },
    {
      id: 4,
      icon: WiDayHaze,
      sayi: 250, // Test için küçük sayı - animasyonu görmek için
      metin: 'harika tatil',
      animasyonHizi: 'normal'
    }
  ];

  return (
    <div className="istatistikler-section" ref={sectionRef}>
      <div className="c-info-box__wrapper c-info-box__wrapper-rounded animation-numbers">
        {istatistikler.map((istatistik) => (
          <IstatistikKart
            key={istatistik.id}
            icon={istatistik.icon}
            hedefSayi={istatistik.sayi}
            metin={istatistik.metin}
            animasyonHizi={istatistik.animasyonHizi}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

const IstatistikKart = ({ icon: Icon, hedefSayi, metin, animasyonHizi, isVisible }) => {
  // Yavaş animasyon için 1'den başla, diğerleri için 0'dan
  const baslangicSayi = animasyonHizi === 'yavas' ? 1 : 0;
  const [sayi, setSayi] = useState(baslangicSayi);
  const [basladi, setBasladi] = useState(false);

  useEffect(() => {
    if (isVisible && !basladi) {
      setBasladi(true);
      
      let suresi;
      let adimSayisi;
      
      if (animasyonHizi === 'yavas') {
        suresi = 3000; // 3 saniye - yavaş animasyon (daha görünür)
        adimSayisi = 60; // Daha az adım = daha belirgin artış
      } else if (animasyonHizi === 'hizli') {
        suresi = 2000; // 2 saniye - hızlı animasyon (görünür)
        adimSayisi = 80; // Çok adım = hızlı ama görünür
      } else {
        suresi = 2500; // 2.5 saniye - normal animasyon (görünür)
        adimSayisi = 60;
      }

      const fark = hedefSayi - baslangicSayi;
      const artis = fark / adimSayisi;
      const adimSuresi = suresi / adimSayisi;

      let mevcutSayi = baslangicSayi;
      let frameId;
      let startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / suresi, 1);
        
        // Ease-out animasyon fonksiyonu
        const easeOut = 1 - Math.pow(1 - progress, 3);
        mevcutSayi = baslangicSayi + (fark * easeOut);
        
        if (progress >= 1) {
          setSayi(hedefSayi);
        } else {
          setSayi(Math.floor(mevcutSayi));
          frameId = requestAnimationFrame(animate);
        }
      };
      
      frameId = requestAnimationFrame(animate);
      
      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    }
  }, [isVisible, basladi, hedefSayi, animasyonHizi, baslangicSayi]);

  const formatSayi = (num) => {
    if (num >= 1000) {
      return new Intl.NumberFormat('tr-TR').format(num);
    }
    return num.toString();
  };

  return (
    <div className="istatistik-kart">
      <div className="istatistik-icon-wrapper">
        <Icon className="istatistik-icon" />
      </div>
      <div className="istatistik-sayi">
        {formatSayi(sayi)}
        {hedefSayi >= 1000 && <span className="sayi-birim">+</span>}
      </div>
      <div className="istatistik-metin">{metin}</div>
    </div>
  );
};

export default Istatistikler;

