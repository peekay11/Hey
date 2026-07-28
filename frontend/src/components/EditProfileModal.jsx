import React, { useState } from 'react';
import './ComposeModal.css'; // Reusing modal styles

const EditProfileModal = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || 'Johannesburg, SA');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock save profile
    console.log("Saving profile", { name, bio, location });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button 
            type="button" 
            className="icon-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
          <span style={{ fontFamily: '"Agbalumo", system-ui', fontWeight: 400, fontSize: '1.5rem', color: 'var(--primary-color)' }}>Edit Profile</span>
          <div style={{ width: '24px' }}></div>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--divider)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--divider)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', resize: 'none' }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Location</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--divider)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit"
              style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, cursor: 'pointer' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
