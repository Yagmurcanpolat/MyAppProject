import React from 'react';

function ProfileCustomization() {
    return (
        <div className="profile-customization">
            <h1>Profilinizi Kişiselleştirin</h1>
            <p>Bize kendinizden bahsedin! Örn: mühendislik öğrencisiyim, kedi sahibiyim, dans etmeyi severim vb.</p>
            <textarea placeholder="Kendinizi tanıtın..." className="profile-textarea"></textarea>
            <button className="continue-button">İlerle</button>
        </div>
    );
}

export default ProfileCustomization;
