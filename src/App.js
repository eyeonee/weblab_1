import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneBookPage from './pages/PhoneBookPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/phonebook" element={<PhoneBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
