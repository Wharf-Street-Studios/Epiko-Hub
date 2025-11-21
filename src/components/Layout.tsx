"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiNewspaperLine,
  RiNotification3Line,
  RiGamepadLine,
  RiVipDiamondLine,
  RiShoppingBag3Line,
  RiTrophyLine,
  RiWallet3Line,
  RiStarLine,
  RiUser3Line,
  RiSettings4Line,
  RiMenuLine,
} from "@remixicon/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

import Ellipse3 from "./figma/Ellipse3";
import Ellipse4 from "./figma/Ellipse4";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/", icon: RiDashboardLine },
    { name: "Feed", path: "/social", icon: RiNewspaperLine },
    { name: "Notifications", path: "/notifications", icon: RiNotification3Line },
    { name: "Games", path: "/games", icon: RiGamepadLine },
    { name: "NFT Collectibles", path: "/nfts", icon: RiVipDiamondLine },
    { name: "Shop", path: "/market", icon: RiShoppingBag3Line },
    { name: "Tournament", path: "/tournaments", icon: RiTrophyLine },
    { name: "Wallet", path: "/wallet", icon: RiWallet3Line },
    { name: "Karma Points", path: "/karma", icon: RiStarLine },
    { name: "Profile", path: "/profile", icon: RiUser3Line },
    { name: "Settings", path: "/settings", icon: RiSettings4Line },
  ];

  return (
    <div className="min-h-screen bg-[#12141d] text-white font-sans flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[280px] flex-col border-r border-white/10 bg-[#12141d] h-screen fixed left-0 top-0 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-[#866bff] rounded-full" />
            </div>
            Epiko Hub
          </h1>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-[#866bff] bg-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#12141d] border-b border-white/10 z-50 flex items-center justify-between px-4">
        <div className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-[#866bff] rounded-full" />
          </div>
          Epiko Hub
        </div>
        {mounted && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <RiMenuLine className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#12141d] border-white/10 w-[280px] p-0 z-[60]">
               <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
               <SheetDescription className="sr-only">Navigation menu for Epiko Hub</SheetDescription>
               <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#866bff] rounded-full" />
                  </div>
                  Epiko Hub
                </h1>
                <ScrollArea className="h-[calc(100vh-100px)]">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            isActive
                              ? "text-[#866bff] bg-white/5"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pl-[280px] min-h-screen pt-16 pb-20 md:py-0 relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] opacity-30 pointer-events-none z-0">
          <Ellipse3 />
        </div>
        <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] opacity-30 pointer-events-none z-0">
          <Ellipse4 />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#12141d] border-t border-white/10 z-50 flex justify-around py-3 pb-6">
         <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-[#866bff]' : 'text-gray-400'}`}>
            <RiDashboardLine className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
         </Link>
         <Link href="/games" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/games') ? 'text-[#866bff]' : 'text-gray-400'}`}>
            <RiGamepadLine className="w-5 h-5" />
            <span className="text-[10px]">Games</span>
         </Link>
         <Link href="/wallet" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/wallet') ? 'text-[#866bff]' : 'text-gray-400'}`}>
            <RiWallet3Line className="w-5 h-5" />
            <span className="text-[10px]">Wallet</span>
         </Link>
         <Link href="/profile" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/profile') ? 'text-[#866bff]' : 'text-gray-400'}`}>
            <RiUser3Line className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
         </Link>
      </div>
    </div>
  );
}
