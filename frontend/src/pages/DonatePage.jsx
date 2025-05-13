import React, { useState } from 'react';

const TELEGRAM_USERNAME = 'alekseybat9';

function DonatePage() {
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);
  const [voteFunc, setVoteFunc] = useState(0);
  const [voteUX, setVoteUX] = useState(0);

  const handleSend = e => {
    e.preventDefault();
    setSent(true);
    setFeedback('');
  };

  const handleVote = (type, value) => {
    if (type === 'func') setVoteFunc(value);
    if (type === 'ux') setVoteUX(value);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #23395d 0%, #1DB954 100%)',
      padding: 0
    }}>
      <div className="card-light" style={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 8px 0 rgba(20,40,80,0.10)',
        padding: 18,
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 20, marginBottom: 10 }}>Обратная связь</h2>
        <div style={{ fontSize: 15, color: '#23395d', marginBottom: 10 }}>
          Напишите ваши пожелания, замечания или идеи по доработке приложения:
        </div>
        {!sent ? (
          <form onSubmit={handleSend} style={{ marginBottom: 18 }}>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Ваше сообщение..."
              rows={3}
              style={{
                width: '100%',
                borderRadius: 8,
                border: '1.5px solid #b3c7e6',
                padding: 10,
                fontSize: 15,
                resize: 'none',
                marginBottom: 10,
                background: '#f4f8ff',
                color: '#23395d',
                fontWeight: 500,
                boxSizing: 'border-box'
              }}
              required
            />
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#1DB954',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginBottom: 0
              }}
            >
              Отправить
            </button>
          </form>
        ) : (
          <div style={{ color: '#1DB954', fontWeight: 600, marginBottom: 18 }}>
            Спасибо! Ваше сообщение отправлено.
          </div>
        )}

        <div style={{ margin: '18px 0 10px 0', borderTop: '1px solid #eee', paddingTop: 10 }}>
          <div style={{ fontSize: 15, marginBottom: 6 }}>Оцените функционал:</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 10 }}>
            {[1,2,3,4,5].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => handleVote('func', val)}
                style={{
                  background: voteFunc === val ? '#1DB954' : '#e5e7eb',
                  color: voteFunc === val ? '#fff' : '#23395d',
                  border: 'none',
                  borderRadius: 6,
                  width: 34,
                  height: 34,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >{val}</button>
            ))}
          </div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>Оцените удобство:</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {[1,2,3,4,5].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => handleVote('ux', val)}
                style={{
                  background: voteUX === val ? '#1DB954' : '#e5e7eb',
                  color: voteUX === val ? '#fff' : '#23395d',
                  border: 'none',
                  borderRadius: 6,
                  width: 34,
                  height: 34,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >{val}</button>
            ))}
          </div>
          {voteFunc > 0 && voteUX > 0 && (
            <div style={{ color: '#1DB954', fontWeight: 600, marginTop: 10 }}>
              Спасибо за вашу оценку!
            </div>
          )}
        </div>

        {/* Заглушка для доната */}
        <div style={{
          marginTop: 18,
          marginBottom: 0,
          padding: '12px 8px',
          background: 'rgba(255, 245, 157, 0.18)',
          borderRadius: 10,
          border: '1px dashed #ffe58f',
          color: '#b59f3b',
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8
        }}>
          <span role="img" aria-label="donate" style={{ fontSize: 22 }}>💸</span>
          В будущем здесь появится возможность поддержать проект (донат)
        </div>

        <div style={{ marginTop: 18, fontSize: 14, color: '#888' }}>
          Для связи напрямую:<br />
          <a
            href="https://t.me/alekseybat9"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1DB954', textDecoration: 'underline', fontWeight: 600 }}
          >
            Telegram: @alekseybat9
          </a>
        </div>
      </div>
    </div>
  );
}

export default DonatePage;