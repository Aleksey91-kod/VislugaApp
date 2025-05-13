import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MortgagePage from './pages/MortgagePage';
import DonatePage from './pages/DonatePage';
import NavbarGlass from './components/NavbarGlass';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mortgage" element={<MortgagePage />} />
            <Route path="/donate" element={<DonatePage />} />
          </Routes>
        </div>
        <NavbarGlass />
      </div>
    </Router>
  );
}

export default App;
