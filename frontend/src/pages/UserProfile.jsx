import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useApi';
import Post from '../components/Post';

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, posts, loading } = useProfile(username);
  const [activeTab, setActiveTab] = useState('Posts');
  const [isFollowing, setIsFollowing] = useState(false);

  if (loading) {
    return (
      <div className="empty-state" style={{ marginTop: '2rem' }}>
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="feed-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="material-symbols-outlined" onClick={() => navigate(-1)} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>arrow_back</span>
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{user.name}</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{posts.length} posts</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '0 0 var(--radius-md) var(--radius-md)', borderTop: 'none', marginBottom: '1rem' }}>
        {/* Banner */}
        <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--primary-light)', backgroundImage: 'url(https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        {/* Profile Info */}
        <div style={{ padding: '0.5rem 1.25rem 1.25rem 1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--card-bg)', marginTop: '-70px', objectFit: 'cover', backgroundColor: '#fff' }} 
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '10px' }}>
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                style={{ 
                  backgroundColor: isFollowing ? 'transparent' : 'var(--primary-color)', 
                  color: isFollowing ? 'var(--text-main)' : 'white', 
                  border: isFollowing ? '1px solid var(--divider)' : 'none', 
                  padding: '0.5rem 1.5rem', 
                  borderRadius: 'var(--radius-pill)', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s' 
                }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
          
          <div style={{ marginTop: '0.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '2px 0 12px 0' }}>{user.handle}</p>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.4', marginBottom: '12px' }}>{user.bio}</p>
            
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>location_on</span>
                Johannesburg, SA
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>calendar_month</span>
                Joined March 2024
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>{user.following}</strong> <span style={{ color: 'var(--text-muted)' }}>Following</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>{user.followers}</strong> <span style={{ color: 'var(--text-muted)' }}>Followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--divider)' }}>
          {['Posts', 'Replies', 'Media', 'Likes'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === tab ? '4px solid var(--primary-color)' : '4px solid transparent', color: activeTab === tab ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.03)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="feed" style={{ padding: '0 var(--space-md) var(--space-md) var(--space-md)' }}>
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts to show yet.</p>
          </div>
        ) : (
          posts.map(post => (
            <Post 
              key={post.id}
              {...post}
              replyCount={post.replies?.length || 0}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
