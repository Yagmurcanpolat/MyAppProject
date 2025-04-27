import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada şifre sıfırlama e-postası gönderme işlemi yapılacak
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="forgot-password-container">
                <div className="forgot-password-card">
                    <h2>E-posta Gönderildi</h2>
                    <p>Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.</p>
                    <Link to="/login" className="back-to-login">
                        Giriş sayfasına dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>Şifremi Unuttum</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-posta:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="E-posta adresinizi girin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="reset-button">
                        Şifremi Sıfırla
                    </button>
                </form>
                <Link to="/login" className="back-to-login">
                    Giriş sayfasına dön
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;