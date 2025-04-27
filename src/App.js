import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import InterestSelection from './components/InterestSelection';
import ForgotPassword from './components/ForgotPassword';
import ProfileCustomization from './components/ProfileCustomization';
import MessagesPage from './components/MessagesPage';
import EventCreation from './components/EventCreation';
import ProfileEdit from './components/ProfileEdit';
import SavedInterests from './components/SavedInterests';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/saved-interests" element={<SavedInterests />} />
            <Route path="/interests" element={<InterestSelection />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<ProfileCustomization />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/create-event" element={<EventCreation />} />
        </Routes>
    );
}

export default App;