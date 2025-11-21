"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [mode, setMode] = useState<"splash" | "login" | "signup">("splash");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const supabase = createClient();

  const handleSignup = async () => {
    if (!email || !password || !username) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            display_name: displayName || username,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12141d] flex items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#7F00FF] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#99EE2D] rounded-full blur-[150px] opacity-20" />

      <div className="w-full max-w-md z-10">
        {mode === "splash" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#866bff] to-[#5A29C3] rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
               <span className="text-4xl font-bold text-white">EH</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Epiko Hub</h1>
              <p className="text-gray-400">Your unified gaming ecosystem</p>
            </div>
            <div className="w-full flex flex-col gap-3 mt-8">
              <Button 
                onClick={() => setMode("signup")} 
                className="w-full bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold h-12 text-lg"
              >
                Create Account
              </Button>
              <Button 
                onClick={() => setMode("login")} 
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 font-bold h-12 text-lg"
              >
                Log In
              </Button>
            </div>
          </motion.div>
        )}

        {mode === "signup" && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#1c1f2a] p-8 rounded-3xl border border-white/5"
          >
            <div className="mb-8">
               <h2 className="text-2xl font-bold mb-2">Create Account</h2>
               <p className="text-gray-400">Join the Epiko ecosystem</p>
            </div>
            
            <div className="space-y-4">
              <Input 
                type="email"
                placeholder="Email" 
                className="bg-[#12141d] border-white/10 h-12 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Input 
                placeholder="Username" 
                className="bg-[#12141d] border-white/10 h-12 text-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              <Input 
                placeholder="Display Name (optional)" 
                className="bg-[#12141d] border-white/10 h-12 text-lg"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={loading}
              />
              <Input 
                type="password"
                placeholder="Password" 
                className="bg-[#12141d] border-white/10 h-12 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button 
              onClick={handleSignup} 
              className="w-full mt-6 bg-[#866bff] hover:bg-[#7059d6] h-12 font-bold"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <button
              onClick={() => setMode("login")}
              className="w-full mt-4 text-gray-400 hover:text-white transition-colors text-sm"
              disabled={loading}
            >
              Already have an account? Log in
            </button>
          </motion.div>
        )}

        {mode === "login" && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#1c1f2a] p-8 rounded-3xl border border-white/5"
          >
            <div className="mb-8">
               <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
               <p className="text-gray-400">Log in to your account</p>
            </div>
            
            <div className="space-y-4">
              <Input 
                type="email"
                placeholder="Email" 
                className="bg-[#12141d] border-white/10 h-12 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Input 
                type="password"
                placeholder="Password" 
                className="bg-[#12141d] border-white/10 h-12 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full mt-6 bg-[#866bff] hover:bg-[#7059d6] h-12 font-bold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>

            <button
              onClick={() => setMode("signup")}
              className="w-full mt-4 text-gray-400 hover:text-white transition-colors text-sm"
              disabled={loading}
            >
              Don't have an account? Sign up
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
