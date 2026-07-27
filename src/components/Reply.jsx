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
  isAuthor // indicates if the current user is the poster, to show "Mark Helpful"
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
    <div className={`reply ${isHelpful ? 'reply-helpful' : ''}`}>
      <div className="reply-left">
        <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="reply-avatar" />
      </div>
      <div className="reply-main">
        <div className="reply-header">
          <div className="reply-header-info">
            <span className="reply-author">{author}</span>
            <span className="reply-timestamp">{timestamp}</span>
          </div>
          <button className="btn-icon-only-small">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        <div className="reply-content">
          <p className="reply-text">{text}</p>
          {taggedBusiness && (
            <a href="#" className="reply-tag">
              <span className="material-symbols-outlined tag-icon-small">storefront</span>
              @{taggedBusiness}
            </a>
          )}
        </div>

        <div className="reply-footer">
          <button 
            className={`btn-action-small btn-upvote ${hasUpvoted ? 'active-upvote' : ''}`}
            onClick={handleUpvote}
          >
            <span className={`material-symbols-outlined ${hasUpvoted ? 'icon-filled' : ''}`}>
              thumb_up
            </span>
            <span className="action-count">{upvotes}</span>
          </button>
          
          {isHelpful && (
            <span className="helpful-badge">
              <span className="material-symbols-outlined icon-filled">check_circle</span> Helpful
            </span>
          )}
          
          {!isHelpful && isAuthor && (
            <button className="btn-action-small btn-mark-helpful" onClick={handleMarkHelpful}>
              Mark as Helpful
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
