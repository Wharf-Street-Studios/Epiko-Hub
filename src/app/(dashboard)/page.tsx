"use client"

import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  RiStarLine, 
  RiFileCopyLine, 
  RiArrowRightUpLine
} from "@remixicon/react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { toast } from "sonner";
import { motion, Variants } from "framer-motion"; // Corrected import for motion

// Mock Data
const radarData = [
  { subject: 'Collectibles', A: 120, fullMark: 150 },
  { subject: 'Social', A: 98, fullMark: 150 },
  { subject: 'Games', A: 86, fullMark: 150 },
  { subject: 'Tournaments', A: 99, fullMark: 150 },
  { subject: 'NFTs', A: 85, fullMark: 150 },
  { subject: 'Engagement', A: 65, fullMark: 150 },
];

const performanceData = [
  { name: 'Mon', reward: 40, performance: 24 },
  { name: 'Tue', reward: 30, performance: 13 },
  { name: 'Wed', reward: 20, performance: 58 },
  { name: 'Thu', reward: 27, performance: 39 },
  { name: 'Fri', reward: 18, performance: 48 },
  { name: 'Sat', reward: 23, performance: 38 },
  { name: 'Sun', reward: 34, performance: 43 },
];

const pieData = [
  { name: 'Tournaments', value: 400 },
  { name: 'Games', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Referrals', value: 200 },
];

const COLORS = ['#866bff', '#99ee2d', '#00C49F', '#FFBB28'];

export default function Dashboard() {
  const user = {
    name: "Itachi OGX",
    level: 15,
    id: "EC46843",
    wallet: "2.5K USDT",
    karma: "46K",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80"
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    toast.success("ID copied to clipboard");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <DashboardHeader />

      {/* Hero / Profile Stats Banner */}
      <motion.div 
        className="bg-[#1c1f2a]/50 backdrop-blur-md rounded-[32px] overflow-hidden border border-white/5 relative flex flex-col lg:flex-row min-h-[400px] shadow-2xl"
        variants={itemVariants}
      >
         {/* Purple Section with Glassmorphism */}
         <div className="lg:w-2/5 relative overflow-hidden p-8 flex flex-col justify-center z-10">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8060FF] to-[#5A29C3] opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#99ee2d] rounded-full blur-[100px] opacity-30 mix-blend-overlay"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                 <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-full shadow-xl ring-1 ring-white/20">
                    <Avatar className="h-28 w-28 border-4 border-transparent">
                       <AvatarImage src={user.avatar} />
                       <AvatarFallback>IO</AvatarFallback>
                    </Avatar>
                 </div>
                 <div>
                    <h2 className="text-4xl font-bold text-white flex items-center gap-2 tracking-tight">
                       {user.name}
                       <Badge className="bg-[#99ee2d] text-black hover:bg-[#99ee2d] h-6 w-6 rounded-full p-0 flex items-center justify-center shadow-[0_0_15px_rgba(153,238,45,0.6)]">✓</Badge>
                    </h2>
                    <motion.div 
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full w-fit mt-3 cursor-pointer hover:bg-black/30 transition-colors border border-white/10"
                      onClick={handleCopyId}
                    >
                       <span className="text-xs text-white/90 font-mono tracking-wider">{user.id}</span>
                       <RiFileCopyLine className="w-3 h-3 text-white/70" />
                    </motion.div>
                    <p className="text-xs text-purple-200 mt-3 font-medium">Member since 2021 • Pro Player</p>
                 </div>
              </div>
              
              <Button asChild className="bg-[#99ee2d] text-black hover:bg-[#99ee2d] mt-4 shadow-lg w-fit h-14 rounded-2xl px-10 text-base">
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(153,238,45,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                   VIEW PROFILE <RiArrowRightUpLine className="w-5 h-5" />
                </motion.button>
              </Button>
            </div>
         </div>

         {/* Stats Section */}
         <div className="lg:w-3/5 bg-[#0f1116]/60 backdrop-blur-xl p-8 lg:pl-12 flex flex-col justify-center relative z-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 mb-10">
               {[
                 { label: "Apps Installed", value: "2" },
                 { label: "Games Played", value: "1,232" },
                 { label: "Games Won", value: "213", highlight: true },
                 { label: "Events Won", value: "3" },
                 { label: "AR Collection", value: "4" },
                 { label: "NFT Collection", value: "6" },
               ].map((stat, idx) => (
                 <div key={idx}>
                    <p className="text-gray-400 text-[11px] uppercase tracking-widest font-semibold mb-2">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.highlight ? "text-[#99ee2d]" : "text-white"}`}>{stat.value}</p>
                 </div>
               ))}
            </div>

             <div className="flex flex-col sm:flex-row gap-4 mt-auto w-full">
                <div className="h-24 flex items-center gap-5 bg-black/40 border border-white/10 px-6 rounded-2xl flex-1 backdrop-blur-md shadow-lg hover:border-white/20 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-[#99ee2d]/10 border border-[#99ee2d]/20 flex items-center justify-center shrink-0">
                      <RiStarLine className="w-6 h-6 text-[#99ee2d]" />
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Total Earned</p>
                      <span className="text-2xl md:text-3xl font-black text-[#99ee2d] tracking-tight">46,123 <span className="text-sm font-bold text-white/60 ml-1">KARMA</span></span>
                   </div>
                </div>
                <Button 
                  className="h-24 w-full sm:w-auto flex-1 bg-black/40 text-white border border-white/10 hover:bg-[#99ee2d] hover:text-black hover:border-[#99ee2d] rounded-2xl font-black text-lg tracking-widest shadow-lg transition-all duration-300"
                >
                   REDEEM NOW
                </Button>
             </div>
         </div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div variants={itemVariants}>
         <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-white">Analytics Overview</h3>
           <div className="flex gap-2">
              <Badge variant="outline" className="text-xs border-white/20 text-gray-400 hover:bg-white/5 cursor-pointer px-3 py-1">Weekly</Badge>
              <Badge variant="secondary" className="text-xs bg-[#866bff] text-white hover:bg-[#7055d5] cursor-pointer px-3 py-1">Monthly</Badge>
              <Badge variant="outline" className="text-xs border-white/20 text-gray-400 hover:bg-white/5 cursor-pointer px-3 py-1">All Time</Badge>
           </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Radar Chart */}
            <Card className="bg-[#1c1f2a]/50 backdrop-blur-md border-white/5 text-white h-[380px] rounded-3xl shadow-xl overflow-hidden group hover:border-[#866bff]/30 transition-colors">
               <CardHeader>
                  <CardTitle className="text-sm text-center text-gray-400 uppercase tracking-widest">Player Attributes</CardTitle>
               </CardHeader>
               <CardContent className="h-[310px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="#333" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name="Player" dataKey="A" stroke="#866bff" strokeWidth={3} fill="#866bff" fillOpacity={0.3} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1c1f2a', borderColor: '#333', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                         />
                     </RadarChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            {/* Line/Area Chart */}
            <Card className="bg-[#1c1f2a]/50 backdrop-blur-md border-white/5 text-white h-[380px] rounded-3xl shadow-xl overflow-hidden group hover:border-[#866bff]/30 transition-colors">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-400 uppercase tracking-widest">Performance</CardTitle>
                  <div className="text-right bg-[#866bff]/10 px-3 py-1 rounded-lg border border-[#866bff]/20">
                     <p className="text-[10px] text-[#866bff] uppercase font-bold">Avg Reward</p>
                     <p className="text-lg font-bold text-white">110 XP</p>
                  </div>
               </CardHeader>
               <CardContent className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#866bff" stopOpacity={0.5}/>
                              <stop offset="95%" stopColor="#866bff" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#666" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#666" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1c1f2a', borderColor: '#333', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: '#866bff', strokeWidth: 1 }}
                         />
                        <Area 
                          type="monotone" 
                          dataKey="performance" 
                          stroke="#866bff" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorPerf)" 
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="bg-[#1c1f2a]/50 backdrop-blur-md border-white/5 text-white h-[380px] rounded-3xl shadow-xl overflow-hidden group hover:border-[#866bff]/30 transition-colors">
               <CardHeader>
                  <CardTitle className="text-sm text-center text-gray-400 uppercase tracking-widest">Distribution</CardTitle>
               </CardHeader>
               <CardContent className="h-[310px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={pieData}
                           cx="50%"
                           cy="50%"
                           innerRadius={70}
                           outerRadius={90}
                           paddingAngle={5}
                           dataKey="value"
                           cornerRadius={6}
                        >
                           {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                           ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1c1f2a', borderColor: '#333', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                         />
                     </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend at bottom */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 flex-wrap px-4">
                     {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                           <div className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: COLORS[index % COLORS.length], color: COLORS[index % COLORS.length] }} />
                           <span className="text-[10px] text-gray-300">{entry.name}</span>
                        </div>
                     ))}
                  </div>
                  
                  {/* Center Text */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                     <p className="text-3xl font-bold text-white">1200</p>
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </motion.div>
    </motion.div>
  );
}
