import { MOCK_POSTS, MOCK_ALERTS, MOCK_TRENDING, MOCK_USER } from '../data/mockData';

// Simulated network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API Service Client
 * 
 * Ready to be swapped out for axios/fetch when connecting to a real backend.
 * Uses pagination and async patterns to scale to millions of users/posts.
 */
export const ApiService = {
  posts: {
    // Fetch a paginated feed of posts
    getFeed: async ({ page = 1, limit = 10, search = '', category = 'All', location = 'All' } = {}) => {
      await delay(400); // Simulate network latency
      
      let results = [...MOCK_POSTS];
      
      // Filter logically handled by DB later
      if (search) results = results.filter(p => p.text.toLowerCase().includes(search.toLowerCase()));
      if (category !== 'All') results = results.filter(p => p.category === category);
      if (location !== 'All') results = results.filter(p => p.location === location);

      // Simulate pagination slice
      const start = (page - 1) * limit;
      const paginated = results.slice(start, start + limit);

      return {
        data: paginated,
        total: results.length,
        hasMore: start + limit < results.length
      };
    },
    
    // Fetch posts specifically for a user
    getUserPosts: async (username) => {
      await delay(300);
      return MOCK_POSTS.filter(p => p.author === username || p.author === 'Paseka Dev');
    },

    // CREATE a new post
    createPost: async (postData) => {
      await delay(400);
      const newPost = {
        id: Date.now(),
        type: 'text',
        author: MOCK_USER.name,
        text: postData.text,
        location: 'Johannesburg',
        category: 'Tech',
        timestamp: 'Just now',
        upvotes: 0,
        reposts: 0,
        status: 'Open',
        boosted: false,
        replies: []
      };
      // Mutate the mock array so it persists in session
      MOCK_POSTS.unshift(newPost);
      return newPost;
    },

    // DELETE a post
    deletePost: async (postId) => {
      await delay(300);
      const index = MOCK_POSTS.findIndex(p => p.id === postId);
      if (index !== -1) {
        MOCK_POSTS.splice(index, 1);
        return { success: true };
      }
      throw new Error("Post not found");
    },

    // UPDATE a post (like)
    likePost: async (postId) => {
      await delay(200);
      const post = MOCK_POSTS.find(p => p.id === postId);
      if (post) {
        post.upvotes += 1; // Fake increment
        return post;
      }
      throw new Error("Post not found");
    }
  },

  alerts: {
    // Fetch notifications
    getAlerts: async () => {
      await delay(300);
      return MOCK_ALERTS;
    },
    
    // Mark all as read
    markAllRead: async () => {
      await delay(200);
      return true; // Success
    }
  },

  trending: {
    // Get trending topics
    getTrending: async () => {
      await delay(200);
      return MOCK_TRENDING;
    }
  },

  user: {
    // Get current user profile
    getProfile: async () => {
      await delay(200);
      return MOCK_USER;
    }
  }
};
