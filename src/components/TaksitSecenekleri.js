import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiPhone, FiStar, FiExternalLink, FiWifi, FiCoffee, FiCalendar, FiUmbrella, FiUsers, FiDollarSign, FiUserPlus, FiGitBranch, FiX } from 'react-icons/fi';
import { FaPlane } from 'react-icons/fa';
import './TaksitSecenekleri.css';

const TaksitSecenekleri = ({ modelData, otelData, onPageChange, user }) => {
  const [finansmanTutari, setFinansmanTutari] = useState(0);
  const [kurBilgileri, setKurBilgileri] = useState({ usd: 33.50, eur: 36.20 });
  const [seciliParaBirimi, setSeciliParaBirimi] = useState('TL');
  const [seciliVade, setSeciliVade] = useState(null);
  const [aylikOdeme, setAylikOdeme] = useState(0);
  const [odemeTutari, setOdemeTutari] = useState('');
  const [voucherKodu, setVoucherKodu] = useState('');
  const [tarihOnerisiGoster, setTarihOnerisiGoster] = useState(true);
  const [otelUygunlukUyarisiGoster, setOtelUygunlukUyarisiGoster] = useState(true);

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
    // Hash'i değiştirmeyelim, sadece state'i güncelleyelim
    // Hash değişikliği App.js'deki sayfa yönlendirmesini tetikliyor
    // Sayfayı tablo görünümüne kaydır
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // URL hash'inden vade bilgisini oku (sayfa yüklendiğinde) - artık kullanılmıyor
  // Hash değişikliği sayfa yönlendirmesine neden olduğu için kaldırıldı
  // useEffect(() => {
  //   const hash = window.location.hash;
  //   if (hash && !seciliVade) {
  //     const vadeMatch = hash.match(/(\d+)-ay/);
  //     if (vadeMatch) {
  //       const vade = parseInt(vadeMatch[1]);
  //       const aylikOdemeTutar = Math.round(finansmanTutari / vade);
  //       if (finansmanTutari > 0) {
  //         setSeciliVade(vade);
  //         setAylikOdeme(aylikOdemeTutar);
  //       }
  //     }
  //   }
  // }, [finansmanTutari, seciliVade]);

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

  const handleOdemeYap = () => {
    const tutar = parseFloat(odemeTutari);
    
    if (!tutar || tutar < aylikOdeme) {
      alert(`Minimum ödeme tutarı ${formatPara(aylikOdeme, seciliParaBirimi)} ${paraBirimiSembolu(seciliParaBirimi)} olmalıdır.`);
      return;
    }

    if (tutar > finansmanTutari) {
      alert(`Ödeme tutarı toplam tutardan (${formatPara(finansmanTutari, seciliParaBirimi)} ${paraBirimiSembolu(seciliParaBirimi)}) fazla olamaz.`);
      return;
    }

    // Ödeme işlemi simülasyonu
    alert(`${formatPara(tutar, seciliParaBirimi)} ${paraBirimiSembolu(seciliParaBirimi)} tutarında ödeme yapıldı.`);
    setOdemeTutari('');
    
    // Kullanıcı bakiyesini güncelle (eğer giriş yapmışsa)
    if (user && user.isLoggedIn) {
      const currentBakiye = parseFloat(localStorage.getItem('userBakiye') || '50000');
      const newBakiye = currentBakiye - tutar;
      localStorage.setItem('userBakiye', Math.max(0, newBakiye).toString());
    }
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

      {/* Model Açıklamaları */}
      <div className="model-aciklamalari-section">
        {modelData.id === 1 && (
          <div className="model-aciklama-kutusu">
            <h3>Çekilişsiz (Bireysel) Finansman Modeli</h3>
            <p>Çekilişsiz bireysel finansman modeline göre teslimat tarihi önden belirlenebilir. İsteğe bağlı önden peşinat ödenebilir. 12-24-36 aya kadar vade imkanından yararlanılabilir. Bu model ile çekilişe katılmadan teslimat tarihi önceden belirlenebilir. Bireysel finansman modeli ile Tatil Paketi satın alınır.</p>
          </div>
        )}
        {modelData.id === 2 && (
          <div className="model-aciklama-kutusu">
            <h3>Çekilişli Teslimatta Avantajlı Model Tatil Finansmanı</h3>
            <p>Belirlenen taksitleri ifade eder. Bu finansman türünde, borçlu her ay belirlenen taksit tutarınca ödeme yapar ve anaparanın belirli bir miktarını öder. Bu ödemeler, kredi süresince sabit kalır; bu da borçlunun ödeme planını önceden tahmin etmesini ve bütçesini daha etkili bir şekilde yönetmesini sağlar.</p>
          </div>
        )}
        {modelData.id === 3 && (
          <div className="model-aciklama-kutusu">
            <h3>Çekilişli Tasarruflu Erken Teslim Modeli Tatil Finansmanı</h3>
            <p><strong>Çekilişli teslimatta avantajlı model:</strong> Sabit ödemeli avantajlarıyla teslimat sonrasında ödeme artışı yaşanmaz. Örnek hesaplamaya göre belirlenen miktarda ödeme planı belirlenir. Taksit dondurma imkânı bulunmaktadır. Peşinat ödenmesi isteğe bağlıdır. Peşinatlı ya da peşinatsız ödeme yöntemleri ile bütçenize uygun taksitleri belirleyebilirsiniz.</p>
            <p><strong>Çekilişli tasarruflu erken teslim modeli:</strong> Sabit artışlı ödeme sistemine sahiptir. Bu sistemin koşullarına göre taksit tutarları her ay aynı oran üzerinden artış göstermektedir. Bu sayede vade sayılarınız kısalabilir ve peşinat ödenmesi ise tamamen isteğe bağlı değerlendirilir. Taksit dondurma imkânı bulunduğunu da belirtmek gerekir. Bütçenize en uygun ödeme seçeneklerini tercih edebilirsiniz. Bütçenize uygun modeller ile aylık ödeme planlarınızı kolaylıkla belirleyebilirsiniz. Böylece bütçenize uygun artışlarla ödemeniz gereken miktarı daha erken bitirebilirsiniz.</p>
          </div>
        )}
        {modelData.id === 4 && (
          <div className="model-aciklama-kutusu">
            <h3>Çekilişli Fırsat Modeli Tatil Finansmanı</h3>
            <p><strong>Çekilişli fırsat modeli:</strong> Kademeli ödeme yapabilme avantajı sunar. Teslimatı alana kadar sabit taksit ödemesi imkânı gerçekleştirilebilir. Teslimat alındıktan hemen sonra artışları kendiniz belirleme imkânınız bulunur. Böylece vade sayınızı kısaltmanız mümkün olabilir. Çekilişli fırsat modelinde peşinat ödenmesi kişinin tercihine bağlı olarak değerlendirilir.</p>
            <p><strong>Çekilişli Fırsat Modeli Tatil Finansmanı:</strong> Çekilişli fırsat tatil finansmanı kampanyasında çekilişe katılmak zorunlu değildir. Kişiler tercihlerine göre bireysel modelleri de tercih edebilir. Aynı zamanda bu modeller sayesinde teslimat tarihini önceden belirleyebilir. Çeşitli avantajlar sağlayan çekilişli fırsat modeli planı şu şekildedir:</p>
            <ul className="model-avantajlar-listesi">
              <li>Teslimatınızı alana kadar sabit bir şekilde taksit ödemesi yapabilirsiniz.</li>
              <li>Teslim alımı sonrası artışlarınızı kendiniz belirleyebilirsiniz.</li>
              <li>İsteğinize göre vade sayınızı kısaltabilirsiniz.</li>
              <li>Taksit dondurma imkanına sahip olabilirsiniz.</li>
              <li>14 gün içerisinde cayma hakkınızı kullanabilirsiniz.</li>
              <li>Yine isteğinize bağlı olarak peşinat ödeyebilirsiniz.</li>
            </ul>
          </div>
        )}
        {modelData.id === 5 && (
          <div className="model-aciklama-kutusu">
            <h3>Kademeli Ödeme</h3>
            <p>Kademeli ödeme yapabilme avantajı sunar. Teslimatı alana kadar sabit taksit ödemesi imkânı gerçekleştirilebilir. Teslimat alındıktan hemen sonra artışları kendiniz belirleme imkânınız bulunur. Böylece vade sayınızı kısaltmanız mümkün olabilir. Peşinat ödenmesi kişinin tercihine bağlı olarak değerlendirilir.</p>
          </div>
        )}
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
                        <button 
                          className="sec-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleTaksitSec(secenek.vade, secenek.aylikOdeme);
                          }}
                        >
                          {secenek.vade} Ay Seç
                        </button>
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
              <div className="sidebar-containers-wrapper">
                {/* Tarih Önerisi Bildirimi */}
                {tarihOnerisiGoster && otelData && (
                  <div className="tarih-onerisi-container">
                    <button 
                      className="tarih-onerisi-kapat"
                      onClick={() => setTarihOnerisiGoster(false)}
                    >
                      <FiX />
                    </button>
                    <div className="tarih-onerisi-icerik">
                      <div className="tarih-onerisi-mesaj">
                        <p className="tarih-onerisi-baslik">
                          <FiUsers className="tarih-onerisi-icon" />
                          30 aile 15 Temmuz'u tercih etti
                        </p>
                        <p className="tarih-onerisi-aciklama">
                          Bu tarih seçtiğiniz tarihten <strong>%20 daha uygundur</strong>
                        </p>
                        <p className="tarih-onerisi-soru">
                          Rezervasyonu değiştirmek istiyor musunuz?
                        </p>
                      </div>
                      <div className="tarih-onerisi-otel-gorsel">
                        <div className="indirim-badge">%20 İndirim</div>
                        <img 
                          src={otelData.image || '/images/default-hotel.jpg'} 
                          alt={otelData.name}
                          className="tarih-onerisi-gorsel"
                        />
                      </div>
                    </div>
                    <div className="tarih-onerisi-butonlar">
                      <button 
                        className="tarih-onerisi-evet-btn"
                        onClick={() => {
                          // Tarih değiştirme işlemi burada yapılacak
                          alert('Tarih değiştirme sayfasına yönlendiriliyor...');
                          setTarihOnerisiGoster(false);
                        }}
                      >
                        Evet, Değiştir
                      </button>
                      <button 
                        className="tarih-onerisi-hayir-btn"
                        onClick={() => setTarihOnerisiGoster(false)}
                      >
                        Hayır, Devam Et
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Otel Uygunluk Uyarısı */}
                {otelUygunlukUyarisiGoster && otelData && (
                  <div className="otel-uygunluk-uyarisi-container">
                    <button 
                      className="otel-uygunluk-uyarisi-kapat"
                      onClick={() => setOtelUygunlukUyarisiGoster(false)}
                    >
                      <FiX />
                    </button>
                    <div className="otel-uygunluk-uyarisi-icerik">
                      <div className="otel-uygunluk-uyarisi-mesaj">
                        <p className="otel-uygunluk-uyarisi-baslik">
                          <FiCalendar className="otel-uygunluk-uyarisi-icon" />
                          Aynı Otel 1 Eylül'de %10 Daha Uygun
                        </p>
                        <p className="otel-uygunluk-uyarisi-aciklama">
                          Bu otel <strong>1 Eylül</strong> tarihinde seçtiğiniz tarihten <strong>%10 daha uygundur</strong>
                        </p>
                      </div>
                      <div className="otel-uygunluk-uyarisi-otel-gorsel">
                        <div className="uygunluk-badge">%10 Daha Uygun</div>
                        <img 
                          src={otelData.image || '/images/default-hotel.jpg'} 
                          alt={otelData.name}
                          className="otel-uygunluk-uyarisi-gorsel"
                        />
                      </div>
                    </div>
                    <div className="otel-uygunluk-uyarisi-butonlar">
                      <button 
                        className="otel-uygunluk-uyarisi-evet-btn"
                        onClick={() => {
                          // Tarih değiştirme işlemi burada yapılacak
                          alert('1 Eylül tarihine yönlendiriliyor...');
                          setOtelUygunlukUyarisiGoster(false);
                        }}
                      >
                        Evet, 1 Eylül'e Geç
                      </button>
                      <button 
                        className="otel-uygunluk-uyarisi-hayir-btn"
                        onClick={() => setOtelUygunlukUyarisiGoster(false)}
                      >
                        Hayır, Devam Et
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="ara-odeme-section">
                  <div className="odeme-form">
                    <h3 className="odeme-form-baslik">Ödeme Yap</h3>
                    <div className="odeme-bilgi">
                      <p className="toplam-tutar">
                        Toplam: {formatPara(paraBirimineGoreTutar(finansmanTutari, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                      </p>
                      <p className="aylik-tutar-bilgi">
                        Minimum Aylık: {formatPara(paraBirimineGoreTutar(aylikOdeme, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                      </p>
                    </div>
                    <div className="odeme-input-group">
                      <label className="odeme-label">
                        Ödeme Tutarı ({paraBirimiSembolu(seciliParaBirimi)})
                      </label>
                      <input
                        type="number"
                        className="odeme-input"
                        value={odemeTutari}
                        onChange={(e) => setOdemeTutari(e.target.value)}
                        placeholder={`Min: ${formatPara(paraBirimineGoreTutar(aylikOdeme, seciliParaBirimi), seciliParaBirimi)}`}
                        min={aylikOdeme}
                        max={finansmanTutari}
                        step="0.01"
                      />
                      <p className="odeme-hint">
                        Minimum {formatPara(paraBirimineGoreTutar(aylikOdeme, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)} ödeyebilirsiniz
                      </p>
                    </div>
                    <button 
                      className="odeme-yap-btn" 
                      onClick={handleOdemeYap}
                      disabled={!odemeTutari || parseFloat(odemeTutari) < aylikOdeme}
                    >
                      Ödeme Yap
                    </button>
                    <div className="voucher-input-group">
                      <label className="odeme-label">
                        Ödeme Çeki / Voucher Kodu (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        className="odeme-input voucher-input"
                        value={voucherKodu}
                        onChange={(e) => setVoucherKodu(e.target.value.toUpperCase())}
                        placeholder="Voucher kodunu giriniz"
                        maxLength={20}
                      />
                      <p className="odeme-hint">
                        Ödeme çeki veya voucher kodunuz varsa buraya girebilirsiniz
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tatil-uzmani-container">
                  <button className="tatil-uzmani-btn">
                    <FiPhone className="tatil-uzmani-icon" />
                    Tatil Uzmanıma Bağlan
                  </button>
                  <p className="tatil-uzmani-numara">
                    <FiPhone className="numara-icon" />
                    0850 123 45 67
                  </p>
                </div>
                <div className="finans-uzmani-container">
                  <button className="finans-uzmani-btn">
                    <FiDollarSign className="finans-uzmani-icon" />
                    Finans Uzmanıma Bağlan
                  </button>
                  <p className="finans-uzmani-numara">
                    <FiPhone className="numara-icon" />
                    0850 123 45 68
                  </p>
                </div>
                <div className="ucak-rezervasyonum-container">
                  <div className="ucak-rezervasyonum-header">
                    <FaPlane className="ucak-rezervasyonum-icon" />
                    <h3 className="ucak-rezervasyonum-baslik">Uçak Rezervasyonum</h3>
                  </div>
                  <div className="ucak-rezervasyonum-icerik">
                    <p className="ucak-rezervasyonum-bos-mesaj">Henüz uçak rezervasyonu bulunmamaktadır.</p>
                    <button className="ucak-rezervasyonum-ara-btn">
                      Rezervasyon Yap
                    </button>
                  </div>
                </div>
                {otelData && (
                  <div className="otelim-bilgi-container">
                  <div className="otelim-header">
                    <h3 className="otelim-baslik">Tatil Rezervasyonum</h3>
                    <a 
                      href={`#otel-${otelData.id}`} 
                      className="otelim-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onPageChange) {
                          onPageChange('odeme-planlari');
                        }
                      }}
                    >
                      Detayları Gör <FiExternalLink className="link-icon" />
                    </a>
                  </div>
                  <div className="otelim-gorsel-wrapper">
                    <img 
                      src={otelData.image || '/images/default-hotel.jpg'} 
                      alt={otelData.name} 
                      className="otelim-gorsel"
                    />
                    {otelData.rating && (
                      <div className="otelim-rating">
                        <FiStar className="rating-star" />
                        <span>{otelData.rating}</span>
                      </div>
                    )}
                  </div>
                  <h4 className="otelim-adi">{otelData.name}</h4>
                  {otelData.description && (
                    <p className="otelim-aciklama">{otelData.description}</p>
                  )}
                  {otelData.features && otelData.features.length > 0 && (
                    <div className="otelim-ozellikler">
                      <h5 className="ozellikler-baslik">Özellikler</h5>
                      <div className="ozellikler-listesi">
                        {otelData.features.map((ozellik, index) => (
                          <div key={index} className="ozellik-item">
                            <FiStar className="ozellik-icon" />
                            <span>{ozellik}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {otelData.nights && (
                    <div className="otelim-ek-bilgi">
                      <FiUsers className="ek-bilgi-icon" />
                      <span>{otelData.nights}</span>
                    </div>
                  )}
                  {otelData.dateRange && (
                    <div className="otelim-ek-bilgi">
                      <FiCalendar className="ek-bilgi-icon" />
                      <span>{otelData.dateRange}</span>
                    </div>
                  )}
                </div>
                )}
              </div>
            </div>
            
            {/* Aile Üyesi Ekle Container */}
            <div className="aile-uyesi-ekle-container">
              <div className="aile-uyesi-ekle-header">
                <FiUserPlus className="aile-uyesi-icon" />
                <h3 className="aile-uyesi-baslik">Aile Üyesi Ekle</h3>
              </div>
              <div className="aile-uyesi-ekle-icerik">
                <p className="aile-uyesi-aciklama">
                  Aile üyelerinizi ekleyerek onlara da tatil finansmanı imkanı sağlayabilirsiniz.
                </p>
                <button className="aile-uyesi-ekle-btn">
                  Aile Üyesi Ekle
                </button>
              </div>
            </div>

            {/* Tatil Ağacı Container */}
            <div className="tatil-agaci-container">
              <div className="tatil-agaci-header">
                <FiGitBranch className="tatil-agaci-icon" />
                <h3 className="tatil-agaci-baslik">Tatil Ağacı</h3>
              </div>
              <div className="tatil-agaci-icerik">
                <p className="tatil-agaci-aciklama">
                  Tatil Ağacı ile referanslarınızı ekleyin ve özel avantajlardan yararlanın.
                </p>
                <button className="tatil-agaci-btn">
                  Tatil Ağacına Git
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaksitSecenekleri;

