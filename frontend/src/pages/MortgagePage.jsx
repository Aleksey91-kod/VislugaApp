import React, { useState } from 'react';
import useNisData from '../hooks/useNisData';

// Функция для расчёта накоплений по периоду
function calcNisSum(start, end, nisData) {
  if (!start || !end || !nisData || Object.keys(nisData).length === 0) return 0;
  let total = 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  let year = startDate.getFullYear();
  while (year <= endDate.getFullYear()) {
    const yearStart = new Date(Math.max(startDate, new Date(year, 0, 1)));
    const yearEnd = new Date(Math.min(endDate, new Date(year, 11, 31)));
    const days = (yearEnd - yearStart) / (1000 * 60 * 60 * 24) + 1;
    const daysInYear = ((new Date(year, 11, 31) - new Date(year, 0, 1)) / (1000 * 60 * 60 * 24)) + 1;
    if (nisData[year]) {
      total += nisData[year] * (days / daysInYear);
    }
    year++;
  }
  return Math.round(total);
}

// Генерация графика платежей
function generatePaymentSchedule(takeDate, amount, percent, nisData) {
  if (!takeDate || !amount || !percent || !nisData || Object.keys(nisData).length === 0) return [];
  const schedule = [];
  let left = parseFloat(amount);
  let current = new Date(takeDate);
  const today = new Date();
  let i = 1;
  while (current <= today && left > 0 && i < 1000) {
    const year = current.getFullYear();
    const nisPerYear = nisData[year] || 0;
    const nisPerMonth = nisPerYear / 12;
    const monthPercent = parseFloat(percent) / 12 / 100;
    const interest = left * monthPercent;
    const principal = nisPerMonth - interest;
    left = left * (1 + monthPercent) - nisPerMonth;
    schedule.push({
      date: current.toLocaleDateString('ru-RU'),
      nis: Math.round(nisPerMonth),
      interest: Math.round(interest),
      principal: Math.round(principal > 0 ? principal : 0),
      left: Math.round(left > 0 ? left : 0),
    });
    current.setMonth(current.getMonth() + 1);
    i++;
  }
  return schedule;
}

