import React from 'react';
import ComposePost from './ComposePost';

const ComposeModal = ({ onClose, onPostCreated }) => {
  return (
    <div 
      className="modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        style={{
          width: '90%',
          maxWidth: '600px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--divider)' }}>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--text-main)' }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Compose Post</span>
          <div style={{ width: '24px' }}></div> {/* spacer for centering */}
        </div>
        
        {/* We reuse the ComposePost component but remove its borders for the modal */}
        <ComposePost 
          onPostCreated={onPostCreated} 
          isModal={true}
        />
      </div>
    </div>
  );
};

export default ComposeModal;
