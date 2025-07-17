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
  const outerDivRef = useRef(null);
  const innerDivRef = useRef(null);
  const contentRef = useRef(null);
  const laptopRef = useRef(null);
  const nurseRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);

  // Intersection Observer to detect when section is fully in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the section is fully visible (intersectionRatio close to 1)
          const isFullyVisible = entry.intersectionRatio > 0.9; // 90% visible threshold for more precision
          setIsInViewport(isFullyVisible);
          
          // Debug log to see when animation should start
          console.log('ThirdSection visibility:', {
            intersectionRatio: entry.intersectionRatio,
            isFullyVisible,
            isInViewport: isFullyVisible
          });
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
    const outerDiv = outerDivRef.current;
    const innerDiv = innerDivRef.current;
    const content = contentRef.current;
    const laptop = laptopRef.current;

    if (!container || !outerDiv || !innerDiv || !content || !laptop) return;

    // Set initial states - door opening effect (full height, narrow width)
    gsap.set(outerDiv, {
      width: "4px", // Very narrow initial width
      height: "80vh", // Full height from start
      borderRadius: "20px", // Minimal border radius for narrow state
      opacity: 0.2,
      transformOrigin: "center center",
    });

    gsap.set(innerDiv, {
      scaleX: 0.05, // Even narrower horizontally for smoother start
      scaleY: 1, // Full height
      opacity: 0,
      transformOrigin: "center center",
    });

    gsap.set([content, laptop], {
      opacity: 0,
      scaleX: 0.1, // More compressed horizontally
      scaleY: 1, // Full height
      transformOrigin: "center center",
    });

    // Create timeline for scroll-triggered door opening animation - longer and smoother
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%", // Start later for longer animation
        end: "bottom 50%", // End later for extended animation
        scrub: 3, // Increased scrub for much smoother animation
        pin: false,
      },
    });

    // Animate the door opening effect (width expansion from center) - longer durations
    tl.to(outerDiv, {
      width: "90vw", // Expand to full width
      height: "80vh", // Maintain full height
      borderRadius: "40px", // Rounded corners when fully open
      opacity: 1,
      duration: 2.5, // Longer duration for smoother expansion
      ease: "power4.out", // Even smoother easing
    })
      .to(
        innerDiv,
        {
          scaleX: 1, // Expand horizontally
          scaleY: 1, // Maintain full height
          opacity: 1,
          duration: 2, // Longer duration
          ease: "power4.out", // Smoother easing
        },
        "-=1.5" // More overlap for seamless transition
      )
      .to(
        laptop,
        {
          opacity: 1,
          scaleX: 1, // Expand horizontally
          scaleY: 1, // Maintain full height
          duration: 1.8, // Longer duration
          ease: "power4.out", // Smoother easing
        },
        "-=1.2" // More overlap
      )
      .to(
        content,
        {
          opacity: 1,
          scaleX: 1, // Expand horizontally
          scaleY: 1, // Maintain full height
          duration: 1.5, // Longer duration
          ease: "power4.out", // Smoother easing
        },
        "-=1" // More overlap for fluid transition
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 p-0 m-0"
      style={{ background: "transparent" }}
    >
      {/* Outer container with door opening effect - full height, expanding width */}
      <div
        ref={outerDivRef}
        className="relative overflow-hidden"
        style={{
          borderRadius: "20px", // Initial border radius
          margin: 0,
          padding: 0,
          // Width and height will be animated via GSAP
        }}
      >
        {/* Inner content container - full height, expanding width */}
        <div
          ref={innerDivRef}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white m-0 p-0"
          style={{
            margin: 0,
            padding: 0,
            transformOrigin: "center center",
          }}
        >
          {/* Content area */}
          <div
            ref={laptopRef}
            className="relative w-full h-full flex items-center justify-center m-0 p-0"
            style={{
              transformOrigin: "center center",
            }}
          >
            <MainCanvesScene isActive={isInViewport} />
          </div>
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
