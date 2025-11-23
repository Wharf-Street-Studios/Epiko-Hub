// Mock data store for the application
export const mockData = {
  currentUser: {
    id: 'mock-user-1',
    email: 'demo@epikohub.com',
  },
  
  profile: {
    id: 'mock-user-1',
    username: 'demo_user',
    display_name: 'Demo User',
    bio: 'Welcome to Epiko Hub!',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    banner_url: null,
    karma_points: 1250,
    wallet_balance: 500,
    level: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};
