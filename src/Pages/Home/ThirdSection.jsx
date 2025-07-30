"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import MainCanvesScene from "./MainCanvesScene";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThirdSection() {
  const containerRef = useRef(null);
  const outerDivRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [project, setProject] = useState(null);
  // Add debug state for container scroll info
  const [debugScrollInfo, setDebugScrollInfo] = useState({
    scrollProgress: 0,
    containerHeight: '550vh',
    scrollTriggerProgress: 0,
    isPinned: false
  });

  // Add debug state for Theatre.js sequence info
  const [theatreDebugInfo, setTheatreDebugInfo] = useState({
    current: 0,
    total: 0,
    progress: 0,
    scrollProgress: 0,
    sensitizedProgress: 0
  });

  // Intersection Observer to detect when section is fully in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // For very tall containers (1200vh), use much lower threshold
          const isPartiallyVisible = entry.intersectionRatio > 0.01; // 1% visible threshold for tall containers
          setIsInViewport(isPartiallyVisible);
          console.log("🔍 Section intersection:", {
            intersectionRatio: entry.intersectionRatio,
            isVisible: isPartiallyVisible,
            containerHeight: '1200vh'
          });
        });
      },
      {
        root: null,
        rootMargin: "0px", // No margin for better detection
        threshold: [0, 0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5], // Lower thresholds for tall containers
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);

  // Replace useEffect with useGSAP for better GSAP integration
  useGSAP(
    () => {
      const container = containerRef.current;
      const outerDiv = outerDivRef.current;
      const canvasContainer = canvasContainerRef.current;
      const content = contentRef.current;

      if (!container || !outerDiv || !canvasContainer || !content) return;

      // Set initial state - start shrunk in
      gsap.set(canvasContainer, {
        clipPath: "inset(20% 20% 20% 20% round 20px)", // Start shrunk in
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
      });

      gsap.set(content, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        transformOrigin: "center center",
      });

      // Single timeline covering entire scroll range to avoid conflicts
      const clipPathTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%", // Start when section enters viewport
          end: "bottom top", // End when section leaves viewport
          scrub: 1,
          pin: false,
        },
      });

      clipPathTimeline
        // PHASE 1: IN Animation - expand when entering (30% of timeline)
        .fromTo(canvasContainer, 
          {
            clipPath: "inset(20% 20% 20% 20% round 20px)", // Start shrunk (matches initial state)
          },
          {
            clipPath: "inset(10% 5% 10% 5% round 50px)", // Expand to full
            duration: 0.3, // 30% of timeline for expansion
            ease: "power2.out",
          }
        )
        // PHASE 2: CONTENT Animation - content fades in (40% of timeline)
        .fromTo(content,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4, // 40% of timeline for content animation
            ease: "power2.out",
          },
          "-=0.1" // Start slightly before clip path completes for smooth transition
        )

        // PHASE 4: OUT Animation - content fades out then shrink back (20% of timeline)
        .to(content, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.1, // Quick content fade out
          ease: "power2.in",
        })
  

      // Create pin trigger for canvas container with scroll progress
      ScrollTrigger.create({
        trigger: container,
        start: "top top", // Start pinning when container hits top
        end: "bottom bottom", // Pin for the entire container duration to match animation
        pin: canvasContainer, // Pin the canvas container
        pinSpacing: true,
        onUpdate: (self) => {
          // Calculate progress from 0 to 100% based on scroll position
          const progress = Math.max(0, Math.min(1, self.progress)); // Clamp between 0 and 1
          
          // Update debug information
          setDebugScrollInfo({
            scrollProgress: progress * 100,
            containerHeight: '1500vh',
            scrollTriggerProgress: self.progress * 100,
            isPinned: self.isActive
          });
          
          // Pass progress to MainCanvesScene for Theatre.js sequence control
          if (canvasContainer) {
            // Round to 3 decimal places to prevent excessive updates
            canvasContainer.dataset.scrollProgress = Math.round(progress * 1000) / 1000;
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[1500vh] flex justify-center overflow-hidden z-10 "
    >
      {/* Outer div with inset clip-path animation */}
      <div
        ref={outerDivRef}
        className="relative w-full h-full"
      >
        {/* Section-specific background */}
        <div
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            background: `
              radial-gradient(ellipse at center, 
                #FEFCFD 0%,
                #F8F6F7 30%,
                #F0EEEF 60%,
                #E8E6E7 100%
              )
            `,
          }}
        />

        {/* Subtle vignette overlay for depth */}
        <div
          className="absolute inset-0 z-1 h-full w-full pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at center, 
                transparent 0%,
                transparent 50%,
                rgba(0, 0, 0, 0.02) 80%,
                rgba(0, 0, 0, 0.04) 100%
              )
            `,
          }}
        />

        {/* Inner canvas container with ellipse clip-path reveal effect */}
        <div
          ref={canvasContainerRef}
          className="relative w-[100vw] h-[100vh] bg-white overflow-hidden z-10 mx-auto"
          style={{
            borderRadius: "0", // Initial border radius - moderately rounded
            // clip-path, scale, and opacity will be animated via GSAP
          }}
        >
          {/* 3D Canvas Content */}
          <div className="relative w-full h-full flex items-center justify-center">
            <MainCanvesScene 
              isActive={isInViewport} 
              onTheatreDebugUpdate={setTheatreDebugInfo}
            />
          </div>
        </div>

        {/* Content overlay */}
        <div
          ref={contentRef}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20"
          style={{
            transformOrigin: "center center",
          }}
        >
          {/* Your overlay content goes here */}
        </div>

                 {/* Debug UI for ScrollTrigger */}
         {isInViewport && (
           <div
             style={{
               position: 'fixed',
               top: '20px',
               left: '20px',
               background: 'rgba(0, 0, 139, 0.8)',
               color: 'white',
               padding: '15px',
               borderRadius: '8px',
               fontFamily: 'monospace',
               fontSize: '12px',
               zIndex: 9999,
               minWidth: '250px'
             }}
           >
             <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>ScrollTrigger Debug</div>
             <div>Container Height: {debugScrollInfo.containerHeight}</div>
             <div>Raw Scroll Progress: {debugScrollInfo.scrollTriggerProgress.toFixed(1)}%</div>
             <div>Clamped Progress: {debugScrollInfo.scrollProgress.toFixed(1)}%</div>
             <div>Is Pinned: {debugScrollInfo.isPinned ? 'Yes' : 'No'}</div>
             <div style={{
               marginTop: '8px',
               height: '4px',
               background: '#333',
               borderRadius: '2px',
               overflow: 'hidden'
             }}>
               <div
                 style={{
                   height: '100%',
                   background: '#2196F3',
                   width: `${Math.min(debugScrollInfo.scrollProgress, 100)}%`,
                   transition: 'width 0.1s ease'
                 }}
               />
             </div>
           </div>
         )}

         {/* Debug UI for Theatre.js Sequence */}
         {isInViewport && (
           <div
             style={{
               position: 'fixed',
               top: '20px',
               right: '20px',
               background: 'rgba(0, 0, 0, 0.8)',
               color: 'white',
               padding: '15px',
               borderRadius: '8px',
               fontFamily: 'monospace',
               fontSize: '12px',
               zIndex: 9999,
               minWidth: '250px'
             }}
           >
             <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Theatre.js Sequence Debug</div>
             <div>Scroll Progress: {theatreDebugInfo.scrollProgress.toFixed(1)}%</div>
             <div>Sensitized Progress: {theatreDebugInfo.sensitizedProgress.toFixed(1)}%</div>
             <div>Current Position: {theatreDebugInfo.current.toFixed(2)}</div>
             <div>Total Duration: {theatreDebugInfo.total.toFixed(2)}</div>
             <div>Animation Progress: {theatreDebugInfo.progress.toFixed(1)}%</div>
             <div style={{
               marginTop: '8px',
               height: '4px',
               background: '#333',
               borderRadius: '2px',
               overflow: 'hidden'
             }}>
               <div
                 style={{
                   height: '100%',
                   background: theatreDebugInfo.progress < 100 ? '#4CAF50' : '#FF5722',
                   width: `${Math.min(theatreDebugInfo.progress, 100)}%`,
                   transition: 'width 0.1s ease'
                 }}
               />
             </div>
           </div>
         )}
      </div>
    </div>
  );
}
