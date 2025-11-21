import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";

export function Onboarding() {
  const [step, setStep] = useState<"splash" | "email" | "otp" | "username" | "success">("splash");
  const navigate = useNavigate();

  // Mock inputs
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");

  const goToNext = () => {
    if (step === "splash") setStep("email");
    else if (step === "email") setStep("otp");
    else if (step === "otp") setStep("username");
    else if (step === "username") setStep("success");
    else if (step === "success") navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#12141d] flex items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#7F00FF] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#99EE2D] rounded-full blur-[150px] opacity-20" />

      <div className="w-full max-w-md z-10">
        {step === "splash" && (
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
            <Button 
              onClick={goToNext} 
              className="w-full mt-8 bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold h-12 text-lg"
            >
              Get Started
            </Button>
          </motion.div>
        )}

        {step === "email" && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#1c1f2a] p-8 rounded-3xl border border-white/5"
          >
            <div className="mb-8">
               <div className="w-full bg-gray-800 h-1 rounded-full mb-6">
                  <div className="w-1/4 bg-[#866bff] h-1 rounded-full" />
               </div>
               <h2 className="text-2xl font-bold mb-2">Welcome</h2>
               <p className="text-gray-400">Enter your email to continue</p>
            </div>
            <Input 
              placeholder="name@example.com" 
              className="bg-[#12141d] border-white/10 h-12 text-lg mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={goToNext} className="w-full bg-[#866bff] hover:bg-[#7059d6] h-12 font-bold">
              Continue
            </Button>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#1c1f2a] p-8 rounded-3xl border border-white/5"
          >
             <div className="mb-8">
               <div className="w-full bg-gray-800 h-1 rounded-full mb-6">
                  <div className="w-2/4 bg-[#866bff] h-1 rounded-full" />
               </div>
               <h2 className="text-2xl font-bold mb-2">Verification</h2>
               <p className="text-gray-400">Enter the code sent to {email}</p>
            </div>
            <Input 
              placeholder="000000" 
              className="bg-[#12141d] border-white/10 h-12 text-lg mb-6 text-center tracking-[0.5em] font-mono"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button onClick={goToNext} className="w-full bg-[#866bff] hover:bg-[#7059d6] h-12 font-bold">
              Verify
            </Button>
          </motion.div>
        )}

        {step === "username" && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#1c1f2a] p-8 rounded-3xl border border-white/5"
          >
            <div className="mb-8">
               <div className="w-full bg-gray-800 h-1 rounded-full mb-6">
                  <div className="w-3/4 bg-[#866bff] h-1 rounded-full" />
               </div>
               <h2 className="text-2xl font-bold mb-2">Create Profile</h2>
               <p className="text-gray-400">Choose a unique username</p>
            </div>
            <Input 
              placeholder="@username" 
              className="bg-[#12141d] border-white/10 h-12 text-lg mb-6"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={goToNext} className="w-full bg-[#866bff] hover:bg-[#7059d6] h-12 font-bold">
              Complete Setup
            </Button>
          </motion.div>
        )}

        {step === "success" && (
           <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="text-center flex flex-col items-center gap-6 bg-[#1c1f2a] p-8 rounded-3xl border border-white/5"
         >
           <div className="w-20 h-20 bg-[#99ee2d]/20 rounded-full flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-[#99ee2d] rounded-full flex items-center justify-center text-black font-bold text-xl">
                ✓
              </div>
           </div>
           <div>
             <h2 className="text-2xl font-bold mb-2">You're In!</h2>
             <p className="text-gray-400">Welcome to Epiko Hub, {username}</p>
           </div>
           <Button 
             onClick={goToNext} 
             className="w-full mt-4 bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold h-12"
           >
             Go to Dashboard
           </Button>
         </motion.div>
        )}
      </div>
    </div>
  );
}
