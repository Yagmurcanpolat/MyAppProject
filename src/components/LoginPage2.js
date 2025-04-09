import React, { useState } from 'react';
import './LoginPage2.css';

function LoginPage2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Giriş denemesi:', { email, password });
    };

    return (
        <div className="login2-container">
            <div className="login2-card">
                <h1 className="login2-title">Eventify</h1>
                
                <div className="login2-form">
                    <div className="form2-group">
                        <label className="form2-label">E-posta:</label>
                        <input
                            type="email"
                            className="form2-input"
                            placeholder="E-posta adresinizi girin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form2-group">
                        <label className="form2-label">Şifre:</label>
                        <input
                            type="password"
                            className="form2-input"
                            placeholder="Şifrenizi girin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="login2-button" onClick={handleSubmit}>
                        Giriş Yap
                    </button>

                    <div className="forgot2-password">
                        <span className="forgot2-text">Şifremi Unuttum?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage2;
