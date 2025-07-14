"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MorphingParticles from "@/Three/morphing"

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#e8e6e1] relative overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [4.5, 4, 11], fov: 35 }} style={{ background: "#e8e6e1" }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <fog attach="fog" args={["#e8e6e1", 8, 15]} />
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
              <MorphingParticles 
                modelPath="/Models/baby.glb" 
                clearColor="#e8e6e1" 
                showBackground={true}
                initialParticleColor="#000000"
                particleDensity={3} // Higher density for more precise shape
              />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay - Added pointer-events-none to allow interaction with Canvas */}
      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
        {/* Header - Re-enable pointer events */}
        <header className="flex items-center justify-between p-6 lg:px-[4rem] pointer-events-auto">
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
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#e8e6e1] border-t border-gray-300 p-6 pointer-events-auto">
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
              {/* Left Content - Re-enable pointer events */}
              <div className="pl-6 lg:pl-8 lg:max-w-xl text-left self-end pointer-events-auto">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light text-black leading-tight mb-6">
                  Design That Feels.
                  <br />
                  Experiences That Resonate.
                </h1>

                <p className="text-gray-600 text-lg lg:text-xl mb-8 max-w-lg">
                  We blend creativity, emotion, and innovation to create digital worlds that your audience can connect
                  with.
                </p>

                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg font-medium inline-flex items-center space-x-2">
                  <span className="text-white">LET'S TALK</span>
                  <ArrowUpRight className="w-5 h-5 text-orange-400" />
                </Button>
              </div>

              {/* Right Content - Desktop Only - Re-enable pointer events */}
              <div className="hidden lg:block self-end pr-6 lg:pr-8 lg:max-w-sm pointer-events-auto">
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Whether through intuitive interfaces, immersive 3D, or bold visual storytelling,
                    <span className="text-black font-medium">
                      {" "}
                      we design moments that people don't just see — they feel.
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700">UI/UX</span>
                    <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700">
                      3D VISUALIZATION
                    </span>
                    <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700">
                      DEVELOPMENT
                    </span>
                    <span className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700">•</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
