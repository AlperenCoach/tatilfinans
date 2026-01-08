import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiArrowLeft, FiLogIn, FiUser } from 'react-icons/fi';
import './Bakiye.css';

const Bakiye = ({ onPageChange, user, onLogin, onLogout }) => {
  const [bakiye, setBakiye] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    // Kullanıcı giriş yapmışsa bakiyesini yükle
    if (user && user.isLoggedIn) {
      const savedBakiye = localStorage.getItem('userBakiye');
      if (savedBakiye) {
        setBakiye(parseFloat(savedBakiye));
      } else {
        // İlk girişte mock bakiye oluştur
        const mockBakiye = 50000; // 50.000 TL mock bakiye
        setBakiye(mockBakiye);
        localStorage.setItem('userBakiye', mockBakiye.toString());
      }
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock giriş - herhangi bir email/password ile giriş yapılabilir
    const mockUser = {
      email: loginForm.email || 'kullanici@example.com',
      name: 'Kullanıcı',
      isLoggedIn: true
    };
    
    onLogin(mockUser);
    setShowLoginForm(false);
    setLoginForm({ email: '', password: '' });
    
    // Mock bakiye oluştur
    const mockBakiye = 50000;
    setBakiye(mockBakiye);
    localStorage.setItem('userBakiye', mockBakiye.toString());
  };

  const handleLogout = () => {
    onLogout();
    setBakiye(0);
  };

  const formatPara = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bakiye-page">
      <div className="bakiye-container">
        <button onClick={() => onPageChange('home')} className="back-button">
          <FiArrowLeft /> Ana Sayfaya Dön
        </button>

        {!user || !user.isLoggedIn ? (
          <div className="login-section">
            <div className="login-card">
              <FiUser className="login-icon" />
              <h2>Giriş Yapın</h2>
              <p>Bakiyenizi görmek için giriş yapmanız gerekiyor.</p>
              
              {!showLoginForm ? (
                <button 
                  className="login-btn"
                  onClick={() => setShowLoginForm(true)}
                >
                  <FiLogIn /> Giriş Yap
                </button>
              ) : (
                <form onSubmit={handleLogin} className="login-form">
                  <div className="form-group">
                    <label>E-posta</label>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Şifre</label>
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="Şifrenizi girin"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-btn">
                      Giriş Yap
                    </button>
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setShowLoginForm(false)}
                    >
                      İptal
                    </button>
                  </div>
                  <p className="login-hint">
                    * Mock giriş: Herhangi bir e-posta ve şifre ile giriş yapabilirsiniz
                  </p>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="bakiye-content">
            <div className="bakiye-header">
              <h1>Hesap Bakiyesi</h1>
              <button className="logout-btn" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>

            <div className="bakiye-kart">
              <div className="bakiye-icon-wrapper">
                <FiDollarSign className="bakiye-icon" />
              </div>
              <div className="bakiye-bilgi">
                <p className="bakiye-label">Mevcut Bakiye</p>
                <h2 className="bakiye-tutar">{formatPara(bakiye)} ₺</h2>
              </div>
            </div>

            <div className="bakiye-detaylar">
              <div className="detay-kart">
                <h3>Bakiye Bilgileri</h3>
                <div className="detay-item">
                  <span className="detay-label">Kullanıcı:</span>
                  <span className="detay-value">{user.name || user.email}</span>
                </div>
                <div className="detay-item">
                  <span className="detay-label">E-posta:</span>
                  <span className="detay-value">{user.email}</span>
                </div>
                <div className="detay-item">
                  <span className="detay-label">Bakiye Durumu:</span>
                  <span className={`detay-value ${bakiye > 0 ? 'positive' : 'zero'}`}>
                    {bakiye > 0 ? 'Aktif' : 'Bakiye Yok'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bakiye;

