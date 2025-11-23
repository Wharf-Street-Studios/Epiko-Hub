export interface Game {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  players_count: number;
  rating: number;
  stats?: {
    matches: number;
    hours: number;
    wins: number;
  };
  tags?: string[];
}

export interface UserGame {
  id: string;
  user_id: string;
  game_id: string;
  hours_played: number;
  achievements_unlocked: number;
  total_achievements: number;
  last_played: string;
  installed?: boolean;
  matches_played?: number;
  wins?: number;
  game?: Game;
}

const mockGames: Game[] = [
  {
    id: '1',
    title: 'Cyber Warriors',
    description: 'Futuristic battle royale',
    image_url: 'https://picsum.photos/seed/game1/400/300',
    category: 'Action',
    players_count: 125000,
    rating: 4.8,
    stats: { matches: 1000000, hours: 5000000, wins: 450000 },
    tags: ['Battle Royale', 'Multiplayer', 'Sci-Fi'],
  },
  {
    id: '2',
    title: 'Fantasy Quest',
    description: 'Epic RPG adventure',
    image_url: 'https://picsum.photos/seed/game2/400/300',
    category: 'RPG',
    players_count: 89000,
    rating: 4.6,
    stats: { matches: 500000, hours: 2000000, wins: 200000 },
    tags: ['RPG', 'Fantasy', 'Adventure'],
  },
  {
    id: '3',
    title: 'Speed Racers',
    description: 'High-octane racing',
    image_url: 'https://picsum.photos/seed/game3/400/300',
    category: 'Racing',
    players_count: 67000,
    rating: 4.5,
    stats: { matches: 300000, hours: 1000000, wins: 100000 },
    tags: ['Racing', 'Sports', 'Multiplayer'],
  },
];

const mockUserGames: UserGame[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    game_id: '1',
    hours_played: 156,
    achievements_unlocked: 42,
    total_achievements: 50,
    last_played: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    installed: true,
    matches_played: 120,
    wins: 85,
    game: mockGames[0],
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    game_id: '2',
    hours_played: 89,
    achievements_unlocked: 28,
    total_achievements: 45,
    last_played: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    installed: true,
    matches_played: 45,
    wins: 20,
    game: mockGames[1],
  },
];

export async function getGames(): Promise<Game[]> {
  return mockGames;
}

export async function getUserGames(userId: string): Promise<UserGame[]> {
  return mockUserGames;
}

export async function getGameById(gameId: string): Promise<Game | null> {
  return mockGames.find(g => g.id === gameId) || null;
}

export async function toggleGameInstallation(userId: string, gameId: string, install: boolean): Promise<boolean> {
  // Mock - always succeeds
  return true;
}
