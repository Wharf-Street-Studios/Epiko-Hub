"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  RiTwitterXLine, 
  RiLink, 
  RiSettings4Line, 
  RiShareLine, 
  RiMapPinLine, 
  RiCalendarLine,
  RiDiscordLine,
  RiLoader4Line,
  RiUserUnfollowLine
} from "@remixicon/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, UserProfile } from "@/lib/api/users";
import { getUserGames } from "@/lib/api/games";
import { getUserNFTs } from "@/lib/api/nfts";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({
    matches: 0,
    karma: 0,
    collectibles: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      if (user) {
        try {
          const [userProfile, userGames, userNfts] = await Promise.all([
            getUserProfile(user.id),
            getUserGames(user.id),
            getUserNFTs(user.id)
          ]);
          
          setProfile(userProfile);
          
          const matches = userGames.reduce((acc, game) => acc + (game.matches_played || 0), 0);
          
          setStats({
            matches,
            karma: userProfile?.karma_points || 0,
            collectibles: userNfts.length
          });
        } catch (error) {
          console.error("Error loading profile data:", error);
          toast.error("Failed to load profile data");
        }
      }
      setLoading(false);
    }

    loadProfileData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RiLoader4Line className="w-8 h-8 text-[#866bff] animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState 
          icon={RiUserUnfollowLine}
          title="Profile Not Found"
          description="We couldn't find the profile you're looking for. It might have been deleted or doesn't exist."
          actionLabel="Go Home"
          onAction={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Header Banner */}
      <div className="relative h-[280px]">
         <div className="absolute inset-0 bg-gradient-to-r from-[#8060FF] to-[#5A29C3]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         </div>
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#12141d] to-transparent" />
      </div>
      
      <div className="px-4 md:px-8 pb-8 -mt-20 relative z-10 max-w-[1600px] mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left w-full md:w-auto">
               <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="p-1.5 bg-[#12141d] rounded-full"
               >
                  <Avatar className="w-40 h-40 border-4 border-[#12141d]">
                     <AvatarImage src={profile.avatar_url || ""} />
                     <AvatarFallback>{profile.display_name?.substring(0, 2).toUpperCase() || "EP"}</AvatarFallback>
                  </Avatar>
               </motion.div>
               <div className="mb-2 space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                     <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{profile.display_name || "Epiko User"}</h1>
                     <Badge className="bg-[#99ee2d] text-black hover:bg-[#99ee2d] px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(153,238,45,0.4)]">Verified</Badge>
                  </div>
                  <p className="text-gray-400 font-medium text-lg">@{profile.username || "user"}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                     <span className="flex items-center gap-1"><RiMapPinLine className="w-4 h-4" /> Tokyo, Japan</span>
                     <span className="flex items-center gap-1"><RiCalendarLine className="w-4 h-4" /> Joined {new Date(profile.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                  </div>
               </div>
            </div>
            <div className="flex gap-3 mb-2 w-full md:w-auto justify-center">
               <Button 
                 variant="outline" 
                 className="px-6"
               >
                  <RiShareLine className="w-4 h-4 mr-2" />
                  Share
               </Button>
               <Button 
                 className="bg-[#866bff] text-white hover:bg-[#7055d5] px-6"
                 onClick={() => router.push("/settings")}
                >
                  <RiSettings4Line className="w-4 h-4 mr-2" />
                  Edit Profile
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
               className="lg:col-span-2 space-y-8"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
            >
               <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl overflow-hidden">
                  <CardHeader>
                     <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-gray-300 leading-relaxed text-lg">
                        {profile.bio || "No bio yet."}
                     </p>
                     <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Level", value: "15", color: "#99ee2d" }, // Mock level for now
                          { label: "Matches", value: stats.matches.toLocaleString(), color: "white" },
                          { label: "Karma", value: stats.karma.toLocaleString(), color: "white" },
                          { label: "Collectibles", value: stats.collectibles.toString(), color: "white" },
                        ].map((stat, i) => (
                          <motion.div 
                             key={i} 
                             whileHover={{ y: -5 }}
                             className="bg-white/5 p-6 rounded-2xl text-center border border-white/5"
                          >
                             <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                             <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
                          </motion.div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </motion.div>

            <motion.div 
               className="space-y-8"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
            >
               <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl">
                  <CardHeader>
                     <CardTitle>Connected Accounts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-[#1DA1F2]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DA1F2] transition-colors">
                              <RiTwitterXLine className="w-5 h-5 text-[#1DA1F2] group-hover:text-white" />
                           </div>
                           <span className="font-medium">Twitter</span>
                        </div>
                        <span className="text-sm text-gray-400">@itachi</span>
                     </div>
                     <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-[#5865F2]/20 rounded-full flex items-center justify-center group-hover:bg-[#5865F2] transition-colors">
                              <RiDiscordLine className="w-5 h-5 text-[#5865F2] group-hover:text-white" />
                           </div>
                           <span className="font-medium">Discord</span>
                        </div>
                        <Button variant="link" className="text-[#866bff] h-auto p-0">Connect</Button>
                     </div>
                     <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                              <RiLink className="w-5 h-5 text-white" />
                           </div>
                           <span className="font-medium">VeVe</span>
                        </div>
                        <span className="text-sm text-gray-400">Connected</span>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
