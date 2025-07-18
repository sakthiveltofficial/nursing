"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MainCanvesScene from "./MainCanvesScene";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThirdSection() {
  const containerRef = useRef(null);
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

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasContainerRef.current;
    const content = contentRef.current;

    if (!container || !canvasContainer || !content) return;

    // Set initial states for clip-path reveal animation
    gsap.set(canvasContainer, {
      clipPath: "ellipse(0.5% 50% at 50% 50%)", // Start as thin ellipse in center
      opacity: 0.2,
      borderRadius: "70px", // Moderately rounded initially
      transformOrigin: "center center",
    });

    gsap.set(content, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transformOrigin: "center center",
    });

    // Create timeline for scroll-triggered clip-path reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%", // Start when section enters viewport
        end: "top 80%", // End when section is well into view
        scrub: 2, // Smooth scrub for fluid animation
        pin: false,
      },
    });

    // Animate the clip-path reveal effect - expanding from center vertically and horizontally
    tl.to(canvasContainer, {
      clipPath: "ellipse(100% 100% at 50% 50%)", // Expand to full ellipse covering entire area
      opacity: 1,
      borderRadius: "70px", // Moderately rounded corners when fully revealed
      duration: 3, // Longer duration for smooth reveal
      ease: "power3.out", // Smooth easing
    }).to(
      content,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2, // Content fades in after clip-path starts revealing
        ease: "power2.out",
      },
      "-=2" // Start content animation before clip-path completes
    );

    // Create pin trigger for canvas container
    ScrollTrigger.create({
      trigger: container,
      start: "top top", // Start pinning when container hits top
      end: "bottom 140%", // End pinning when container bottom hits top
      pin: canvasContainer, // Pin the canvas container
      pinSpacing: true,
      onUpdate: (self) => {
        // Calculate progress from 0 to 100% based on scroll position
        const progress = self.progress;
        // Pass progress to MainCanvesScene for Theatre.js sequence control
        if (canvasContainer) {
          // Round to 3 decimal places to prevent excessive updates
          canvasContainer.dataset.scrollProgress = Math.round(progress * 1000) / 1000;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[800vh] flex justify-center  overflow-hidden z-10 p-4"
      style={{ background: "transparent" }}
    >
      {/* Canvas container with clip-path reveal effect */}
      <div
        ref={canvasContainerRef}
        className="relative w-[90vw] mt-[4%] h-[80vh] bg-white overflow-hidden"
        style={{
          borderRadius: "80px", // Initial border radius - moderately rounded
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
  );
}
