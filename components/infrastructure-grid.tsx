"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const InfrastructureGrid = ({ className }: { className?: string }) => {
  // Define schematic paths
  const paths = [
    // Horizontal-ish paths
    {
      d: "M-100 150 H 200 l 40 40 H 800 l 40 -40 H 1300",
      color: "#F44A22", // Orange
      duration: 12,
      delay: 0,
    },
    {
      d: "M-100 400 H 350 l 40 40 H 900 l 40 40 H 1300",
      color: "#FEF8E8", // White/Cream
      duration: 15,
      delay: 2,
    },
    {
      d: "M-100 650 H 150 l 40 -40 H 500 l 40 40 H 850 l 40 -40 H 1300",
      color: "#F44A22",
      duration: 10,
      delay: 5,
    },
    // Vertical-ish paths
    {
      d: "M250 -100 V 200 l 40 40 V 600 l -40 40 V 1000",
      color: "#FEF8E8",
      duration: 14,
      delay: 1,
    },
    {
      d: "M950 -100 V 300 l -40 40 V 700 l 40 40 V 1000",
      color: "#F44A22",
      duration: 18,
      delay: 3,
    },
     // Complex paths
    {
        d: "M-100 300 H 100 l 40 -40 V 100 l 40 -40 H 1300",
        color: "#FEF8E8",
        duration: 20,
        delay: 4
    },
    {
        d: "M1300 550 H 1000 l -40 40 V 800",
        color: "#F44A22",
        duration: 12,
        delay: 6,
        reverse: true
    }

  ];

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#161616]", className)}>
      {/* 1. Base Grid Layer - Faint */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:200px_200px] opacity-50"
      />

      {/* 2. SVG Layer for Transport Lines */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1200 800" 
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path, index) => (
          <CircuitLine 
            key={index}
            d={path.d}
            color={path.color}
            duration={path.duration}
            delay={path.delay}
            reverse={path.reverse}
          />
        ))}
        
        {/* Static decorative elements/nodes */}
        <circle cx="200" cy="150" r="2" fill="#333" />
        <circle cx="240" cy="190" r="2" fill="#333" />
        <rect x="798" y="188" width="4" height="4" fill="#333" />
        <rect x="948" y="298" width="4" height="4" fill="#333" />
        <circle cx="950" cy="700" r="3" fill="#222" stroke="#333" strokeWidth="1" />
      </svg>

      {/* 3. Radial Vignette */}
      <div className="absolute inset-0 bg-[#161616] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />
      
      {/* 4. Top/Bottom fade for smooth transition if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#161616] via-transparent to-[#161616] opacity-40" />
    </div>
  );
};

const CircuitLine = ({ 
  d, 
  color, 
  duration, 
  delay = 0,
  reverse = false
}: { 
  d: string; 
  color: string; 
  duration: number; 
  delay?: number;
  reverse?: boolean;
}) => {
  return (
    <>
      {/* Background Track - Faint */}
      <path 
        d={d} 
        stroke="#333" 
        strokeWidth="1" 
        fill="none" 
        className="opacity-20"
      />

      {/* Moving Packet */}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDasharray: "40 2000", strokeDashoffset: reverse ? -2000 : 2000, opacity: 0 }}
        animate={{ 
            strokeDashoffset: reverse ? 2000 : -2000,
            opacity: [0, 1, 1, 0] // Fade in/out at ends
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
          repeatDelay: 2
        }}
        className="filter blur-[1px]" // Glow effect
      />
      
      {/* Second faint packet trailing behind? Optional. */}
    </>
  );
};
