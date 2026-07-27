import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import Post from '../components/Post';
import SearchBar from '../components/SearchBar';

const Discover = () => {
  const [trending, setTrending] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      ApiService.trending.getTrending(),
      ApiService.posts.getFeed({ limit: 3 })
    ]).then(([trendData, feedData]) => {
      if (isMounted) {
        setTrending(trendData);
        setSuggested(feedData.data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="discover-page">
      <div className="feed-header">
        <SearchBar placeholder="Search Hey..." />
      </div>

      <div className="feed" style={{ padding: 'var(--space-md)' }}>
        {loading ? (
          <div className="empty-state">
            <div className="spinner"></div>
            <p>Loading discovery...</p>
          </div>
        ) : (
          <>
            <div className="card" style={{ padding: '1.25rem 0', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <h3 style={{ padding: '0 1.25rem', marginBottom: '0.75rem', fontSize: '1.3rem', fontWeight: 800 }}>Trending Topics</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {trending.map((trend, index) => (
                  <div 
                    key={trend.id} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '0.75rem 1.25rem',
                      cursor: 'pointer',
                      borderBottom: index === trending.length - 1 ? 'none' : '1px solid var(--divider)',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{trend.category}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>·</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Trending</span>
                      </div>
                      <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>{trend.topic}</p>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, alignSelf: 'flex-start', marginTop: '0.2rem' }}>
                      {trend.posts} posts
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', marginLeft: '0.5rem' }}>Suggested For You</h3>
            <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {suggested.map(post => (
                <Post 
                  key={post.id}
                  {...post}
                  replyCount={post.replies?.length || 0}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;
