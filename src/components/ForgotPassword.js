import React, { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Şifre sıfırlama bağlantısı gönderildi: ' + email);
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h1>Şifremi Unuttum</h1>
                <div className="input-group">
                    <label>E-posta:</label>
                    <input
                        type="email"
                        placeholder="E-posta adresinizi girin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>
                    Şifremi Sıfırla
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;
