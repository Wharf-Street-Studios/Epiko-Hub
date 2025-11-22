"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Filter, Gem, Link as LinkIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { getUserNFTs, NFT } from "@/lib/api/nfts";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";

export default function NFTsPage() {
  const { user } = useAuth();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadNFTs() {
      if (user) {
        try {
          const userNfts = await getUserNFTs(user.id);
          setNfts(userNfts);
        } catch (error) {
          console.error("Error loading NFTs:", error);
          toast.error("Failed to load NFTs");
        }
      }
      setLoading(false);
    }

    loadNFTs();
  }, [user]);

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DashboardHeader />
      
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">NFT Collectibles</h1>
          <p className="text-gray-400 text-lg">View and manage your digital assets across chains.</p>
        </div>
        <Button variant="outline" className="rounded-full border-white/10 bg-black/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-md px-6">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-[#866bff] animate-spin" />
        </div>
      ) : nfts.length === 0 ? (
        <EmptyState 
          icon={Gem}
          title="No NFTs Found"
          description="You don't have any NFTs in your collection yet. Visit the market to start collecting."
          actionLabel="Go to Market"
          onAction={() => router.push("/market")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {nfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white overflow-hidden hover:border-[#866bff]/50 transition-all hover:-translate-y-2 hover:shadow-2xl rounded-3xl group">
                <div className="aspect-square overflow-hidden relative">
                  <img src={nft.image_url || ""} alt={nft.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f2a] to-transparent opacity-60" />
                  
                  <div className="absolute top-4 right-4">
                    <Badge className={`
                      ${nft.rarity === 'Legendary' ? 'bg-orange-500/80 text-orange-100 shadow-orange-500/20' : 
                        nft.rarity === 'Epic' ? 'bg-purple-500/80 text-purple-100 shadow-purple-500/20' : 
                        nft.rarity === 'Rare' ? 'bg-blue-500/80 text-blue-100 shadow-blue-500/20' : 'bg-gray-500/80 text-gray-100'}
                      border-none backdrop-blur-md shadow-lg px-3 py-1
                    `}>
                      {nft.rarity}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 flex gap-2">
                     <div className="bg-black/50 backdrop-blur-md rounded-full p-1.5 border border-white/10">
                        <Gem className="w-4 h-4 text-white" />
                     </div>
                  </div>
                </div>
                <CardHeader className="pb-3 pt-5">
                  <CardTitle className="text-xl font-bold">{nft.name}</CardTitle>
                  <div className="flex gap-2 mt-2 flex-wrap">
                     <Badge variant="outline" className="rounded-lg border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">
                        <LinkIcon className="w-3 h-3 mr-1" /> {nft.chain}
                     </Badge>
                     <Badge variant="outline" className="rounded-lg border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">
                        {nft.game}
                     </Badge>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-white/5 hover:bg-[#866bff] hover:text-white text-white border border-white/10 transition-all rounded-xl font-bold h-11">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
