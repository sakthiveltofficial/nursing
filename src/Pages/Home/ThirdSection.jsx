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

  // Intersection Observer to detect when section is fully in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the section is partially visible (much lower threshold)
          const isPartiallyVisible = entry.intersectionRatio > 0.1; // 10% visible threshold
          setIsInViewport(isPartiallyVisible);
        });
      },
      {
        root: null,
        rootMargin: "-10px", // Slight margin to ensure it's truly in viewport
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for smooth detection
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
        clipPath: "inset(15% 15% 15% 15% round 20px)", // Start shrunk in
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
          start: "top bottom", // Start when section enters viewport
          end: "bottom top", // End when section leaves viewport
          scrub: 1,
          pin: false,
        },
      });

      clipPathTimeline
        // PHASE 1: IN Animation - expand when entering (30% of timeline)
        .fromTo(canvasContainer, 
          {
            clipPath: "inset(15% 15% 15% 15% round 20px)", // Start shrunk (matches initial state)
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)", // Expand to full
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
        // PHASE 3: HOLD - Stay full with content visible (10% of timeline)
        .to(canvasContainer, {
          clipPath: "inset(0% 0% 0% 0% round 0px)", // Stay full
          duration: 0.1, // 10% of timeline
          ease: "none",
        })
        // PHASE 4: OUT Animation - content fades out then shrink back (20% of timeline)
        .to(content, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.1, // Quick content fade out
          ease: "power2.in",
        })
        .to(canvasContainer, {
          clipPath: "inset(15% 15% 15% 15% round 20px)", // Shrink back to initial
          duration: 0.1, // Quick shrink back
          ease: "power2.in",
        });

      // Create pin trigger for canvas container with scroll progress
      ScrollTrigger.create({
        trigger: container,
        start: "top top", // Start pinning when container hits top
        end: "bottom 130%", // End pinning when container bottom hits top
        pin: canvasContainer, // Pin the canvas container
        pinSpacing: true,
        onUpdate: (self) => {
          // Calculate progress from 0 to 100% based on scroll position
          const progress = Math.max(0, Math.min(1, self.progress)); // Clamp between 0 and 1
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
      className="relative h-[550vh] flex justify-center overflow-hidden z-10 "
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
                #f0f0f0 0%,
                #e8e6e1 30%,
                #d8d6d1 60%,
                #c8c6c1 100%
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
                rgba(0, 0, 0, 0.03) 80%,
                rgba(0, 0, 0, 0.06) 100%
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
            <MainCanvesScene isActive={isInViewport} />
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
      </div>
    </div>
  );
}
