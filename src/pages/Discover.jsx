import React from 'react';
import { MOCK_TRENDING, MOCK_POSTS } from '../data/mockData';
import Post from '../components/Post';
import SearchBar from '../components/SearchBar';

const Discover = () => {
  return (
    <div className="discover-page">
      <div className="feed-header" style={{ paddingBottom: '1rem' }}>
        <SearchBar placeholder="Search Hey..." />
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Trending Topics</h3>
        {MOCK_TRENDING.map(trend => (
          <div key={trend.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--divider)' }}>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{trend.category}</p>
              <p style={{ fontWeight: 'bold' }}>{trend.topic}</p>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              {trend.posts} posts
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Suggested For You</h3>
      <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {MOCK_POSTS.slice(0, 3).map(post => (
          <Post 
            key={post.id}
            {...post}
            replyCount={post.replies?.length || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
