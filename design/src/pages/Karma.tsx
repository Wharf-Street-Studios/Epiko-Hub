import React from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { 
  RiStarFill, 
  RiGiftLine, 
  RiHistoryLine, 
  RiShoppingBag3Line 
} from "@remixicon/react";

export function Karma() {
  return (
    <Layout>
      <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold text-white mb-2">Karma Points</h1>
               <p className="text-gray-400">Earn rewards for your activity in the Epiko ecosystem.</p>
            </div>
            <Button className="bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold shadow-lg shadow-[#99ee2d]/20">
               <RiShoppingBag3Line className="w-5 h-5 mr-2" /> Redeem Store
            </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#866bff] to-[#5A29C3] border-none text-white md:col-span-2 rounded-3xl shadow-xl">
               <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                     <p className="text-purple-200 mb-1">Total Karma Balance</p>
                     <h2 className="text-6xl font-bold font-mono mb-4">46,843</h2>
                     <div className="flex items-center gap-2 text-sm text-purple-100 bg-black/20 px-3 py-1 rounded-full w-fit">
                        <RiStarFill className="w-4 h-4 text-[#99ee2d]" />
                        <span>Top 5% of players this month</span>
                     </div>
                  </div>
                  <div className="w-full md:w-1/3 space-y-2">
                     <div className="flex justify-between text-sm">
                        <span>Next Level</span>
                        <span>3,157 to go</span>
                     </div>
                     <Progress value={75} className="h-2 bg-black/20" indicatorClassName="bg-[#99ee2d]" />
                     <p className="text-xs text-purple-200 text-right">Level 15 → 16</p>
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <div className="bg-[#99ee2d]/20 p-2 rounded-lg">
                        <RiGiftLine className="w-5 h-5 text-[#99ee2d]" />
                     </div>
                     Monthly Earnings
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-400">Epiko Regal</span>
                        <span className="font-bold">+1,200</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-400">Tournaments</span>
                        <span className="font-bold">+500</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-400">Daily Login</span>
                        <span className="font-bold">+150</span>
                     </div>
                     <div className="h-px bg-white/5 my-2" />
                     <div className="flex justify-between items-center text-lg">
                        <span>Total</span>
                        <span className="font-bold text-[#99ee2d]">1,850</span>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <div className="bg-white/10 p-2 rounded-lg">
                     <RiHistoryLine className="w-5 h-5 text-gray-400" />
                  </div>
                  History
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-0">
                  {[1,2,3,4,5].map(i => (
                     <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 -mx-4 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                              {i % 2 === 0 ? <RiStarFill className="w-5 h-5 text-[#99ee2d]" /> : <RiGiftLine className="w-5 h-5 text-[#866bff]" />}
                           </div>
                           <div>
                              <p className="font-medium text-white">{i % 2 === 0 ? 'Tournament Reward' : 'Daily Challenge'}</p>
                              <p className="text-xs text-gray-500">Oct {20-i}, 2023</p>
                           </div>
                        </div>
                        <span className="font-bold text-[#99ee2d] text-lg">+{i * 50}</span>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </Layout>
  );
}
