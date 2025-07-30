"use client"

import { RotateCcw, Home, Users, GraduationCap, Building, ImageIcon, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const navigationItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "About Us", icon: Users, href: "/about" },
    { name: "Admissions/ Acadamies", icon: GraduationCap, href: "/admissions" },
    { name: "Facilities", icon: Building, href: "/facilities" },
    { name: "Gallery", icon: ImageIcon, href: "/gallery" },
    { name: "Contact us", icon: Mail, href: "/contact" },
  ]

  return (
    <div className="relative p-2 sm:p-4 lg:p-8">
      {/* Section-specific background - only on home page */}
      {isHomePage && (
        <>
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
        </>
      )}

      {/* Main Container with exact rounded corners */}
             <div className={`relative z-10 w-full min-h-[50vh] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden ${isHomePage ? 'shadow-2xl' : 'bg-white'}`}>
        <div className="flex flex-col lg:flex-row min-h-full">
          {/* Left Side - Navigation with exact color #2F0014 */}
          <div className="w-full lg:w-3/5 flex flex-col relative" style={{ backgroundColor: "#2F0014" }}>
            {/* Logo Section */}
            <div className="flex-shrink-0 p-4 sm:p-8 lg:p-12">
              <Image 
                src="/logo.png" 
                alt="AJK College of Nursing" 
                width={200}
                height={80}
                className="h-16 sm:h-20 lg:h-28 w-auto object-contain"
                priority
              />
            </div>

            {/* Navigation Menu - Always visible, centered */}
            <div className="flex-1 flex items-center justify-center py-4 sm:py-6 lg:py-8">
              <nav className="space-y-2 sm:space-y-4 lg:space-y-6">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon
                  const isActive = pathname === item.href
                  return (
                    <div key={index} className="text-center group">
                      <a
                        href={item.href}
                        className="relative text-white text-sm sm:text-lg lg:text-xl font-normal block py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-500 ease-out overflow-hidden group-hover:scale-105 group-hover:shadow-2xl"
                        style={{
                          background: isActive ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 170, 189, 0.2) 100%)" : "transparent",
                          backdropFilter: isActive ? "blur(20px)" : "blur(0px)",
                          border: isActive ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 170, 189, 0.2) 100%)"
                          e.currentTarget.style.backdropFilter = "blur(20px)"
                          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)"
                          e.currentTarget.style.boxShadow =
                            "0 8px 32px rgba(255, 170, 189, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.backdropFilter = "blur(0px)"
                            e.currentTarget.style.border = "1px solid transparent"
                            e.currentTarget.style.boxShadow = "none"
                          }
                        }}
                      >
                        {/* Glowing background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-300/0 to-purple-400/0 group-hover:from-pink-400/20 group-hover:via-pink-300/30 group-hover:to-purple-400/20 transition-all duration-700 rounded-xl sm:rounded-2xl"></div>

                        {/* Icon that slides in from left */}
                        <div className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                          <IconComponent className="w-3 h-3 sm:w-5 sm:h-5 text-pink-200" />
                        </div>

                        {/* Text with slide animation */}
                        <span className="relative z-10 inline-block transform group-hover:translate-x-4 sm:group-hover:translate-x-6 transition-transform duration-500 ease-out text-white">
                          {item.name}
                        </span>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                        {/* Particle effect dots */}
                        <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-pink-300 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-pink-200 rounded-full animate-pulse delay-100"></div>
                            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                })}
              </nav>
            </div>

            {/* Address Section */}
            <div className="flex-shrink-0 p-4 sm:p-8 lg:p-12 text-white">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-white opacity-80">Address</p>
                <p className="text-sm sm:text-base lg:text-lg font-light text-white">
                  2972 Westheimer Rd. Santa Ana,
                  <br />
                  Illinois 85486
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - with padding around map section */}
          <div className="w-full lg:w-2/5 relative flex flex-col p-3 sm:p-6" style={{ backgroundColor: "#2F0014" }}>
            {/* Pink Map Section - full height */}
            <div className="flex-1 relative rounded-2xl sm:rounded-3xl overflow-hidden">
              {/* Google Maps Full Size */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.427469514332!2d76.86946907588424!3d10.855055857736698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85b09a70a6d93%3A0xf583adc977c313eb!2sAJK%20College%20of%20Nursing!5e0!3m2!1sen!2sin!4v1753753320464!5m2!1sen!2sin" 
                width="100%" 
                height="100%"
                style={{border: 0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}