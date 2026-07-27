import React, { useState } from 'react';
import { playPopSound } from '../utils/sound';
import './Post.css';

const Post = ({ 
  type = 'text',
  author, 
  avatar, 
  text, 
  image,
  images,
  videoUrl,
  pollOptions,
  location, 
  category, 
  timestamp, 
  upvotes: initialUpvotes, 
  replyCount, 
  status, 
  boosted,
  isExpanded,
  onToggleReplies
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
    if (content && content.startsWith('@Hey')) {
      return (
        <>
          <span className="brand-hey-text">@Hey</span>
          {content.substring(4)}
        </>
      );
    }
    return content;
  };

  const [pollVoted, setPollVoted] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'gallery':
        return (
          <>
            <p className="post-text">{renderText(text)}</p>
            <div className="post-gallery">
              {images.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i}`} className="post-gallery-img" />
              ))}
            </div>
          </>
        );
      case 'reel':
        return (
          <>
            <p className="post-text">{renderText(text)}</p>
            <div className="post-reel-container">
              <video 
                src={videoUrl} 
                className="post-reel-video" 
                controls 
                loop 
                muted 
                playsInline
                poster={image}
              />
            </div>
          </>
        );
      case 'poll':
        return (
          <>
            <p className="post-text">{renderText(text)}</p>
            <div className="post-poll-container">
              {pollOptions.map((opt, i) => (
                <button 
                  key={i} 
                  className={`poll-option ${pollVoted ? 'poll-voted' : ''}`}
                  onClick={() => { playPopSound(); setPollVoted(true); }}
                  disabled={pollVoted}
                >
                  <span className="poll-option-text">{opt.text}</span>
                  {pollVoted && <span className="poll-option-percent">{opt.percent}%</span>}
                  {pollVoted && <div className="poll-progress" style={{width: `${opt.percent}%`}}></div>}
                </button>
              ))}
              <span className="poll-total-votes">{pollVoted ? '1,204 votes' : 'Poll ends in 2 days'}</span>
            </div>
          </>
        );
      case 'text':
      default:
        return (
          <>
            <p className="post-text">{renderText(text)}</p>
            {image && (
              <div className="post-image-container">
                <img src={image} alt="Post attachment" className="post-image" />
              </div>
            )}
          </>
        );
    }
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
      </div>
      
      <div className="post-content">
        {renderContent()}
      </div>

      <div className="post-tags">
        <span className="tag tag-category">
          {category}
        </span>
        {boosted && <span className="tag tag-boosted">Boosted</span>}
      </div>

      <div className="post-action-bar">
        <button 
          className={`btn-action-icon ${hasUpvoted ? 'active-upvote' : ''}`}
          onClick={handleUpvote}
        >
          <span className="material-symbols-outlined">{hasUpvoted ? 'favorite' : 'favorite_border'}</span>
          <span>{upvotes}</span>
        </button>
        
        <button className="btn-action-icon" onClick={onToggleReplies}>
          <span className="material-symbols-outlined">chat_bubble_outline</span>
          <span>{replyCount}</span>
        </button>
      </div>

      {isExpanded && (
        <div className="post-reply-input">
          <input type="text" placeholder="Write a reply..." />
          <button className="btn-submit-arrow">
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
