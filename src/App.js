import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import PhoneBookPage from './pages/PhoneBookPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/phonebook" element={<PhoneBookPage />} />
    </Routes>
  );
}

export default App;
