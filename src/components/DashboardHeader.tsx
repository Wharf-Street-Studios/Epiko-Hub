"use client"

import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  RiSearchLine, 
  RiWallet3Line, 
  RiStarLine, 
  RiArrowDownSLine,
  RiUserLine,
  RiSettings3Line,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();
  const user = {
    name: "Itachi OGX",
    level: 15,
    id: "EC46843",
    wallet: "2.5K USDT",
    karma: "46K",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80"
  };

  return (
    <motion.header 
      className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 sticky top-4 z-30 bg-[#12141d]/80 backdrop-blur-xl p-4 rounded-3xl border border-white/5 shadow-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
       {/* Search */}
       <div className="relative w-full md:w-96 group">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-[#866bff] transition-colors" />
          <Input 
            placeholder="Search ecosystem..." 
            className="pl-10 bg-black/20 border-white/10 text-white focus-visible:ring-[#866bff] rounded-2xl h-12 transition-all group-hover:bg-black/30"
          />
       </div>

       {/* Right Side Stats */}
       <div className="flex items-center gap-6 w-full md:w-auto justify-end">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
             <div className="w-10 h-10 rounded-full bg-[#99ee2d]/10 border border-[#99ee2d]/50 flex items-center justify-center">
                <RiStarLine className="w-5 h-5 text-[#99ee2d]" />
             </div>
             <div>
                <p className="text-[10px] text-gray-400 uppercase leading-none mb-1">Karma</p>
                <p className="text-sm font-bold text-white leading-none">{user.karma}</p>
             </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
             <div className="w-10 h-10 rounded-full bg-[#866bff]/10 border border-[#866bff]/50 flex items-center justify-center">
                <RiWallet3Line className="w-5 h-5 text-[#866bff]" />
             </div>
             <div>
                <p className="text-[10px] text-gray-400 uppercase leading-none mb-1">Wallet</p>
                <p className="text-sm font-bold text-white leading-none">{user.wallet}</p>
             </div>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div 
                className="flex items-center gap-3 border-l border-white/10 pl-6 cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              >
                 <Avatar className="h-10 w-10 border-2 border-[#866bff]">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>IO</AvatarFallback>
                 </Avatar>
                 <div className="hidden md:block">
                    <p className="text-sm font-bold text-white leading-none flex items-center gap-1">
                       {user.name} <RiArrowDownSLine className="w-3 h-3 text-gray-400" />
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase leading-none mt-1 text-[#99ee2d]">Level {user.level}</p>
                 </div>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-[#1c1f2a] border-white/10 text-white rounded-2xl p-2"
            >
              <DropdownMenuLabel className="text-gray-400 text-xs uppercase">Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                onClick={() => router.push("/profile")}
                className="rounded-xl cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-white"
              >
                <RiUserLine className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => router.push("/settings")}
                className="rounded-xl cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-white"
              >
                <RiSettings3Line className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                onClick={() => router.push("/onboarding")}
                className="rounded-xl cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-400 focus:text-red-400"
              >
                <RiLogoutBoxLine className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
       </div>
    </motion.header>
  );
}
