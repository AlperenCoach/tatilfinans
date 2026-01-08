import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import './MerakEdilenler.css';

const MerakEdilenler = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const sorular = [
    {
      id: 1,
      soru: "Tatil Finansman Sistemi Nedir?",
      cevap: "Tatil Finansman; hayalindeki tatili planlayan, dünyayı keşfetmek isteyen veya dinlenmeye ihtiyaç duyan kişilere finans kaynağı sunuyor. Böylelikle kişiler; yurt içi, yurt dışı, gemi turları veya konaklama paketlerine faizsiz, peşinatsız ve kredisiz olarak ulaşabiliyor. Öncelikle gitmek istedikleri tatilin bütçesini belirleyen kişiler, kendi ekonomik güçlerine göre oluşturulan ödeme planlarına göre gruplara ayrılıyor. Yardımlaşma ve dayanışma temelli olan bu sistemde, tatil yapmak isteyen kişiler bir araya getiriliyor."
    },
    {
      id: 2,
      soru: "Tatil çekilişleri nasıl yapılıyor?",
      cevap: "Noter huzurunda gerçekleştirilen çekilişler, Tatil Finansman'ın YouTube ve Facebook hesaplarından canlı olarak yayınlanıyor."
    },
    {
      id: 3,
      soru: "Neden tatil kredisi yerine Tatil Finansman'ı tercih etmeliyim?",
      cevap: "Tatil kredisinde, tatilinizi yüksek faizlerle geri ödersiniz. Tasarruf finansman sisteminde ise yarın yapacağınız tatil için bugünden tasarruf etmeye başlarsınız. Dayanışma Ekonomisi ile faiz yüküne katlanmaz, taksitlerinizi 6 aya kadar dondurma hakkına sahip olursunuz."
    },
    {
      id: 4,
      soru: "Taksitler sabit mi? İleride ekstra ödemeler çıkar mı?",
      cevap: "Tatil finansmanınızı teslim almanızın ardından önceden belirleyeceğiniz tutar oranında ödemeleriniz bir miktar artar. Böylelikle vade sayınız kısalır ve borcunuzu daha hızlı bitirirsiniz."
    },
    {
      id: 5,
      soru: "Çekilişe katılmak zorunda mıyım?",
      cevap: "Çekilişe katılmak zorunda değilsiniz. Dilerseniz bireysel modelimizi tercih ederek tatil yapacağınız tarihi önceden belirleyebilirsiniz."
    },
    {
      id: 6,
      soru: "Organizasyon Ücreti Nedir?",
      cevap: "Operasyonel giderlerin, rezervasyon süreçlerinin ve hukuki işlemlerin karşılanması amacıyla tasarruf sahiplerinden bir kereye mahsus alınan hizmet bedelidir."
    },
    {
      id: 7,
      soru: "Tatil Finansman ile hangi tatilleri alabilirim?",
      cevap: "Tatil Finansman ile yurt içi ve yurt dışı otel konaklamaları, kültür turları, mavi yolculuklar, karavan tatilleri ve gemi (cruise) turları planlayabilirsiniz."
    },
    {
      id: 8,
      soru: "Peşinat verme zorunluluğu var mı?",
      cevap: "Peşinat verme zorunluluğu yoktur; ancak peşinat ödeyerek vade sayınızı kısaltıp tatilinize daha erken çıkabilirsiniz."
    },
    {
      id: 9,
      soru: "Taksitlerimi ödeyemezsem ne olur?",
      cevap: "Maddi zorluk yaşadığınızda taksitlerinizi 6 aya kadar dondurma imkânına sahipsiniz. Ancak dondurulan süre kadar tatil teslimat tarihiniz de ertelenir."
    },
    {
      id: 10,
      soru: "Nasıl başvuru yapılabilir?",
      cevap: "Yalnızca T.C. kimlik kartınızla web sitemiz üzerinden, dijital şubemizden veya fiziksel şubelerimizden hızlıca başvuru yapabilirsiniz."
    },
    {
      id: 11,
      soru: "Sistemden çıkmak istersem ne olur?",
      cevap: "Sistemden çıkmak istediğiniz takdirde, sözleşmede belirtilen organizasyon ücreti hariç biriktirdiğiniz tüm tutarı eksiksiz olarak geri alabilirsiniz."
    },
    {
      id: 12,
      soru: "Faiz almıyorsanız kazancınız nedir?",
      cevap: "Biz katılımcılarımıza faiz yüklemiyoruz. Kazancımız, sisteme girişte bir kez alınan ve operasyonel maliyetlerimizi karşılayan organizasyon ücretidir."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="merak-edilenler-page">
      <div className="page-header">
        <div className="header-icon-wrapper">
          <FiHelpCircle className="header-icon" />
        </div>
        <h1>Sıkça Sorulan Sorular</h1>
        <p>Merak ettiğiniz soruların cevapları</p>
      </div>

      <div className="faq-container">
        <div className="faq-list">
          {sorular.map((item, index) => (
            <div 
              key={item.id} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleQuestion(index)}
              >
                <span className="question-text">{item.soru}</span>
                {openIndex === index ? (
                  <FiChevronUp className="chevron-icon" />
                ) : (
                  <FiChevronDown className="chevron-icon" />
                )}
              </button>
              <div className="faq-answer">
                <p>{item.cevap}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerakEdilenler;

