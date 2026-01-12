"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const InfrastructureGrid = ({ className }: { className?: string }) => {
  // Define schematic paths for the flowing lines
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
      delay: 4,
    },
    {
      d: "M1300 550 H 1000 l -40 40 V 800",
      color: "#F44A22",
      duration: 12,
      delay: 6,
      reverse: true,
    }
  ];

  // Static labels scattered around the grid
  const labels = [
    { x: 260, y: 140, text: "<< 01010", color: "#A8AAAC" },
    { x: 820, y: 180, text: "PKT_RCV", color: "#F44A22" },
    { x: 160, y: 600, text: "NET.WRK", color: "#A8AAAC" },
    { x: 1050, y: 530, text: "RTX_ON", color: "#F44A22" },
    { x: 300, y: 250, text: "0X11", color: "#333" }, // Subtler one
  ];

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0A0A0A]", className)}>
      {/* 
        To undo the radial fade (make grid visible in center):
        1. Remove the wrapper div below with `mask-image`
        2. Or change the mask to be an overlay as before:
        
        // Previous implementation (Overlay Vignette):
        <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0A0A0A]", className)}>
      */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]">
        {/* 1. Base Grid Layer - Faint */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:200px_200px] opacity-50"
        />

        {/* 2. SVG Layer for Transport Lines & Labels */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Animated Lines */}
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

          {/* Static Labels */}
          {labels.map((label, index) => (
            <g key={index} transform={`translate(${label.x}, ${label.y})`}>
              {/* Tiny decorative marker next to text */}
              <rect x="-4" y="3" width="2" height="2" fill={label.color} opacity="0.8" />
              <text
                x="0"
                y="0"
                fill={label.color}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                opacity="0.7"
                alignmentBaseline="middle"
              >
                {label.text}
              </text>
            </g>
          ))}

          {/* Static decorative elements/nodes */}
          <circle cx="200" cy="150" r="2" fill="#333" />
          <circle cx="240" cy="190" r="2" fill="#333" />
          <rect x="798" y="188" width="4" height="4" fill="#333" />
          <rect x="948" y="298" width="4" height="4" fill="#333" />
          <circle cx="950" cy="700" r="3" fill="#222" stroke="#333" strokeWidth="1" />
        </svg>
      </div>
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

      {/* Moving Packet (Trail) */}
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

      {/* Head with Arrow only (No text) */}
      <g style={{ offsetPath: `path('${d}')` } as React.CSSProperties}>
        <motion.g
          initial={{ offsetDistance: reverse ? "100%" : "0%", opacity: 0 }}
          animate={{
            offsetDistance: reverse ? "0%" : "100%",
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: delay,
            repeatDelay: 2
          }}
          style={{
            offsetRotate: reverse ? "auto 180deg" : "auto",
          } as React.CSSProperties}
        >
          {/* Arrow Head */}
          <path d="M -6 -4 L 0 0 L -6 4" fill="none" stroke={color} strokeWidth="2" />
        </motion.g>
      </g>
    </>
  );
};
