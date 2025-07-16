"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleMorphing from "@/components/ParticleMorphing/page";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
// import Lenis from '@studio-freight/lenis'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const particleMorphingRef = useRef(null);
  const morphProgress = useRef(0);

  useEffect(() => {
    // Initialize Lenis with optimized settings for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 3, // Slightly faster for more responsive feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.5, // Reduced for smoother mouse wheel scrolling
      smoothTouch: true, // Enable smooth touch scrolling
      touchMultiplier: 1.5, // Balanced touch sensitivity
      infinite: false,
      lerp: 0.1, // Linear interpolation for smoother transitions
      wheelMultiplier: 0.8, // Reduced wheel sensitivity
      smoothWheel: true, // Enable smooth wheel scrolling
    })

    // Optimized RAF function for better performance
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Connect Lenis with GSAP ScrollTrigger for perfect integration
    lenis.on('scroll', ScrollTrigger.update)

    // Add GSAP ticker for synchronized animations
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Add scroll event listener for additional smoothness
    lenis.on('scroll', (e) => {
      // Optional: Add any additional scroll-based effects here
    })

    return () => {
      lenis.destroy()
    }
    
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Create ScrollTrigger for particle morphing with optimized settings
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".hero-pin-container",
        pinSpacing: true,
        scrub: 0.5, // Reduced scrub for smoother animation
        // markers: true,
        onUpdate: (self) => {
          morphProgress.current = self.progress;
          if (particleMorphingRef.current) {
            particleMorphingRef.current.updateMorphProgress(self.progress);
          }
        },
        onRefresh: () => {
          // Ensure smooth updates during refresh
        }
      });

      // Content fade animation with smoother transitions
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "80% top",
            end: "bottom top",
            scrub: 0.5, // Reduced scrub for smoother animation
          },
        })
        .to(".hero-content", {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: "power2.out", // Smoother easing
        })
        .to(
          ".hero-header",
          {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: "power2.out", // Smoother easing
          },
          0
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={heroRef}
        className="h-[600vh] relative overflow-hidden"
      >
        {/* Background with Vignette */}
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

        {/* Pinned visual container */}
        <div className="hero-pin-container h-screen w-full relative overflow-hidden">
          {/* 3D Canvas */}
          <div className="absolute inset-0 z-10 h-full">
            <Canvas
              camera={{ position: [4.5, 4, 11], fov: 35 }}
              style={{
                background: "transparent",
                height: "100vh",
                width: "100%",
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} color="#ffffff" />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={0.4}
                  color="#ffffff"
                />
                <fog attach="fog" args={["#e8e6e1", 12, 20]} />
                <Float>
                  <ParticleMorphing ref={particleMorphingRef} />
                </Float>
              </Suspense>
            </Canvas>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 h-full flex flex-col pointer-events-none">
            {/* Header */}
            <header className="hero-header flex items-center justify-between p-6 lg:px-[4rem] pointer-events-auto">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-black">A</span>
                <span className="text-2xl font-bold text-black">J</span>
                <span className="text-2xl font-bold text-black">K</span>
                <span className="text-2xl font-light text-gray-600 mx-2">|</span>
                <span className="text-2xl font-light text-gray-600">—</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                  Home
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Projects
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Services
                </a>
              </nav>

              {/* Desktop CTA Button */}
              <Button
                variant="ghost"
                className="hidden lg:flex items-center space-x-2 text-black hover:text-gray-600 p-0 h-auto font-normal"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden bg-white/80 backdrop-blur-sm border-t border-gray-300 p-6 pointer-events-auto">
                <nav className="flex flex-col space-y-4">
                  <a href="#" className="text-black hover:text-gray-600 transition-colors">
                    Home
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Projects
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Services
                  </a>
                </nav>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex items-end pb-16">
              <div className="w-full">
                <div className="flex justify-between items-end px-[4rem]">
                  {/* Left Content */}
                  <div className="hero-content pl-6 lg:pl-8 lg:max-w-xl text-left self-end pointer-events-auto">
                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light text-black leading-tight mb-6">
                      Design That Feels.
                      <br />
                      Experiences That Resonate.
                    </h1>
                    <p className="text-gray-600 text-lg lg:text-xl mb-8 max-w-lg">
                      We blend creativity, emotion, and innovation to create
                      digital worlds that your audience can connect with.
                    </p>
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg font-medium inline-flex items-center space-x-2">
                      <span className="text-white">LET'S TALK</span>
                      <ArrowUpRight className="w-5 h-5 text-orange-400" />
                    </Button>
                  </div>

                  {/* Right Content - Desktop Only */}
                  <div className="hero-content hidden lg:block self-end pr-6 lg:pr-8 lg:max-w-sm pointer-events-auto">
                    <div className="space-y-6">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Whether through intuitive interfaces, immersive 3D, or
                        bold visual storytelling,
                        <span className="text-black font-medium">
                          {" "}
                          we design moments that people don't just see — they
                          feel.
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          UI/UX
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          3D VISUALIZATION
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          DEVELOPMENT
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          •
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div className="h-screen bg-white flex items-center justify-center">
        <h2 className="text-4xl font-bold text-black">Next Section</h2>
      </div>
    </>
  );
}