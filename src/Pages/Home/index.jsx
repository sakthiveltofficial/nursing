"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, useProgress } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleMorphing from "@/components/ParticleMorphing/page";
// import LoadingScreen from "@/components/LoadingScreen";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
// import Lenis from '@studio-freight/lenis'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Progress tracker component inside Canvas
function ProgressTracker({ setProgress }) {
  const { progress } = useProgress()
  
  useEffect(() => {
    setProgress(progress)
  }, [progress, setProgress])
  
  return null
}

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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
      // Update ScrollTrigger without causing refresh loops
      ScrollTrigger.update();
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
          // Recalculate bounds without triggering recursive refresh
          if (particleMorphingRef.current && window.innerWidth <= 1024) {
            // Force a gentle update to the morph progress
            particleMorphingRef.current.updateMorphProgress(morphProgress.current);
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
            // Update ScrollTrigger positions without refresh
            ScrollTrigger.update();
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
                <ProgressTracker setProgress={setLoadingProgress} />
                <ambientLight intensity={0.6} color="#ffffff" />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={0.4}
                  color="#ffffff"
                />
                <fog attach="fog" args={["#FEC8DE", 12, 20]} />
                <Float>
                  <ParticleMorphing ref={particleMorphingRef} />
                </Float>
              </Suspense>
            </Canvas>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 h-full flex flex-col pointer-events-none">

            {/* Main Content */}
            <main className="flex-1 flex items-end pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-16">
              <div className="w-full">
                {/* Mobile & Small Tablet Layout */}
                <div className="block md:hidden px-4 sm:px-6">
                  <div className="hero-content text-center pointer-events-auto">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl font-medium text-black leading-[1.15] mb-4 sm:mb-6 tracking-tight">
                      Start Your Journey in Nursing
                      <br />
                      <span className="text-pink-600">With Confidence</span>
                    </h1>
                    <p className="text-gray-600 text-sm xs:text-base sm:text-lg mb-6 sm:mb-8 max-w-sm xs:max-w-md mx-auto leading-relaxed">
                      Accredited programs designed to equip you with real-world clinical experience and lifelong skills in patient care.
                    </p>
                    
                    {/* Mobile tags - Grid layout for better mobile experience */}
                    <div className="grid grid-cols-2 gap-2 mb-6 sm:mb-8 max-w-xs mx-auto">
                      <span className="px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-700 bg-white/80 backdrop-blur-sm text-center font-medium">
                        B.Sc Nursing
                      </span>
                      <span className="px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-700 bg-white/80 backdrop-blur-sm text-center font-medium">
                        Post Basic B.Sc
                      </span>
                      <span className="px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-700 bg-white/80 backdrop-blur-sm text-center font-medium">
                        GNM
                      </span>
                      <span className="px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-700 bg-white/80 backdrop-blur-sm text-center font-medium">
                        Clinical Training
                      </span>
                    </div>
                    
                    <Button className="bg-black text-white hover:bg-gray-800 active:bg-gray-900 rounded-2xl px-8 py-4 text-base font-semibold inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95">
                      <span className="text-white">APPLY NOW</span>
                      <ArrowUpRight className="w-5 h-5 text-orange-400" />
                    </Button>
                  </div>
                </div>

                {/* Medium Tablet Layout */}
                <div className="hidden md:block lg:hidden px-6 md:px-8">
                  <div className="hero-content text-center pointer-events-auto max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6 tracking-tight">
                      Start Your Journey in Nursing
                      <br />
                      With Confidence
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
                      Step into the future of healthcare with AJK College of Nursing. Our programs blend
                      theory, hands-on clinical training, and personal growth.
                    </p>
                    
                    {/* Tablet tags - Single row layout */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-lg mx-auto">
                      <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/80 backdrop-blur-sm font-medium">
                        B.Sc Nursing
                      </span>
                      <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/80 backdrop-blur-sm font-medium">
                        Post Basic B.Sc
                      </span>
                      <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/80 backdrop-blur-sm font-medium">
                        GNM
                      </span>
                      <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white/80 backdrop-blur-sm font-medium">
                        Clinical Training
                      </span>
                    </div>
                    
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200">
                      <span className="text-white">APPLY NOW</span>
                      <ArrowUpRight className="w-5 h-5 text-orange-400" />
                    </Button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex justify-between items-end px-6 lg:px-12 xl:px-16 2xl:px-20">
                  {/* Left Content */}
                  <div className="hero-content pl-4 lg:pl-6 xl:pl-8 lg:max-w-xl xl:max-w-2xl text-left self-end pointer-events-auto">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-black leading-tight mb-6 tracking-tight">
                      Start Your Journey in Nursing
                      <br />
                      With Confidence
                    </h1>
                    <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-8 max-w-lg xl:max-w-xl leading-relaxed">
                      Step into the future of healthcare with AJK College of Nursing. Our programs blend
                      theory, hands-on clinical training, and personal growth. Learn from experienced faculty and graduate
                      ready for global opportunities in nursing.
                    </p>
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 lg:px-10 lg:py-4 text-lg lg:text-xl font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200">
                      <span className="text-white">APPLY NOW</span>
                      <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-orange-400" />
                    </Button>
                  </div>

                  {/* Right Content - Desktop Only */}
                  <div className="hero-content self-end pr-4 lg:pr-6 xl:pr-8 lg:max-w-sm xl:max-w-md pointer-events-auto">
                    <div className="space-y-6 lg:space-y-8">
                      <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                        From foundational courses to advanced clinical rotations, we prepare you to lead with compassion
                        and care. Our labs, training hospitals, and personalized academic support ensure you're career-ready.
                        <span className="text-black font-medium">
                          {" "}
                          Discover a future where your passion for helping others becomes a profession.
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm lg:text-base text-gray-700 bg-white/50 backdrop-blur-sm font-medium">
                          B.Sc Nursing
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm lg:text-base text-gray-700 bg-white/50 backdrop-blur-sm font-medium">
                          Post Basic B.Sc
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm lg:text-base text-gray-700 bg-white/50 backdrop-blur-sm font-medium">
                          GNM
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm lg:text-base text-gray-700 bg-white/50 backdrop-blur-sm font-medium">
                          Clinical Rotations
                        </span>
                        <span className="px-4 py-2 border border-gray-300 rounded-full text-sm lg:text-base text-gray-700 bg-white/50 backdrop-blur-sm font-medium">
                          Placement Support
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

      {/* Loading Screen Overlay */}
      {!isLoaded && (
        <LoadingScreen 
          progress={loadingProgress} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}
    </>
  );
}
