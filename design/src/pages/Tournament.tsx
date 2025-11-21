import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { 
  RiTrophyLine, 
  RiCalendarLine, 
  RiGroupLine, 
  RiSwordLine, 
  RiTimerLine, 
  RiCheckboxCircleLine, 
  RiErrorWarningLine,
  RiNotification3Line
} from "@remixicon/react";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

const Match = ({ p1, p2, score1, score2 }: { p1: string, p2: string, score1?: number, score2?: number }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 w-48 shrink-0 shadow-lg">
    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
      <span className="text-sm text-white truncate font-medium">{p1}</span>
      <span className={`text-sm font-bold ${score1 !== undefined && score2 !== undefined && score1 > score2 ? "text-[#99ee2d]" : "text-gray-400"}`}>{score1}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-sm text-white truncate font-medium">{p2}</span>
      <span className={`text-sm font-bold ${score1 !== undefined && score2 !== undefined && score2 > score1 ? "text-[#99ee2d]" : "text-gray-400"}`}>{score2}</span>
    </div>
  </div>
);

export function Tournament() {
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setRegistrationStep(1);
      setSelectedTournament(null);
      toast.success("Successfully registered for tournament!");
    }, 2000);
  };

  return (
    <Layout>
      <motion.div 
        className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Tournaments</h1>
            <p className="text-gray-400 text-lg">Compete for glory and huge prizes.</p>
          </div>
          <Button className="bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold shadow-lg shadow-[#99ee2d]/20">
             <RiTrophyLine className="w-5 h-5 mr-2" /> Leaderboard
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-8 bg-transparent p-0 gap-2 flex-wrap justify-start h-auto">
            {["Active", "Upcoming", "Completed"].map((tab) => (
               <TabsTrigger 
                  key={tab} 
                  value={tab.toLowerCase()}
                  className="rounded-full h-11 px-6 data-[state=active]:bg-[#866bff] data-[state=active]:text-white bg-[#1c1f2a]/40 border border-white/5 text-gray-400 hover:text-white transition-all font-bold"
               >
                  {tab}
               </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="active" className="space-y-8 mt-0">
             {/* Featured Tournament Detail */}
             <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring" }}
             >
               <Card className="bg-[#1c1f2a]/60 backdrop-blur-xl border-white/5 text-white overflow-hidden rounded-3xl shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#866bff]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="h-1.5 bg-gradient-to-r from-[#99ee2d] via-[#866bff] to-[#99ee2d] animate-gradient-x bg-[length:200%_100%]" />
                  
                  <CardHeader className="relative z-10">
                     <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div>
                           <div className="flex gap-2 mb-3">
                              <Badge className="bg-[#FF555A] text-white border-none animate-pulse">LIVE</Badge>
                              <Badge variant="outline" className="border-[#99ee2d] text-[#99ee2d]">Grand Finals</Badge>
                           </div>
                           <CardTitle className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Epiko Regal World Championship</CardTitle>
                           <p className="text-gray-400 text-lg flex items-center gap-2">
                              <RiCalendarLine className="w-4 h-4" /> Season 4 • Global Finals
                           </p>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 flex flex-col items-end min-w-[200px]">
                           <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Prize Pool</p>
                           <p className="text-4xl font-black text-[#99ee2d] drop-shadow-[0_0_15px_rgba(153,238,45,0.4)]">$50,000</p>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                     <div className="flex flex-wrap gap-4 mb-10">
                        {[
                           { icon: RiGroupLine, label: "128 Players", value: "Full" },
                           { icon: RiTimerLine, label: "Round", value: "Semi-Finals" },
                           { icon: RiSwordLine, label: "Format", value: "Double Elim" },
                        ].map((stat, i) => (
                           <div key={i} className="bg-white/5 px-5 py-3 rounded-xl border border-white/5 flex items-center gap-3">
                              <div className="p-2 bg-[#866bff]/20 rounded-lg">
                                 <stat.icon className="w-4 h-4 text-[#866bff]" />
                              </div>
                              <div>
                                 <p className="text-xs text-gray-400 uppercase">{stat.label}</p>
                                 <p className="font-bold text-white">{stat.value}</p>
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* Bracket Visualization */}
                     <div className="w-full overflow-hidden bg-black/20 rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-lg font-bold flex items-center gap-2">
                             <RiSwordLine className="w-5 h-5 text-[#99ee2d]" /> Playoffs Bracket
                           </h3>
                           <Button variant="ghost" className="text-[#866bff] hover:text-white hover:bg-[#866bff]/20 text-sm h-8 rounded-lg">View Full Bracket</Button>
                        </div>
                        <ScrollArea className="w-full pb-4">
                          <div className="flex gap-16 min-w-[800px] p-4">
                             {/* Round 1 */}
                             <div className="flex flex-col justify-around gap-8 relative">
                                <span className="absolute -top-10 left-0 text-xs text-gray-500 uppercase font-bold tracking-widest text-center w-full">Quarter Finals</span>
                                <Match p1="ItachiOGX" p2="Dan02" score1={3} score2={1} />
                                <Match p1="Slayer99" p2="ProGamer" score1={0} score2={3} />
                                <Match p1="EpikoKing" p2="NoobMaster" score1={3} score2={2} />
                                <Match p1="Viper" p2="Ghost" score1={1} score2={3} />
                             </div>
                             {/* Round 2 */}
                             <div className="flex flex-col justify-around gap-16 relative">
                                 <span className="absolute -top-10 left-0 text-xs text-gray-500 uppercase font-bold tracking-widest text-center w-full">Semi Finals</span>
                                 <div className="relative flex flex-col gap-2 justify-center h-full">
                                    <div className="absolute left-[-2rem] top-[25%] bottom-[25%] w-8 border-l-2 border-y-2 border-white/10 rounded-l-xl" />
                                    <div className="absolute left-[-2rem] top-1/2 w-8 h-[2px] bg-white/10" />
                                    <Match p1="ItachiOGX" p2="ProGamer" />
                                 </div>
                                 <div className="relative flex flex-col gap-2 justify-center h-full">
                                    <div className="absolute left-[-2rem] top-[25%] bottom-[25%] w-8 border-l-2 border-y-2 border-white/10 rounded-l-xl" />
                                    <div className="absolute left-[-2rem] top-1/2 w-8 h-[2px] bg-white/10" />
                                    <Match p1="EpikoKing" p2="Ghost" />
                                 </div>
                             </div>
                             {/* Finals */}
                             <div className="flex flex-col justify-center relative">
                                 <span className="absolute -top-10 left-0 text-xs text-[#99ee2d] uppercase font-bold tracking-widest text-center w-full">Grand Final</span>
                                 <div className="relative flex flex-col gap-2 justify-center h-full">
                                    <div className="absolute left-[-2rem] top-[25%] bottom-[25%] w-8 border-l-2 border-y-2 border-white/10 rounded-l-xl" />
                                    <div className="absolute left-[-2rem] top-1/2 w-8 h-[2px] bg-white/10" />
                                    <Match p1="TBD" p2="TBD" />
                                 </div>
                             </div>
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                     </div>
                  </CardContent>
               </Card>
             </motion.div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tournament Cards */}
                {[1,2,3].map((i, index) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                   >
                     <Card className="bg-[#1c1f2a]/40 backdrop-blur-md border-white/5 text-white hover:border-[#866bff]/50 transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer rounded-3xl group h-full flex flex-col">
                        <CardHeader>
                           <div className="flex justify-between items-start mb-2">
                              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10">Reg Open</Badge>
                              <div className="bg-[#99ee2d]/10 p-2.5 rounded-full group-hover:bg-[#99ee2d] transition-colors">
                                <RiTrophyLine className="w-5 h-5 text-[#99ee2d] group-hover:text-black" />
                              </div>
                           </div>
                           <CardTitle className="text-xl font-bold group-hover:text-[#99ee2d] transition-colors">Weekly Skirmish #{140+i}</CardTitle>
                           <p className="text-sm text-gray-400">Sunday • 3:00 PM EST</p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                           <div className="space-y-3 mb-6">
                              <div className="flex justify-between text-sm">
                                 <span className="text-gray-500">Entry Fee</span>
                                 <span className="font-bold text-white">500 Karma</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                 <span className="text-gray-500">Prize Pool</span>
                                 <span className="font-bold text-[#99ee2d]">50,000 Karma</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                 <span className="text-gray-500">Slots</span>
                                 <span className="font-bold text-white">32/64</span>
                              </div>
                           </div>
                           <Button 
                              size="lg"
                              className="w-full mt-auto bg-white/5 hover:bg-[#866bff] hover:text-white text-white border border-white/10 transition-all font-bold"
                              onClick={() => setSelectedTournament(i)}
                           >
                              Register Now
                           </Button>
                        </CardContent>
                     </Card>
                   </motion.div>
                ))}
             </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-0">
             <div className="flex flex-col items-center justify-center py-32 text-gray-500 space-y-6">
               <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                 <RiCalendarLine className="w-10 h-10 opacity-40" />
               </div>
               <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">No Upcoming Tournaments</h3>
                  <p className="max-w-sm mx-auto">Check back later or enable notifications to get alerted when new tournaments are announced.</p>
               </div>
               <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl">
                  <RiNotification3Line className="w-4 h-4 mr-2" /> Enable Notifications
               </Button>
             </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map((i) => (
                   <Card key={i} className="bg-[#1c1f2a]/20 border-white/5 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:border-white/20 rounded-3xl">
                      <CardHeader>
                         <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline" className="border-gray-700 text-gray-500">Ended</Badge>
                            <span className="text-xs">Oct 1{i}</span>
                         </div>
                         <CardTitle className="text-lg">Weekly Skirmish #{130+i}</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                               <RiTrophyLine className="w-4 h-4 text-[#FFD700]" />
                            </div>
                            <div>
                               <p className="text-xs text-gray-500 uppercase">Winner</p>
                               <p className="font-bold text-white">ProGamer{i}</p>
                            </div>
                         </div>
                         <Button variant="secondary" className="w-full bg-white/5 text-gray-300 hover:bg-white/10 rounded-xl">View Results</Button>
                      </CardContent>
                   </Card>
                ))}
              </div>
          </TabsContent>
        </Tabs>

        {/* Registration Dialog */}
        <Dialog open={selectedTournament !== null} onOpenChange={(open) => !open && setSelectedTournament(null)}>
            <DialogContent className="bg-[#1c1f2a] border-white/10 text-white max-w-md rounded-3xl p-6">
               <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">Tournament Registration</DialogTitle>
                  <DialogDescription className="text-gray-400">
                     Weekly Skirmish #{selectedTournament !== null ? 140 + selectedTournament : ""}
                  </DialogDescription>
               </DialogHeader>

               <div className="py-6 space-y-6">
                  {registrationStep === 1 ? (
                     <>
                        <div className="bg-[#866bff]/10 border border-[#866bff]/20 rounded-xl p-4 flex items-start gap-3">
                           <RiErrorWarningLine className="w-5 h-5 text-[#866bff] shrink-0 mt-0.5" />
                           <div className="text-sm">
                              <p className="font-bold text-[#866bff] mb-1">Requirement Check</p>
                              <ul className="space-y-1 text-gray-300">
                                 <li className="flex items-center gap-2"><RiCheckboxCircleLine className="w-3 h-3 text-[#99ee2d]" /> Level 15+ Account</li>
                                 <li className="flex items-center gap-2"><RiCheckboxCircleLine className="w-3 h-3 text-[#99ee2d]" /> 500 Karma Available</li>
                                 <li className="flex items-center gap-2"><RiCheckboxCircleLine className="w-3 h-3 text-[#99ee2d]" /> No Active Bans</li>
                              </ul>
                           </div>
                        </div>
                        
                        <div className="space-y-2">
                           <Label>Team Name (Optional)</Label>
                           <Input placeholder="Enter team name" className="bg-black/20 border-white/10 focus-visible:ring-[#866bff] rounded-xl" />
                        </div>
                     </>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-4 space-y-4">
                        <div className="w-16 h-16 border-4 border-[#866bff] border-t-transparent rounded-full animate-spin" />
                        <p className="text-lg font-bold">Confirming Registration...</p>
                     </div>
                  )}
               </div>

               <DialogFooter className="sm:justify-between gap-2">
                  {registrationStep === 1 && (
                     <>
                        <Button variant="ghost" onClick={() => setSelectedTournament(null)} className="rounded-xl hover:bg-white/5">Cancel</Button>
                        <Button 
                           className="bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold rounded-xl px-8"
                           onClick={() => setRegistrationStep(2) || handleRegister()}
                        >
                           Confirm & Pay 500 Karma
                        </Button>
                     </>
                  )}
               </DialogFooter>
            </DialogContent>
        </Dialog>

      </motion.div>
    </Layout>
  );
}
