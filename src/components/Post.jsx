import React from 'react';
import './Post.css';

const Post = ({ 
  author, 
  avatar, 
  text, 
  location, 
  category, 
  timestamp, 
  upvotes, 
  replyCount, 
  status, 
  boosted 
}) => {
  return (
    <div className={`card post ${boosted ? 'post-boosted' : ''}`}>
      <div className="post-header">
        <div className="post-author-info">
          <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="avatar" />
          <div className="post-meta-container">
            <span className="post-author">{author}</span>
            <span className="post-timestamp">{timestamp}</span>
          </div>
        </div>
        <div className="post-badges">
          {boosted && <span className="badge badge-boosted">🚀 Boosted</span>}
          <span className={`badge badge-status ${status === 'Answered' ? 'badge-answered' : 'badge-open'}`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="post-content">
        <p className="post-text">{text}</p>
      </div>

      <div className="post-tags">
        <span className="tag tag-location">📍 {location}</span>
        <span className="tag tag-category">🏷️ {category}</span>
      </div>

      <div className="post-footer">
        <button className="btn-action btn-upvote">
          ▲ <span className="action-count">{upvotes}</span>
        </button>
        <button className="btn-action btn-reply">
          💬 <span className="action-count">{replyCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
