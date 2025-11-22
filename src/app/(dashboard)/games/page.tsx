"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  RiTrophyLine, 
  RiGroupLine, 
  RiTimeLine, 
  RiDownloadCloudLine, 
  RiPlayFill, 
  RiStarFill,
  RiCheckLine,
  RiAddLine
} from "@remixicon/react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { getGames, getUserGames, toggleGameInstallation, Game, UserGame } from "@/lib/api/games";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

export default function GamesPage() {
  const { user } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [installing, setInstalling] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const allGames = await getGames();
        setGames(allGames);

        if (user) {
          const myGames = await getUserGames(user.id);
          setUserGames(myGames);
        }
      } catch (error) {
        console.error("Error loading games:", error);
        toast.error("Failed to load games");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, [user]);

  const handleInstallToggle = async (gameId: string, currentStatus: boolean) => {
    if (!user) return;
    
    setInstalling(gameId);
    try {
      const success = await toggleGameInstallation(user.id, gameId, !currentStatus);
      if (success) {
        // Refresh user games
        const myGames = await getUserGames(user.id);
        setUserGames(myGames);
        toast.success(currentStatus ? "Game uninstalled" : "Game installed successfully");
      } else {
        toast.error("Failed to update installation status");
      }
    } catch (error) {
      console.error("Error toggling installation:", error);
      toast.error("An error occurred");
    } finally {
      setInstalling(null);
    }
  };

  const isInstalled = (gameId: string) => {
    return userGames.find(ug => ug.game_id === gameId)?.installed || false;
  };

  const getUserGameStats = (gameId: string) => {
    const userGame = userGames.find(ug => ug.game_id === gameId);
    if (userGame) {
      return {
        matches: userGame.matches_played,
        hours: userGame.hours_played,
        wins: userGame.wins
      };
    }
    // Fallback to global stats if no user stats
    const game = games.find(g => g.id === gameId);
    return game?.stats || { matches: 0, hours: 0, wins: 0 };
  };

  const installedGames = games.filter(game => isInstalled(game.id));

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DashboardHeader />
      
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
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading games...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game, index) => {
                const installed = isInstalled(game.id);
                const stats = getUserGameStats(game.id);
                
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white overflow-hidden hover:border-[#866bff]/50 transition-all hover:-translate-y-2 hover:shadow-2xl rounded-3xl group h-full flex flex-col">
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f2a] via-transparent to-transparent z-10 opacity-80" />
                        <img src={game.image_url || ""} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                          {game.tags?.map(tag => (
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
                        <CardTitle className="text-2xl font-bold group-hover:text-[#99ee2d] transition-colors flex justify-between items-center">
                          {game.title}
                          {installed && <RiCheckLine className="w-5 h-5 text-[#99ee2d]" />}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">{game.description}</p>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                <RiGroupLine className="w-4 h-4 text-[#866bff] mb-2" />
                                <span className="text-sm font-bold">{stats.matches}</span>
                                <span className="text-[10px] text-gray-500 uppercase">Matches</span>
                            </div>
                             <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                <RiTimeLine className="w-4 h-4 text-[#99ee2d] mb-2" />
                                <span className="text-sm font-bold">{stats.hours}h</span>
                                <span className="text-[10px] text-gray-500 uppercase">Hours</span>
                            </div>
                             <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                <RiTrophyLine className="w-4 h-4 text-[#FF555A] mb-2" />
                                <span className="text-sm font-bold">{stats.wins}</span>
                                <span className="text-[10px] text-gray-500 uppercase">Wins</span>
                            </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 mt-4 gap-3">
                        <Button 
                          className={`flex-1 font-bold rounded-xl h-12 shadow-lg transition-all ${
                            installed 
                              ? "bg-[#99ee2d] text-black hover:bg-[#88d428] shadow-[#99ee2d]/10 hover:shadow-[#99ee2d]/30" 
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          <RiPlayFill className="w-4 h-4 mr-2 fill-current" />
                          {installed ? "Launch" : "Play Demo"}
                        </Button>
                        
                        <Button
                          variant="outline"
                          className={`h-12 w-12 p-0 rounded-xl border-white/10 ${
                            installed ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" : "text-[#99ee2d] hover:text-[#88d428] hover:bg-[#99ee2d]/10"
                          }`}
                          onClick={() => handleInstallToggle(game.id, installed)}
                          disabled={installing === game.id}
                        >
                          {installing === game.id ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : installed ? (
                            <RiDownloadCloudLine className="w-5 h-5" /> // Use download icon for uninstall to signify "manage installation" or we could use trash
                          ) : (
                            <RiDownloadCloudLine className="w-5 h-5" />
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="installed" className="mt-0">
          {installedGames.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {installedGames.map((game, index) => {
                 const stats = getUserGameStats(game.id);
                 return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white overflow-hidden hover:border-[#866bff]/50 transition-all hover:-translate-y-2 hover:shadow-2xl rounded-3xl group h-full flex flex-col">
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f2a] via-transparent to-transparent z-10 opacity-80" />
                        <img src={game.image_url || ""} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-md border border-white/10">
                           <RiStarFill className="w-3 h-3 text-[#FFBB28] fill-[#FFBB28]" />
                           <span className="text-xs font-bold">{game.rating}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-bold group-hover:text-[#99ee2d] transition-colors">{game.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                <RiGroupLine className="w-4 h-4 text-[#866bff] mb-2" />
                                <span className="text-sm font-bold">{stats.matches}</span>
                                <span className="text-[10px] text-gray-500 uppercase">Matches</span>
                            </div>
                             <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                <RiTimeLine className="w-4 h-4 text-[#99ee2d] mb-2" />
                                <span className="text-sm font-bold">{stats.hours}h</span>
                                <span className="text-[10px] text-gray-500 uppercase">Hours</span>
                            </div>
                             <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                                <RiTrophyLine className="w-4 h-4 text-[#FF555A] mb-2" />
                                <span className="text-sm font-bold">{stats.wins}</span>
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
                 );
               })}
             </div>
          ) : (
            <EmptyState 
             icon={RiDownloadCloudLine}
             title="No Games Installed"
             description="Install games from the 'All Games' tab to see them here."
             actionLabel="Browse Games"
             onAction={() => document.querySelector('[value=all]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}
          />
          )}
        </TabsContent>

        <TabsContent value="updates" className="mt-0">
          <EmptyState 
             icon={RiCheckLine}
             title="Everything is up to date"
             description="You're running the latest versions of all your games."
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
