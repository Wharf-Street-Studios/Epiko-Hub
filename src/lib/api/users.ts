import { mockData } from '@/lib/mockData';

export interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  karma_points?: number;
  wallet_balance?: number;
  level?: number;
  created_at?: string;
  updated_at?: string;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // Return mock profile
  return mockData.profile;
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  // Update mock profile
  Object.assign(mockData.profile, updates);
  return mockData.profile;
}

export async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  // Return a placeholder avatar URL
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
}

export async function uploadBanner(userId: string, file: File): Promise<string | null> {
  // Return a placeholder banner URL
  return `https://picsum.photos/seed/${Date.now()}/1200/300`;
}
