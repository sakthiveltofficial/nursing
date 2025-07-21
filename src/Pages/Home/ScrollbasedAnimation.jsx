import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCurrentSheet } from "@theatre/r3f";
import { val } from "@theatre/core";

// Smooth easing function
const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

// Gentler easing function for smoother motion
const easeInOutQuint = (x) => {
  return x < 0.5 
    ? 16 * x * x * x * x * x
    : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

function ScrollbasedAnimation({ project, isActive = false, scrollProgress = 0 }) {
  const sheet = useCurrentSheet();
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    lastScrollTime: 0,
    hasInitialized: false,
  });
  const [projectReady, setProjectReady] = useState(false);
  const totalDuration = val(sheet.sequence.pointer.length);
  


  // Wait for project to be ready
  useEffect(() => {
    if (!project) return;

    project.ready.then(() => {
      setProjectReady(true);
      // Start from position 0 but don't activate until isActive is true
      if (sheet) {
        sheet.sequence.position = 0;
        scrollRef.current.current = 0;
        scrollRef.current.target = 0;
      }
    });
  }, [project, sheet, totalDuration]);

  // Reset animation when section becomes inactive
  useEffect(() => {
    if (!isActive && sheet && projectReady) {
      sheet.sequence.position = 0;
      scrollRef.current.current = 0;
      scrollRef.current.target = 0;
      scrollRef.current.hasInitialized = false; // Reset initialization flag
    }
  }, [isActive, sheet, projectReady]);

  // Remove wheel event listener since we're using scroll progress from parent
  // The scroll progress is now controlled by the parent component's ScrollTrigger

  useFrame((state, delta) => {
    if (!sheet || !projectReady || !isActive) return; // Only animate when section is active

    // Use scroll progress directly for Theatre.js sequence
    const targetPosition = scrollProgress * totalDuration;
    
    // Clamp target position to sequence duration to prevent over-scrolling
    const clampedTargetPosition = Math.max(0, Math.min(totalDuration, targetPosition));
    
    const { current } = scrollRef.current;
    const distance = Math.abs(clampedTargetPosition - current);
    
    // Fast seek when starting from middle or when distance is large
    const largeJumpThreshold = totalDuration * 0.1; // 10% of total duration
    const shouldFastSeek = !scrollRef.current.hasInitialized || distance > largeJumpThreshold;
    
    if (shouldFastSeek) {
      // Directly set position for fast catch-up
      scrollRef.current.current = clampedTargetPosition;
      scrollRef.current.hasInitialized = true;
    } else {
      // Smooth interpolation for small movements
      const smoothDistance = clampedTargetPosition - current;
      const smoothness = 0.08; // Slightly faster smoothing
      
      // Only update if we're not at the end and trying to go further
      if (current < totalDuration || smoothDistance < 0) {
        scrollRef.current.current += smoothDistance * smoothness;
      }
    }
    
    // Clamp current position to sequence bounds
    scrollRef.current.current = Math.max(
      0,
      Math.min(totalDuration, scrollRef.current.current)
    );
    
    // Update the sequence position
    sheet.sequence.position = scrollRef.current.current;
  });

  return null;
}

export default ScrollbasedAnimation;
