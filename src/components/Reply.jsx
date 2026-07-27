import React from 'react';
import './Reply.css';

const Reply = ({
  author,
  avatar,
  text,
  taggedBusiness,
  upvotes,
  isHelpful,
  timestamp,
  isAuthor // indicates if the current user is the poster, to show "Mark Helpful"
}) => {
  return (
    <div className={`reply ${isHelpful ? 'reply-helpful' : ''}`}>
      <div className="reply-left">
        <img src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="reply-avatar" />
      </div>
      <div className="reply-main">
        <div className="reply-header">
          <span className="reply-author">{author}</span>
          <span className="reply-timestamp">{timestamp}</span>
        </div>
        
        <div className="reply-content">
          <p className="reply-text">{text}</p>
          {taggedBusiness && (
            <a href="#" className="reply-tag">@{taggedBusiness}</a>
          )}
        </div>

        <div className="reply-footer">
          <button className="btn-action btn-upvote">
            ▲ <span className="action-count">{upvotes}</span>
          </button>
          
          {isHelpful && (
            <span className="helpful-badge">✓ Helpful</span>
          )}
          
          {!isHelpful && isAuthor && (
            <button className="btn-action btn-mark-helpful">
              Mark as Helpful
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
