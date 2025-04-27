import React from 'react';
import './MessagesPage.css';

const MessagesPage = () => {
  return (
    <div className="messages-container">
      <h1 className="messages-title">Mesajlar</h1>
      <p className="empty-message">Henüz mesajınız yok</p>
      <p className="message-hint">Yeni mesaj yazmak için aşağıdaki kalem simgesini seçin</p>
      
      <button className="compose-button">
        <span className="compose-icon">✏️</span>
      </button>
    </div>
  );
};

export default MessagesPage;