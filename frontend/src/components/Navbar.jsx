import React from 'react';
import { NavLink } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '60px',
  background: 'rgba(200,220,255,0.9)',
  borderTop: '1px solid #e0e0e0',
  position: 'sticky',
  bottom: 0,
  zIndex: 100,
};

const linkStyle = {
  flex: 1,
  textAlign: 'center',
  textDecoration: 'none',
  color: '#4a4a4a',
  fontSize: '14px',
  padding: '8px 0',
};

const activeStyle = {
  color: '#3b82f6',
  fontWeight: 'bold',
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <NavLink to="/profile" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <span role="img" aria-label="Профиль">👤</span><br />Кабинет
      </NavLink>
      <NavLink to="/mortgage" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <span role="img" aria-label="Ипотека">🏠</span><br />Ипотека
      </NavLink>
      <NavLink to="/donate" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        <span role="img" aria-label="Донат">💎</span><br />Донат
      </NavLink>
    </nav>
  );
}

export default Navbar;