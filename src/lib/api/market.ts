export interface MarketItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  seller_id: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at: string;
  seller?: {
    username: string;
    avatar_url: string;
  };
}

const mockMarketItems: MarketItem[] = [
  {
    id: '1',
    title: 'Legendary Dragon Sword',
    description: 'A powerful weapon forged in dragon fire',
    price: 250,
    image_url: 'https://picsum.photos/seed/item1/400/400',
    seller_id: 'user-2',
    category: 'Weapons',
    rarity: 'legendary',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    seller: {
      username: 'weapon_master',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weaponmaster',
    },
  },
  {
    id: '2',
    title: 'Epic Armor Set',
    description: 'Complete armor set with bonus stats',
    price: 180,
    image_url: 'https://picsum.photos/seed/item2/400/400',
    seller_id: 'user-3',
    category: 'Armor',
    rarity: 'epic',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      username: 'armor_smith',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=armorsmith',
    },
  },
  {
    id: '3',
    title: 'Rare Mount - Phoenix',
    description: 'Fly across the battlefield in style',
    price: 320,
    image_url: 'https://picsum.photos/seed/item3/400/400',
    seller_id: 'user-4',
    category: 'Mounts',
    rarity: 'rare',
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    seller: {
      username: 'mount_collector',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mountcollector',
    },
  },
];

export async function getMarketItems(): Promise<MarketItem[]> {
  return mockMarketItems;
}

export async function getMarketItemById(itemId: string): Promise<MarketItem | null> {
  return mockMarketItems.find(item => item.id === itemId) || null;
}

export async function purchaseItem(userId: string, itemId: string): Promise<boolean> {
  // Mock purchase - always succeeds
  return true;
}
