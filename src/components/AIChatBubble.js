import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiMinimize2, FiMaximize2, FiSend, FiMessageSquare, FiZap } from 'react-icons/fi';
import './AIChatBubble.css';

const AIChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: window.innerHeight - 150 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');
  const chatRef = useRef(null);
  const headerRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && chatRef.current) {
        const chatWidth = chatRef.current.offsetWidth;
        const chatHeight = chatRef.current.offsetHeight;
        const maxX = window.innerWidth - chatWidth;
        const maxY = window.innerHeight - chatHeight;
        
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
      const rect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      // Chat açıldığında input'a odaklan
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus();
        }
      }, 100);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleChatClick = () => {
    setMessage('Hayalindeki tatili planla');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Mesaj gönderildi:', message);
      // Burada AI ile iletişim kurulacak
      setMessage('');
    }
  };

  return (
    <>
      {/* AI Chat Bubble Button */}
      <button 
        className="ai-chat-bubble-toggle"
        onClick={toggleChat}
        style={{ 
          right: isOpen ? 'auto' : '100px',
          bottom: isOpen ? 'auto' : '30px',
        }}
      >
        <FiZap className="ai-bubble-icon" />
        {!isOpen && <span className="ai-bubble-pulse"></span>}
      </button>

      {isOpen && (
        <div
          ref={chatRef}
          className={`ai-chat-container ${isMinimized ? 'minimized' : ''} ${isDragging ? 'dragging' : ''}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`
          }}
        >
          <div
            ref={headerRef}
            className="ai-chat-header"
            onMouseDown={handleMouseDown}
          >
            <div className="ai-chat-header-content">
              <FiZap className="ai-chat-header-icon" />
              <h3>AI Asistan</h3>
            </div>
            <div className="ai-chat-header-actions">
              <button
                className="ai-chat-action-btn"
                onClick={toggleMinimize}
                title={isMinimized ? 'Büyüt' : 'Küçült'}
              >
                {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
              </button>
              <button
                className="ai-chat-action-btn"
                onClick={toggleChat}
                title="Kapat"
              >
                <FiX />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="ai-chat-content">
              <div className="ai-chat-messages">
                <div className="ai-message">
                  <FiMessageSquare className="ai-message-icon" />
                  <div className="ai-message-text">
                    Merhaba! Size nasıl yardımcı olabilirim? Hayalindeki tatili planlamak için chat ekranına tıklayın.
                  </div>
                </div>
              </div>
              <form className="ai-chat-input-form" onSubmit={handleSendMessage}>
                <input
                  ref={chatInputRef}
                  type="text"
                  className="ai-chat-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onClick={handleChatClick}
                  placeholder="Hayalindeki tatili planla..."
                />
                <button type="submit" className="ai-chat-send-btn">
                  <FiSend />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AIChatBubble;

