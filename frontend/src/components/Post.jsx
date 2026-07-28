import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply';
import { playPopSound, playLikeSound, playRepostSound, playSaveSound } from '../utils/sound';
import './Post.css';

const Post = ({ 
  id,
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
  onToggleReplies,
  onDelete
}) => {
  const navigate = useNavigate();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasSaved, setHasSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [particles, setParticles] = useState([]); // Array of particle objects {id, icon, x, y}
  
  const triggerParticles = (iconType, color, count = 8) => {
    const newParticles = [...Array(count)].map(() => ({
      id: Math.random().toString(36).substring(7),
      icon: iconType,
      color: color,
      tx: (Math.random() - 0.5) * 120, // wider spread
      ty: -Math.random() * 120 - 40,   // float higher
      rot: (Math.random() - 0.5) * 120,
      delay: Math.random() * 0.1
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  };

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      playLikeSound();
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      triggerParticles('favorite', '#f91880');
    }
  };

  const [hasReposted, setHasReposted] = useState(false);
  const [reposts, setReposts] = useState(initialReposts || 0);

  const handleRepost = () => {
    if (hasReposted) {
      setReposts(prev => prev - 1);
      setHasReposted(false);
    } else {
      playRepostSound();
      setReposts(prev => prev + 1);
      setHasReposted(true);
      triggerParticles('repeat', '#00ba7c');
    }
  };

  const handleSave = () => {
    if (hasSaved) {
      setHasSaved(false);
    } else {
      playSaveSound();
      setHasSaved(true);
      triggerParticles('bookmark', '#ffd400');
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
      <div className="post-avatar-badge" onClick={() => navigate(`/user/${author}`)} style={{ cursor: 'pointer' }}>
        <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="avatar-floating" />
      </div>
      
      <div className="post-header">
        <div className="post-author-info" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="post-author" onClick={() => navigate(`/user/${author}`)} style={{ cursor: 'pointer' }}>{author}</span>
          {author !== 'Paseka Dev' && (
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isFollowing ? 'var(--text-muted)' : 'var(--primary-color)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
          <span className="post-timestamp">{timestamp} • {location}</span>
        </div>
        {author === 'Paseka Dev' && (
          <button 
            onClick={() => onDelete && onDelete(id)}
            className="btn-icon-only" 
            style={{ color: '#f91880', marginLeft: 'auto' }}
            title="Delete post"
            aria-label="Delete post"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }} aria-hidden="true">delete</span>
          </button>
        )}
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
          className={`btn-action-icon btn-action-like ${hasUpvoted ? 'active-like' : ''}`}
          onClick={handleUpvote}
          aria-label={hasUpvoted ? "Unlike post" : "Like post"}
        >
          <span className="material-symbols-outlined" aria-hidden="true">favorite</span>
          <span aria-label={`${upvotes} likes`}>{upvotes}</span>
        </button>
        
        <button 
          className="btn-action-icon btn-action-comment" 
          onClick={onToggleReplies}
          aria-label={isExpanded ? "Hide replies" : "Show replies"}
          aria-expanded={isExpanded}
        >
          <span className="material-symbols-outlined" aria-hidden="true">chat_bubble</span>
          <span aria-label={`${replyCount} replies`}>{replyCount}</span>
        </button>

        <button 
          className={`btn-action-icon btn-action-repost ${hasReposted ? 'active-repost' : ''}`}
          onClick={handleRepost}
          aria-label={hasReposted ? "Undo repost" : "Repost"}
        >
          <span className="material-symbols-outlined" aria-hidden="true">repeat</span>
          <span aria-label={`${reposts} reposts`}>{reposts}</span>
        </button>

        <button className="btn-action-icon btn-action-send" aria-label="Share post">
          <span className="material-symbols-outlined" aria-hidden="true">send</span>
        </button>

        <button 
          className={`btn-action-icon btn-action-save ${hasSaved ? 'active-save' : ''}`}
          onClick={handleSave}
          style={{ marginLeft: 'auto' }}
          aria-label={hasSaved ? "Unsave post" : "Save post"}
        >
          <span className="material-symbols-outlined" aria-hidden="true">bookmark</span>
        </button>
        
        {/* Particle Overlay */}
        {particles.length > 0 && (
          <div className="particle-container" style={{ left: particles[0].icon === 'favorite' ? '15px' : particles[0].icon === 'repeat' ? '145px' : 'calc(100% - 30px)' }}>
            {particles.map((p) => (
              <span 
                key={p.id} 
                className="material-symbols-outlined particle icon-filled"
                style={{
                  color: p.color,
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
