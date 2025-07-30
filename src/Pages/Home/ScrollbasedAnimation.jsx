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
  
      // Scroll sensitivity - same feel as before but reaches 100%
    const SCROLL_SENSITIVITY = 0.4; // Increased from 0.25 to reach full sequence
    const SCROLL_CURVE_STRENGTH = 0.8; // Keep same curve feel as before
  


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
      scrollRef.current.lastTarget = 0;
      scrollRef.current.momentum = 0;
      scrollRef.current.velocity = 0;
      scrollRef.current.hasInitialized = false;
    }
  }, [isActive, sheet, projectReady]);

  // Remove wheel event listener since we're using scroll progress from parent
  // The scroll progress is now controlled by the parent component's ScrollTrigger

  useFrame((state, delta) => {
    if (!sheet || !projectReady || !isActive) return;

          // Apply scroll sensitivity with progressive curve - same feel as before
      // Starts very slow, gradually increases, but now reaches 100%
      const curvedProgress = Math.pow(scrollProgress, 1 + SCROLL_CURVE_STRENGTH);
      const sensitizedScrollProgress = Math.min(curvedProgress / SCROLL_SENSITIVITY, 1.0);
    const targetPosition = sensitizedScrollProgress * totalDuration;
    const clampedTargetPosition = Math.max(0, Math.min(totalDuration, targetPosition));
    
    const ref = scrollRef.current;
    const { current, lastTarget } = ref;
    
    // Calculate momentum based on target change
    const targetDelta = clampedTargetPosition - lastTarget;
    ref.momentum = lerp(ref.momentum, targetDelta * 0.3, 0.1);
    ref.lastTarget = clampedTargetPosition;
    
    // Calculate distance and apply different smoothing strategies
    const distance = Math.abs(clampedTargetPosition - current);
    
    // Much more conservative jump threshold - only for very large jumps
    const largeJumpThreshold = totalDuration * 0.5; // 50% of total duration
    const shouldFastSeek = !ref.hasInitialized || distance > largeJumpThreshold;
    
    if (shouldFastSeek) {
      ref.current = clampedTargetPosition;
      ref.hasInitialized = true;
      ref.momentum = 0;
    } else {
      // Multi-layered smoothing approach
      const baseDistance = clampedTargetPosition - current;
      
      // Adaptive smoothing based on distance and momentum
      let smoothness;
      if (distance > totalDuration * 0.1) {
        // Medium distances - moderate smoothing
        smoothness = 0.02;
      } else if (distance > totalDuration * 0.05) {
        // Small distances - gentle smoothing
        smoothness = 0.015;
      } else {
        // Very small distances - ultra-gentle smoothing
        smoothness = 0.008;
      }
      
      // Apply momentum for natural feel
      const momentumInfluence = Math.abs(ref.momentum) > 0.001 ? 0.003 : 0;
      const finalSmoothness = Math.min(smoothness + momentumInfluence, 0.04);
      
      // Progressive easing - slower as we approach target
      const easingFactor = distance > 0.1 ? easeInOutExpo(1 - (distance / totalDuration)) : 1;
      const adjustedSmoothness = finalSmoothness * (0.3 + 0.7 * easingFactor);
      
      ref.current = lerp(current, clampedTargetPosition, adjustedSmoothness);
    }
    
    // Decay momentum
    ref.momentum *= 0.95;
    
    // Final clamping
    ref.current = Math.max(0, Math.min(totalDuration, ref.current));
    
    // Update sequence with additional micro-smoothing
    const currentSeqPos = sheet.sequence.position;
    sheet.sequence.position = lerp(currentSeqPos, ref.current, 0.7);
    
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
  });

      return null;
}

export default ScrollbasedAnimation;
