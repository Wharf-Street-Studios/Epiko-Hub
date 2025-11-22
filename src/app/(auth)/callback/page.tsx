"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');

        if (access_token && refresh_token) {
          // Set the session
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) throw error;

          toast.success("Email verified successfully!");
          router.push("/");
        } else {
          throw new Error("No tokens found in URL");
        }
      } catch (error: any) {
        console.error("Error handling auth callback:", error);
        toast.error("Failed to verify email");
        router.push("/onboarding");
      }
    };

    handleCallback();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#99ee2d] mx-auto mb-4"></div>
        <p className="text-white text-lg">Verifying your email...</p>
      </div>
    </div>
  );
}
