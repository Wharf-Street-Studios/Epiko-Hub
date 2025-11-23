export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'reward';
  amount: number;
  currency: 'EPIKO' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    type: 'reward',
    amount: 150,
    currency: 'EPIKO',
    status: 'completed',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Tournament Victory Reward',
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    type: 'purchase',
    amount: 50,
    currency: 'EPIKO',
    status: 'completed',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'NFT Purchase - Legendary Sword',
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    type: 'deposit',
    amount: 200,
    currency: 'EPIKO',
    status: 'completed',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Wallet Top-up',
  },
];

export async function getWalletBalance(): Promise<{ epiko: number; usd: number }> {
  return { epiko: 500, usd: 125 };
}

export async function getTransactions(): Promise<Transaction[]> {
  return mockTransactions;
}
