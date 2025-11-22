"use client"

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RiNotification3Line, 
  RiGiftLine, 
  RiGamepadLine, 
  RiShoppingCartLine, 
  RiErrorWarningLine, 
  RiCheckboxCircleLine,
  RiLoader4Line
} from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getNotifications, 
  markAllNotificationsAsRead, 
  markNotificationAsRead, 
  subscribeToNotifications, 
  Notification 
} from "@/lib/api/notifications";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

const getIconForType = (type: string) => {
  switch (type) {
    case 'game': return RiGamepadLine;
    case 'market': return RiShoppingCartLine;
    case 'reward': return RiGiftLine;
    case 'system': return RiErrorWarningLine;
    default: return RiNotification3Line;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case 'game': return 'bg-[#866bff]/20';
    case 'market': return 'bg-blue-500/20';
    case 'reward': return 'bg-[#99ee2d]/20';
    case 'system': return 'bg-gray-500/20';
    default: return 'bg-white/10';
  }
};

const NotificationItem = ({ notification, onRead }: { notification: Notification, onRead: (id: string) => void }) => {
  const Icon = getIconForType(notification.type);
  const color = getColorForType(notification.type);
  
  const handleClick = async () => {
    if (!notification.read) {
      await markNotificationAsRead(notification.id);
      onRead(notification.id);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      onClick={handleClick}
      className={`flex gap-4 p-5 bg-[#1c1f2a]/40 backdrop-blur-xl border ${notification.read ? 'border-white/5' : 'border-[#99ee2d]/30'} rounded-3xl hover:border-[#866bff]/30 transition-all cursor-pointer group relative overflow-hidden`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color} backdrop-blur-md shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1 gap-4">
           <h3 className={`font-bold text-base group-hover:text-[#866bff] transition-colors truncate ${notification.read ? 'text-gray-300' : 'text-white'}`}>
             {notification.title}
           </h3>
           <span className="text-xs text-gray-500 whitespace-nowrap font-medium">
             {new Date(notification.created_at).toLocaleDateString()}
           </span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{notification.description}</p>
      </div>
      {!notification.read && (
        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#99ee2d]" />
      )}
    </motion.div>
  );
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function loadNotifications() {
      if (user) {
        try {
          const data = await getNotifications(user.id);
          setNotifications(data);
        } catch (error) {
          console.error("Error loading notifications:", error);
          toast.error("Failed to load notifications");
        }
      }
      setLoading(false);
    }

    loadNotifications();

    if (user) {
      const subscription = subscribeToNotifications(user.id, (newNotification) => {
        setNotifications(prev => [newNotification, ...prev]);
        toast.info(`New notification: ${newNotification.title}`);
      });

      return () => {
        subscription.then(sub => sub.unsubscribe());
      };
    }
  }, [user]);

  const handleMarkAllRead = async () => {
    if (!user) return;
    try {
      await markAllNotificationsAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  const handleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    // Map tab names to notification types if needed, or use direct match
    // Tabs: "All", "Games", "Market", "Rewards", "System"
    // Types: 'game', 'market', 'reward', 'system'
    const typeMap: Record<string, string> = {
      games: 'game',
      market: 'market',
      rewards: 'reward',
      system: 'system'
    };
    return n.type === typeMap[activeTab];
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RiLoader4Line className="w-8 h-8 text-[#866bff] animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DashboardHeader />
      
      <div className="space-y-8">
          <div className="flex justify-between items-end">
             <div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Notifications</h1>
                <p className="text-gray-400 text-lg">Stay updated with your latest activities.</p>
             </div>
             <Button 
               variant="ghost" 
               className="text-[#866bff] hover:text-white hover:bg-[#866bff]/20"
               onClick={handleMarkAllRead}
             >
                Mark all as read
             </Button>
          </div>
       </div>

       <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent p-0 gap-2 mb-8 flex-wrap justify-start h-auto">
             {["All", "Games", "Market", "Rewards", "System"].map((tab) => (
                <TabsTrigger 
                   key={tab} 
                   value={tab.toLowerCase()}
                   className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#866bff] data-[state=active]:text-white bg-[#1c1f2a]/40 border border-white/5 text-gray-400 hover:text-white transition-all"
                >
                   {tab}
                </TabsTrigger>
             ))}
          </TabsList>

          <div className="space-y-4">
             <AnimatePresence mode="wait">
                <TabsContent value={activeTab} className="space-y-4 mt-0">
                   {filteredNotifications.length === 0 ? (
                     <EmptyState 
                       icon={RiNotification3Line}
                       title="No Notifications"
                       description="You're all caught up! Check back later for updates."
                     />
                   ) : (
                     filteredNotifications.map((notification) => (
                       <NotificationItem 
                         key={notification.id} 
                         notification={notification} 
                         onRead={handleRead}
                       />
                     ))
                   )}
                </TabsContent>
             </AnimatePresence>
          </div>
       </Tabs>
    </motion.div>
  );
}
