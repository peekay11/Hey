import React, { useState } from 'react';
import { ApiService } from '../services/api';
import { MOCK_USER } from '../data/mockData';

const ComposePost = ({ onPostCreated, isModal = false }) => {
  const [userText, setUserText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Media attachments mock state
  const [attachedImage, setAttachedImage] = useState(null);
  const [showPoll, setShowPoll] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleSubmit = async () => {
    if (!userText.trim() && !attachedImage && !showPoll) return;
    
    setIsSubmitting(true);
    try {
      await ApiService.posts.createPost({ text: `@Hey ${userText.trim()}` });
      setUserText('');
      setAttachedImage(null);
      setShowPoll(false);
      setShowLocation(false);
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
      setUserText(val.replace(/^@?H?e?y?\s*/i, ''));
    }
  };

  const addEmoji = () => setUserText(prev => prev + ' 😊');
  const addImageMock = () => setAttachedImage('https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');

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

        {/* Media Attachments Preview */}
        {attachedImage && (
          <div style={{ position: 'relative', marginTop: '0.5rem' }}>
            <img src={attachedImage} alt="Attachment" style={{ width: '100%', borderRadius: 'var(--radius-md)', maxHeight: '200px', objectFit: 'cover' }} />
            <button onClick={() => setAttachedImage(null)} aria-label="Remove image" style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }} aria-hidden="true">close</span>
            </button>
          </div>
        )}

        {showPoll && (
          <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="text" placeholder="Choice 1" aria-label="Poll choice 1" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--divider)', borderRadius: 'var(--radius-sm)' }} />
            <input type="text" placeholder="Choice 2" aria-label="Poll choice 2" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--divider)', borderRadius: 'var(--radius-sm)' }} />
            <button onClick={() => setShowPoll(false)} style={{ color: '#f91880', background: 'none', border: 'none', textAlign: 'center', marginTop: '0.5rem', fontWeight: 'bold' }}>Remove poll</button>
          </div>
        )}

        {showLocation && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }} aria-hidden="true">location_on</span>
            Johannesburg, ZA
            <button onClick={() => setShowLocation(false)} aria-label="Remove location" style={{ background: 'none', border: 'none', color: 'inherit', marginLeft: 'auto', padding: 0, display: 'flex' }}><span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }} aria-hidden="true">close</span></button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--divider)', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--primary-color)' }}>
            <button onClick={addImageMock} aria-label="Add image" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">image</span></button>
            <button onClick={addImageMock} aria-label="Add GIF" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">gif_box</span></button>
            <button onClick={() => setShowPoll(true)} aria-label="Add poll" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">poll</span></button>
            <button onClick={addEmoji} aria-label="Add emoji" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">sentiment_satisfied</span></button>
            <button onClick={() => setShowLocation(true)} aria-label="Add location" style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', padding: 0 }}><span className="material-symbols-outlined" aria-hidden="true">location_on</span></button>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={(!userText.trim() && !attachedImage && !showPoll) || isSubmitting}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: ((!userText.trim() && !attachedImage && !showPoll) || isSubmitting) ? 'not-allowed' : 'pointer',
              opacity: ((!userText.trim() && !attachedImage && !showPoll) || isSubmitting) ? 0.5 : 1
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
