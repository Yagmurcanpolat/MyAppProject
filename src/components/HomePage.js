import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    format, 
    startOfMonth, 
    endOfMonth, 
    eachDayOfInterval, 
    isSameDay, 
    parseISO, 
    subMonths, 
    addMonths 
  } from 'date-fns';
  import { tr } from 'date-fns/locale';
import './HomePage.css';

function HomePage() {
  const [savedInterests, setSavedInterests] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(new Date());
const [filteredEvents, setFilteredEvents] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('Konum Seçin');
    const navigate = useNavigate();

    const turkishCities = [
        'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
        'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
        'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum',
        'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin',
        'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli',
        'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
        'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
        'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt',
        'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük',
        'Kilis', 'Osmaniye', 'Düzce'
    ].sort();

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
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
      
        // Seçilen tarihteki etkinlikleri filtrele
        const filteredEvents = events.filter(event => 
          isSameDay(parseISO(event.date.split(' ')[0]), selectedDate)
        );
      
        return (
          <div className="calendar-container">
            <div className="calendar">
              <div className="calendar-header">
                <button 
                  className="calendar-nav" 
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  aria-label="Önceki ay"
                >
                  ◀
                </button>
                <h3>
                  {format(currentMonth, 'MMMM yyyy', { locale: tr })}
                </h3>
                <button 
                  className="calendar-nav" 
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  aria-label="Sonraki ay"
                >
                  ▶
                </button>
              </div>
              
              <div className="calendar-days">
                {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(day => (
                  <div key={day} className="day-header">{day}</div>
                ))}
              </div>
              
              <div className="calendar-grid">
                {Array.from({ length: (monthStart.getDay() || 7) - 1 }).map((_, i) => (
                  <div key={`empty-start-${i}`} className="calendar-day empty"></div>
                ))}
                
                {calendarDays.map(day => {
                  const dayHasEvent = events.some(event => 
                    isSameDay(parseISO(event.date.split(' ')[0]), day)
                  );
                  
                  return (
                    <div
                      key={day.toString()}
                      className={`
                        calendar-day
                        ${isSameDay(day, new Date()) ? 'today' : ''}
                        ${isSameDay(day, selectedDate) ? 'selected' : ''}
                        ${dayHasEvent ? 'has-event' : ''}
                      `}
                      onClick={() => setSelectedDate(day)}
                    >
                      {format(day, 'd')}
                      {dayHasEvent && <span className="event-dot"></span>}
                    </div>
                  );
                })}
              </div>
              
              <div className="selected-date-info">
                Seçilen Tarih: {format(selectedDate, 'dd.MM.yyyy')}
              </div>
            </div>
      
            {/* Filtrelenmiş etkinlikler bölümü */}
            <div className="events-section">
              <h3 className="events-title">
                {format(selectedDate, 'dd MMMM yyyy', { locale: tr })} Etkinlikleri
                <span className="events-count">({filteredEvents.length})</span>
              </h3>
              
              {filteredEvents.length > 0 ? (
                <div className="events-list">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="event-card">
                      <div className="event-image">{event.image}</div>
                      <div className="event-details">
                        <h4 className="event-title">{event.title}</h4>
                        <p className="event-time">
                          {format(parseISO(event.date), 'HH:mm', { locale: tr })}
                        </p>
                        <p className="event-organizer">{event.organizer}</p>
                        <p className="event-location">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-events">Bu tarihte etkinlik bulunamadı</p>
              )}
            </div>
          </div>
        );
      };
        
    

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleLocationDropdown = () => {
        setIsLocationDropdownOpen(!isLocationDropdownOpen);
    };

    const handleLocationSelect = (city) => {
        setSelectedLocation(city);
        setIsLocationDropdownOpen(false);
    };

    const handleMessagesClick = () => {
        navigate('/messages');
    };
    const handleSaveInterest = (event) => {
      // Eğer etkinlik zaten kaydedilmişse ekleme
      if (!savedInterests.some(savedEvent => savedEvent.id === event.id)) {
          setSavedInterests([...savedInterests, event]);
      }
  };
  
    const handleSavedInterestsClick = () => {
      navigate('/saved-interests', { state: { savedInterests } });
    
  };
  const handleRemoveInterest = (eventId) => {
    // savedInterests'ten etkinliği ID'ye göre sil
    setSavedInterests(savedInterests.filter(event => event.id !== eventId));
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
                                placeholder="Etkinlik veya grup ara"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button className="search-button">
                                <span>🔍</span>
                            </button>
                        </div>
                        <button 
                            className="location-button" 
                            onClick={toggleLocationDropdown}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginLeft: '10px'
                            }}
                        >
                            {selectedLocation} <span className="dropdown-arrow">▼</span>
                        </button>
                        {isLocationDropdownOpen && (
                            <div className="location-dropdown-menu" style={{
                                position: 'absolute',
                                top: '100%',
                                right: '0',
                                width: '250px',
                                maxHeight: '400px',
                                backgroundColor: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                zIndex: 1000,
                                marginTop: '4px'
                            }}>
                                <input 
                                    type="text" 
                                    placeholder="Şehir ara..."
                                    className="city-search"
                                    style={{
                                        width: 'calc(100% - 16px)',
                                        padding: '8px',
                                        margin: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                    onChange={(e) => {
                                        const searchBox = e.target.nextElementSibling;
                                        const searchText = e.target.value.toLowerCase();
                                        const cities = searchBox.getElementsByTagName('div');
                                        
                                        for (let city of cities) {
                                            if (city.textContent.toLowerCase().includes(searchText)) {
                                                city.style.display = 'block';
                                            } else {
                                                city.style.display = 'none';
                                            }
                                        }
                                    }}
                                />
                                <div className="cities-list" style={{
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    padding: '8px 0'
                                }}>
                                    {turkishCities.map((city) => (
                                        <div
                                            key={city}
                                            className="city-item"
                                            onClick={() => handleLocationSelect(city)}
                                            style={{
                                                padding: '8px 16px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                ':hover': {
                                                    backgroundColor: '#f5f5f5'
                                                }
                                            }}
                                        >
                                            {city}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="header-icons">
                        <button className="icon-button" onClick={handleSavedInterestsClick}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#666">
                                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                            </svg>
                        </button>
                        <button className="icon-button" onClick={handleMessagesClick}>
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
                                    <Link to="/profile/edit" onClick={() => setIsProfileMenuOpen(false)}>Profili görüntüle</Link>
                                    <Link to="/social-profile" onClick={() => setIsProfileMenuOpen(false)}>Sosyal ağ profiliniz</Link>
                                    <Link to="/events" onClick={() => setIsProfileMenuOpen(false)}>Etkinlikleriniz</Link>
                                    <Link to="/participation" onClick={() => setIsProfileMenuOpen(false)}>Katılım puanınız</Link>
                                    <Link to="/groups" onClick={() => setIsProfileMenuOpen(false)}>Gruplarınız</Link>
                                    <Link to="/settings" onClick={() => setIsProfileMenuOpen(false)}>Ayarlar</Link>
                                    <Link to="/help" onClick={() => setIsProfileMenuOpen(false)}>Yardım</Link>
                                    <Link to="/logout" onClick={() => setIsProfileMenuOpen(false)}>Oturumu kapat</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <div className="main-header">
                <h1 className="welcome-text">Hoş geldiniz👋</h1>
                <Link to="/create-event" className="create-event-button">
                    + Yeni Etkinlik Oluştur
                </Link>
            </div>
                
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

      <button 
        className="save-interest-button"
        onClick={() => handleSaveInterest(event)}
        style={{
          marginTop: '8px',
          padding: '6px 12px',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Kaydet
      </button>
    </div>
  </div>
))}

                </div>
                <h3>Kaydedilen Etkinlikler</h3>
                {savedInterests.length > 0 ? (
                    <div className="saved-events-list">
                        {savedInterests.map(event => (
                            <div key={event.id} className="saved-event-card">
                                <div className="saved-event-image">{event.image}</div>
                                <div className="saved-event-info">
                                    <h4>{event.title}</h4>
                                    <p>{event.date}</p>
                                    <button 
                                        className="remove-event-button"
                                        onClick={() => handleRemoveInterest(event.id)}
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Henüz kaydedilen etkinlik yok.</p>
                )}
            </main>

        </div>
    );
}

export default HomePage;
