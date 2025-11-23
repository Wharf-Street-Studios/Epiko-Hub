export interface NFT {
  id: string;
  name: string;
  description: string;
  image_url: string;
  owner_id: string;
  collection: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: Record<string, string | number>;
  created_at: string;
  chain?: string;
  game?: string;
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Cyber Warrior #1337',
    description: 'Limited edition cyber warrior NFT',
    image_url: 'https://picsum.photos/seed/nft1/400/400',
    owner_id: 'mock-user-1',
    collection: 'Cyber Warriors',
    rarity: 'legendary',
    attributes: {
      strength: 95,
      speed: 88,
      intelligence: 92,
    },
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    chain: 'Polygon',
    game: 'Cyber Warriors',
  },
  {
    id: '2',
    name: 'Fantasy Dragon #42',
    description: 'Rare dragon from the fantasy collection',
    image_url: 'https://picsum.photos/seed/nft2/400/400',
    owner_id: 'mock-user-1',
    collection: 'Fantasy Beasts',
    rarity: 'rare',
    attributes: {
      power: 87,
      magic: 94,
      defense: 79,
    },
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    chain: 'Ethereum',
    game: 'Fantasy Quest',
  },
];

export async function getUserNFTs(userId: string): Promise<NFT[]> {
  return mockNFTs;
}

export async function getNFTById(nftId: string): Promise<NFT | null> {
  return mockNFTs.find(nft => nft.id === nftId) || null;
}
