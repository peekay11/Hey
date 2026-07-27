import React, { useState } from 'react';
import Post from './components/Post';
import Reply from './components/Reply';
import { Routes, Route } from 'react-router-dom';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MobileNav from './components/MobileNav';
import { useIsMobile } from './hooks/useIsMobile';
import './App.css';

const MOCK_DATA = [
  {
    id: 1,
    type: 'poll',
    author: 'Thabo_M',
    text: '@Hey, any good barber in Soweto? Need a fresh fade for the weekend.',
    pollOptions: [
      { text: 'Legends Barbershop', percent: 65 },
      { text: 'Sipho Cuts', percent: 25 },
      { text: 'Other (Check comments)', percent: 10 }
    ],
    location: 'Soweto',
    category: 'Barber',
    timestamp: '2h ago',
    upvotes: 14,
    reposts: 5,
    status: 'Answered',
    boosted: true,
    replies: [
      {
        id: 101,
        author: 'Sipho_Cuts',
        text: 'Come through to my shop, we sort you out nice and clean.',
        taggedBusiness: 'SiphoCutsSoweto',
        upvotes: 5,
        isHelpful: true,
        timestamp: '1h ago'
      },
      {
        id: 102,
        author: 'Lerato_99',
        text: 'Legends Barbershop is the best in the area.',
        taggedBusiness: 'LegendsBarber',
        upvotes: 2,
        isHelpful: false,
        timestamp: '1.5h ago'
      }
    ]
  },
  {
    id: 2,
    type: 'gallery',
    author: 'Nandi_K',
    text: '@Hey, looking for a reliable photographer for a birthday party in Braam. Recommendations?',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    location: 'Braamfontein',
    category: 'Photographer',
    timestamp: '5h ago',
    upvotes: 8,
    reposts: 12,
    status: 'Open',
    boosted: false,
    replies: [
      {
        id: 201,
        author: 'Thando_Pics',
        text: 'I do event photography! Check out my portfolio on my page.',
        taggedBusiness: 'ThandoPhotography',
        upvotes: 12,
        isHelpful: false,
        timestamp: '3h ago'
      }
    ]
  },
  {
    id: 3,
    type: 'reel',
    author: 'Kagiso_J',
    text: '@Hey, where can I get the best wings around here? 🍗',
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    location: 'Soweto',
    category: 'Food',
    timestamp: '1d ago',
    upvotes: 32,
    reposts: 25,
    status: 'Answered',
    boosted: false,
    replies: [
      {
        id: 301,
        author: 'Foodie_SA',
        text: 'You have to try wing republic, no debate.',
        taggedBusiness: 'WingRepublic',
        upvotes: 25,
        isHelpful: true,
        timestamp: '22h ago'
      }
    ]
  },
  {
    id: 4,
    type: 'text',
    author: 'Sipho_Cuts',
    text: '@Hey, just wanted to say thank you to everyone who pulled up to the shop this weekend. The community support is real! 🙏🏾💯',
    location: 'Soweto',
    category: 'Community',
    timestamp: '1h ago',
    upvotes: 112,
    reposts: 12,
    status: 'Open',
    boosted: false,
    replies: []
  }
];

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

const PlaceholderPage = ({ title }) => (
  <main className="main-feed">
    <div className="feed-header">
      <h2>{title}</h2>
    </div>
    <div className="empty-state">
      <p>{title} feature coming soon!</p>
    </div>
  </main>
);

function App() {
  const isMobile = useIsMobile(900);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const filteredPosts = MOCK_DATA.filter(post => {
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
        <Route path="/discover" element={<PlaceholderPage title="Discover" />} />
        <Route path="/alerts" element={<PlaceholderPage title="Alerts" />} />
        <Route path="/saved" element={<PlaceholderPage title="Saved Posts" />} />
        <Route path="/profile" element={<PlaceholderPage title="User Profile" />} />
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
