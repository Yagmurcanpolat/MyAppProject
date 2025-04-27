import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage2.css'; // Aynı CSS'i kullanabiliyoruz

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Giriş yapılıyor:', { email, password, rememberMe });
        
        // Başarılı giriş simülasyonu - normalde bir API çağrısı yapılır
        navigate('/home');
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-posta adresinizi girin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifrenizi girin"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
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

export default LoginPage; 