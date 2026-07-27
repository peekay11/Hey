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
  reposts: initialReposts,
  status, 
  boosted,
  isExpanded,
  onToggleReplies
}) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasSaved, setHasSaved] = useState(false);
  const [particles, setParticles] = useState([]); // Array of particle objects {id, icon, x, y}
  
  const triggerParticles = (iconType, count = 6) => {
    const newParticles = [...Array(count)].map(() => ({
      id: Math.random().toString(36).substring(7),
      icon: iconType,
      tx: (Math.random() - 0.5) * 80,
      ty: -Math.random() * 80 - 20,
      rot: (Math.random() - 0.5) * 90,
      delay: Math.random() * 0.1
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const handleUpvote = () => {
    playPopSound();
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      triggerParticles('favorite');
    }
  };

  const [hasReposted, setHasReposted] = useState(false);
  const [reposts, setReposts] = useState(initialReposts || 0);

  const handleRepost = () => {
    playPopSound();
    if (hasReposted) {
      setReposts(prev => prev - 1);
      setHasReposted(false);
    } else {
      setReposts(prev => prev + 1);
      setHasReposted(true);
      triggerParticles('repeat');
    }
  };

  const handleSave = () => {
    playPopSound();
    if (hasSaved) {
      setHasSaved(false);
    } else {
      setHasSaved(true);
      triggerParticles('bookmark');
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
          className={`btn-action-icon ${hasUpvoted ? 'active-action' : ''}`}
          onClick={handleUpvote}
        >
          <span className="material-symbols-outlined">{hasUpvoted ? 'favorite' : 'favorite_border'}</span>
          <span>{upvotes}</span>
        </button>
        
        <button className="btn-action-icon" onClick={onToggleReplies}>
          <span className="material-symbols-outlined">chat_bubble_outline</span>
          <span>{replyCount}</span>
        </button>

        <button 
          className={`btn-action-icon ${hasReposted ? 'active-action' : ''}`}
          onClick={handleRepost}
        >
          <span className="material-symbols-outlined">repeat</span>
          <span>{reposts}</span>
        </button>

        <button className="btn-action-icon">
          <span className="material-symbols-outlined">send</span>
        </button>

        <button 
          className={`btn-action-icon ${hasSaved ? 'active-action' : ''}`}
          onClick={handleSave}
          style={{ marginLeft: 'auto' }}
        >
          <span className="material-symbols-outlined">{hasSaved ? 'bookmark' : 'bookmark_border'}</span>
        </button>
        
        {/* Particle Overlay for the entire bar to share */}
        {particles.length > 0 && (
          <div className="particle-container" style={{ left: particles[0].icon === 'favorite' ? '15px' : 'calc(100% - 30px)' }}>
            {particles.map((p) => (
              <span 
                key={p.id} 
                className="material-symbols-outlined particle icon-filled"
                style={{
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  '--rot': `${p.rot}deg`,
                  animationDelay: `${p.delay}s`
                }}
              >
                {p.icon}
              </span>
            ))}
          </div>
        )}
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
