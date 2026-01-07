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

