"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  RiWallet3Line, 
  RiNotification3Line, 
  RiShieldCheckLine, 
  RiUserSettingsLine,
  RiImageEditLine,
  RiUploadCloud2Line
} from "@remixicon/react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
         <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Settings</h1>
         <p className="text-gray-400 text-lg">Manage your account preferences and connections.</p>
      </div>

      {/* Profile Settings */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
         <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl overflow-hidden shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-[#866bff]/20 p-2 rounded-lg">
                     <RiUserSettingsLine className="w-6 h-6 text-[#866bff]" />
                  </div>
                  Public Profile
               </CardTitle>
               <CardDescription className="text-gray-400 text-base ml-[52px]">Update your public profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pl-[60px] pr-8 pb-8">
               <div className="space-y-6">
                  {/* Banner & Avatar */}
                  <div className="relative">
                     <div className="h-40 w-full bg-gradient-to-r from-[#4c1d95] to-[#866bff] rounded-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <div className="flex items-center gap-2 text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                              <RiImageEditLine className="w-5 h-5" />
                              <span>Change Banner</span>
                           </div>
                        </div>
                     </div>
                     <div className="absolute -bottom-12 left-8">
                        <div className="relative group">
                           <div className="w-32 h-32 rounded-full border-4 border-[#1c1f2a] overflow-hidden bg-[#12141d]">
                              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80" alt="Avatar" className="w-full h-full object-cover" />
                           </div>
                           <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-4 border-transparent">
                              <RiUploadCloud2Line className="w-8 h-8 text-white" />
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Form Fields */}
                  <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input id="display-name" defaultValue="Itachi OGX" className="bg-black/20 border-white/10 text-white" />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@itachi_ogx" disabled className="bg-black/20 border-white/10 text-gray-400 cursor-not-allowed" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                           id="bio" 
                           className="bg-black/20 border-white/10 text-white min-h-[100px]" 
                           defaultValue="Professional Epiko Regal player and NFT collector. Building the future of gaming on Web3. Always looking for the next big tournament to conquer."
                        />
                     </div>
                  </div>
                  <div className="flex justify-end">
                     <Button className="bg-[#866bff] hover:bg-[#7059d6] text-white font-bold">Save Changes</Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
         <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl overflow-hidden shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-[#99ee2d]/20 p-2 rounded-lg">
                     <RiWallet3Line className="w-6 h-6 text-[#99ee2d]" />
                  </div>
                  Wallet Connection
               </CardTitle>
               <CardDescription className="text-gray-400 text-base ml-[52px]">Manage your connected Web3 wallets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pl-[60px] pr-8 pb-8">
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <span className="text-orange-500 font-bold text-lg">M</span>
                     </div>
                     <div>
                        <p className="font-bold text-lg">MetaMask</p>
                        <p className="text-sm text-gray-400 font-mono">0x71C...9A23</p>
                     </div>
                  </div>
                  <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 hover:text-red-500">Disconnect</Button>
               </div>
               <Button size="lg" className="w-full bg-[#866bff] hover:bg-[#7059d6] text-white font-bold shadow-lg shadow-[#866bff]/20">Add New Wallet</Button>
            </CardContent>
         </Card>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
         <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl overflow-hidden shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-[#866bff]/20 p-2 rounded-lg">
                     <RiNotification3Line className="w-6 h-6 text-[#866bff]" />
                  </div>
                  Notifications
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pl-[60px] pr-6 pb-6">
               <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors">
                  <Label htmlFor="game-notifs" className="flex flex-col gap-1 cursor-pointer items-start text-left">
                     <span className="text-lg font-medium">Game Updates</span>
                     <span className="font-normal text-sm text-gray-400">Receive news about game patches and events</span>
                  </Label>
                  <Switch id="game-notifs" defaultChecked className="data-[state=checked]:bg-[#866bff]" />
               </div>
               <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors">
                  <Label htmlFor="market-notifs" className="flex flex-col gap-1 cursor-pointer items-start text-left">
                     <span className="text-lg font-medium">Marketplace Activity</span>
                     <span className="font-normal text-sm text-gray-400">When items you follow are sold or listed</span>
                  </Label>
                  <Switch id="market-notifs" defaultChecked className="data-[state=checked]:bg-[#866bff]" />
               </div>
            </CardContent>
         </Card>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
         <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl overflow-hidden shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                     <RiShieldCheckLine className="w-6 h-6 text-blue-400" />
                  </div>
                  Privacy & Security
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pl-[60px] pr-8 pb-8">
               <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-2xl transition-colors">
                  <Label className="text-lg font-medium">Two-Factor Authentication</Label>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 font-bold">Enable</Button>
               </div>
               <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-2xl transition-colors">
                  <Label className="text-lg font-medium">Data Sharing</Label>
                  <Switch className="data-[state=checked]:bg-[#866bff]" />
               </div>
            </CardContent>
         </Card>
      </motion.div>
    </motion.div>
  );
}
