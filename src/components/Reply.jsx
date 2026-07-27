import React, { useState } from 'react';
import { playPopSound } from '../utils/sound';
import './Reply.css';

const Reply = ({
  author,
  avatar,
  text,
  taggedBusiness,
  upvotes: initialUpvotes,
  isHelpful: initialIsHelpful,
  timestamp,
  isAuthor
}) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isHelpful, setIsHelpful] = useState(initialIsHelpful);

  const handleUpvote = () => {
    playPopSound();
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handleMarkHelpful = () => {
    playPopSound();
    setIsHelpful(true);
  };

  return (
    <div className={`reply-card ${isHelpful ? 'reply-helpful' : ''}`}>
      <div className="reply-avatar-badge">
        <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="avatar-floating" />
      </div>
      
      <div className="reply-header">
        <div className="reply-author-info">
          <span className="reply-author">{author}</span>
          <span className="reply-timestamp">{timestamp}</span>
        </div>
        <button className="btn-icon-only">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
        
      <div className="reply-content">
        <p className="reply-text">{text}</p>
        {taggedBusiness && (
          <a href="#" className="reply-tag">
            @{taggedBusiness}
          </a>
        )}
      </div>

      <div className="reply-footer-actions">
        <button 
          className={`btn-reply-action ${hasUpvoted ? 'active-upvote' : ''}`}
          onClick={handleUpvote}
        >
          <span className="material-symbols-outlined">arrow_upward</span> {upvotes}
        </button>
        
        {isHelpful ? (
          <span className="helpful-badge">
            <span className="material-symbols-outlined">check_circle</span> Helpful
          </span>
        ) : isAuthor ? (
          <button className="btn-reply-action" onClick={handleMarkHelpful}>
            Mark as Helpful
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Reply;
