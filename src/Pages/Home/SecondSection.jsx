"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SecondSection() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;

    if (!container || !circle || !title || !subtitle || !button) return;

    // Set initial states
    gsap.set([title, subtitle, button], {
      opacity: 0,
      y: 50,
    });

    gsap.set(circle, {
      scale: 0.3,
      opacity: 0.2,
    });

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate elements in sequence with circle growing much larger
    tl.to(circle, {
      scale: 1, // Much bigger scale
      opacity: 0.6,
      duration: 2,
      ease: "power2.out",
    })
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=1.5"
      )
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Parallax effect for the circle on scroll
    gsap.to(circle, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen h-screen sm:h-[120vh] flex items-center justify-center overflow-hidden z-10"
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

      {/* Large Background Circle - Mobile Responsive */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] xs:w-[400px] xs:h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] xl:w-[1200px] xl:h-[1200px] rounded-full pointer-events-none z-5"
        style={{
          background:
            "radial-gradient(circle, rgba(254, 200, 222, 0.4) 0%, rgba(254, 200, 222, 0.25) 30%, rgba(254, 200, 222, 0.15) 50%, rgba(254, 200, 222, 0.08) 70%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Mobile optimized title */}
        <h1
          ref={titleRef}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-black tracking-tight leading-[1.1]"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span className="block">Empowering Nurses</span>
          <span className="block text-pink-600">With Knowledge</span>
        </h1>

        {/* Mobile optimized subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm xs:max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          At AJK College of Nursing, we are dedicated to academic excellence,
          hands-on clinical training, and developing healthcare professionals ready to serve with{" "}
          <span className="text-black font-medium">competence</span>{" "}
          <span className="text-gray-500">and care.</span>
        </p>

        {/* Mobile optimized button */}
        <button
          ref={buttonRef}
          className="group bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 hover:bg-gray-800 active:bg-gray-900 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
        >
          <span>Explore Programs</span>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>

      {/* Decorative Lines - matching index.jsx style */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-px h-12 bg-gray-400"></div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="w-px h-6 bg-gray-200"></div>
      </div>
    </div>
  );
}
