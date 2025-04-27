import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SavedInterests.css';

const SavedInterests = () => {
  const location = useLocation();
  const savedInterests = location.state?.savedInterests || [];

  return (
    <div className="saved-interests-container">
      <h1 className="saved-interests-title">Kaydedilen İlgi Alanları</h1>

      {savedInterests.length > 0 ? (
        <div className="saved-interests-list">
          {savedInterests.map((interest, index) => (
            <div key={index} className="interest-card">
              <div className="event-image">{interest.image}</div>
              <div className="event-details">
                <h4 className="event-title">{interest.title}</h4>
                <p className="event-date">{interest.date}</p>
                <p className="event-location">{interest.location}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">Henüz kaydedilen bir ilgi alanı yok.</p>
        </div>
      )}

      <Link to="/home" className="back-button">
        Geri Dön
      </Link>
    </div>
  );
};

export default SavedInterests;
