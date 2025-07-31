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

      // Set initial state - mobile-responsive shrunk in
      const isMobile = window.innerWidth <= 768;
      gsap.set(canvasContainer, {
        clipPath: isMobile ? "inset(0% 0% 0% 0% round 5px)" : "inset(10% 2% 10% 2% round 20px)",
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
        // PHASE 1: IN Animation - mobile-responsive expand when entering (30% of timeline)
        .fromTo(canvasContainer, 
          {
            clipPath: isMobile ? "inset(0% 0% 0% 0% round 5px)" : "inset(10% 2% 10% 2% round 20px)",
          },
          {
            clipPath: isMobile ? "inset(0% 0% 0% 0% round 5px)" : "inset(0% 0% 0% 0% round 50px)",
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
  

      // Create pin trigger for canvas container with mobile-optimized scroll progress
      ScrollTrigger.create({
        trigger: container,
        start: "top top", // Start pinning when container hits top
        end: "bottom bottom", // Pin for the entire container duration to match animation
        pin: canvasContainer, // Pin the canvas container
        pinSpacing: true,
        onUpdate: (self) => {
          // Calculate progress from 0 to 100% based on scroll position
          const progress = Math.max(0, Math.min(1, self.progress)); // Clamp between 0 and 1
          
          // Update debug information with mobile-responsive height
          const currentHeight = isMobile ? '1200vh' : '2000vh';
          setDebugScrollInfo({
            scrollProgress: progress * 100,
            containerHeight: currentHeight,
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
      className="relative h-[1200vh] sm:h-[1500vh] lg:h-[2000vh] flex justify-center overflow-hidden z-10"
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
                #FFFFFF 0%,
                #FEC8DE59 30%,
                #FEC8DE80 60%,
                #FEC8DE100 100%
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
                rgba(254, 200, 222, 0.1) 80%,
                rgba(254, 200, 222, 0.2) 100%
              )
            `,
          }}
        />

        {/* Inner canvas container with mobile-optimized dimensions */}
        <div
          ref={canvasContainerRef}
          className="relative w-[95vw] sm:w-[90vw] lg:w-[100vw] h-[100vh] md:h-[100vh] bg-transparent md:bg-white overflow-hidden z-10 mx-auto rounded-xl sm:rounded-2xl lg:rounded-none flex flex-col"
          style={{
            // clip-path, scale, and opacity will be animated via GSAP
          }}
        >
          {/* 3D Canvas Content - Takes 70vh on mobile, full height on desktop */}
          <div className="relative w-full h-[70vh] md:h-full flex items-center justify-center">
            <MainCanvesScene 
              isActive={isInViewport} 
              onTheatreDebugUpdate={setTheatreDebugInfo}
            />
          </div>

          {/* Content overlay - Hidden on mobile, visible on desktop */}
          <div
            ref={contentRef}
            className="hidden md:absolute md:inset-0 md:w-full md:h-full md:flex md:items-center md:justify-center z-20 rounded-xl sm:rounded-2xl lg:rounded-none"
            style={{
              transformOrigin: "center center",
            }}
          >
            {/* Desktop overlay content */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-sm sm:max-w-md lg:max-w-lg mx-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Interactive Learning Experience
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Explore our state-of-the-art facilities and modern learning environments.
              </p>
            </div>
          </div>

          {/* Mobile Content Section - Only visible on mobile with 30vh height, pinned with canvas */}
          <div className="md:hidden h-[30vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm mx-auto text-center">
              <div className="bg-white rounded-3xl p-6  border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Interactive Learning
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Explore our state-of-the-art facilities and modern learning environments designed for excellence.
                </p>
              </div>
            </div>
          </div>
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
