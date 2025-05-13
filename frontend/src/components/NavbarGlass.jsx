import React from 'react';
import { FaUser, FaHome, FaDonate } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Кабинет', icon: <FaUser size={22} />, path: '/profile' },
  { label: 'Ипотека', icon: <FaHome size={22} />, path: '/mortgage' },
  { label: 'Донат', icon: <FaDonate size={22} />, path: '/donate' },
];

export default function NavbarGlass() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar-glass">
      {navItems.map(item => (
        <div
          key={item.path}
          className={
            'nav-item' + (location.pathname.startsWith(item.path) ? ' active' : '')
          }
          onClick={() => navigate(item.path)}
          style={{ cursor: 'pointer' }}
        >
          {item.icon}
          <span style={{ fontSize: 13, marginTop: 2 }}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}