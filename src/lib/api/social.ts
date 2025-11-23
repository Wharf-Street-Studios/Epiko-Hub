export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user?: {
    username: string;
    display_name: string;
    avatar_url: string;
  };
  liked_by_user?: boolean;
}

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    content: 'Just won my first tournament! 🏆 The competition was intense but totally worth it. Thanks to everyone who supported me!',
    likes_count: 42,
    comments_count: 8,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: {
      username: 'demo_user',
      display_name: 'Demo User',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  },
  {
    id: '2',
    user_id: 'user-2',
    content: 'New NFT drop coming soon! Stay tuned for some exclusive gaming collectibles 🎮✨',
    likes_count: 156,
    comments_count: 23,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    user: {
      username: 'nft_collector',
      display_name: 'NFT Collector',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=collector',
    },
  },
  {
    id: '3',
    user_id: 'user-3',
    content: 'Looking for teammates for the upcoming championship. Must be level 20+. DM me!',
    likes_count: 89,
    comments_count: 15,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    user: {
      username: 'pro_gamer_99',
      display_name: 'ProGamer99',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=progamer',
    },
  },
];

export async function getPosts(): Promise<Post[]> {
  // Return mock posts
  return mockPosts;
}

export async function createPost(content: string, imageFile?: File): Promise<Post | null> {
  const newPost: Post = {
    id: Date.now().toString(),
    user_id: 'mock-user-1',
    content,
    image_url: imageFile ? `https://picsum.photos/seed/${Date.now()}/800/600` : undefined,
    likes_count: 0,
    comments_count: 0,
    created_at: new Date().toISOString(),
    user: {
      username: 'demo_user',
      display_name: 'Demo User',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  };
  
  mockPosts.unshift(newPost);
  return newPost;
}

export async function likePost(userId: string, postId: string): Promise<void> {
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.likes_count++;
  }
}

export async function unlikePost(userId: string, postId: string): Promise<void> {
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.likes_count = Math.max(0, post.likes_count - 1);
  }
}

export async function getUserLikedPostIds(userId: string): Promise<string[]> {
  // Return empty array for mock
  return [];
}

export async function subscribeToNewPosts(callback: (post: Post) => void) {
  // Return a mock subscription
  return {
    unsubscribe: () => {},
  };
}
