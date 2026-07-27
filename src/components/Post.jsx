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

  const renderText = (content) => {
    // If the text starts with "@Hey", wrap the "@Hey" part in a branded span
    if (content.startsWith('@Hey')) {
      return (
        <>
          <span className="brand-hey-text">@Hey</span>
          {content.substring(4)}
        </>
      );
    }
    return content;
  };

  return (
    <div className={`card post ${boosted ? 'post-boosted' : ''}`}>
      <div className="post-avatar-badge">
        <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="avatar-floating" />
      </div>
      
      <div className="post-header">
        <div className="post-author-info">
          <span className="post-author">{author}</span>
          <span className="post-timestamp">{timestamp} • {location}</span>
        </div>
        <button className="btn-icon-only">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      
      <div className="post-content">
        <p className="post-text">{renderText(text)}</p>
        {image && (
          <div className="post-image-container">
            <img src={image} alt="Post attachment" className="post-image" />
          </div>
        )}
      </div>

      <div className="post-tags">
        <span className="tag tag-category">
          {category}
        </span>
        {boosted && <span className="tag tag-boosted">Boosted</span>}
      </div>

      <div className="post-reply-input">
        <input type="text" placeholder="Write a reply..." />
        <button 
          className={`btn-submit-arrow ${hasUpvoted ? 'active-upvote' : ''}`}
          onClick={handleUpvote}
          title="Upvote Post"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
