"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Standard shadcn utility, or use standard clsx/tailwind-merge

export const InfrastructureGrid = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      {/* 1. The Static Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      >
        <div className="absolute inset-0 bg-[#161616]" style={{ maskImage: 'linear-gradient(to bottom, transparent, 10%, white, 90%, transparent)' }}></div>
      </div>

      {/* 2. Radial Vignette for depth (Darkens edges) */}
      <div className="absolute inset-0 bg-[#161616] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />

      {/* 3. Animated "Network Lines" (Horizontal) */}
      <div className="absolute inset-0 opacity-20">
        <MovingLine duration={7} top="20%" />
        <MovingLine duration={10} top="50%" delay={2} />
        <MovingLine duration={8} top="80%" delay={4} />
      </div>

       {/* 4. Animated "Network Lines" (Vertical) */}
       <div className="absolute inset-0 opacity-20">
        <MovingLineVertical duration={12} left="10%" delay={0} />
        <MovingLineVertical duration={9} left="60%" delay={3} />
       </div>
    </div>
  );
};

// Sub-component for Horizontal Lines
const MovingLine = ({ duration, top, delay = 0 }: { duration: number, top: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ left: "-100%" }}
      animate={{ left: "100%" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
      className="absolute h-[1px] w-[40%] bg-gradient-to-r from-transparent via-[#F44A22] to-transparent blur-[1px]"
      style={{ top: top }}
    />
  );
};

// Sub-component for Vertical Lines
const MovingLineVertical = ({ duration, left, delay = 0 }: { duration: number, left: string, delay?: number }) => {
    return (
      <motion.div
        initial={{ top: "-100%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        className="absolute w-[1px] h-[40%] bg-gradient-to-b from-transparent via-[#FEF8E8] to-transparent blur-[1px]" // Using Silver for vertical, Orange for horizontal
        style={{ left: left }}
      />
    );
  };