import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage2.css';

function LoginPage2() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Burada API çağrısı yapılacak
            console.log('Giriş denemesi:', formData);
            
            // Başarılı giriş simülasyonu
            navigate('/');
        } catch (err) {
            setError('E-posta veya şifre hatalı');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Eventify</h1>
                    <p>Etkinlikleri Keşfet, Paylaş, Katıl</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="email">E-posta</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-posta adresinizi girin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Şifrenizi girin"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <span>Beni hatırla</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-link">
                            Şifremi Unuttum
                        </Link>
                    </div>

                    <button type="submit" className="login-button">
                        Giriş Yap
                    </button>

                    <div className="register-section">
                        <p>Henüz hesabınız yok mu?</p>
                        <Link to="/register" className="register-link">
                            Hemen Kaydol
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage2;
