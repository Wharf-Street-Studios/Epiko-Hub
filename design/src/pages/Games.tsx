import React from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { 
  RiTrophyLine, 
  RiGroupLine, 
  RiTimeLine, 
  RiDownloadCloudLine, 
  RiPlayFill, 
  RiStarFill 
} from "@remixicon/react";
import { motion } from "motion/react";

const games = [
  {
    id: 1,
    title: "Epiko Regal",
    description: "Strategic tower defense with AR integration.",
    stats: { matches: "1.2k", hours: "45h", wins: "120" },
    tags: ["Strategy", "AR", "Mobile"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Epiko World",
    description: "Open world adventure and building.",
    stats: { matches: "850", hours: "120h", wins: "45" },
    tags: ["Adventure", "MMO"],
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Epiko Bricks",
    description: "Classic arcade puzzle action.",
    stats: { matches: "3.4k", hours: "12h", wins: "890" },
    tags: ["Arcade", "Puzzle"],
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80",
    rating: 4.2,
  },
  {
    id: 4,
    title: "Epiko Smash",
    description: "High-octane brawler arena.",
    stats: { matches: "200", hours: "5h", wins: "12" },
    tags: ["Action", "Fighting"],
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Epiko Soul Dash",
    description: "Endless runner with RPG elements.",
    stats: { matches: "15k", hours: "30h", wins: "N/A" },
    tags: ["Runner", "Mobile"],
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    rating: 4.3,
  },
];

export function Games() {
  return (
    <Layout>
      <motion.div 
        className="p-4 md:p-8 max-w-[1600px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Games</h1>
            <p className="text-gray-400 text-lg">Explore the Epiko Ecosystem</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-transparent p-0 gap-2 flex-wrap justify-start h-auto">
            <TabsTrigger 
              value="all"
              className="rounded-full h-11 px-6 data-[state=active]:bg-[#866bff] data-[state=active]:text-white bg-[#1c1f2a]/40 border border-white/5 text-gray-400 hover:text-white transition-all font-bold"
            >
              All Games
            </TabsTrigger>
            <TabsTrigger 
              value="installed"
              className="rounded-full h-11 px-6 data-[state=active]:bg-[#866bff] data-[state=active]:text-white bg-[#1c1f2a]/40 border border-white/5 text-gray-400 hover:text-white transition-all font-bold"
            >
              Installed
            </TabsTrigger>
            <TabsTrigger 
              value="updates"
              className="rounded-full h-11 px-6 data-[state=active]:bg-[#866bff] data-[state=active]:text-white bg-[#1c1f2a]/40 border border-white/5 text-gray-400 hover:text-white transition-all font-bold"
            >
              Updates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white overflow-hidden hover:border-[#866bff]/50 transition-all hover:-translate-y-2 hover:shadow-2xl rounded-3xl group h-full flex flex-col">
                    <div className="h-56 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f2a] via-transparent to-transparent z-10 opacity-80" />
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 right-4 z-20 flex gap-2">
                        {game.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-black/60 text-white backdrop-blur-md border border-white/10 shadow-lg">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-md border border-white/10">
                         <RiStarFill className="w-3 h-3 text-[#FFBB28] fill-[#FFBB28]" />
                         <span className="text-xs font-bold">{game.rating}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-bold group-hover:text-[#99ee2d] transition-colors">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{game.description}</p>
                      <div className="grid grid-cols-3 gap-3">
                          <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                              <RiGroupLine className="w-4 h-4 text-[#866bff] mb-2" />
                              <span className="text-sm font-bold">{game.stats.matches}</span>
                              <span className="text-[10px] text-gray-500 uppercase">Matches</span>
                          </div>
                           <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                              <RiTimeLine className="w-4 h-4 text-[#99ee2d] mb-2" />
                              <span className="text-sm font-bold">{game.stats.hours}</span>
                              <span className="text-[10px] text-gray-500 uppercase">Hours</span>
                          </div>
                           <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                              <RiTrophyLine className="w-4 h-4 text-[#FF555A] mb-2" />
                              <span className="text-sm font-bold">{game.stats.wins}</span>
                              <span className="text-[10px] text-gray-500 uppercase">Wins</span>
                          </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 mt-4">
                      <Button className="w-full bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold rounded-xl h-12 shadow-lg shadow-[#99ee2d]/10 transition-all hover:shadow-[#99ee2d]/30">
                        <RiPlayFill className="w-4 h-4 mr-2 fill-current" />
                        Launch Game
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="installed" className="mt-0">
            <div className="flex flex-col items-center justify-center py-32 text-gray-500 space-y-6">
               <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                 <RiDownloadCloudLine className="w-10 h-10 opacity-40" />
               </div>
               <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">No Games Installed</h3>
                  <p className="max-w-sm mx-auto">Install games from the "All Games" tab to see them here.</p>
               </div>
            </div>
          </TabsContent>

          <TabsContent value="updates" className="mt-0">
            <div className="flex flex-col items-center justify-center py-32 text-gray-500 space-y-6">
               <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                 <RiTimeLine className="w-10 h-10 opacity-40" />
               </div>
               <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Everything is up to date</h3>
                  <p className="max-w-sm mx-auto">You're running the latest versions of all your games.</p>
               </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
}
