import React, { useState } from 'react';
import useNisData from '../hooks/useNisData';
import useServicePeriods from '../hooks/useServicePeriods';

// ... функции calcService, calcBenefitService, calcNisSum без изменений ...

function calcService(periods) {
  let totalDays = 0;
  periods.forEach(({ start, end }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    totalDays += days;
  });
  const years = Math.floor(totalDays / 365.25);
  const months = Math.floor((totalDays - years * 365.25) / 30.44);
  const days = Math.round(totalDays - years * 365.25 - months * 30.44);
  return { years, months, days, totalDays };
}

function calcBenefitService(periods) {
  let totalDays = 0;
  periods.forEach(({ start, end, coeff }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    totalDays += days * parseFloat(coeff || 1);
  });
  const years = Math.floor(totalDays / 365.25);
  const months = Math.floor((totalDays - years * 365.25) / 30.44);
  const days = Math.round(totalDays - years * 365.25 - months * 30.44);
  return { years, months, days, totalDays };
}

function calcNisSum(periods, nisData) {
  let total = 0;
  periods.forEach(({ start, end }) => {
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
  });
  return Math.round(total);
}

function ProfilePage() {
  const [periods, setPeriods] = useServicePeriods();
  const [form, setForm] = useState({ start: '', end: '', coeff: '1' });
  const [error, setError] = useState('');
  const nisData = useNisData();

  const service = calcService(periods);
  const benefitService = calcBenefitService(periods);

  const nisSum = periods.length && Object.keys(nisData).length
    ? calcNisSum(periods, nisData)
    : 0;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!form.start || !form.end) return;
    if (form.end <= form.start) {
      setError('Дата окончания должна быть позже даты начала!');
      return;
    }
    setPeriods([...periods, form]);
    setForm({ start: '', end: '', coeff: '1' });
    setError('');
  };

  const handleDelete = idx => {
    setPeriods(periods.filter((_, i) => i !== idx));
  };

  const hasBenefit = periods.some(p => parseFloat(p.coeff) > 1);

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
          .card-light input, .card-light button, .card-light select {
            font-size: 15px !important;
            padding: 10px 8px !important;
          }
          .card-light label {
            font-size: 13px !important;
          }
        }
        `}
      </style>
      <h2 style={{ color: '#fff', marginBottom: 10, fontSize: 20, marginTop: 10 }}>Личный кабинет</h2>
      <div className="card-light" style={mobileCardStyle}>
        <div style={{ fontSize: 15, marginBottom: 4, fontWeight: 600 }}>
          Итоговая выслуга:
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          {periods.length === 0
            ? '(Нет данных)'
            : `${service.years} лет ${service.months} мес. ${service.days} дн.`}
        </div>
        {hasBenefit && (
          <div style={{ fontSize: 15, marginTop: 8 }}>
            Льготная выслуга: {benefitService.years} лет {benefitService.months} мес. {benefitService.days} дн.
          </div>
        )}
      </div>
      <form onSubmit={handleAdd} style={{
        marginBottom: 14,
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 180}}>
          <label htmlFor="start" style={{marginBottom: 2, fontSize: 13, color: '#23395d'}}>Начало службы</label>
          <input type="date" name="start" id="start" value={form.start} onChange={handleChange} required style={mobileInputStyle} pattern="\\d{4}-\\d{2}-\\d{2}" placeholder="гггг-мм-дд" />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 180}}>
          <label htmlFor="end" style={{marginBottom: 2, fontSize: 13, color: '#23395d'}}>Окончание службы</label>
          <input type="date" name="end" id="end" value={form.end} onChange={handleChange} required style={mobileInputStyle} pattern="\\d{4}-\\d{2}-\\d{2}" placeholder="гггг-мм-дд" />
        </div>
        <select name="coeff" value={form.coeff} onChange={handleChange} style={mobileInputStyle}>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button type="submit" style={mobileButtonStyle}>Добавить</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <div className="card-light" style={{ ...mobileCardStyle, margin: '0 auto 0 auto', padding: '10px 6px' }}>
        <h4 style={{ fontSize: 15, margin: 0, marginBottom: 8 }}>Периоды службы</h4>
        {periods.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic', fontSize: 13 }}>(Нет периодов)</div>
        ) : (
          <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
            {periods.map((p, i) => (
              <li key={i} className="card-light" style={{
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f8faff',
                borderRadius: 8,
                padding: 8,
                fontSize: 14
              }}>
                <span style={{ color: '#23395d' }}>{p.start} — {p.end} (коэф. {p.coeff})</span>
                <button onClick={() => handleDelete(i)} style={{
                  marginLeft: 'auto',
                  background: '#e5e7eb',
                  color: '#23395d',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer'
                }}>Удалить</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;