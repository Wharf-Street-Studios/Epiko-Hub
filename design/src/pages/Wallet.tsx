import React from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  RiWallet3Line, 
  RiArrowRightUpLine, 
  RiArrowLeftDownLine, 
  RiFileCopyLine 
} from "@remixicon/react";

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

export function Wallet() {
  return (
    <Layout>
      <div className="p-4 md:p-8 space-y-8">
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Wallet</h1>
            <Button className="bg-[#866bff] hover:bg-[#7059d6] text-white font-bold shadow-lg shadow-[#866bff]/20">
               <RiWallet3Line className="w-5 h-5 mr-2" /> Connect Wallet
            </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#1c1f2a] to-[#252936] border-white/5 text-white md:col-span-2">
               <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-400">Total Balance</CardTitle>
                  <div className="flex items-baseline gap-2">
                     <span className="text-4xl font-bold">2,450.00</span>
                     <span className="text-xl text-gray-400">USDT</span>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="h-[200px] w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                           <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#99ee2d" stopOpacity={0.8}/>
                                 <stop offset="95%" stopColor="#99ee2d" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                           <XAxis dataKey="name" stroke="#666" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                           <YAxis stroke="#666" tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#1c1f2a', borderColor: '#333', borderRadius: '8px' }}
                              itemStyle={{ color: '#fff' }}
                              cursor={{ stroke: '#ffffff20' }}
                           />
                           <Line type="monotone" dataKey="value" stroke="#99ee2d" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#99ee2d' }} />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            <div className="space-y-6">
               <Card className="bg-[#1c1f2a] border-white/5 text-white">
                  <CardHeader>
                     <CardTitle className="text-sm font-medium text-gray-400">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <Button className="w-full bg-white/5 hover:bg-white/10 justify-between text-white border-white/5" variant="outline">
                        <div className="flex items-center gap-2">
                           <RiArrowRightUpLine className="w-4 h-4 text-green-400" />
                           <span>Send</span>
                        </div>
                     </Button>
                     <Button className="w-full bg-white/5 hover:bg-white/10 justify-between text-white border-white/5" variant="outline">
                         <div className="flex items-center gap-2">
                           <RiArrowLeftDownLine className="w-4 h-4 text-blue-400" />
                           <span>Receive</span>
                        </div>
                     </Button>
                  </CardContent>
               </Card>

               <Card className="bg-[#1c1f2a] border-white/5 text-white">
                  <CardHeader>
                     <CardTitle className="text-sm font-medium text-gray-400">Wallet Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="flex items-center gap-2 bg-black/20 p-3 rounded-lg border border-white/5">
                        <code className="text-xs text-gray-300 truncate">0x71C...9A23</code>
                        <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto text-gray-400 hover:text-white">
                           <RiFileCopyLine className="w-3 h-3" />
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         <Card className="bg-[#1c1f2a] border-white/5 text-white">
            <CardHeader>
               <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                     <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i%2===0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                              {i%2===0 ? <RiArrowLeftDownLine className="w-5 h-5 text-green-500" /> : <RiArrowRightUpLine className="w-5 h-5 text-red-500" />}
                           </div>
                           <div>
                              <p className="font-medium">{i%2===0 ? 'Received USDT' : 'Sent EPIKO'}</p>
                              <p className="text-xs text-gray-500">Today, 12:30 PM</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className={`font-bold ${i%2===0 ? 'text-green-400' : 'text-white'}`}>
                              {i%2===0 ? '+' : '-'} {i*150}.00
                           </p>
                           <p className="text-xs text-gray-500">Completed</p>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </Layout>
  );
}
