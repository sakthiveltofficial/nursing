"use client";

import { useState, useEffect, useRef } from "react";

export default function LoadingScreen({ progress = 0, onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const nursingMessages = [
    "Optimizing performance...",
    "Loading nursing curriculum...",
    "Optimizing study environment...",
    "Finalizing user preferences...",
    "Getting things ready...",
    "Welcome to AJK College of Nursing...",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % nursingMessages.length);
    }, 1800);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  // Use actual progress value directly
  useEffect(() => {
    setSmoothProgress(progress);
  }, [progress]);

  // Handle completion with fade out
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      
      // Start fade out animation immediately
      setIsFadingOut(true);
      
      // Complete the loading after fade out
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1000); // 1s fade out
    }
  }, [progress, isComplete, onComplete]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 min-h-screen w-full overflow-hidden"
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: "opacity 1s ease-out",
      }}
    > 

      {/* Overlay with pink tint and opacity */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: "#F4C2C2",
          opacity: 1,
        }}
      />

      {/* Heart Beat Line Progress Bar - Nursing Education Themed */}
      <div
        className="absolute z-10 w-full"
        style={{
          left: "0",
          right: "0",
          bottom: "140px",
          height: "50px",
        }}
      >
        <svg
          width="100%"
          height="50"
          viewBox="0 0 1200 50"
          className="w-full h-full"
        >
          {/* Background heart beat line - more educational/learning curve style */}
          <path
            d="M0,25 L60,25 L70,20 L80,30 L90,25 L140,25 L150,15 L160,35 L170,10 L180,40 L190,25 L240,25 L250,25 L300,25 L310,22 L320,28 L330,25 L380,25 L390,12 L400,38 L410,8 L420,42 L430,25 L480,25 L530,25 L540,23 L550,27 L560,25 L610,25 L620,18 L630,32 L640,15 L650,35 L660,25 L710,25 L760,25 L770,25 L820,25 L830,21 L840,29 L850,25 L900,25 L910,14 L920,36 L930,11 L940,39 L950,25 L1000,25 L1050,25 L1060,24 L1070,26 L1080,25 L1130,25 L1140,19 L1150,31 L1160,16 L1170,34 L1180,25 L1200,25"
            stroke="rgba(248, 215, 218, 0.6)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated heart beat line that fills with progress */}
          <path
            d="M0,25 L60,25 L70,20 L80,30 L90,25 L140,25 L150,15 L160,35 L170,10 L180,40 L190,25 L240,25 L250,25 L300,25 L310,22 L320,28 L330,25 L380,25 L390,12 L400,38 L410,8 L420,42 L430,25 L480,25 L530,25 L540,23 L550,27 L560,25 L610,25 L620,18 L630,32 L640,15 L650,35 L660,25 L710,25 L760,25 L770,25 L820,25 L830,21 L840,29 L850,25 L900,25 L910,14 L920,36 L930,11 L940,39 L950,25 L1000,25 L1050,25 L1060,24 L1070,26 L1080,25 L1130,25 L1140,19 L1150,31 L1160,16 L1170,34 L1180,25 L1200,25"
            stroke="#E85A5A"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - smoothProgress}
            style={{
              transition: "stroke-dashoffset 0.1s ease-out",
            }}
          />
        </svg>
      </div>

      {/* Dynamic Loading text - Aligned with heartbeat line start */}
      <div
        className="absolute text-black font-semibold z-10"
        style={{
          fontSize: "clamp(24px, 4vw, 48px)",
          left: "clamp(20px, 8vw, 100px)",
          bottom: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {nursingMessages[messageIndex]}
      </div>

      {/* Percentage text - Smaller font */}
      <div
        className="absolute text-black font-semibold z-10"
        style={{
          fontSize: "clamp(24px, 4vw, 48px)",
          right: "clamp(20px, 8vw, 60px)",
          bottom: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {Math.round(smoothProgress)}%
      </div>

   
    </div>
  );
}