function MortgagePage() {
  const nisData = useNisData();

  // Блок 1: накопления по НИС
  const [nisStart, setNisStart] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  // Проверка на минимальную дату НИС
  const nisMinDate = '2005-01-01';
  const nisStartValid = !nisStart || nisStart >= nisMinDate;

  const sum = nisStart && nisStartValid && nisData && Object.keys(nisData).length
    ? calcNisSum(nisStart, today, nisData)
    : 0;

  // Блок 2: ипотека
  const [mortgageDate, setMortgageDate] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgagePercent, setMortgagePercent] = useState('');
  const mortgageLeft = mortgageDate && mortgageAmount && mortgagePercent && nisData && Object.keys(nisData).length
    ? generatePaymentSchedule(mortgageDate, mortgageAmount, mortgagePercent, nisData).at(-1)?.left || 0
    : '';

  // Модальные окна
  const [showSchedule, setShowSchedule] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // График платежей
  const paymentSchedule = mortgageDate && mortgageAmount && mortgagePercent && nisData && Object.keys(nisData).length
    ? generatePaymentSchedule(mortgageDate, mortgageAmount, mortgagePercent, nisData)
    : [];

  // --- Карточка 3: накопления после выплаты ипотеки ---
  const payoffIdx = paymentSchedule.findIndex(row => row.left === 0);
  const payoffDate = payoffIdx !== -1 ? paymentSchedule[payoffIdx].date : null;
  let nisAfterPayoff = 0;
  if (payoffDate) {
    const [d, m, y] = payoffDate.split('.');
    const payoffISO = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
    const nextDay = new Date(payoffISO);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayISO = nextDay.toISOString().slice(0,10);
    nisAfterPayoff = calcNisSum(nextDayISO, today, nisData);
  }

  // --- Стили для мобильной адаптивности ---
  const mobileCardStyle = {
    maxWidth: 420,
    width: '100%',
    margin: '0 auto 14px auto',
    textAlign: 'center',
    boxSizing: 'border-box',
    padding: '12px 6px',
    borderRadius: 14,
    boxShadow: '0 2px 8px 0 rgba(20,40,80,0.10)',
    background: '#fff',
  };

  const mobileInputStyle = {
    width: '100%',
    marginTop: 4,
    padding: 10,
    borderRadius: 8,
    border: '1.5px solid #b3c7e6',
    fontSize: 15,
    background: '#f4f8ff',
    color: '#23395d',
    fontWeight: 500,
    boxSizing: 'border-box'
  };

  const mobileLabelStyle = {
    width: '100%',
    textAlign: 'left',
    fontSize: 13,
    marginBottom: 2,
  };

  const mobileButtonStyle = {
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 0',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    width: '100%',
    marginBottom: 0,
    marginTop: 0,
    boxShadow: '0 2px 8px 0 #1DB95433',
    transition: 'background 0.2s',
  };

  // --- Медиа-запросы для мобильных (через встроенный style) ---
  // Можно вынести в отдельный css, но для простоты делаем inline

  return (
    <div style={{
      padding: 0,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #23395d 0%, #1DB954 100%)'
    }}>
      <style>
        {`
        @media (max-width: 600px) {
          .card-light {
            max-width: 98vw !important;
            padding: 10px 2vw !important;
            border-radius: 10px !important;
            font-size: 14px !important;
          }
          .card-light input, .card-light button {
            font-size: 15px !important;
            padding: 10px 8px !important;
          }
          .card-light label {
            font-size: 13px !important;
          }
        }
        `}
      </style>
      <h2 style={{ color: '#fff', marginBottom: 10, fontSize: 20, marginTop: 10 }}>Военная ипотека</h2>
      {/* Карточка 1: накопления по НИС */}
      <div className="card-light" style={mobileCardStyle}>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Накопления по НИС</div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', width: '100%' }}>
          <label style={mobileLabelStyle}>
            Дата вступления в НИС:
            <input
              type="date"
              value={nisStart}
              onChange={e => setNisStart(e.target.value)}
              style={mobileInputStyle}
            />
          </label>
        </form>
        <div style={{ marginTop: 8, fontSize: 16, color: nisStart && !nisStartValid ? '#ff4d4f' : '#1DB954', fontWeight: 700 }}>
          {!nisStart
            ? 'Введите дату вступления в НИС'
            : !nisStartValid
              ? 'НИС действует с 1 января 2005 года'
              : `Накоплено: ${sum.toLocaleString()} ₽`}
        </div>
        {nisStart && nisStartValid && (
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
            *Без учёта инвестиционного дохода
          </div>
        )}
      </div>
      {/* Карточка 2: ипотека */}
      <div className="card-light" style={mobileCardStyle}>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Остаток по ипотеке</div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', width: '100%' }}>
          <label style={mobileLabelStyle}>
            Дата взятия ипотеки:
            <input
              type="date"
              value={mortgageDate}
              onChange={e => setMortgageDate(e.target.value)}
              style={mobileInputStyle}
            />
          </label>
          <label style={mobileLabelStyle}>
            Сумма ипотеки (₽):
            <input
              type="number"
              min="0"
              value={mortgageAmount}
              onChange={e => setMortgageAmount(e.target.value)}
              style={mobileInputStyle}
            />
          </label>
          <label style={mobileLabelStyle}>
            Процент по кредиту (% годовых):
            <input
              type="number"
              min="0"
              step="0.01"
              value={mortgagePercent}
              onChange={e => setMortgagePercent(e.target.value)}
              style={mobileInputStyle}
            />
          </label>
        </form>
        <div style={{ marginTop: 8, fontSize: 16, color: '#1DB954', fontWeight: 700 }}>
          {mortgageLeft !== '' && mortgageDate && mortgageAmount && mortgagePercent
            ? `Остаток: ${mortgageLeft.toLocaleString()} ₽`
            : 'Введите все данные для расчёта'}
        </div>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => setShowSchedule(true)}
            style={mobileButtonStyle}
            disabled={paymentSchedule.length === 0}
          >
            График платежей
          </button>
          <button
            onClick={() => setShowHistory(true)}
            style={{ ...mobileButtonStyle, background: '#b3c7e6', color: '#23395d', boxShadow: '0 2px 8px 0 #1DB95422' }}
            disabled={paymentSchedule.length === 0}
          >
            История
          </button>
        </div>
      </div>
      {/* Карточка 3: накопления после выплаты ипотеки */}
      {payoffDate && nisAfterPayoff > 0 && (
        <div className="card-light" style={{
          ...mobileCardStyle,
          background: 'linear-gradient(135deg, rgba(29,185,84,0.18), rgba(255,255,255,0.7))',
          boxShadow: '0 2px 8px 0 rgba(29,185,84,0.13)',
          margin: '14px auto 0 auto'
        }}>
          <div style={{ marginBottom: 6, fontSize: 14 }}>Накоплено по НИС после выплаты ипотеки</div>
          <div style={{ fontSize: 20, color: '#1DB954', fontWeight: 700 }}>{nisAfterPayoff.toLocaleString()} ₽</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Без учёта инвестиционного дохода</div>
        </div>
      )}
      {/* Модальное окно: график платежей */}
      {showSchedule && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', color: '#23395d', borderRadius: 12, padding: 10, minWidth: '90vw', maxWidth: 420, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 8px 32px 0 rgba(20,40,80,0.37)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: 16 }}>График платежей</h3>
            <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Мес</th>
                  <th>Дата</th>
                  <th>НИС</th>
                  <th>Проц</th>
                  <th>Погаш</th>
                  <th>Ост</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((row, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#f4f8ff' : '#fff' }}>
                    <td>{idx + 1}</td>
                    <td>{row.date}</td>
                    <td>{row.nis.toLocaleString()}</td>
                    <td>{row.interest.toLocaleString()}</td>
                    <td>{row.principal.toLocaleString()}</td>
                    <td>{row.left.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowSchedule(false)} style={{ ...mobileButtonStyle, marginTop: 10 }}>Закрыть</button>
          </div>
        </div>
      )}
      {/* Модальное окно: история */}
      {showHistory && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', color: '#23395d', borderRadius: 12, padding: 10, minWidth: '90vw', maxWidth: 420, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 8px 32px 0 rgba(20,40,80,0.37)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: 16 }}>История</h3>
            <ul style={{ paddingLeft: 12, fontSize: 13 }}>
              {paymentSchedule.map((row, idx) => (
                <li key={idx}>
                  {row.date}: Выплата {row.nis.toLocaleString()} ₽, остаток {row.left.toLocaleString()} ₽
                </li>
              ))}
            </ul>
            <button onClick={() => setShowHistory(false)} style={{ ...mobileButtonStyle, marginTop: 10 }}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MortgagePage;