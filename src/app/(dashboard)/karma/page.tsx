"use client"

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  RiStarFill, 
  RiGiftLine, 
  RiHistoryLine, 
  RiShoppingBag3Line 
} from "@remixicon/react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getKarmaBalance, getKarmaTransactions, getMonthlyKarmaEarnings, KarmaTransaction } from "@/lib/api/karma";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

export default function KarmaPage() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);
  const [history, setHistory] = useState<KarmaTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKarmaData() {
      if (user) {
        try {
          const [userBalance, userTransactions, userMonthly] = await Promise.all([
            getKarmaBalance(user.id),
            getKarmaTransactions(user.id),
            getMonthlyKarmaEarnings(user.id)
          ]);
          setBalance(userBalance);
          setHistory(userTransactions);
          // Use the last month's earnings
          setMonthlyEarnings(userMonthly[userMonthly.length - 1] || 0);
        } catch (error) {
          console.error("Error loading karma data:", error);
          toast.error("Failed to load karma data");
        } finally {
          setLoading(false);
        }
      }
    }

    loadKarmaData();
  }, [user]);

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DashboardHeader />
      
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
                   <h2 className="text-6xl font-bold font-mono mb-4">
                     {loading ? "..." : balance.toLocaleString()}
                   </h2>
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
                   {/* Mock breakdown for now as we don't have detailed source tracking yet */}
                   <div className="flex justify-between items-center">
                      <span className="text-gray-400">Epiko Regal</span>
                      <span className="font-bold">+{Math.floor(monthlyEarnings * 0.6)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tournaments</span>
                      <span className="font-bold">+{Math.floor(monthlyEarnings * 0.3)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-gray-400">Daily Login</span>
                      <span className="font-bold">+{Math.floor(monthlyEarnings * 0.1)}</span>
                   </div>
                   <div className="h-px bg-white/5 my-2" />
                   <div className="flex justify-between items-center text-lg">
                      <span>Total</span>
                      <span className="font-bold text-[#99ee2d]">
                        {loading ? "..." : monthlyEarnings.toLocaleString()}
                      </span>
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
                {loading ? (
                  <div className="text-center text-gray-500 py-8">Loading history...</div>
                ) : history.length === 0 ? (
                  <EmptyState 
                  icon={RiHistoryLine}
                  title="No history found"
                  description="Your karma history will appear here once you start earning rewards."
                />
                ) : (
                  history.map((tx) => (
                     <div key={tx.id} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 -mx-4 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                              {tx.amount > 0 ? <RiStarFill className="w-5 h-5 text-[#99ee2d]" /> : <RiGiftLine className="w-5 h-5 text-[#866bff]" />}
                           </div>
                           <div>
                              <p className="font-medium text-white capitalize">{tx.reason}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(tx.created_at).toLocaleDateString()}
                              </p>
                           </div>
                        </div>
                        <span className={`font-bold text-lg ${tx.amount > 0 ? 'text-[#99ee2d]' : 'text-red-400'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </span>
                     </div>
                  ))
                )}
             </div>
          </CardContent>
       </Card>
    </motion.div>
  );
}
