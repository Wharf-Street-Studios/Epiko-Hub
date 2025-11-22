import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { RemixiconComponentType } from "@remixicon/react";

interface EmptyStateProps {
  icon: LucideIcon | RemixiconComponentType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center px-4"
    >
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5 mb-6 relative group">
        <div className="absolute inset-0 bg-[#866bff] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <Icon className="w-10 h-10 text-gray-400 group-hover:text-[#99ee2d] transition-colors" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-[#99ee2d] text-black hover:bg-[#88d428] font-bold px-8 h-12 rounded-xl shadow-[0_0_20px_rgba(153,238,45,0.2)] hover:shadow-[0_0_30px_rgba(153,238,45,0.4)] transition-all transform hover:-translate-y-1"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
