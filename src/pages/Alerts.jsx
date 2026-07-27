import React from 'react';
import { MOCK_ALERTS } from '../data/mockData';
import '../components/Post.css'; // Reuse some card styles

const getAlertIcon = (type) => {
  switch (type) {
    case 'like': return <span className="material-symbols-outlined icon-filled" style={{ color: '#f91880', fontSize: '1.5rem' }}>favorite</span>;
    case 'reply': return <span className="material-symbols-outlined icon-filled" style={{ color: '#1d9bf0', fontSize: '1.5rem' }}>chat_bubble</span>;
    case 'repost': return <span className="material-symbols-outlined" style={{ color: '#00ba7c', fontSize: '1.5rem' }}>repeat</span>;
    case 'follow': return <span className="material-symbols-outlined icon-filled" style={{ color: '#1d9bf0', fontSize: '1.5rem' }}>person</span>;
    case 'mention': return <span className="material-symbols-outlined" style={{ color: '#ff6b00', fontSize: '1.5rem' }}>alternate_email</span>;
    default: return <span className="material-symbols-outlined" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>notifications</span>;
  }
};

const Alerts = () => {
  return (
    <div className="alerts-page">
      <div className="feed-header">
        <h2>Notifications</h2>
      </div>
      <div className="feed" style={{ padding: '0 1rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className="card alert-card" style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '1rem', 
            opacity: alert.read ? 0.7 : 1,
            cursor: 'pointer',
            padding: '1.25rem'
          }}>
            <div style={{ width: '30px', display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
              {getAlertIcon(alert.type)}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <img src={alert.avatar} alt={alert.user} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
              <p style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                <strong style={{ color: 'var(--text-main)' }}>{alert.user}</strong> <span style={{ color: 'var(--text-muted)' }}>{alert.content}</span>
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{alert.time}</span>
            </div>
            {!alert.read && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', alignSelf: 'center' }}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
