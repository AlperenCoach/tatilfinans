import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiMinimize2, FiMaximize2, FiMail, FiPhone, FiUser, FiMessageSquare } from 'react-icons/fi';
import './DraggableContactForm.css';

const DraggableContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 350, y: 100 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const formRef = useRef(null);
  const headerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && formRef.current) {
        const formWidth = formRef.current.offsetWidth;
        const formHeight = formRef.current.offsetHeight;
        const maxX = window.innerWidth - formWidth;
        const maxY = window.innerHeight - formHeight;
        
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;
        
        // Ekran sınırlarını kontrol et
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        setPosition({
          x: newX,
          y: newY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    if (headerRef.current && headerRef.current.contains(e.target)) {
      setIsDragging(true);
      const rect = formRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form gönderildi:', formData);
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <button 
        className="contact-form-toggle"
        onClick={toggleForm}
        style={{ 
          right: isOpen ? 'auto' : '20px',
          left: isOpen ? 'auto' : 'auto'
        }}
      >
        <FiMessageSquare />
        <span>Size Biz Ulaşalım</span>
      </button>

      {isOpen && (
        <div
          ref={formRef}
          className={`draggable-contact-form ${isMinimized ? 'minimized' : ''} ${isDragging ? 'dragging' : ''}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`
          }}
        >
          <div
            ref={headerRef}
            className="form-header"
            onMouseDown={handleMouseDown}
          >
            <div className="form-header-content">
              <h3>
                <FiMessageSquare className="header-icon" />
                Size Biz Ulaşalım
              </h3>
            </div>
            <div className="form-header-actions">
              <button
                className="form-action-btn"
                onClick={toggleMinimize}
                title={isMinimized ? 'Büyüt' : 'Küçült'}
              >
                {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
              </button>
              <button
                className="form-action-btn"
                onClick={toggleForm}
                title="Kapat"
              >
                <FiX />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  <FiUser className="input-icon" />
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FiPhone className="input-icon" />
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="05XX XXX XX XX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FiMail className="input-icon" />
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <FiMessageSquare className="input-icon" />
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Gönder
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default DraggableContactForm;

