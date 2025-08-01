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
  const [currentSequencePosition, setCurrentSequencePosition] = useState(0);
  const lastActiveMobileContentIndexRef = useRef(0);

  // Define content array with JSX content, sequence positions, and positioning
  const overlayContents = [
    {
      id: "content1",
      start: 0,
      end: 1.67,
      contentPosition: {
        top: "25%",
        right: "0%",
        transform: "translate(-50%, -50%)",
      },
      content: (
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg max-w-[28rem] flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              <img
                src="/logoOnlyBlack.png"
                alt="Focused student nurse"
                className="w-full h-auto object-fit"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-pink-900 mb-2">
              Passion for Learning
            </h3>
            <p className="text-sm sm:text-base text-gray-800">
              Every great nurse starts with a deep curiosity. Our students are encouraged to learn, reflect, and grow.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "content2",
      start: 8,
      end: 9.80,
      contentPosition: {
        top: "30%",
        right: "10%",
        transform: "translateY(-50%)",
      },
      content: (
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-[30rem]">
          <div className="w-full h-20 mx-auto mb-4 overflow-hidden rounded-lg">
            <img
              src="/logoBlack.png"
              alt="Nursing classroom"
              className="w-full h-auto object-fit"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-2 text-center">
            Collaborative Classrooms
          </h3>
          <p className="text-sm sm:text-base text-gray-800 text-center">
            From theory to practice, students learn together in modern, engaging environments.
          </p>
        </div>
      ),
    },
    {
      id: "content3",
      start: 18.72,
      end: 21.70,
      contentPosition: {
        bottom: "10%",
        right: "0%",
        transform: "translateX(-50%)",
      },
      content: (
        <div className="bg-pink-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-xs">
          <h3 className="text-lg sm:text-xl font-semibold text-pink-800 mb-2 text-center">
            Compassion in Action
          </h3>
          <p className="text-sm sm:text-base text-gray-700 text-center">
            Building trust with every touch — caring for mothers and newborns with confidence and empathy.
          </p>
        </div>
      ),
    },
    {
      id: "content4",
      start: 24.27,
      end: 27.04,
      contentPosition: {
        bottom: "10%",
        right: "0%",
        transform: "translateX(-50%)",
      },
      content: (
        <div className="bg-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-xs">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 text-center">
            Listening & Understanding
          </h3>
          <p className="text-sm sm:text-base text-gray-700 text-center">
            Nurses are trained to listen deeply — because healing begins with understanding.
          </p>
        </div>
      ),
    },
    {
      id: "content5",
      start: 28.25,
      end: 29.80,
      contentPosition: {
        bottom: "10%",
        right: "0%",
        transform: "translateX(-50%)",
      },
      content: (
        <div className="bg-green-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-xs">
          <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 text-center">
            Support with Skill
          </h3>
          <p className="text-sm sm:text-base text-gray-700 text-center">
            Whether it's medication, monitoring, or emotional care — precision matters.
          </p>
        </div>
      ),
    },
    {
      id: "content6",
      start: 30.40,
      end: 32,
      contentPosition: {
        bottom: "10%",
        right: "0%",
        transform: "translateX(-50%)",
      },
      content: (
        <div className="bg-yellow-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-xs">
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-800 mb-2 text-center">
            Dedicated to Every Life
          </h3>
          <p className="text-sm sm:text-base text-gray-700 text-center">
            Nursing isn’t just a profession — it's a lifelong commitment to care, service, and humanity.
          </p>
        </div>
      ),
    },
    {
      id: "content7",
      start: 32.60,
      end: 34.5,
      contentPosition: {
        bottom: "10%",
        right: "0%",
        transform: "translateX(-50%)",
      },
      content: (
        <div className="bg-orange-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-xs">
          <h3 className="text-lg sm:text-xl font-semibold text-orange-800 mb-2 text-center">
            Silent Strength
          </h3>
          <p className="text-sm sm:text-base text-gray-700 text-center">
            In every challenge, nurses lead with quiet courage, unwavering resolve, and open hearts.
          </p>
        </div>
      ),
    }    
  ];
  

  // Create refs for each content piece (desktop + mobile)
  const contentRefs = useRef([
    ...overlayContents.map(() => useRef(null)), // Desktop refs (0 to length-1)
    ...overlayContents.map(() => useRef(null)), // Mobile refs (length to 2*length-1)
  ]);

  // Function to update content visibility based on sequence position
  const updateContentVisibility = (sequencePosition) => {
    setCurrentSequencePosition(sequencePosition);

    // Check if we're on mobile (768px and below)
    const isMobile = window.innerWidth <= 768;

    // Handle desktop content with fade animations
    overlayContents.forEach((contentItem, index) => {
      const desktopElement = contentRefs.current[index]?.current;
      const isVisible =
        sequencePosition >= contentItem.start &&
        sequencePosition <= contentItem.end;

      if (desktopElement && !isMobile) {
        if (isVisible) {
          // Calculate fade progress within the content's range
          const fadeInDuration = 0.1;
          const fadeOutDuration = 0.1;
          let opacity = 1;

          // Fade in at the start
          if (sequencePosition < contentItem.start + fadeInDuration) {
            opacity = (sequencePosition - contentItem.start) / fadeInDuration;
          }
          // Fade out at the end
          else if (sequencePosition > contentItem.end - fadeOutDuration) {
            opacity = (contentItem.end - sequencePosition) / fadeOutDuration;
          }

          const finalOpacity = Math.max(0, Math.min(1, opacity));
          gsap.set(desktopElement, {
            opacity: finalOpacity,
            pointerEvents: "auto",
            display: "block",
          });
        } else {
          gsap.set(desktopElement, {
            opacity: 0,
            pointerEvents: "none",
            display: "block",
          });
        }
      } else if (desktopElement && isMobile) {
        // Force hide desktop elements on mobile
        gsap.set(desktopElement, {
          opacity: 0,
          pointerEvents: "none",
          display: "none",
        });
      }
    });

    // Handle mobile content - always show content, no blank spaces
    if (isMobile) {
      // Find the current active content index
      let currentActiveIndex = -1;
      for (let i = 0; i < overlayContents.length; i++) {
        const contentItem = overlayContents[i];
        if (sequencePosition >= contentItem.start && sequencePosition <= contentItem.end) {
          currentActiveIndex = i;
          break;
        }
      }

      // Determine which content to show
      let indexToShow;
      if (currentActiveIndex !== -1) {
        // If we found an active content, use it and update the ref
        indexToShow = currentActiveIndex;
        lastActiveMobileContentIndexRef.current = currentActiveIndex;
      } else {
        // No active content, use the last active one
        indexToShow = lastActiveMobileContentIndexRef.current;
      }

      // Show/hide mobile content instantly (no fade animation)
      overlayContents.forEach((contentItem, index) => {
        const mobileElement = contentRefs.current[index + overlayContents.length]?.current;
        
        if (mobileElement) {
          if (index === indexToShow) {
            gsap.set(mobileElement, {
              opacity: 1,
              pointerEvents: "auto",
            });
          } else {
            gsap.set(mobileElement, {
              opacity: 0,
              pointerEvents: "none",
            });
          }
        }
      });

      console.log(`Mobile: showing content ${indexToShow} (${overlayContents[indexToShow]?.id}), current active: ${currentActiveIndex}, last stored: ${lastActiveMobileContentIndexRef.current}, sequence: ${sequencePosition.toFixed(2)}`);
    } else {
      // Hide all mobile elements on desktop
      overlayContents.forEach((contentItem, index) => {
        const mobileElement = contentRefs.current[index + overlayContents.length]?.current;
        if (mobileElement) {
          gsap.set(mobileElement, {
            opacity: 0,
            pointerEvents: "none",
          });
        }
      });
    }
  };

  // Add debug state for container scroll info
  const [debugScrollInfo, setDebugScrollInfo] = useState({
    scrollProgress: 0,
    containerHeight: "550vh",
    scrollTriggerProgress: 0,
    isPinned: false,
  });

  // Add debug state for Theatre.js sequence info
  const [theatreDebugInfo, setTheatreDebugInfo] = useState({
    current: 0,
    total: 0,
    progress: 0,
    scrollProgress: 0,
    sensitizedProgress: 0,
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
            containerHeight: "1200vh",
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

      if (!container || !outerDiv || !canvasContainer) return;

      // Set initial state - mobile-responsive shrunk in
      const isMobile = window.innerWidth <= 768;

      // Initialize all content elements with opacity 0 (both desktop and mobile)
      contentRefs.current.forEach((ref, index) => {
        if (ref?.current) {
          const isDesktopElement = index < overlayContents.length;
          gsap.set(ref.current, {
            opacity: 0,
            pointerEvents: "none",
            // Force hide desktop elements on mobile
            display: isDesktopElement && isMobile ? "none" : "block",
          });
        }
      });
      gsap.set(canvasContainer, {
        clipPath: isMobile
          ? "inset(0% 0% 0% 0% round 5px)"
          : "inset(10% 2% 10% 2% round 20px)",
        scale: 1,
        opacity: 1,
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
        // PHASE 1: IN Animation - mobile-responsive expand when entering
        .fromTo(
          canvasContainer,
          {
            clipPath: isMobile
              ? "inset(0% 0% 0% 0% round 5px)"
              : "inset(10% 2% 10% 2% round 20px)",
          },
          {
            clipPath: isMobile
              ? "inset(0% 0% 0% 0% round 5px)"
              : "inset(0% 0% 0% 0% round 50px)",
            duration: 1, // Full timeline for smooth expansion
            ease: "power2.out",
          }
        );

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

          // Convert scroll progress to Theatre.js sequence position (0 to total duration)
          const maxSequencePosition = theatreDebugInfo.total || 40.04; // Use actual Theatre.js total duration
          const sequencePosition = progress * maxSequencePosition;

          // Update content visibility based on sequence position
          updateContentVisibility(sequencePosition);

          // Update debug information with mobile-responsive height
          const currentHeight = isMobile ? "1200vh" : "2000vh";
          setDebugScrollInfo({
            scrollProgress: progress * 100,
            containerHeight: currentHeight,
            scrollTriggerProgress: self.progress * 100,
            isPinned: self.isActive,
          });

          // Pass progress to MainCanvesScene for Theatre.js sequence control
          if (canvasContainer) {
            // Round to 3 decimal places to prevent excessive updates
            canvasContainer.dataset.scrollProgress =
              Math.round(progress * 1000) / 1000;
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
      <div ref={outerDivRef} className="relative w-full h-full">
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
          style={
            {
              // clip-path, scale, and opacity will be animated via GSAP
            }
          }
        >
          {/* 3D Canvas Content - Takes 70vh on mobile, full height on desktop */}
          <div className="relative w-full h-[70vh] md:h-full flex items-center justify-center">
            <MainCanvesScene
              isActive={isInViewport}
              onTheatreDebugUpdate={setTheatreDebugInfo}
            />
          </div>

          {/* Dynamic Content Overlays - Hidden on mobile, visible on desktop */}
          {overlayContents.map((contentItem, index) => (
            <div
              key={contentItem.id}
              ref={contentRefs.current[index]}
              className="absolute z-50 hidden md:block"
              style={{
                ...contentItem.contentPosition,
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              {contentItem.content}
            </div>
          ))}

          {/* Legacy content ref for backward compatibility (hidden) */}
          <div ref={contentRef} style={{ display: "none" }} />

          {/* Dynamic Mobile Content Section - Only visible on mobile with 30vh height, pinned with canvas */}
          <div className="md:hidden h-[30vh] relative overflow-hidden">
            {overlayContents.map((contentItem, index) => (
              <div
                key={`mobile-${contentItem.id}`}
                ref={(el) => {
                  // Create separate refs for mobile content
                  if (!contentRefs.current[index + overlayContents.length]) {
                    contentRefs.current[index + overlayContents.length] = {
                      current: null,
                    };
                  }
                  contentRefs.current[index + overlayContents.length].current =
                    el;
                }}
                className="absolute inset-0 flex items-center justify-center px-4"
                style={{
                  opacity: 0,
                  pointerEvents: "none",
                }}
              >
                <div className="w-full max-w-sm mx-auto text-center">
                  {contentItem.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debug UI for ScrollTrigger */}
        {/* {isInViewport && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              background: "rgba(0, 0, 139, 0.8)",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "12px",
              zIndex: 9999,
              minWidth: "250px",
            }}
          >
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              ScrollTrigger Debug
            </div>
            <div>Container Height: {debugScrollInfo.containerHeight}</div>
            <div>
              Raw Scroll Progress:{" "}
              {debugScrollInfo.scrollTriggerProgress.toFixed(1)}%
            </div>
            <div>
              Clamped Progress: {debugScrollInfo.scrollProgress.toFixed(1)}%
            </div>
            <div>Sequence Position: {currentSequencePosition.toFixed(2)}</div>
            <div>Is Pinned: {debugScrollInfo.isPinned ? "Yes" : "No"}</div>
            <div style={{ marginTop: "8px", fontSize: "11px" }}>
              Active Content:{" "}
              {overlayContents
                .filter(
                  (content) =>
                    currentSequencePosition >= content.start &&
                    currentSequencePosition <= content.end
                )
                .map((content) => content.id)
                .join(", ") || "None"}
            </div>
            <div
              style={{
                marginTop: "8px",
                height: "4px",
                background: "#333",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#2196F3",
                  width: `${Math.min(debugScrollInfo.scrollProgress, 100)}%`,
                  transition: "width 0.1s ease",
                }}
              />
            </div>
          </div>
        )} */}

        {/* Debug UI for Theatre.js Sequence */}
        {/* {isInViewport && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "12px",
              zIndex: 9999,
              minWidth: "250px",
            }}
          >
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              Theatre.js Sequence Debug
            </div>
            <div>
              Scroll Progress: {theatreDebugInfo.scrollProgress.toFixed(1)}%
            </div>
            <div>
              Sensitized Progress:{" "}
              {theatreDebugInfo.sensitizedProgress.toFixed(1)}%
            </div>
            <div>Current Position: {theatreDebugInfo.current.toFixed(2)}</div>
            <div>Total Duration: {theatreDebugInfo.total.toFixed(2)}</div>
            <div>
              Animation Progress: {theatreDebugInfo.progress.toFixed(1)}%
            </div>
            <div
              style={{
                marginTop: "8px",
                height: "4px",
                background: "#333",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background:
                    theatreDebugInfo.progress < 100 ? "#4CAF50" : "#FF5722",
                  width: `${Math.min(theatreDebugInfo.progress, 100)}%`,
                  transition: "width 0.1s ease",
                }}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
