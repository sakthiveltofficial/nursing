'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Button({ type = 'button', onClick, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isHovered) {
        // Fade out text to top
        gsap.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.inOut',
        });
        // Fade in icon from bottom
        gsap.to(iconRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.out',
        });
      } else {
        // Fade in text from top
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
        // Fade out icon to bottom
        gsap.to(iconRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    });

    return () => ctx.revert();
  }, [isHovered]);

  return (
    <div className="relative inline-block">
      {/* Glow shadow outside the button */}
      <div className="absolute inset-0 w-full h-full bg-[#b1255a] blur-[10px] opacity-20 rounded-full scale-110"></div>
      
      <button
        type={type}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative inline-flex items-center justify-center px-[6px] py-[6px] bg-white text-pink-500 font-medium rounded-full border-2 border-pink-200 transition-all duration-300 hover:scale-105 z-10 ${className}`}
      >
                 <span ref={textRef} className="flex items-center bg-gradient-to-r from-[#b1255a] to-[#f17893] text-white rounded-full py-[10px] px-[16px] font-medium text-center">
           Contact Admissions Team
         </span>
        <div 
          ref={iconRef} 
          className="absolute inset-0 flex items-center justify-center opacity-0 text-pink-500 text-xl" 
        >
          <FaPhoneAlt />
        </div>
      </button>
    </div>
  );
} 