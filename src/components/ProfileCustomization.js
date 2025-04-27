import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileCustomization() {
    const navigate = useNavigate();

    const handleContinue = () => {
        console.log('İlerle butonuna tıklandı');
        try {
            navigate('/home', { replace: true });
            console.log('Yönlendirme başarılı');
        } catch (error) {
            console.error('Yönlendirme hatası:', error);
        }
    };

    return (
        <div className="profile-customization">
            <h1>Profilinizi Kişiselleştirin</h1>
            <p>Bize kendinizden bahsedin! Örn: mühendislik öğrencisiyim, kedi sahibiyim, dans etmeyi severim vb.</p>
            <textarea placeholder="Kendinizi tanıtın..." className="profile-textarea"></textarea>
            <button 
                className="continue-button" 
                onClick={handleContinue}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                İlerle
            </button>
        </div>
    );
}

export default ProfileCustomization;
