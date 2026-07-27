import React, { useState } from 'react';
import Post from './components/Post';
import Reply from './components/Reply';
import './App.css';

const MOCK_DATA = [
  {
    id: 1,
    author: 'Thabo_M',
    text: 'Hey, any good barber in Soweto? Need a fresh fade for the weekend.',
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
    text: 'Hey, where can I get the best wings around here?',
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
      <header>
        <h1>"Hey" App</h1>
        <p>Local chat. Local discovery. Just ask.</p>
      </header>

      <main>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search past posts/answers..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="Soweto">Soweto</option>
            <option value="Braamfontein">Braamfontein</option>
          </select>
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
        </div>

        <div className="feed">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-thread">
              <Post 
                author={post.author}
                text={post.text}
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
                  {post.replies.map(reply => (
                    <Reply 
                      key={reply.id}
                      author={reply.author}
                      text={reply.text}
                      taggedBusiness={reply.taggedBusiness}
                      upvotes={reply.upvotes}
                      isHelpful={reply.isHelpful}
                      timestamp={reply.timestamp}
                      isAuthor={false} // mock user is not author
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
    </div>
  );
}

export default App;
