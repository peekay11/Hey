import React, { useState } from 'react';
import Post from './components/Post';
import Reply from './components/Reply';
import './App.css';

const MOCK_DATA = [
  {
    id: 1,
    author: 'Thabo_M',
    text: 'Hey, any good barber in Soweto? Need a fresh fade for the weekend.',
    image: null,
    location: 'Soweto',
    category: 'Barber',
    timestamp: '2h ago',
    upvotes: 14,
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
    author: 'Nandi_K',
    text: 'Hey, looking for a reliable photographer for a birthday party in Braam. Recommendations?',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Braamfontein',
    category: 'Photographer',
    timestamp: '5h ago',
    upvotes: 8,
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
    author: 'Kagiso_J',
    text: 'Hey, where can I get the best wings around here? 🍗',
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    location: 'Soweto',
    category: 'Food',
    timestamp: '1d ago',
    upvotes: 32,
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
  }
];

function App() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  // Filter posts based on search and filters
  const filteredPosts = MOCK_DATA.filter(post => {
    const matchSearch = post.text.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || post.category === categoryFilter;
    const matchLocation = locationFilter === 'All' || post.location === locationFilter;
    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div className="app-container">
      {/* Left Sidebar Navigation */}
      <aside className="sidebar-left">
        <h1>Hey</h1>
        <div className="nav-links">
          <div className="nav-item active">
            <span className="material-symbols-outlined icon-filled">home</span>
            <span>Home</span>
          </div>
          <div className="nav-item">
            <span className="material-symbols-outlined">explore</span>
            <span>Discover</span>
          </div>
          <div className="nav-item">
            <span className="material-symbols-outlined">notifications</span>
            <span>Alerts</span>
          </div>
          <div className="nav-item">
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </div>
          <div className="nav-item">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Post</span>
          </div>
        </div>
      </aside>

      {/* Middle Scrollable Feed */}
      <main className="main-feed">
        <div className="feed-header">
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
          {filteredPosts.map(post => (
            <div key={post.id} className="post-thread">
              <Post 
                author={post.author}
                text={post.text}
                image={post.image}
                location={post.location}
                category={post.category}
                timestamp={post.timestamp}
                upvotes={post.upvotes}
                replyCount={post.replies.length}
                status={post.status}
                boosted={post.boosted}
              />
              
              {post.replies.length > 0 && (
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
                      author={reply.author}
                      text={reply.text}
                      taggedBusiness={reply.taggedBusiness}
                      upvotes={reply.upvotes}
                      isHelpful={reply.isHelpful}
                      timestamp={reply.timestamp}
                      isAuthor={false}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="empty-state">
              <p>No posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar Filters & Widgets */}
      <aside className="sidebar-right">
        <div className="filters-widget">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label>Location</label>
            <select 
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Soweto">Soweto</option>
              <option value="Braamfontein">Braamfontein</option>
            </select>
            <button className="btn-follow">+ Follow Location</button>
          </div>
          
          <div className="filter-group">
            <label>Category</label>
            <select 
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Barber">Barber</option>
              <option value="Photographer">Photographer</option>
              <option value="Food">Food</option>
            </select>
            <button className="btn-follow">+ Follow Category</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
