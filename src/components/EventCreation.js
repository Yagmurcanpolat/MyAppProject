import React, { useState } from 'react';
import './EventCreation.css';

function EventCreation() {
    const [eventData, setEventData] = useState({
        title: '',
        type: 'in-person',
        date: '',
        time: '',
        location: '',
        description: '',
        maxParticipants: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada API çağrısı yapılacak
        console.log('Event data:', eventData);
    };

    return (
        <div className="event-creation">
            <h2>Yeni Etkinlik Oluştur</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Etkinlik Başlığı</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Etkinlik Türü</label>
                    <select
                        id="type"
                        name="type"
                        value={eventData.type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="in-person">Yüz yüze</option>
                        <option value="online">Çevrimiçi</option>
                        <option value="hybrid">Hibrit</option>
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Tarih</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={eventData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Saat</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={eventData.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Konum</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        value={eventData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Kategori seçin</option>
                        <option value="technology">Teknoloji</option>
                        <option value="business">İş Dünyası</option>
                        <option value="social">Sosyal</option>
                        <option value="education">Eğitim</option>
                        <option value="arts">Sanat ve Kültür</option>
                        <option value="sports">Spor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Etkinlik Açıklaması</label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxParticipants">Maksimum Katılımcı Sayısı</label>
                    <input
                        type="number"
                        id="maxParticipants"
                        name="maxParticipants"
                        value={eventData.maxParticipants}
                        onChange={handleInputChange}
                        min="1"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Etkinlik Oluştur
                </button>
            </form>
        </div>
    );
}

export default EventCreation;
