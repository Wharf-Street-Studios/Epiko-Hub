import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Onboarding } from "./pages/Onboarding";
import { Games } from "./pages/Games";
import { NFTs } from "./pages/NFTs";
import { Tournament } from "./pages/Tournament";
import { Wallet } from "./pages/Wallet";
import { Karma } from "./pages/Karma";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { Shop } from "./pages/Shop";
import { Feed } from "./pages/Feed";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/nfts" element={<NFTs />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/karma" element={<Karma />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
