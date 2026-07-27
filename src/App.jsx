import React, { useState } from 'react';
import Post from './components/Post';
import Reply from './components/Reply';
import { Routes, Route } from 'react-router-dom';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MobileNav from './components/MobileNav';
import { useIsMobile } from './hooks/useIsMobile';
import './App.css';
import Discover from './pages/Discover';
import Alerts from './pages/Alerts';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import SearchBar from './components/SearchBar';
import ComposeModal from './components/ComposeModal';
import { useFeed } from './hooks/useApi';

import { ApiService } from './services/api';

// Extracted Feed Component to keep App clean
const HomeFeed = ({ search, setSearch, posts, loading, refetch }) => {
  const isMobile = useIsMobile(900);
  const [expandedPosts, setExpandedPosts] = useState({});

  const togglePost = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleDeletePost = async (postId) => {
    try {
      await ApiService.posts.deletePost(postId);
      refetch();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <main className="main-feed">
      <div className="feed-header">
        {isMobile && <h1 className="mobile-brand">Hey</h1>}
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search past posts/answers..." 
        />
        <div className="feed-tabs">
          <button className="tab active">Latest</button>
          <button className="tab">Nearby</button>
          <button className="tab">Following</button>
        </div>
      </div>

      <div className="feed">
        {loading ? (
          <div className="empty-state">
            <div className="spinner"></div>
            <p>Loading feed...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts found matching your criteria.</p>
          </div>
        ) : (
          posts.map(post => {
            const isExpanded = !!expandedPosts[post.id];
            return (
              <div key={post.id} className="post-thread">
                <Post 
                  {...post}
                  replyCount={post.replies.length}
                  isExpanded={isExpanded}
                  onToggleReplies={() => togglePost(post.id)}
                  onDelete={handleDeletePost}
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
          })
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
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  // Architecture ready for millions of posts: fetch from API instead of filtering locally
  const { posts, loading, refetch } = useFeed(search, categoryFilter, locationFilter);

  return (
    <div className="app-container">
      <SidebarLeft isMobile={isMobile} onComposeClick={() => setIsComposeModalOpen(true)} />

      <Routes>
        <Route path="/" element={<HomeFeed search={search} setSearch={setSearch} posts={posts} loading={loading} refetch={refetch} />} />
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

      <MobileNav isMobile={isMobile} onComposeClick={() => setIsComposeModalOpen(true)} />

      {isComposeModalOpen && (
        <ComposeModal 
          onClose={() => setIsComposeModalOpen(false)} 
          onPostCreated={() => {
            setIsComposeModalOpen(false);
            refetch();
          }} 
        />
      )}
    </div>
  );
}

export default App;
