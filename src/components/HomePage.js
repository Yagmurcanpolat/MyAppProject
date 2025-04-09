import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const events = [
        {
            id: 1,
            type: 'Çevrimiçi Etkinlik',
            date: '06 NİS 2025 5:45 GMT+3',
            title: 'Etkinlik 1',
            organizer: 'Wellness Group',
            location: 'İstanbul, TR',
            participants: 4,
            isRecommended: true,
            image: '🧘‍♀️'
        },
        {
            id: 2,
            type: 'Çevrimiçi Etkinlik',
            date: '06 NİS 2025 15:00 GMT+3',
            title: 'etkinlik 2',
            organizer: 'Tech Careers TR',
            location: 'Ankara, TR',
            participants: 585,
            isRecommended: true,
            image: '💻'
        }
    ];

    const generateCalendar = () => {
        const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
        const currentMonth = 'Nisan 2025';
        
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <button className="calendar-nav">◀</button>
                    <h3>{currentMonth}</h3>
                    <button className="calendar-nav">▶</button>
                </div>
                <div className="calendar-days">
                    {days.map(day => <div key={day} className="day-header">{day}</div>)}
                    {/* Calendar cells would be generated here */}
                </div>
            </div>
        );
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <div className="homepage">
            <header className="header">
                <div className="header-content">
                    <a href="/" className="logo">Eventify</a>
                    <div className="search-group">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search for events or groups"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button className="search-button">
                                <span>Q</span>
                            </button>
                        </div>
                        <button className="location-button">
                            Location <span className="dropdown-arrow">▼</span>
                        </button>
                    </div>
                    <div className="header-icons">
                        <button className="icon-button">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#666">
                                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                            </svg>
                        </button>
                        <button className="icon-button">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#666">
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </button>
                        <button className="icon-button">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#666">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                            </svg>
                        </button>
                        <div className="profile-section">
                            <button className="profile-icon" onClick={toggleProfileMenu}>
                                <span>Y</span>
                                <span className="dropdown-arrow">▼</span>
                            </button>
                            {isProfileMenuOpen && (
                                <div className="profile-dropdown">
                                    <a href="/profil">Profili görüntüle</a>
                                    <a href="/sosyal medya profili">Sosyal ağ profiliniz</a>
                                    <a href="/etkinlikler">Etkinlikleriniz</a>
                                    <a href="/katılım puanı">Katılım puanınız</a>
                                    <a href="/gruplar">Gruplarınız</a>
                                    <a href="/ayarlar">Ayarlar</a>
                                    <a href="/yardim">Yardım</a>
                                    <a href="/logout">Oturumu kapat</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <h1 className="welcome-text">Hoş geldiniz👋</h1>
                
                <h2>Yaklaşan etkinlikler</h2>
                
                <div className="filters">
                    <div className="calendar-section">
                        {generateCalendar()}
                        <div className="date-filters">
                            <button className="date-filter active">Bu hafta</button>
                            <button className="date-filter">Bu hafta sonu</button>
                            <button className="date-filter">Gelecek hafta</button>
                        </div>
                    </div>

                </div>

                <h3>Bugün</h3>
                <div className="events-list">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <div className="event-image">{event.image}</div>
                            <div className="event-info">
                                <span className="event-type">{event.type}</span>
                                <span className="event-date">{event.date}</span>
                                <h4 className="event-title">{event.title}</h4>
                                <p className="event-organizer">{event.organizer} • {event.location}</p>
                                <p className="event-participants">{event.participants} katılımcı</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default HomePage;
