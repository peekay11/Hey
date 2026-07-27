import React, { useState } from 'react';
import { ApiService } from '../services/api';
import { MOCK_USER } from '../data/mockData';

const ComposePost = ({ onPostCreated, isModal = false }) => {
  const [userText, setUserText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!userText.trim()) return;
    
    setIsSubmitting(true);
    try {
      await ApiService.posts.createPost({ text: `@Hey ${userText.trim()}` });
      setUserText('');
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Failed to create post", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.startsWith('@Hey ')) {
      setUserText(val.substring(5));
    } else if (val.startsWith('@Hey')) {
      setUserText(val.substring(4).trimStart());
    } else {
      // If they deleted the prefix or typed over it, capture their input and the prefix stays forced.
      setUserText(val.replace(/^@?H?e?y?\s*/i, ''));
    }
  };

  return (
    <div 
      className={isModal ? "" : "card"} 
      style={{ 
        display: 'flex', 
        gap: '1rem', 
        padding: '1.25rem', 
        marginBottom: isModal ? '0' : '1rem', 
        borderTop: 'none', 
        borderRadius: isModal ? '0 0 var(--radius-lg) var(--radius-lg)' : '0 0 var(--radius-md) var(--radius-md)',
        backgroundColor: isModal ? 'transparent' : 'var(--card-bg)'
      }}
    >
      <img src={MOCK_USER.avatar} alt="You" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <textarea 
          placeholder="What's happening?"
          aria-label="Write a new post"
          value={`@Hey ${userText}`}
          onChange={handleTextChange}
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
            <button aria-label="Add image" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">image</span></button>
            <button aria-label="Add GIF" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">gif_box</span></button>
            <button aria-label="Add poll" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">poll</span></button>
            <button aria-label="Add emoji" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">sentiment_satisfied</span></button>
            <button aria-label="Add location" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">location_on</span></button>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={!userText.trim() || isSubmitting}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: (!userText.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
              opacity: (!userText.trim() || isSubmitting) ? 0.5 : 1
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
