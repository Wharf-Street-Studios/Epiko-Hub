export interface Notification {
  id: string;
  user_id: string;
  type: 'achievement' | 'social' | 'tournament' | 'marketplace' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  action_url?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    type: 'achievement',
    title: 'New Achievement Unlocked!',
    message: 'You unlocked the "Tournament Victor" achievement',
    read: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    type: 'social',
    title: 'New Follower',
    message: 'ProGamer99 started following you',
    read: false,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    type: 'tournament',
    title: 'Tournament Starting Soon',
    message: 'Epiko Championship 2024 starts in 1 hour',
    read: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getNotifications(userId: string): Promise<Notification[]> {
  return mockNotifications;
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  mockNotifications.forEach(n => {
    if (n.user_id === userId) {
      n.read = true;
    }
  });
}

export async function subscribeToNotifications(callback: (notification: Notification) => void) {
  // Return a mock subscription
  return {
    unsubscribe: () => {},
  };
}
