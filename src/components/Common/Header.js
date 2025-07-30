"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const menuRef = useRef(null)
  const overlayRef = useRef(null)
  const menuItemsRef = useRef([])

  const menuItems = [
    { name: "Home", span: 1 },
    { name: "About Us", span: 1 },
    { name: "Admissions/ Academies", span: 1 },
    { name: "Facilities", span: 1 },
    { name: "Gallery", span: 1 },
    { name: "Contact us", span: 1},
  ]

  useEffect(() => {
    const menu = menuRef.current
    const overlay = overlayRef.current
    const items = menuItemsRef.current

    if (!menu || !overlay) return

    if (isOpen) {
      // Show overlay first
      gsap.set(overlay, { display: "flex", opacity: 0 })

      // Fade in overlay
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
      })

      // Set initial state for menu
      gsap.set(menu, {
        x: -400,
        y: -400,
        scale: 0.5,
        rotation: -15,
        opacity: 0,
      })

      // Animate menu from top-left corner
      gsap.to(menu, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })

      // Set initial state for items
      gsap.set(items, {
        opacity: 0,
        y: 30,
        scale: 0.8,
      })

      // Stagger animate menu items
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: "power2.out",
      })
    } else {
      // Animate menu to bottom-right corner
      gsap.to(menu, {
        x: 400,
        y: 400,
        scale: 0.5,
        rotation: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      })

      // Fade out overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          gsap.set(overlay, { display: "none" })
        },
      })
    }
  }, [isOpen])

  const handleMenuItemClick = (itemName) => {
    setCurrentPage(itemName)
    setIsOpen(false)
    
    // Navigate to different pages based on menu item
    switch (itemName) {
      case "Home":
        window.location.href = "/"
        break
      case "About Us":
        window.location.href = "/about"
        break
      case "Admissions/ Academies":
        window.location.href = "/admissions"
        break
      case "Facilities":
        window.location.href = "/facilities"
        break
      case "Gallery":
        window.location.href = "/gallery"
        break
      case "Contact us":
        window.location.href = "/contact"
        break
      default:
        break
    }
  }

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen)
  }

  // Add hover state for menu cards
  const [hoveredCard, setHoveredCard] = useState(null)
  const dotsRefs = useRef([])
  const cardRefs = useRef([])
  const circleRefs = useRef([])

  const handleCardHover = (index, event) => {
    setHoveredCard(index)
    
    // Get card element and circle element
    const cardElement = cardRefs.current[index]
    const circleElement = circleRefs.current[index]
    
    // Ensure elements exist and are valid
    if (!cardElement || !circleElement) {
      console.warn('Card or circle element not found for index:', index)
      return
    }
    
    try {
      // Get card dimensions and position
      const rect = cardElement.getBoundingClientRect()
      const cardWidth = rect.width
      const cardHeight = rect.height
      
      // Get mouse position relative to card
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      
      // Calculate center of card
      const centerX = cardWidth / 2
      const centerY = cardHeight / 2
      
      // Determine entry direction based on mouse position
      let startX, startY
      
      // Check which edge the mouse is closest to
      const distanceToTop = mouseY
      const distanceToBottom = cardHeight - mouseY
      const distanceToLeft = mouseX
      const distanceToRight = cardWidth - mouseX
      
      // Find the closest edge
      const minDistance = Math.min(distanceToTop, distanceToBottom, distanceToLeft, distanceToRight)
      
      if (minDistance === distanceToTop) {
        // Mouse entered from top
        startX = mouseX
        startY = 0
      } else if (minDistance === distanceToBottom) {
        // Mouse entered from bottom
        startX = mouseX
        startY = cardHeight
      } else if (minDistance === distanceToLeft) {
        // Mouse entered from left
        startX = 0
        startY = mouseY
      } else {
        // Mouse entered from right
        startX = cardWidth
        startY = mouseY
      }
      
      // Set initial position and scale
      gsap.set(circleElement, {
        x: startX,
        y: startY,
        scale: 0,
        opacity: 1
      })
      
      // Calculate final scale to cover the entire card with more noticeable effect
      const finalScale = Math.max(cardWidth, cardHeight) / 25
      
      // Animate circle to fill the card with smoother easing and more noticeable effect
      gsap.to(circleElement, {
        x: centerX,
        y: centerY,
        scale: finalScale,
        duration: 1.2,
        ease: "power2.out"
      })
    } catch (error) {
      console.error('Error in handleCardHover:', error)
    }
    
    // Animate dots to corner position
    const dotsElement = dotsRefs.current[index]
    if (dotsElement) {
      gsap.to(dotsElement, {
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        left: "auto",
        duration: 0.8,
        ease: "power2.out"
      })
    }
  }

  const handleCardLeave = (index) => {
    // Animate circle out with more noticeable effect
    const circleElement = circleRefs.current[index]
    if (circleElement) {
      gsap.to(circleElement, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      })
    }
    
    // Animate dots back to text position
    dotsRefs.current.forEach((dotsElement, i) => {
      if (dotsElement && hoveredCard === i) {
        gsap.to(dotsElement, {
          position: "static",
          top: "auto",
          right: "auto",
          left: "auto",
          duration: 0.8,
          ease: "power2.out"
        })
      }
    })
    setHoveredCard(null)
  }

  return (
    <>
      {/* Hamburger Menu with Hover and Click */}
      <div className="fixed top-6 right-6 z-50">
        {/* Hamburger Menu with Hover */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleHamburgerClick}
        >
            {/* Container for all elements */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Background that appears on hover */}
              <div
                className={`absolute inset-0 rounded-lg transition-all duration-500 ease-in-out ${
                  isHovered ? "opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"
                }`}
              ></div>

              {/* Box 1: Top-left */}
              <div
                className={`absolute bg-[#FFAABD] transition-all duration-500 ease-in-out ${
                  isHovered
                    ? "w-3 h-3 top-2 left-2 rounded-full"
                    : "w-4 h-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[-10px] translate-y-[-10px] rounded-sm"
                }`}
              ></div>

              {/* Box 2: Top-right */}
              <div
                className={`absolute transition-all duration-500 ease-in-out ${
                  isHovered
                    ? "w-3 h-3 top-2 right-2 bg-white rounded-sm"
                    : "w-4 h-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[10px] translate-y-[-10px] bg-[#FFAABD] rounded-sm"
                }`}
              ></div>

              {/* Box 3: Bottom-left */}
              <div
                className={`absolute transition-all duration-500 ease-in-out ${
                  isHovered
                    ? "w-3 h-3 bottom-2 left-2 bg-white rounded-sm"
                    : "w-4 h-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[-10px] translate-y-[10px] bg-[#FFAABD] rounded-sm"
                }`}
              ></div>

              {/* Box 4: Bottom-right */}
              <div
                className={`absolute bg-[#FFAABD] transition-all duration-500 ease-in-out ${
                  isHovered
                    ? "w-3 h-3 bottom-2 right-2 rounded-full"
                    : "w-4 h-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[10px] translate-y-[10px] rounded-sm"
                }`}
              ></div>

              {/* Menu text - appears centered when boxes spread */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out delay-200 z-10 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <span className="text-[#FFAABD] text-sm font-medium">Menu</span>
              </div>
            </div>
          </div>
        </div>

      {/* Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
        style={{ display: "none" }}
        onClick={() => {
          setIsOpen(false)
        }}
      >
        {/* Menu Container */}
        <div
          ref={menuRef}
          className="sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8  w-[calc(100vw-1rem)] max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto max-h-[calc(100vh-2rem)] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px]">
            {menuItems.map((item, index) => {
              const isActive = currentPage === item.name
              const isTwoColumn = item.span === 2
              const isHovered = hoveredCard === index

              return (
                <div
                  key={item.name}
                  ref={(el) => {
                    if (el) menuItemsRef.current[index] = el
                    if (el) cardRefs.current[index] = el
                  }}
                  className={`
                    relative rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden
                    ${isTwoColumn ? "sm:col-span-2 md:col-span-2" : "sm:col-span-1 md:col-span-1"}
                    ${isActive ? "bg-[#fec8de] text-gray-800 shadow-lg scale-105" : hoveredCard === index ? "bg-[#2f0014] text-white scale-105 shadow-lg" : "bg-[#2f0014] text-white"}
                  `}
                  onClick={() => handleMenuItemClick(item.name)}
                  onMouseEnter={(e) => handleCardHover(index, e)}
                  onMouseLeave={() => handleCardLeave(index)}
                >
                  {/* Pink Circle Hover Effect */}
                  <div
                    ref={(el) => {
                      if (el) circleRefs.current[index] = el
                    }}
                    className="absolute w-[150px] h-[150px] bg-[#fec8de] rounded-full pointer-events-none opacity-0"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1
                    }}
                  />
                  
                  {/* Fallback hover effect for reliability */}
                  <div 
                    className={`absolute inset-0 bg-[#fec8de] opacity-0 transition-opacity duration-300 pointer-events-none ${
                      hoveredCard === index ? 'opacity-100' : ''
                    }`}
                    style={{ zIndex: 0 }}
                  />
                  
                  {/* Menu Item Text with Dots */}
                  <div className="flex items-end h-full relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3 relative">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold leading-tight break-words">{item.name}</h3>
                      
                      {/* Decorative Dot Grid - Next to text in normal state, moves to corner on hover */}
                      <div 
                        ref={(el) => {
                          if (el) dotsRefs.current[index] = el
                        }}
                        className="inline-block"
                      >
                        <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full transition-all duration-300 ${
                                isActive || isHovered 
                                  ? "bg-[#FFAABD] opacity-100" 
                                  : "bg-[#FFAABD] opacity-60"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
} 