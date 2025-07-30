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

// Ultra-smooth easing for scroll animations
const easeInOutExpo = (x) => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5 
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

// Smooth interpolation with momentum
const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

function ScrollbasedAnimation({ project, isActive = false, scrollProgress = 0, onDebugUpdate = null }) {
  const sheet = useCurrentSheet();
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    lastScrollTime: 0,
    hasInitialized: false,
    momentum: 0,
    lastTarget: 0,
  });
  const [projectReady, setProjectReady] = useState(false);
  // Remove debug state from here - will be handled by parent component
  const totalDuration = val(sheet.sequence.pointer.length);
  
      // Scroll sensitivity - consistent linear speed throughout
    const SCROLL_SENSITIVITY = 1.0; // Full sequence completion at 100% scroll
  


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

  // Don't reset animation when section becomes inactive - preserve position
  // This allows smooth transitions and prevents jumping back to start
  useEffect(() => {
    // Only reset on first load, not when transitioning between sections
    if (!isActive && sheet && projectReady && !scrollRef.current.hasInitialized) {
      sheet.sequence.position = 0;
      scrollRef.current.current = 0;
      scrollRef.current.target = 0;
      scrollRef.current.lastTarget = 0;
      scrollRef.current.momentum = 0;
      scrollRef.current.velocity = 0;
    }
  }, [isActive, sheet, projectReady]);

  // Remove wheel event listener since we're using scroll progress from parent
  // The scroll progress is now controlled by the parent component's ScrollTrigger

  useFrame((state, delta) => {
    if (!sheet || !projectReady) return;

    // Continue updating only when section is active
    if (isActive) {
      // Linear scroll mapping: consistent speed from start to end
      // No acceleration - maintains the same speed throughout
      const sensitizedScrollProgress = scrollProgress * SCROLL_SENSITIVITY;
      const targetPosition = sensitizedScrollProgress * totalDuration;
      const clampedTargetPosition = Math.max(0, Math.min(totalDuration, targetPosition));
      
      const ref = scrollRef.current;
      const { current, lastTarget } = ref;
      
      // Direct, realistic scroll mapping with minimal smoothing
      const distance = Math.abs(clampedTargetPosition - current);
      
      // Only use fast seek for initialization
      const shouldFastSeek = !ref.hasInitialized;
      
      if (shouldFastSeek) {
        ref.current = clampedTargetPosition;
        ref.hasInitialized = true;
      } else {
        // Gentle smoothing for ultra-smooth feel
        const smoothness = 0.08; // Gentler smoothing for smoother motion
        ref.current = lerp(current, clampedTargetPosition, smoothness);
      }
      
      // Final clamping
      ref.current = Math.max(0, Math.min(totalDuration, ref.current));
      
      // Update sequence with slight smoothing for ultra-smooth playback
      const currentSeqPos = sheet.sequence.position;
      sheet.sequence.position = lerp(currentSeqPos, ref.current, 0.4);
      
      // Pass debug info to parent component if callback provided
      if (onDebugUpdate) {
        onDebugUpdate({
          current: ref.current,
          total: totalDuration,
          progress: (ref.current / totalDuration) * 100,
          scrollProgress: scrollProgress * 100,
          sensitizedProgress: sensitizedScrollProgress * 100
        });
      }
    }
    // When not active, preserve current sequence position without updates
  });

      return null;
}

export default ScrollbasedAnimation;
