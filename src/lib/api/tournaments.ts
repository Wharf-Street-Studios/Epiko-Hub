export interface Tournament {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  prize_pool: string;
  game_id: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  max_participants: number;
  current_participants: number;
  image_url: string;
  entry_fee?: number;
  winner_name?: string;
}

const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Epiko Championship 2024',
    description: 'The ultimate gaming championship',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    prize_pool: '50000',
    game_id: 'game-1',
    status: 'ongoing',
    max_participants: 64,
    current_participants: 48,
    image_url: 'https://picsum.photos/seed/tournament1/800/400',
    entry_fee: 100,
  },
  {
    id: '2',
    title: 'Weekly Showdown',
    description: 'Fast-paced weekly competition',
    start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    prize_pool: '10000',
    game_id: 'game-2',
    status: 'upcoming',
    max_participants: 32,
    current_participants: 12,
    image_url: 'https://picsum.photos/seed/tournament2/800/400',
    entry_fee: 50,
  },
  {
    id: '3',
    title: 'Summer Cup 2024',
    description: 'Seasonal tournament with amazing prizes',
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    prize_pool: '25000',
    game_id: 'game-1',
    status: 'completed',
    max_participants: 64,
    current_participants: 64,
    image_url: 'https://picsum.photos/seed/tournament3/800/400',
    entry_fee: 75,
    winner_name: 'ProGamer99',
  },
];

export async function getTournaments(): Promise<Tournament[]> {
  return mockTournaments;
}

export async function registerForTournament(tournamentId: string, teamName?: string): Promise<boolean> {
  const tournament = mockTournaments.find(t => t.id === tournamentId);
  if (tournament && tournament.current_participants < tournament.max_participants) {
    tournament.current_participants++;
    return true;
  }
  return false;
}

export async function isUserRegistered(tournamentId: string): Promise<boolean> {
  // Return false for mock
  return false;
}
