"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
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
    // Initialize Lenis with optimized settings for ultra-smooth scrolling and mobile touch
    const lenis = new Lenis({
      duration: 2.5, // Slightly faster for more responsive feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.6, // Slightly increased for better mouse control
      smoothTouch: true, // Enable smooth touch scrolling
      touchMultiplier: 2.0, // Increased for better mobile response
      infinite: false,
      lerp: 0.08, // Reduced for smoother transitions
      wheelMultiplier: 0.9, // Slightly increased wheel sensitivity
      smoothWheel: true, // Enable smooth wheel scrolling
      normalizeWheel: true, // Normalize wheel events across browsers
      syncTouch: true, // Sync touch events for consistency
      syncTouchLerp: 0.1, // Smooth touch interpolation
    });

    // Optimized RAF function for better performance
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger for perfect integration
    lenis.on("scroll", ScrollTrigger.update);

    // Add GSAP ticker for synchronized animations
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Enhanced scroll event listener for mobile touch handling
    lenis.on("scroll", (e) => {
      // Force ScrollTrigger refresh for mobile devices
      if (window.innerWidth <= 1024) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove();
    };
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Enhanced ScrollTrigger for particle morphing with mobile optimization
      const scrollTrigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".hero-pin-container",
        pinSpacing: true,
        scrub: 0.3, // Reduced scrub for smoother mobile animation
        anticipatePin: 1, // Better pin handling
        refreshPriority: -1, // Higher priority for mobile
        invalidateOnRefresh: true, // Force recalculation on refresh
        // markers: true,
        onUpdate: (self) => {
          morphProgress.current = self.progress;
          if (particleMorphingRef.current) {
            // Add smoothing for mobile devices
            const smoothedProgress = window.innerWidth <= 1024 
              ? gsap.utils.interpolate(
                  morphProgress.current, 
                  self.progress, 
                  0.15
                )
              : self.progress;
            
            particleMorphingRef.current.updateMorphProgress(smoothedProgress);
          }
        },
        onRefresh: () => {
          // Ensure smooth updates during refresh for mobile
          if (window.innerWidth <= 1024) {
            ScrollTrigger.refresh();
          }
        },
        // Mobile-specific settings
        snap: {
          snapTo: "labels", // Optional: snap to specific points
          duration: {min: 0.2, max: 0.8}, // Smooth snap duration
          delay: 0.1, // Small delay for better feel
          ease: "power2.inOut"
        }
      });

      // Enhanced content fade animation with mobile optimization
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "70% top", // Start earlier on mobile
            end: "bottom top",
            scrub: 0.3, // Reduced scrub for smoother animation
            refreshPriority: -1,
            invalidateOnRefresh: true,
          },
        })
        .to(".hero-content", {
          opacity: 0,
          y: window.innerWidth <= 1024 ? -30 : -50, // Less movement on mobile
          duration: 1,
          ease: "power2.out", // Smoother easing
        })
        .to(
          ".hero-header",
          {
            opacity: 0,
            y: window.innerWidth <= 1024 ? -20 : -30, // Less movement on mobile
            duration: 1,
            ease: "power2.out", // Smoother easing
          },
          0
        );

      // Add mobile-specific touch event handling
      if (window.innerWidth <= 1024) {
        let touchStartY = 0;
        let touchEndY = 0;
        
        const handleTouchStart = (e) => {
          touchStartY = e.changedTouches[0].screenY;
        };
        
        const handleTouchEnd = (e) => {
          touchEndY = e.changedTouches[0].screenY;
          handleSwipeGesture();
        };
        
        const handleSwipeGesture = () => {
          const swipeDistance = touchStartY - touchEndY;
          const minSwipeDistance = 50;
          
          if (Math.abs(swipeDistance) > minSwipeDistance) {
            // Force ScrollTrigger update for swipe gestures
            ScrollTrigger.refresh();
          }
        };
        
        // Add touch event listeners
        heroRef.current?.addEventListener('touchstart', handleTouchStart, { passive: true });
        heroRef.current?.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Cleanup function for touch events
        return () => {
          heroRef.current?.removeEventListener('touchstart', handleTouchStart);
          heroRef.current?.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div ref={heroRef} className="h-[600vh] relative overflow-hidden">
        {/* Section-specific background */}
        <div
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            background: `
              radial-gradient(ellipse at center, 
                #FEFCFD 0%,
                #F8F6F7 30%,
                #F0EEEF 60%,
                #E8E6E7 100%
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
                rgba(0, 0, 0, 0.02) 80%,
                rgba(0, 0, 0, 0.04) 100%
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
            <header className="hero-header flex items-center justify-between p-4 sm:p-6 lg:px-[4rem] pointer-events-auto">
              <div className="flex items-center space-x-1">
                <span className="text-xl sm:text-2xl font-bold text-black">A</span>
                <span className="text-xl sm:text-2xl font-bold text-black">J</span>
                <span className="text-xl sm:text-2xl font-bold text-black">K</span>
                <span className="text-xl sm:text-2xl font-light text-gray-600 mx-2">
                  |
                </span>
                <span className="text-xl sm:text-2xl font-light text-gray-600">—</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Admission / Academics
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Facilities
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Gallery
                </a>
              </nav>

              {/* Desktop CTA Button */}
              <Button
                variant="ghost"
                className="hidden lg:flex items-center space-x-2 text-black hover:text-gray-600 p-0 h-auto font-normal"
              >
                <span>Contact us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-50 pointer-events-auto">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Menu Panel */}
                <div className="absolute top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <div className="flex items-center space-x-1">
                      <span className="text-xl font-bold text-black">A</span>
                      <span className="text-xl font-bold text-black">J</span>
                      <span className="text-xl font-bold text-black">K</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Navigation */}
                  <nav className="flex flex-col p-4">
                    <a
                      href="#"
                      className="flex items-center justify-between py-4 px-4 text-black font-medium hover:bg-gray-50 rounded-xl transition-all duration-200 active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Home</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between py-4 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>About Us</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between py-4 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Admission / Academics</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between py-4 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Facilities</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between py-4 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Gallery</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </a>
                    
                    {/* Contact CTA */}
                    <div className="mt-6 px-4">
                      <Button 
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 text-base font-medium transition-all duration-200 active:scale-95"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact Us
                      </Button>
                    </div>
                  </nav>

                  {/* Footer */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        B.Sc Nursing
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        Clinical Training
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        NCLEX Prep
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex items-end pb-8 sm:pb-12 lg:pb-16">
              <div className="w-full">
                {/* Mobile Layout */}
                <div className="block lg:hidden px-4 sm:px-6">
                  <div className="hero-content text-center pointer-events-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight mb-4 sm:mb-6">
                      Transforming Healthcare,
                      <br />
                      One Nurse at a Time.
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto">
                      Join one of the leading nursing colleges in the region,
                      offering industry-recognized programs like B.Sc Nursing,
                      GNM, and Post Basic B.Sc.
                    </p>
                    
                    {/* Mobile tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
                      <span className="px-3 py-1.5 border border-gray-300 rounded-full text-xs text-gray-700 bg-white/50 backdrop-blur-sm">
                        B.Sc Nursing
                      </span>
                      <span className="px-3 py-1.5 border border-gray-300 rounded-full text-xs text-gray-700 bg-white/50 backdrop-blur-sm">
                        Clinical Training
                      </span>
                      <span className="px-3 py-1.5 border border-gray-300 rounded-full text-xs text-gray-700 bg-white/50 backdrop-blur-sm">
                        NCLEX Prep
                      </span>
                    </div>
                    
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium inline-flex items-center space-x-2">
                      <span className="text-white">APPLY NOW</span>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    </Button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex justify-between items-end px-[4rem]">
                  {/* Left Content */}
                  <div className="hero-content pl-6 lg:pl-8 lg:max-w-xl text-left self-end pointer-events-auto">
                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light text-black leading-tight mb-6">
                      Transforming Healthcare,
                      <br />
                      One Nurse at a Time.
                    </h1>
                    <p className="text-gray-600 text-lg lg:text-xl mb-8 max-w-lg">
                      Join one of the leading nursing colleges in the region,
                      offering industry-recognized programs like B.Sc Nursing,
                      GNM, and Post Basic B.Sc. Experience clinical excellence,
                      expert faculty, and state-of-the-art labs that prepare you
                      for real-world healthcare.
                    </p>
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg font-medium inline-flex items-center space-x-2">
                      <span className="text-white">APPLY NOW</span>
                      <ArrowUpRight className="w-5 h-5 text-orange-400" />
                    </Button>
                  </div>

                  {/* Right Content - Desktop Only */}
                  <div className="hero-content hidden lg:block self-end pr-6 lg:pr-8 lg:max-w-sm pointer-events-auto">
                    <div className="space-y-6">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Gain hands-on experience with clinical placements,
                        NCLEX-focused preparation, and a student-first learning
                        environment.
                        <span className="text-black font-medium">
                          {" "}
                          Your future in nursing starts with the right
                          foundation — and we're here to build it with you.
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          B.Sc Nursing
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          Clinical Training
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          NCLEX Prep
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/50 backdrop-blur-sm">
                          Career Support
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
    </>
  );
}
