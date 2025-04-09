import React, { useState } from 'react';
import './InterestSelection.css';

function InterestSelection() {
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = [
        { id: 1, name: 'Mizah' },
        { id: 2, name: 'Stand-up' },
        { id: 3, name: 'Spor' },
        { id: 4, name: 'Fitness' },
        { id: 5, name: 'Macera' },
        { id: 6, name: 'Kişisel Gelişim' },
        { id: 7, name: 'Resim & Dijital Sanat' },
        { id: 8, name: 'Müzik' },
        { id: 9, name: 'Fotoğrafçılık' },
        { id: 10, name: 'Girişimcilik' },
        { id: 11, name: 'Finans & Yatırım' },
        { id: 12, name: 'Dil Öğrenimi' },
        { id: 13, name: 'Psikoloji' },
        { id: 14, name: 'Astronomi' },
        { id: 15, name: 'Yapay Zeka' },
        { id: 16, name: 'Yazılım' },
        { id: 17, name: 'Teknoloji' },
        { id: 18, name: 'Bilim' },
        { id: 19, name: 'Biyoteknoloji & Genetik' },
        { id: 20, name: 'Gastronomi' },
        { id: 21, name: 'Mühendislik' },
        { id: 22, name: 'Sağlık' },
        { id: 23, name: 'Dans' },
        { id: 24, name: 'Yazarlık' }
    ];

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleContinue = () => {
        console.log('Seçilen ilgi alanları:', selectedInterests);
        // İlerleme işlemleri burada yapılacak
    };

    return (
        <div className="interests-container">
            <div className="interests-content">
                <h1 className="interests-title">İlgi Alanlarını Seç</h1>
                
                <div className="interests-grid">
                    {interests.map((interest) => (
                        <button
                            key={interest.id}
                            className={`interest-tag ${selectedInterests.includes(interest.name) ? 'selected' : ''}`}
                            onClick={() => toggleInterest(interest.name)}
                        >
                            # {interest.name}
                        </button>
                    ))}
                </div>

                <button className="continue-button" onClick={handleContinue}>
                    İlerle
                </button>
            </div>
        </div>
    );
}

export default InterestSelection;
