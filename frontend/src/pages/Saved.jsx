import React from 'react';
import { MOCK_POSTS } from '../data/mockData';
import Post from '../components/Post';

const Saved = () => {
  // Mock just the first 2 posts as being "saved" for now
  const savedPosts = MOCK_POSTS.slice(1, 3);

  return (
    <div className="saved-page">
      <div className="feed-header" style={{ marginBottom: '1rem' }}>
        <h2>Saved Posts</h2>
      </div>
      
      {savedPosts.length > 0 ? (
        <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {savedPosts.map(post => (
            <Post 
              key={post.id}
              {...post}
              replyCount={post.replies?.length || 0}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', marginBottom: '1rem' }}>bookmark_border</span>
          <p>You haven't saved any posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default Saved;
