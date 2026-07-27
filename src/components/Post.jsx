import React, { useState } from 'react';
import { playPopSound } from '../utils/sound';
import './Post.css';

const Post = ({ 
  author, 
  avatar, 
  text, 
  image,
  location, 
  category, 
  timestamp, 
  upvotes: initialUpvotes, 
  replyCount, 
  status, 
  boosted 
}) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className={`card post ${boosted ? 'post-boosted' : ''}`}>
      <div className="post-header">
        <div className="post-author-info">
          <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="avatar" />
          <div className="post-meta-container">
            <span className="post-author">{author}</span>
            <span className="post-timestamp">{timestamp} • {location}</span>
          </div>
        </div>
        <div className="post-right-actions">
          <div className="post-badges">
            {boosted && <span className="badge badge-boosted"><span className="material-symbols-outlined badge-icon">rocket_launch</span></span>}
            <span className={`badge badge-status ${status === 'Answered' ? 'badge-answered' : 'badge-open'}`}>
              {status}
            </span>
          </div>
          <button className="btn-icon-only">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </div>
      
      <div className="post-content">
        <p className="post-text">{text}</p>
        {image && (
          <div className="post-image-container">
            <img src={image} alt="Post attachment" className="post-image" />
          </div>
        )}
      </div>

      <div className="post-tags">
        <span className="tag tag-category">
          <span className="material-symbols-outlined tag-icon">label</span> {category}
        </span>
      </div>

      <div className="post-footer">
        <div className="footer-left">
          <button 
            className={`btn-action btn-upvote ${hasUpvoted ? 'active-upvote' : ''}`}
            onClick={handleUpvote}
          >
            <span className={`material-symbols-outlined ${hasUpvoted ? 'icon-filled' : ''}`}>
              arrow_upward
            </span>
            <span className="action-count">{upvotes}</span>
          </button>
          <button className="btn-action btn-reply">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="action-count">{replyCount}</span>
          </button>
          <button className="btn-action btn-tip">
            <span className="material-symbols-outlined">payments</span>
            <span className="action-label">Tip</span>
          </button>
        </div>
        <div className="footer-right">
          <button className={`btn-action btn-save ${isSaved ? 'active-save' : ''}`} onClick={handleSave}>
            <span className={`material-symbols-outlined ${isSaved ? 'icon-filled' : ''}`}>bookmark</span>
          </button>
          <button className="btn-action btn-share">
            <span className="material-symbols-outlined">ios_share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
