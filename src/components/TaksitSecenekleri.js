import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import './TaksitSecenekleri.css';

const TaksitSecenekleri = ({ modelData, otelData, onPageChange }) => {
  const [finansmanTutari, setFinansmanTutari] = useState(0);
  const [kurBilgileri, setKurBilgileri] = useState({ usd: 33.50, eur: 36.20 });
  const [seciliParaBirimi, setSeciliParaBirimi] = useState('TL');
  const [seciliVade, setSeciliVade] = useState(null);
  const [aylikOdeme, setAylikOdeme] = useState(0);

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
        // localStorage'dan kur bilgilerini al (fallback)
        const savedKurBilgileri = localStorage.getItem('kurBilgileri');
        if (savedKurBilgileri) {
          setKurBilgileri(JSON.parse(savedKurBilgileri));
        }
      }
    };

    kurlariCek();
    const interval = setInterval(kurlariCek, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // localStorage'dan para birimi bilgisini al
    const savedParaBirimi = localStorage.getItem('selectedParaBirimi');
    
    if (savedParaBirimi) {
      setSeciliParaBirimi(savedParaBirimi);
    }

    if (otelData && otelData.price) {
      // Dolar fiyatını parse et
      const dollarAmount = parseFloat(otelData.price.replace('$', '').trim());
      // TL cinsinden toplam tutarı hesapla
      const tlAmount = Math.round(dollarAmount * kurBilgileri.usd);
      setFinansmanTutari(tlAmount);
    }
  }, [otelData, kurBilgileri]);

  // Para birimine göre tutarı hesapla
  const paraBirimineGoreTutar = (tlTutar, paraBirimi) => {
    switch (paraBirimi) {
      case 'USD':
        return tlTutar / kurBilgileri.usd;
      case 'EUR':
        return tlTutar / kurBilgileri.eur;
      default:
        return tlTutar;
    }
  };

  // Para birimi sembolü
  const paraBirimiSembolu = (paraBirimi) => {
    switch (paraBirimi) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return '₺';
    }
  };

  // 3 segment - her zaman 12, 24, 36 ay
  const taksitSecenekleri = [
    {
      id: 1,
      numara: '01',
      baslik: '12 Ay Vade Seçenekleri',
      aciklama: 'Tatil kampanyalarında 12 ay vade imkanı sağlanabilmektedir.',
      vade: 12,
      vadeSecenekleri: [
        { vade: 12, aylikOdeme: Math.round(finansmanTutari / 12) }
      ]
    },
    {
      id: 2,
      numara: '02',
      baslik: '24 Ay Vade Seçenekleri',
      aciklama: 'Bu model ile herhangi bir çekilişe katılmadan teslimat tarihinizi önceden bilirsiniz.',
      vade: 24,
      vadeSecenekleri: [
        { vade: 24, aylikOdeme: Math.round(finansmanTutari / 24) }
      ]
    },
    {
      id: 3,
      numara: '03',
      baslik: '36 Ay Vade Seçenekleri',
      aciklama: 'Bireysel finansman modeli ile bütçenize uygun taksitlerle hayalinizdeki tatili gerçekleştirebilirsiniz.',
      vade: 36,
      vadeSecenekleri: [
        { vade: 36, aylikOdeme: Math.round(finansmanTutari / 36) }
      ]
    }
  ];

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

  const formatTL = (amount) => {
    return new Intl.NumberFormat('tr-TR').format(amount);
  };

  const handleTaksitSec = (vade, aylikOdemeTutar) => {
    setSeciliVade(vade);
    setAylikOdeme(aylikOdemeTutar);
    // URL hash'ini güncelle
    window.location.hash = `${vade}-ay`;
    // Sayfayı tablo görünümüne kaydır
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // URL hash'inden vade bilgisini oku (sayfa yüklendiğinde)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !seciliVade) {
      const vadeMatch = hash.match(/(\d+)-ay/);
      if (vadeMatch) {
        const vade = parseInt(vadeMatch[1]);
        const aylikOdemeTutar = Math.round(finansmanTutari / vade);
        if (finansmanTutari > 0) {
          setSeciliVade(vade);
          setAylikOdeme(aylikOdemeTutar);
        }
      }
    }
  }, [finansmanTutari, seciliVade]);

  // Taksit tablosu için veri oluştur
  const taksitTablosuOlustur = () => {
    if (!seciliVade || !aylikOdeme) return [];

    const taksitler = [];
    let kalanBakiye = finansmanTutari;
    const bugun = new Date();

    for (let i = 1; i <= seciliVade; i++) {
      const taksitTarihi = new Date(bugun);
      taksitTarihi.setMonth(bugun.getMonth() + i);
      
      // Son taksitte kalan bakiyeyi öde (yuvarlama hatalarını düzeltmek için)
      let taksitTutari;
      if (i === seciliVade) {
        taksitTutari = kalanBakiye; // Son taksitte kalan tüm bakiye
      } else {
        taksitTutari = aylikOdeme;
      }
      
      kalanBakiye -= taksitTutari;
      kalanBakiye = Math.max(0, Math.round(kalanBakiye)); // Negatif olmaması için

      taksitler.push({
        taksitNo: i,
        tarih: taksitTarihi,
        tutar: Math.round(taksitTutari),
        kalanBakiye: Math.max(0, Math.round(kalanBakiye))
      });
    }

    return taksitler;
  };

  const taksitler = taksitTablosuOlustur();

  const handleAraOdeme = () => {
    alert('Ara ödeme sayfasına yönlendiriliyorsunuz...');
    // Ara ödeme sayfasına yönlendirilebilir
  };

  if (!modelData || !otelData) {
    return (
      <div className="taksit-secenekleri-page">
        <div className="error-message">
          <p>Bilgi bulunamadı.</p>
          <button onClick={() => onPageChange('otel-finansman-detay')} className="back-btn">
            <FiArrowLeft /> Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="taksit-secenekleri-page">
      <div className="page-header-section">
        <button onClick={() => onPageChange('otel-finansman-detay')} className="back-button">
          <FiArrowLeft /> Geri Dön
        </button>
        <div className="baslik-bilgi">
          <h1>{modelData.title}</h1>
          <div className="para-birimi-secimi">
            <p className="otel-bilgi">
              {otelData.name} - Toplam Tutar: {formatPara(paraBirimineGoreTutar(finansmanTutari, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
            </p>
            <div className="para-birimi-butonlari">
              <button 
                className={`para-birimi-btn ${seciliParaBirimi === 'TL' ? 'active' : ''}`}
                onClick={() => setSeciliParaBirimi('TL')}
              >
                TL
              </button>
              <button 
                className={`para-birimi-btn ${seciliParaBirimi === 'USD' ? 'active' : ''}`}
                onClick={() => setSeciliParaBirimi('USD')}
              >
                USD
              </button>
              <button 
                className={`para-birimi-btn ${seciliParaBirimi === 'EUR' ? 'active' : ''}`}
                onClick={() => setSeciliParaBirimi('EUR')}
              >
                EUR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="taksit-container">
        {!seciliVade ? (
          <div className="taksit-secenekleri-grid">
            {taksitSecenekleri.map((segment) => (
              <div key={segment.id} className="taksit-segment-kart">
                <div className="segment-numara">
                  <span>{segment.numara}</span>
                </div>
                
                <div className="segment-icerik">
                  <h3 className="segment-baslik">{segment.baslik}</h3>
                  <p className="segment-aciklama">{segment.aciklama}</p>

                  <div className="vade-secenekleri-listesi">
                    {segment.vadeSecenekleri.map((secenek, index) => (
                      <div key={index} className="vade-secenek-item">
                        <div className="vade-bilgi">
                          <span className="vade-sure">{secenek.vade} Ay</span>
                          <span className="aylik-tutar">
                            {formatPara(paraBirimineGoreTutar(secenek.aylikOdeme, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}/ay
                          </span>
                        </div>
                        <a 
                          href={`#${secenek.vade}-ay`}
                          className="sec-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleTaksitSec(secenek.vade, secenek.aylikOdeme);
                          }}
                        >
                          {secenek.vade} Ay Seç
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="taksit-tablo-container">
            <div className="taksit-tablo-wrapper">
              <div className="taksit-tablo-section">
                <div className="tablo-header">
                  <h2>Ödeme Planı - {seciliVade} Ay Vade</h2>
                  <button 
                    className="vade-degistir-btn"
                    onClick={() => {
                      setSeciliVade(null);
                      setAylikOdeme(0);
                      window.location.hash = '';
                    }}
                  >
                    Vade Değiştir
                  </button>
                </div>
                <div className="taksit-tablo">
                  <table>
                    <thead>
                      <tr>
                        <th>Taksit No</th>
                        <th>Ödeme Tarihi</th>
                        <th>Taksit Tutarı</th>
                        <th>Kalan Bakiye</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taksitler.map((taksit) => (
                        <tr key={taksit.taksitNo}>
                          <td>{taksit.taksitNo}</td>
                          <td>{taksit.tarih.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                          <td className="tutar-hucre">
                            {formatPara(paraBirimineGoreTutar(taksit.tutar, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                          </td>
                          <td className="bakiye-hucre">
                            {formatPara(paraBirimineGoreTutar(taksit.kalanBakiye, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="ara-odeme-section">
                <button className="ara-odeme-btn" onClick={handleAraOdeme}>
                  Ara Ödeme
                </button>
                <div className="odeme-bilgi">
                  <p className="toplam-tutar">
                    Toplam: {formatPara(paraBirimineGoreTutar(finansmanTutari, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                  </p>
                  <p className="aylik-tutar-bilgi">
                    Aylık: {formatPara(paraBirimineGoreTutar(aylikOdeme, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaksitSecenekleri;

