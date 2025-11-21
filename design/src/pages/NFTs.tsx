import React from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ExternalLink, Filter, Gem, Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";

const nfts = [
  {
    id: 1,
    name: "Epiko Legend #884",
    game: "Epiko Regal",
    chain: "Polygon",
    rarity: "Legendary",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
  },
  {
    id: 2,
    name: "Brick Master #12",
    game: "Epiko Bricks",
    chain: "Solana",
    rarity: "Epic",
    image: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=800&q=80",
  },
  {
    id: 3,
    name: "Soul Runner #455",
    game: "Epiko Soul Dash",
    chain: "Polygon",
    rarity: "Rare",
    image: "https://images.unsplash.com/photo-1645796138338-6f144e21872e?w=800&q=80",
  },
  {
    id: 4,
    name: "World Builder #99",
    game: "Epiko World",
    chain: "Ethereum",
    rarity: "Common",
    image: "https://images.unsplash.com/photo-1635492491273-455af7728453?w=800&q=80",
  },
];

export function NFTs() {
  return (
    <Layout>
      <motion.div 
        className="p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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
                  <img src={nft.image} alt={nft.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
      </motion.div>
    </Layout>
  );
}
