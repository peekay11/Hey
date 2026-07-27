import React, { useState } from 'react';
import Post from './components/Post';
import Reply from './components/Reply';
import { Routes, Route } from 'react-router-dom';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MobileNav from './components/MobileNav';
import { useIsMobile } from './hooks/useIsMobile';
import './App.css';
import { MOCK_POSTS } from './data/mockData';
import Discover from './pages/Discover';
import Alerts from './pages/Alerts';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
// Extracted Feed Component to keep App clean
const HomeFeed = ({ search, setSearch, filteredPosts }) => {
  const isMobile = useIsMobile(900);
  const [expandedPosts, setExpandedPosts] = useState({});

  const togglePost = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <main className="main-feed">
      <div className="feed-header">
        {isMobile && <h1 className="mobile-brand">Hey</h1>}
        <div className="search-bar">
          <span className="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            placeholder="Search past posts/answers..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="feed-tabs">
          <button className="tab active">Latest</button>
          <button className="tab">Nearby</button>
          <button className="tab">Following</button>
        </div>
      </div>

      <div className="feed">
        {filteredPosts.map(post => {
          const isExpanded = !!expandedPosts[post.id];
          return (
            <div key={post.id} className="post-thread">
              <Post 
                {...post}
                replyCount={post.replies.length}
                isExpanded={isExpanded}
                onToggleReplies={() => togglePost(post.id)}
              />
              
              {isExpanded && post.replies.length > 0 && (
                <div className="replies-container">
                  {[...post.replies]
                    .sort((a, b) => {
                      if (a.isHelpful && !b.isHelpful) return -1;
                      if (!a.isHelpful && b.isHelpful) return 1;
                      if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
                      return 0;
                    })
                    .map(reply => (
                    <Reply 
                      key={reply.id}
                      {...reply}
                      isAuthor={false}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <p>No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
};

function App() {
  const isMobile = useIsMobile(900);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchSearch = post.text.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || post.category === categoryFilter;
    const matchLocation = locationFilter === 'All' || post.location === locationFilter;
    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div className="app-container">
      <SidebarLeft isMobile={isMobile} />

      <Routes>
        <Route path="/" element={<HomeFeed search={search} setSearch={setSearch} filteredPosts={filteredPosts} />} />
        <Route path="/discover" element={<main className="main-feed"><Discover /></main>} />
        <Route path="/alerts" element={<main className="main-feed"><Alerts /></main>} />
        <Route path="/saved" element={<main className="main-feed"><Saved /></main>} />
        <Route path="/profile" element={<main className="main-feed"><Profile /></main>} />
      </Routes>

      <SidebarRight 
        isMobile={isMobile}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <MobileNav isMobile={isMobile} />
    </div>
  );
}

export default App;
