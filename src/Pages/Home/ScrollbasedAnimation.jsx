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

function ScrollbasedAnimation({ project }) {
  const sheet = useCurrentSheet();
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    lastScrollTime: 0,
  });
  const [projectReady, setProjectReady] = useState(false);
  const totalDuration = val(sheet.sequence.pointer.length);

  // Wait for project to be ready
  useEffect(() => {
    if (!project) return;

    project.ready.then(() => {
      setProjectReady(true);
      // Start from position 0 immediately
      if (sheet) {
        sheet.sequence.position = 0;
        scrollRef.current.current = 0;
        scrollRef.current.target = 0;
      }
    });
  }, [project, sheet]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!projectReady) return;

      e.preventDefault();
      const scrollSpeed = 0.0015;
      const deltaY = e.deltaY * scrollSpeed;
      
      const newTarget = Math.max(
        0, // Start from 0 instead of INTRO_DURATION
        Math.min(totalDuration, scrollRef.current.target + deltaY)
      );
      
      scrollRef.current.target = newTarget;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [totalDuration, projectReady]);

  useFrame((state, delta) => {
    if (!sheet || !projectReady) return;

    const { current, target } = scrollRef.current;
    const distance = target - current;
    const smoothness = 0.075;
    
    scrollRef.current.current += distance * smoothness;
    
    scrollRef.current.current = Math.max(
      0, // Start from 0 instead of INTRO_DURATION
      Math.min(totalDuration, scrollRef.current.current)
    );
    
    sheet.sequence.position = scrollRef.current.current;
  });

  return null;
}

export default ScrollbasedAnimation;
