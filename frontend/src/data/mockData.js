export const MOCK_USER = {
  name: 'Paseka Dev',
  handle: '@pasekadev',
  avatar: 'https://ui-avatars.com/api/?name=Paseka+Dev&background=ff6b00&color=fff',
  bio: 'Building the next big thing in Africa. React & Node.js Developer. 🚀',
  location: 'Johannesburg, ZA',
  following: 245,
  followers: 1042,
  joined: 'March 2026'
};

export const MOCK_ALERTS = [
  {
    id: 1,
    type: 'like', // like, mention, reply, follow
    user: 'Thabo_M',
    avatar: 'https://ui-avatars.com/api/?name=Thabo_M&background=random',
    content: 'liked your post about the new UI.',
    time: '2m ago',
    read: false
  },
  {
    id: 2,
    type: 'reply',
    user: 'Nandi_K',
    avatar: 'https://ui-avatars.com/api/?name=Nandi_K&background=random',
    content: 'replied: "This looks amazing, keep it up!"',
    time: '1h ago',
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: 'Sipho_Cuts',
    avatar: 'https://ui-avatars.com/api/?name=Sipho_Cuts&background=random',
    content: 'started following you.',
    time: '3h ago',
    read: true
  },
  {
    id: 4,
    type: 'mention',
    user: 'Kagiso_J',
    avatar: 'https://ui-avatars.com/api/?name=Kagiso_J&background=random',
    content: 'mentioned you in a post: "@Hey @pasekadev check this out!"',
    time: '1d ago',
    read: true
  }
];

export const MOCK_TRENDING = [
  { id: 1, topic: '#SowetoDerby', category: 'Sports', posts: '12.5K' },
  { id: 2, topic: 'Amapiano', category: 'Music', posts: '45.2K' },
  { id: 3, topic: 'Loadshedding', category: 'News', posts: '89.1K' },
  { id: 4, topic: 'TechInAfrica', category: 'Tech', posts: '5.3K' }
];

export const MOCK_POSTS = [
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
  },
  {
    id: 5,
    type: 'text',
    author: 'Paseka Dev',
    text: '@Hey, just pushed the massive V2 update. Let me know what you guys think of the new particle animations! 🚀🔥',
    location: 'Johannesburg',
    category: 'Tech',
    timestamp: '10m ago',
    upvotes: 245,
    reposts: 58,
    status: 'Open',
    boosted: true,
    replies: [
      {
        id: 501,
        author: 'Thabo_M',
        text: 'Bro the animations are insanely crisp. Premium feel fr.',
        taggedBusiness: null,
        upvotes: 45,
        isHelpful: false,
        timestamp: '5m ago'
      }
    ]
  }
];
