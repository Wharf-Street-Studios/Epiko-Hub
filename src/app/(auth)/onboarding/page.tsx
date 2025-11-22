"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiArrowRightLine, 
  RiMailSendLine, 
  RiLoader4Line,
  RiEdit2Line,
  RiGamepadLine
} from "@remixicon/react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { updateUserProfile, getUserProfile } from "@/lib/api/users";

export default function OnboardingPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'username'>('email');
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    
    // Bypass authentication - just show success and redirect
    setTimeout(() => {
      toast.success("Welcome to Epiko Hub!");
      router.push("/");
    }, 500);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;
      if (!data.user) throw new Error("No user found");

      setUserId(data.user.id);

      // Check if user already has a profile/username
      const profile = await getUserProfile(data.user.id);
      
      if (profile && profile.username) {
        // User exists and has username, redirect to dashboard
        toast.success("Welcome back!");
        router.push("/");
      } else {
        // New user or no username, go to username step
        setStep('username');
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error(error.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    if (!username || !userId) return;
    
    setLoading(true);
    try {
      // Update profile with username
      await updateUserProfile(userId, {
        username: username,
        display_name: username, // Default display name to username
      });

      toast.success("Profile created successfully!");
      router.push("/");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Failed to create profile. Username might be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0b10] text-white flex items-center justify-center p-4 overflow-hidden z-50">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#866bff] rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#99ee2d] rounded-full blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 bg-gradient-to-br from-[#866bff] to-[#5A29C3] rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-[#866bff]/30 mb-6"
          >
            <RiGamepadLine className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight text-white">Epiko Hub</h1>
          <p className="text-gray-400 text-lg">Your Gateway to the Epiko Ecosystem</p>
        </div>

        <div className="bg-[#1c1f2a] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
           {/* Decorative top highlight */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#866bff] to-transparent opacity-50" />

           <AnimatePresence mode="wait">
             {step === 'email' && (
               <motion.div
                 key="email"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="space-y-6"
               >
                 <div className="space-y-2">
                   <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                   <p className="text-gray-400">Enter your email to sign in or create an account.</p>
                 </div>

                 <div className="space-y-4">
                   <div className="relative w-full group">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#99ee2d] transition-colors z-10 pointer-events-none">
                        <RiMailSendLine className="w-5 h-5" />
                     </div>
                     <Input 
                        type="email"
                        placeholder="name@example.com" 
                        className="!bg-[#12141d] !border-white/10 h-14 text-lg rounded-xl focus-visible:!ring-[#99ee2d] focus-visible:!border-[#99ee2d]/50 transition-all placeholder:text-gray-600 !text-white [&:-webkit-autofill]:bg-[#12141d] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#12141d_inset] [&:-webkit-autofill]:-webkit-text-fill-color-white"
                        style={{ paddingLeft: '80px' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        autoFocus
                     />
                   </div>
                   <Button 
                     className="w-full h-14 text-lg font-bold bg-[#99ee2d] hover:bg-[#88d428] text-black rounded-xl shadow-lg shadow-[#99ee2d]/20 transition-all hover:scale-[1.02]"
                     onClick={handleSendOtp}
                     disabled={loading}
                   >
                     {loading ? <RiLoader4Line className="animate-spin w-6 h-6" /> : "Continue with Email"}
                     {!loading && <RiArrowRightLine className="ml-2 w-5 h-5" />}
                   </Button>
                 </div>
               </motion.div>
             )}

             {step === 'otp' && (
               <motion.div
                 key="otp"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <div className="space-y-2">
                   <h2 className="text-2xl font-bold text-white">Check your inbox</h2>
                   <p className="text-gray-400">We sent a 6-digit code to <span className="text-white font-medium">{email}</span></p>
                 </div>

                 <div className="flex justify-center py-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot 
                            key={index} 
                            index={index} 
                            className="w-12 h-14 sm:w-14 sm:h-16 text-2xl font-bold bg-[#12141d] border-white/10 rounded-xl text-white focus:border-[#99ee2d] focus:ring-[#99ee2d]/50 transition-all"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                 </div>

                 <Button 
                   className="w-full h-14 text-lg font-bold bg-[#99ee2d] hover:bg-[#88d428] text-black rounded-xl shadow-lg shadow-[#99ee2d]/20 transition-all hover:scale-[1.02]"
                   onClick={handleVerifyOtp}
                   disabled={loading}
                 >
                   {loading ? <RiLoader4Line className="animate-spin w-6 h-6" /> : "Verify Code"}
                 </Button>

                 <div className="text-center">
                   <button 
                     onClick={() => setStep('email')}
                     className="text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center mx-auto gap-1"
                   >
                     <RiEdit2Line className="w-4 h-4" /> Change email
                   </button>
                 </div>
               </motion.div>
             )}

             {step === 'username' && (
               <motion.div
                 key="username"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <div className="space-y-2">
                   <h2 className="text-2xl font-bold text-white">Create your identity</h2>
                   <p className="text-gray-400">Choose a unique username for your Epiko profile.</p>
                 </div>

                 <div className="space-y-4">
                   <div className="relative w-full group">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg z-10 pointer-events-none">@</div>
                     <Input 
                        placeholder="EpikoMaster" 
                        className="!bg-[#12141d] !border-white/10 h-14 !pl-10 text-lg rounded-xl focus-visible:!ring-[#866bff] focus-visible:!border-[#866bff]/50 transition-all placeholder:text-gray-600 !text-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        autoFocus
                     />
                   </div>
                   <Button 
                     className="w-full h-14 text-lg font-bold bg-[#866bff] hover:bg-[#7059d6] text-white rounded-xl shadow-lg shadow-[#866bff]/20 transition-all hover:scale-[1.02]"
                     onClick={handleCompleteProfile}
                     disabled={loading}
                   >
                     {loading ? <RiLoader4Line className="animate-spin w-6 h-6" /> : "Get Started"}
                     {!loading && <RiArrowRightLine className="ml-2 w-5 h-5" />}
                   </Button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          By continuing, you agree to Epiko's <a href="#" className="text-gray-400 hover:text-white underline">Terms</a> and <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
