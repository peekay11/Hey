import React from 'react';
import { useAlerts } from '../hooks/useApi';
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
  const { alerts, loading } = useAlerts();

  return (
    <div className="alerts-page">
      <div className="feed-header">
        <h2>Notifications</h2>
      </div>
      <div className="feed" style={{ padding: 'var(--space-md)' }}>
        {loading ? (
          <div className="empty-state">
            <div className="spinner"></div>
            <p>Loading alerts...</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {alerts.map((alert, index) => (
            <div key={alert.id} className="alert-card" style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '1rem', 
              opacity: alert.read ? 0.75 : 1,
              cursor: 'pointer',
              padding: '1rem 1.25rem',
              borderBottom: index === alerts.length - 1 ? 'none' : '1px solid var(--divider)',
              backgroundColor: alert.read ? 'transparent' : 'var(--primary-light)',
              transition: 'background-color 0.2s'
            }}>
              <div style={{ width: '30px', display: 'flex', justifyContent: 'flex-end', paddingTop: '2px' }}>
                {getAlertIcon(alert.type)}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <img src={alert.avatar} alt={alert.user} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                <p style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                  <strong style={{ color: 'var(--text-main)' }}>{alert.user}</strong> <span style={{ color: 'var(--text-main)' }}>{alert.content}</span>
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{alert.time}</span>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
