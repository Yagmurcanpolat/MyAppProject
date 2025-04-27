import React from 'react';
import './ProfileEdit.css';

const ProfileEdit = () => {
  return (
    <div className="profile-edit-container">
      <h1 className="profile-edit-title">Profili Düzenle</h1>
      <p className="profile-notice">Bu bilgi, herkese açık profilinizde görünecek</p>
      
      
      <div className="form-group">
        <label>Ad (gerekli)</label>
        <input type="text" defaultValue="yagmurcanpolat" className="profile-input" />
      </div>
      
      <div className="form-group">
        <label>Yaş</label>
        <input type="number" defaultValue="18" className="profile-input" />
      </div>
      
      <div className="form-group">
        <label>Konumunuz</label>
        <input type="text" defaultValue="Elazig, Türkiye" className="profile-input" />
        <button className="edit-address-button">Adresi düzenle</button>
      </div>
      
      <div className="form-group">
        <label>Biyografi</label>
        <textarea className="bio-textarea" placeholder="Buraya kendinizle ilgili bir şeyler yazın"></textarea>
        <div className="char-counter">250</div>
      </div>
      
      <button className="save-button">Değişiklikleri Kaydet</button>
    </div>
  );
};

export default ProfileEdit;