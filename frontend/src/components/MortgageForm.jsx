import React from 'react';
import { FaRegCalendarCheck, FaRubleSign } from 'react-icons/fa';

const mortgageData = [
  {
    id: 1,
    title: 'Период службы 2020-2023',
    subtitle: 'Сумма накоплений: 1 200 000 ₽',
    icon: <FaRegCalendarCheck size={28} color="#1DB954" />,
    action: 'Подробнее',
  },
  {
    id: 2,
    title: 'Период службы 2017-2020',
    subtitle: 'Сумма накоплений: 950 000 ₽',
    icon: <FaRegCalendarCheck size={28} color="#1DB954" />,
    action: 'Подробнее',
  },
  {
    id: 3,
    title: 'Выплата по ипотеке',
    subtitle: 'Последний платёж: 120 000 ₽',
    icon: <FaRubleSign size={28} color="#1DB954" />,
    action: 'История',
  },
];

function MortgageForm() {
  return (
    <div className="card-list">
      {mortgageData.map(item => (
        <div className="card-item" key={item.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {item.icon}
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{item.title}</div>
              <div style={{ color: '#b3c7e6', fontSize: 13, marginTop: 2 }}>{item.subtitle}</div>
            </div>
          </div>
          <button className="secondary-btn" style={{ minWidth: 90 }}>{item.action}</button>
        </div>
      ))}
    </div>
  );
}

export default MortgageForm;