import React from 'react';
import { FiDollarSign, FiCheckCircle, FiUsers, FiFileText, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import './TasarrufFinansman.css';

const TasarrufFinansman = ({ onPageChange }) => {
  const adimlar = [
    {
      id: 1,
      icon: FiDollarSign,
      title: 'Bütçenizi Belirleyin',
      description: 'Gitmek istediğiniz rota için gerekli finansman tutarını ve bütçenizi sarsmayacak aylık taksit miktarını birlikte belirleriz.'
    },
    {
      id: 2,
      icon: FiCheckCircle,
      title: 'Modelinizi Seçin',
      description: 'Beklentilerinize uygun olarak çekilişli grupları veya bireysel ödeme modellerinden birini tercih edersiniz.'
    },
    {
      id: 3,
      icon: FiUsers,
      title: 'Grubunuza Dahil Olun',
      description: 'Sizi, tıpkı sizin gibi tatil hayali kuran diğer kişilerin imkânlarını birleştirdiği özel bir tasarruf grubuna dâhil ederiz.'
    },
    {
      id: 4,
      icon: FiFileText,
      title: 'Noter Huzurunda Çekiliş',
      description: 'Her ay düzenli olarak noter huzurunda gerçekleştirilen çekilişler ile tatil finansmanınıza erkenden kavuşma fırsatını yakalayabilirsiniz.'
    },
    {
      id: 5,
      icon: FiCalendar,
      title: 'Öderken Tatil Yapın',
      description: 'Tatilinizi yapıp anılarınızı biriktirirken, taksitlerinizin geri kalanını bütçenizi yormadan ödemeye devam edersiniz.'
    }
  ];

  const avantajlar = [
    'Faizsiz Ödeme',
    'Peşinatsız Başlangıç',
    'Yüksek Banka Kredileri Olmadan',
    'Yurt İçi ve Yurt Dışı Seçenekleri',
    'Gemi Turları ve Konaklama Paketleri',
    'Bütçenizi Yormayan Taksitler'
  ];

  return (
    <div className="tasarruf-finansman-page">
      <div className="page-header">
        <h1>Tasarruf Finansman Modeli ile Tatil Dönemi Başlıyor!</h1>
        <p>Hayalinizdeki tatili planlayın, dünyayı keşfedin ve dinlenin</p>
      </div>

      <div className="content-container">
        <section className="intro-section">
          <div className="intro-content">
            <h2>Tasarruf Finansman Modeli Nedir?</h2>
            <p className="intro-text">
              Tasarruf Finansman Modeli; hayalindeki tatili planlayanların, dünyayı keşfetmek isteyenlerin ve dinlenmeye ihtiyaç duyanların imkânlarını birbirleri için birleştirmesidir.
            </p>
            <p className="intro-text">
              Bu dayanışma modeli sayesinde müşterilerimiz; <strong>"faizsiz"</strong>, <strong>"peşinatsız"</strong> ve <strong>"yüksek banka kredileri olmadan"</strong> yurt içi veya yurt dışı tatillerini, gemi turlarını ya da konaklama paketlerini kolayca planlayabiliyor.
            </p>
          </div>
        </section>

        <section className="sistem-section">
          <h2 className="section-title">
            <FiTrendingUp className="title-icon" />
            Sistem Nasıl İşliyor?
          </h2>
          <div className="adimlar-grid">
            {adimlar.map((adim) => (
              <div key={adim.id} className="adim-kart">
                <div className="adim-numara">{adim.id}</div>
                <div className="adim-icon-wrapper">
                  <adim.icon className="adim-icon" />
                </div>
                <h3 className="adim-baslik">{adim.title}</h3>
                <p className="adim-aciklama">{adim.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="avantajlar-section">
          <h2 className="section-title">Avantajlar</h2>
          <div className="avantajlar-grid">
            {avantajlar.map((avantaj, index) => (
              <div key={index} className="avantaj-kart">
                <FiCheckCircle className="avantaj-icon" />
                <span>{avantaj}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="finansman-modelleri-section">
          <h2 className="section-title">Finansman Modelleri</h2>
          <div className="modeller-grid">
            <div className="model-kart">
              <h3>Çekilişsiz (Bireysel) Finansman Modeli</h3>
              <p>
                Çekilişsiz bireysel finansman modeline göre teslimat tarihi önden belirlenebilir. İsteğe bağlı önden peşinat ödenebilir. 12-24-36 aya kadar vade imkanından yararlanılabilir. Bu model ile çekilişe katılmadan teslimat tarihi önceden belirlenebilir. Bireysel finansman modeli ile Tatil Paketi satın alınır.
              </p>
            </div>
            <div className="model-kart">
              <h3>Çekilişli Teslimatta Avantajlı Model Tatil Finansmanı</h3>
              <p>
                Belirlenen taksitleri ifade eder. Bu finansman türünde, borçlu her ay belirlenen taksit tutarınca ödeme yapar ve anaparanın belirli bir miktarını öder. Bu ödemeler, kredi süresince sabit kalır; bu da borçlunun ödeme planını önceden tahmin etmesini ve bütçesini daha etkili bir şekilde yönetmesini sağlar.
              </p>
            </div>
            <div className="model-kart">
              <h3>Çekilişli Tasarruflu Erken Teslim Modeli Tatil Finansmanı</h3>
              <p>
                <strong>Çekilişli teslimatta avantajlı model:</strong> Sabit ödemeli avantajlarıyla teslimat sonrasında ödeme artışı yaşanmaz. Örnek hesaplamaya göre belirlenen miktarda ödeme planı belirlenir. Taksit dondurma imkânı bulunmaktadır. Peşinat ödenmesi isteğe bağlıdır. Peşinatlı ya da peşinatsız ödeme yöntemleri ile bütçenize uygun taksitleri belirleyebilirsiniz.
              </p>
              <p>
                <strong>Çekilişli tasarruflu erken teslim modeli:</strong> Sabit artışlı ödeme sistemine sahiptir. Bu sistemin koşullarına göre taksit tutarları her ay aynı oran üzerinden artış göstermektedir. Bu sayede vade sayılarınız kısalabilir ve peşinat ödenmesi ise tamamen isteğe bağlı değerlendirilir. Taksit dondurma imkânı bulunduğunu da belirtmek gerekir. Bütçenize en uygun ödeme seçeneklerini tercih edebilirsiniz. Bütçenize uygun modeller ile aylık ödeme planlarınızı kolaylıkla belirleyebilirsiniz. Böylece bütçenize uygun artışlarla ödemeniz gereken miktarı daha erken bitirebilirsiniz.
              </p>
            </div>
            <div className="model-kart">
              <h3>Çekilişli Fırsat Modeli Tatil Finansmanı</h3>
              <p>
                <strong>Çekilişli fırsat modeli:</strong> Kademeli ödeme yapabilme avantajı sunar. Teslimatı alana kadar sabit taksit ödemesi imkânı gerçekleştirilebilir. Teslimat alındıktan hemen sonra artışları kendiniz belirleme imkânınız bulunur. Böylece vade sayınızı kısaltmanız mümkün olabilir. Çekilişli fırsat modelinde peşinat ödenmesi kişinin tercihine bağlı olarak değerlendirilir.
              </p>
              <p>
                <strong>Çekilişli Fırsat Modeli Tatil Finansmanı:</strong> Çekilişli fırsat tatil finansmanı kampanyasında çekilişe katılmak zorunlu değildir. Kişiler tercihlerine göre bireysel modelleri de tercih edebilir. Aynı zamanda bu modeller sayesinde teslimat tarihini önceden belirleyebilir. Çeşitli avantajlar sağlayan çekilişli fırsat modeli planı şu şekildedir:
              </p>
              <ul className="model-avantajlar-listesi">
                <li>Teslimatınızı alana kadar sabit bir şekilde taksit ödemesi yapabilirsiniz.</li>
                <li>Teslim alımı sonrası artışlarınızı kendiniz belirleyebilirsiniz.</li>
                <li>İsteğinize göre vade sayınızı kısaltabilirsiniz.</li>
                <li>Taksit dondurma imkanına sahip olabilirsiniz.</li>
                <li>14 gün içerisinde cayma hakkınızı kullanabilirsiniz.</li>
                <li>Yine isteğinize bağlı olarak peşinat ödeyebilirsiniz.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Hayalinizdeki Tatili Planlamaya Başlayın</h2>
            <p>Tasarruf Finansman Modeli ile bütçenizi yormadan hayalinizdeki tatili gerçekleştirin.</p>
            <button 
              className="cta-button"
              onClick={() => onPageChange && onPageChange('tatil-finansman-form')}
            >
              Hemen Başvur
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TasarrufFinansman;

