import React from 'react';
import './Post.css';

const Post = ({ 
  author, 
  avatar, 
  text, 
  image,
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
          {boosted && <span className="badge badge-boosted"><span className="material-symbols-outlined badge-icon">rocket_launch</span> Boosted</span>}
          <span className={`badge badge-status ${status === 'Answered' ? 'badge-answered' : 'badge-open'}`}>
            {status}
          </span>
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
        <span className="tag tag-location">
          <span className="material-symbols-outlined tag-icon">location_on</span> {location}
        </span>
        <span className="tag tag-category">
          <span className="material-symbols-outlined tag-icon">label</span> {category}
        </span>
      </div>

      <div className="post-footer">
        <button className="btn-action btn-upvote">
          <span className="material-symbols-outlined">thumb_up</span>
          <span className="action-count">{upvotes}</span>
        </button>
        <button className="btn-action btn-reply">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="action-count">{replyCount}</span>
        </button>
        <button className="btn-action btn-share">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
