import React, { useState } from 'react';
import { ApiService } from '../services/api';
import { MOCK_USER } from '../data/mockData';

const ComposePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    try {
      await ApiService.posts.createPost({ text });
      setText('');
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Failed to create post", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ display: 'flex', gap: '1rem', padding: '1.25rem', marginBottom: '1rem', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)' }}>
      <img src={MOCK_USER.avatar} alt="You" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <textarea 
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            minHeight: '60px',
            border: 'none',
            resize: 'none',
            fontSize: '1.1rem',
            fontFamily: 'inherit',
            backgroundColor: 'transparent',
            outline: 'none',
            color: 'var(--text-main)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--divider)', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--primary-color)' }}>
            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>image</span>
            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>gif_box</span>
            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>poll</span>
            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>sentiment_satisfied</span>
            <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>location_on</span>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={!text.trim() || isSubmitting}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: (!text.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
              opacity: (!text.trim() || isSubmitting) ? 0.5 : 1
            }}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposePost;
