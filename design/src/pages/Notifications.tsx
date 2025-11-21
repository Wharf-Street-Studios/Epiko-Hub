import React from "react";
import { Layout } from "../components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  RiNotification3Line, 
  RiGiftLine, 
  RiGamepadLine, 
  RiShoppingCartLine, 
  RiErrorWarningLine, 
  RiCheckboxCircleLine 
} from "@remixicon/react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";

const NotificationItem = ({ icon: Icon, title, desc, time, color, isNew, id }: any) => (
  <motion.div 
    layout
    key={id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    whileHover={{ scale: 1.01, x: 4 }}
    className={`flex gap-4 p-5 bg-[#1c1f2a]/40 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-[#866bff]/30 transition-all cursor-pointer group relative overflow-hidden`}
  >
    {isNew && (
       <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#99ee2d] shadow-[0_0_10px_rgba(153,238,45,0.5)]" />
    )}
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color} backdrop-blur-md shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
         <h3 className="font-bold text-white text-base group-hover:text-[#866bff] transition-colors truncate pr-6">{title}</h3>
         <span className="text-xs text-gray-500 whitespace-nowrap font-medium">{time}</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export function Notifications() {
  return (
    <Layout>
       <motion.div 
         className="p-4 md:p-8 min-h-screen max-w-[1600px] mx-auto"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
       >
          <div className="flex justify-between items-center mb-8">
             <div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Notifications</h1>
                <p className="text-gray-400 text-lg">Stay updated with your latest activities.</p>
             </div>
             <Button variant="ghost" className="text-[#866bff] hover:text-white hover:bg-[#866bff]/20">
                Mark all as read
             </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
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
                   <TabsContent value="all" key="all" className="space-y-4 mt-0">
                      <NotificationItem 
                        id="n1"
                        icon={RiGiftLine} 
                        title="Daily Reward Claimed" 
                        desc="You received 50 Karma points for logging in today. Keep the streak going!" 
                        time="2m ago"
                        color="bg-[#99ee2d]/20"
                        isNew={true}
                      />
                      <NotificationItem 
                        id="n2"
                        icon={RiGamepadLine} 
                        title="Tournament Starting Soon" 
                        desc="Epiko Regal Weekly Skirmish starts in 30 minutes. Check in now to secure your slot." 
                        time="30m ago"
                        color="bg-[#866bff]/20"
                        isNew={true}
                      />
                      <NotificationItem 
                        id="n3"
                        icon={RiShoppingCartLine} 
                        title="Item Sold" 
                        desc="Your listing 'Epiko Legend #44' was sold for 120 USDT to @Collector99." 
                        time="2h ago"
                        color="bg-blue-500/20"
                      />
                       <NotificationItem 
                        id="n4"
                        icon={RiErrorWarningLine} 
                        title="System Update" 
                        desc="We've updated the Terms of Service and Privacy Policy. Please review the changes." 
                        time="1d ago"
                        color="bg-gray-500/20"
                      />
                   </TabsContent>
                   
                   <TabsContent value="games" key="games" className="space-y-4 mt-0">
                      <NotificationItem 
                        id="n5"
                        icon={RiGamepadLine} 
                        title="Tournament Starting Soon" 
                        desc="Epiko Regal Weekly Skirmish starts in 30 minutes. Check in now to secure your slot." 
                        time="30m ago"
                        color="bg-[#866bff]/20"
                        isNew={true}
                      />
                      <NotificationItem 
                        id="n6"
                        icon={RiCheckboxCircleLine} 
                        title="Match Won" 
                        desc="Victory! You won your match against @NoobMaster in Epiko Regal." 
                        time="5h ago"
                        color="bg-[#99ee2d]/20"
                      />
                   </TabsContent>
    
                   <TabsContent value="rewards" key="rewards" className="space-y-4 mt-0">
                      <NotificationItem 
                        id="n7"
                        icon={RiGiftLine} 
                        title="Daily Reward Claimed" 
                        desc="You received 50 Karma points for logging in today. Keep the streak going!" 
                        time="2m ago"
                        color="bg-[#99ee2d]/20"
                        isNew={true}
                      />
                   </TabsContent>

                   <TabsContent value="market" key="market" className="space-y-4 mt-0">
                      <NotificationItem 
                        id="n8"
                        icon={RiShoppingCartLine} 
                        title="Item Sold" 
                        desc="Your listing 'Epiko Legend #44' was sold for 120 USDT to @Collector99." 
                        time="2h ago"
                        color="bg-blue-500/20"
                      />
                   </TabsContent>

                   <TabsContent value="system" key="system" className="space-y-4 mt-0">
                       <NotificationItem 
                        id="n9"
                        icon={RiErrorWarningLine} 
                        title="System Update" 
                        desc="We've updated the Terms of Service and Privacy Policy. Please review the changes." 
                        time="1d ago"
                        color="bg-gray-500/20"
                      />
                   </TabsContent>
                </AnimatePresence>
             </div>
          </Tabs>
       </motion.div>
    </Layout>
  );
}
