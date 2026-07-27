import React from 'react';
import { MOCK_ALERTS } from '../data/mockData';
import '../components/Post.css'; // Reuse some card styles

const Alerts = () => {
  return (
    <div className="alerts-page">
      <div className="feed-header">
        <h2>Notifications</h2>
      </div>
      <div className="feed" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: alert.read ? 0.7 : 1 }}>
            <img src={alert.avatar} alt={alert.user} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <p>
                <strong>{alert.user}</strong> {alert.content}
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{alert.time}</span>
            </div>
            {!alert.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
