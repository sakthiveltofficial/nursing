"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SecondSection() {
  const containerRef = useRef(null)
  const circleRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const circle = circleRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const button = buttonRef.current

    if (!container || !circle || !title || !subtitle || !button) return

    // Set initial states
    gsap.set([title, subtitle, button], {
      opacity: 0,
      y: 50,
    })

    gsap.set(circle, {
      scale: 0.3,
      opacity: 0.2,
    })

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

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
        "-=1.5",
      )
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8",
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      )

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
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
      style={{ background: "transparent" }}
    >
      {/* Large Background Circle - Centered and Much Bigger */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 165, 0, 0.4) 0%, rgba(255, 140, 0, 0.25) 30%, rgba(255, 165, 0, 0.15) 50%, rgba(255, 165, 0, 0.08) 70%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 text-black tracking-wide"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
          }}
        >
          Every Experience
          <br />
          Begins With a Feeling
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          We blend creativity, emotion, and innovation to craft digital worlds that invite{" "}
          <span className="text-black">exploration</span>{" "}
          <span className="text-gray-500">and inspire connection.</span>
        </p>

        <button
          ref={buttonRef}
          className="group bg-black text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-gray-800 hover:scale-105 flex items-center gap-2 mx-auto"
        >
          About Us
          <ArrowUpRight className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>

      {/* Decorative Lines - matching index.jsx style */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-px h-12 bg-gray-400"></div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="w-px h-6 bg-gray-200"></div>
      </div>
    </div>
  )
}
