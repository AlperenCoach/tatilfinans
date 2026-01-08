import React, { useState, useEffect } from 'react';
import { FiCheck, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import DatePicker, { registerLocale } from 'react-datepicker';
import { tr } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './OtelFinansmanDetay.css';

registerLocale('tr', tr);

const OtelFinansmanDetay = ({ otelData, onPageChange, onBack }) => {
  const [finansmanTutari, setFinansmanTutari] = useState(0);
  const [kurBilgileri, setKurBilgileri] = useState({
    usd: 33.50, // Güncel USD/TL kuru
    eur: 36.20  // Güncel EUR/TL kuru
  });
  const [seciliParaBirimi, setSeciliParaBirimi] = useState('TL'); // TL, USD, EUR
  const [baslangicTarihi, setBaslangicTarihi] = useState(null);
  const [bitisTarihi, setBitisTarihi] = useState(null);
  const [kurYukleniyor, setKurYukleniyor] = useState(true);

  // Gerçek zamanlı döviz kurlarını çek
  useEffect(() => {
    const kurlariCek = async () => {
      try {
        setKurYukleniyor(true);
        // ExchangeRate-API kullanarak güncel kurları çek
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        // USD/TL ve EUR/TL kurlarını hesapla
        // USD bazlı olduğu için, TRY ve EUR kurlarını alıyoruz
        const usdToTry = data.rates.TRY || 33.50; // Fallback değer
        const eurToUsd = 1 / data.rates.EUR; // EUR'den USD'ye
        const eurToTry = usdToTry / eurToUsd; // EUR/TL = (USD/TL) / (EUR/USD)
        
        setKurBilgileri({
          usd: usdToTry,
          eur: eurToTry
        });
        setKurYukleniyor(false);
      } catch (error) {
        console.error('Döviz kurları yüklenirken hata oluştu:', error);
        // Hata durumunda varsayılan değerleri kullan
        setKurBilgileri({
          usd: 33.50,
          eur: 36.20
        });
        setKurYukleniyor(false);
      }
    };

    kurlariCek();
    
    // Her 5 dakikada bir kurları güncelle
    const interval = setInterval(kurlariCek, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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

  // 6 farklı finansman modeli
  const finansmanModelleri = [
    {
      id: 1,
      title: 'Çekilişsiz (Bireysel) Finansman Modeli',
      ozellikButonu: 'Tatil Teslimat Tarihini Önden Belirle',
      aciklama: 'Çekilişsiz bireysel finansman modeline göre teslimat tarihi önden belirlenebilir. İsteğe bağlı önden peşinat ödenebilir. 12-24-36 aya kadar vade imkanından yararlanılabilir. Bu model ile çekilişe katılmadan teslimat tarihi önceden belirlenebilir. Bireysel finansman modeli ile Tatil Paketi satın alınır.',
      vade: 12,
      ozellikler: [
        'taksit dondurma imkanı',
        'peşinat (isteğe bağlı)',
        'esnek ödeme seçenekleri',
        'erken ödeme avantajı'
      ]
    },
    {
      id: 2,
      title: 'Çekilişli Teslimatta Avantajlı Model Tatil Finansmanı',
      ozellikButonu: 'Sabit Ödeme',
      aciklama: 'Belirlenen taksitleri ifade eder. Bu finansman türünde, borçlu her ay belirlenen taksit tutarınca ödeme yapar ve anaparanın belirli bir miktarını öder. Bu ödemeler, kredi süresince sabit kalır; bu da borçlunun ödeme planını önceden tahmin etmesini ve bütçesini daha etkili bir şekilde yönetmesini sağlar.',
      vade: 24,
      ozellikler: [
        '12-48 ay vade seçeneği',
        'taksit dondurma imkanı',
        'peşinat (isteğe bağlı)',
        'sabit aylık ödeme'
      ]
    },
    {
      id: 3,
      title: 'Çekilişli Tasarruflu Erken Teslim Modeli Tatil Finansmanı',
      ozellikButonu: 'Sabit Artışlı Ödeme',
      aciklama: 'Çekilişli teslimatta avantajlı model: Sabit ödemeli avantajlarıyla teslimat sonrasında ödeme artışı yaşanmaz. Örnek hesaplamaya göre belirlenen miktarda ödeme planı belirlenir. Taksit dondurma imkânı bulunmaktadır. Peşinat ödenmesi isteğe bağlıdır. Peşinatlı ya da peşinatsız ödeme yöntemleri ile bütçenize uygun taksitleri belirleyebilirsiniz. Çekilişli tasarruflu erken teslim modeli: Sabit artışlı ödeme sistemine sahiptir. Bu sistemin koşullarına göre taksit tutarları her ay aynı oran üzerinden artış göstermektedir. Bu sayede vade sayılarınız kısalabilir ve peşinat ödenmesi ise tamamen isteğe bağlı değerlendirilir. Taksit dondurma imkânı bulunduğunu da belirtmek gerekir. Bütçenize en uygun ödeme seçeneklerini tercih edebilirsiniz. Bütçenize uygun modeller ile aylık ödeme planlarınızı kolaylıkla belirleyebilirsiniz. Böylece bütçenize uygun artışlarla ödemeniz gereken miktarı daha erken bitirebilirsiniz.',
      vade: 36,
      ozellikler: [
        'peşinat (isteğe bağlı)',
        'taksit dondurma imkanı',
        'erken teslimat fırsatı',
        'çekiliş avantajı'
      ]
    },
    {
      id: 4,
      title: 'Çekilişli Fırsat Modeli Tatil Finansmanı',
      ozellikButonu: 'Özel Fırsat',
      aciklama: 'Çekilişli fırsat modeli: Kademeli ödeme yapabilme avantajı sunar. Teslimatı alana kadar sabit taksit ödemesi imkânı gerçekleştirilebilir. Teslimat alındıktan hemen sonra artışları kendiniz belirleme imkânınız bulunur. Böylece vade sayınızı kısaltmanız mümkün olabilir. Çekilişli fırsat modelinde peşinat ödenmesi kişinin tercihine bağlı olarak değerlendirilir. Çekilişli Fırsat Modeli Tatil Finansmanı: Çekilişli fırsat tatil finansmanı kampanyasında çekilişe katılmak zorunlu değildir. Kişiler tercihlerine göre bireysel modelleri de tercih edebilir. Aynı zamanda bu modeller sayesinde teslimat tarihini önceden belirleyebilir.',
      vade: 24,
      ozellikler: [
        'teslimat öncesi sabit ödeme',
        'teslimat sonrası esnek artış',
        'vade kısaltma imkanı',
        'peşinat (isteğe bağlı)',
        'taksit dondurma imkanı',
        '14 gün içerisinde cayma hakkı'
      ]
    },
    {
      id: 5,
      title: 'Kademeli Ödeme',
      ozellikButonu: 'Esnek Artış',
      aciklama: 'Kademeli ödeme yapabilme avantajı sunar. Teslimatı alana kadar sabit taksit ödemesi imkânı gerçekleştirilebilir. Teslimat alındıktan hemen sonra artışları kendiniz belirleme imkânınız bulunur. Böylece vade sayınızı kısaltmanız mümkün olabilir. Peşinat ödenmesi kişinin tercihine bağlı olarak değerlendirilir.',
      vade: 36,
      ozellikler: [
        'teslimat öncesi sabit ödeme',
        'teslimat sonrası esnek artış',
        'vade kısaltma imkanı',
        'peşinat (isteğe bağlı)',
        'taksit dondurma imkanı'
      ]
    },
    {
      id: 6,
      title: 'Çekilişli ve Değerini Koruyan Model',
      ozellikButonu: 'Enflasyon Korumalı',
      aciklama: 'Sizin belirlediğiniz dönemlerde taksitlerinizde sizin belirlediğiniz miktarlarda artış yapılır. Bu sayede enflasyondan etkilenmezsiniz.',
      vade: 48,
      ozellikler: [
        'enflasyon koruması',
        'özel artış planlaması',
        'peşinat (isteğe bağlı)',
        'uzun vade avantajı'
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

  const handleDetayliIncele = (modelId) => {
    const selectedModel = finansmanModelleri.find(m => m.id === modelId);
    if (selectedModel && onPageChange) {
      // Model, otel ve para birimi bilgilerini localStorage'a kaydet
      localStorage.setItem('selectedModel', JSON.stringify(selectedModel));
      localStorage.setItem('selectedOtel', JSON.stringify(otelData));
      localStorage.setItem('selectedParaBirimi', seciliParaBirimi);
      localStorage.setItem('kurBilgileri', JSON.stringify(kurBilgileri));
      onPageChange('taksit-secenekleri');
    }
  };

  if (!otelData) {
    return (
      <div className="otel-finansman-detay-page">
        <div className="error-message">
          <p>Otel bilgisi bulunamadı.</p>
          <button onClick={() => onPageChange('odeme-planlari')} className="back-btn">
            <FiArrowLeft /> Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="otel-finansman-detay-page">
      <div className="page-header-section">
        <button onClick={() => onPageChange('odeme-planlari')} className="back-button">
          <FiArrowLeft /> Geri Dön
        </button>
        <div className="otel-bilgi-header">
          <h1>{otelData.name} - Finansman Modelleri</h1>
          <div className="para-birimi-secimi">
            <p className="otel-fiyat-bilgi">
              Toplam Tutar: {formatPara(paraBirimineGoreTutar(finansmanTutari, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
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

        <div className="takvim-section">
          <div className="takvim-container">
            <div className="takvim-header">
              <FiCalendar className="takvim-icon" />
              <h3>Tatil Tarih Aralığını Seçin</h3>
            </div>
            <div className="tarih-secici">
              <div className="tarih-input-group">
                <label>Başlangıç Tarihi</label>
                <DatePicker
                  selected={baslangicTarihi}
                  onChange={(date) => setBaslangicTarihi(date)}
                  selectsStart
                  startDate={baslangicTarihi}
                  endDate={bitisTarihi}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Başlangıç tarihini seçin"
                  className="tarih-input"
                  calendarClassName="custom-calendar"
                  locale="tr"
                />
              </div>
              <div className="tarih-arrow">→</div>
              <div className="tarih-input-group">
                <label>Bitiş Tarihi</label>
                <DatePicker
                  selected={bitisTarihi}
                  onChange={(date) => setBitisTarihi(date)}
                  selectsEnd
                  startDate={baslangicTarihi}
                  endDate={bitisTarihi}
                  minDate={baslangicTarihi || new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Bitiş tarihini seçin"
                  className="tarih-input"
                  calendarClassName="custom-calendar"
                  locale="tr"
                />
              </div>
            </div>
            {baslangicTarihi && bitisTarihi && (
              <div className="tarih-bilgi">
                <p>
                  Seçilen Tarih Aralığı: {baslangicTarihi.toLocaleDateString('tr-TR')} - {bitisTarihi.toLocaleDateString('tr-TR')}
                </p>
                <p className="gece-sayisi">
                  Toplam Gece: {Math.ceil((bitisTarihi - baslangicTarihi) / (1000 * 60 * 60 * 24))} gece
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="finansman-modelleri-container">
        <div className="modeller-grid">
          {finansmanModelleri.map((model) => (
            <div key={model.id} className="finansman-model-kart">
              <div className="model-baslik">
                <h3>{model.title}</h3>
              </div>
              
              <div className="model-ozellik-butonu">
                <span>{model.ozellikButonu}</span>
              </div>

              <div className="model-aylik-odeme">
                <div className="aylik-label">Ayda</div>
                <div className="aylik-tutar">
                  {formatPara(paraBirimineGoreTutar(Math.round(finansmanTutari / model.vade), seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)}
                </div>
              </div>

              <div className="model-ornek-hesaplama">
                <p className="ornek-baslik">Örnek Hesaplama</p>
                <p className="ornek-aciklama">
                  {formatPara(paraBirimineGoreTutar(finansmanTutari, seciliParaBirimi), seciliParaBirimi)} {paraBirimiSembolu(seciliParaBirimi)} finansman tutarı için {model.vade} ay vade üzerinden hesaplanmıştır
                </p>
              </div>

              <div className="model-ozellikler">
                {model.ozellikler.map((ozellik, index) => (
                  <div key={index} className="ozellik-item">
                    <FiCheck className="check-icon" />
                    <span>{ozellik}</span>
                  </div>
                ))}
              </div>

              <button 
                className="detayli-incele-btn"
                onClick={() => handleDetayliIncele(model.id)}
              >
                Detaylı İncele
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtelFinansmanDetay;

