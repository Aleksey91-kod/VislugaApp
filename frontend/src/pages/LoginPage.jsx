import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/profile');
  };

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Вход</h2>
      <input type="text" placeholder="Фамилия" style={{ padding: 8, width: 200, marginBottom: 16 }} /><br />
      <button onClick={handleLogin} style={{ padding: '10px 32px', borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none', fontSize: 16 }}>
        Войти
      </button>
    </div>
  );
}

export default LoginPage;