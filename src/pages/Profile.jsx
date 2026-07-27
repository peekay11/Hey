import React from 'react';
import { MOCK_USER, MOCK_POSTS } from '../data/mockData';
import Post from '../components/Post';

const Profile = () => {
  const userPosts = MOCK_POSTS.filter(p => p.author === MOCK_USER.name || p.author === 'Paseka Dev');

  return (
    <div className="profile-page">
      <div className="profile-header card" style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <img 
          src={MOCK_USER.avatar} 
          alt={MOCK_USER.name} 
          style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid var(--primary-color)' }} 
        />
        <h2>{MOCK_USER.name}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{MOCK_USER.handle}</p>
        <p style={{ marginBottom: '1rem' }}>{MOCK_USER.bio}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
          <div>
            <strong>{MOCK_USER.following}</strong> <span style={{ color: 'var(--text-muted)' }}>Following</span>
          </div>
          <div>
            <strong>{MOCK_USER.followers}</strong> <span style={{ color: 'var(--text-muted)' }}>Followers</span>
          </div>
        </div>
        
        <button style={{ backgroundColor: 'var(--primary-color)', color: '#fff', border: 'none', padding: '0.5rem 2rem', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          Edit Profile
        </button>
      </div>

      <div className="header" style={{ padding: '1rem 0' }}>
        <h3>Your Posts</h3>
      </div>

      <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {userPosts.map(post => (
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

export default Profile;
