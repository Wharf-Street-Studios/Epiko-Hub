export interface KarmaHistory {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  created_at: string;
  type: 'earned' | 'spent';
}

// Alias for backward compatibility
export type KarmaTransaction = KarmaHistory;

const mockKarmaHistory: KarmaHistory[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    amount: 150,
    reason: 'Tournament Victory',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'earned',
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    amount: 50,
    reason: 'Daily Login Bonus',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'earned',
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    amount: 75,
    reason: 'Tournament Entry Fee',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'spent',
  },
];

export async function getKarmaBalance(userId: string): Promise<number> {
  return 1250;
}

export async function getKarmaHistory(userId: string): Promise<KarmaHistory[]> {
  return mockKarmaHistory;
}

// Alias for backward compatibility
export const getKarmaTransactions = getKarmaHistory;

export async function getMonthlyKarmaEarnings(userId: string): Promise<number[]> {
  // Return mock monthly earnings for the last 12 months
  return [120, 150, 180, 200, 175, 190, 210, 225, 240, 260, 280, 300];
}

export async function addKarma(userId: string, amount: number, reason: string): Promise<void> {
  mockKarmaHistory.unshift({
    id: Date.now().toString(),
    user_id: userId,
    amount,
    reason,
    created_at: new Date().toISOString(),
    type: 'earned',
  });
}

export async function spendKarma(userId: string, amount: number, reason: string): Promise<boolean> {
  // Mock - always succeeds
  mockKarmaHistory.unshift({
    id: Date.now().toString(),
    user_id: userId,
    amount,
    reason,
    created_at: new Date().toISOString(),
    type: 'spent',
  });
  return true;
}
