'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const features = [
  // Row 1 - moves right to left
  [
     { text: "", color: "bg-[#FFAABD26]" },
     { text: "", color: "bg-[#FFAABD26]" },
     { text: "", color: "bg-[#FFAABD26]" },
     { text: "", color: "bg-[#FFAABD26]" },
     { text: "", color: "bg-[#FFAABD26]" },
     { text: "", color: "bg-[#FFAABD26]" },
     { text: "", color: "bg-[#FFAABD26]" },
  ],
  // Row 2 - moves left to right
  [
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
  ],
  // Row 3 - moves right to left
  [
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
    { text: "", color: "bg-[#F5F5F5]" },
  ],
];

export default function AboutSection() {
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const cell1Ref = useRef(null);
  const missionSectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);


  




  // 
  useEffect(() => {
    // Split the heading text into individual characters and animate them
    const heading = headingRef.current;
    if (heading) {
      // Store the original HTML structure to preserve colors
      const originalHTML = heading.innerHTML;
      
      // Create a temporary div to parse the HTML and extract text with color info
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = originalHTML;
      
      // Function to recursively process text nodes and preserve colors
      const processNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || '';
          const characters = text.split('');
          const parentColor = node.parentElement?.className || '';
          
          return characters.map((char) => 
            char === ' ' ? ' ' : `<span class="opacity-0 ${parentColor}">${char}</span>`
          ).join('');
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const colorClass = node.className || '';
          const innerHTML = Array.from(node.childNodes).map(child => processNode(child)).join('');
          return `<span class="${colorClass}">${innerHTML}</span>`;
        }
        return '';
      };
      
      // Process the heading content
      const processedHTML = Array.from(tempDiv.childNodes).map(child => processNode(child)).join('');
      heading.innerHTML = processedHTML;
      
      const spans = heading.querySelectorAll('span[class*="opacity-0"]');
      
      gsap.to(spans, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.5
      });
    }

    // Scroll trigger animation for the image
    const image = imageRef.current;
    if (image) {
      // Set initial position (400px from top)
      gsap.set(image, {
        y: -500,
        opacity: 0
      });

      // Create scroll trigger animation
      gsap.to(image, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Cell 1 travel animation to mission section
    const cell1 = cell1Ref.current;
    const missionSection = missionSectionRef.current;
    
    if (cell1 && missionSection) {
      // Create a timeline for the cell travel animation
      const cellTravelTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: missionSection,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      });

      // Add the travel animation to the timeline
      cellTravelTimeline.to(cell1, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: 1000,
        scale: 1.5,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Add a reverse animation when scrolling back up
      cellTravelTimeline.to(cell1, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        zIndex: 3,
        duration: 1,
        ease: "power2.inOut"
      }, 1);
    }
  }, []);

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[300px] md:h-screen bg-center bg-no-repeat flex items-center justify-start hero-section"
        style={{
          backgroundImage: "url('/images/normal.svg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          opacity: 1
        }}
      >
        {/* Centered Content */}
        <div className=" z-10 text-left px-4 md:px-8 lg:px-16 md:w-[90%] mx-auto  ">
          <h2 
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl !font-semibold !leading-snug"
          >
            <span className="!text-[#2F0014]">Shape Your Future in Healthcare at</span> <br/>
            <span className="!text-[#FB7185]">AJK Nursing  College</span> <br/>
    
          </h2>
        </div>
      </div>


     


            {/* About AJK College Section */}
         <div className="relative pb-16 md:pb-30 px-4 md:px-12 overflow-hidden">
          {/* DNA Video - right side background with purple overlay */}
          <div className="hidden md:block absolute -top-20 -right-20 h-full w-[30%] z-0 pt-20">
            <video
              className="h-full w-full opacity-40 scale-x-[-1]"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/dna.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            {/* Purple overlay to create the blurred DNA helix effect */}
            
          </div>

          {/* Content Card - Full Width */}
          <div className="relative z-10 max-w-7xl mx-auto min-h-[300px]">
          <div
              className="shadow-lg rounded-xl p-6 w-full bg-gradient-to-r"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFAABD70, transparent)',
              }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-[#2F0014] mb-4 md:mb-6">
                About AJK College of Nursing
              </h2>
              <p className="text-gray-800 mb-4 text-sm md:text-base lg:text-lg">
                AJK College of Nursing, established in 2021 under the AJK Educational and Charitable Trust, is a premier co-educational institution dedicated to excellence in nursing education.
              </p>
              <p className="text-gray-800 text-sm md:text-base lg:text-lg">
                Affiliated to The Tamil Nadu Dr.M.G.R. Medical University, Chennai, and recognized by the Tamil Nadu Nurses and Midwives Council (TNNMC) Chennai, as well as the Indian Nursing Council (INC) New Delhi, our college stands as a beacon of quality and integrity in nursing education.
              </p>
            </div>

          </div>
        </div>

      

      {/* State-of-the-Art Infrastructure Section */}
      <div className="relative w-full min-h-[600px] md:min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-white py-4 md:py-20">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none pl-12">
        <Image
            src="/images/state.webp"
            alt="Background"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>

        {/* Heading */}
        <h2 className="relative z-10 text-3xl md:text-5xl lg:text-7xl font-light !text-[#9A8C92] text-center w-full max-w-6xl px-4 pt-0 !pb-4 pbmd:pt-0 mb-8 md:mb-0">
          State-of-the-Art Infrastructure
        </h2>
 
        {/* 2-column layout */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-between px-4 md:px-8 mt-4 md:mt-12">
          {/* Left column: Rotating images on oval path */}
          <div className="relative flex-1 flex items-center justify-center min-h-[250px] md:min-h-[350px] lg:min-h-[420px] h-full w-full md:w-auto mb-8 md:mb-0">
            <div className="relative w-[200px] h-[220px] md:w-[280px] md:h-[300px] lg:w-[520px] lg:h-[400px] -top-20">
              {/* 3 images, each with its own oval animation */}
              <div className="absolute top-1/2 left-1/2 oval-anim oval-1" ref={cell1Ref}>
                <Image src="/images/mission.webp" alt="Cell 1" id='#cookie' width={100} height={100} className="rounded-full transition-all duration-500 w-[100px] h-[100px] md:w-[140px] md:h-[140px]" />
              </div>
              <div className="absolute top-1/2 left-1/2 oval-anim oval-2">
                <Image src="/images/mission.webp" alt="Cell 2" width={70} height={70} className="rounded-full transition-all duration-500 w-[70px] h-[70px] md:w-[100px] md:h-[100px]" />
              </div>
              <div className="absolute top-1/2 left-1/2 oval-anim oval-3">
                <Image src="/images/mission.webp" alt="Cell 3" width={50} height={50} className="rounded-full transition-all duration-500 w-[50px] h-[50px] md:w-[70px] md:h-[70px]" />
              </div>
            </div>
          </div>
          {/* Right column: Text */}
          <div className="flex-1 flex flex-col justify-center items-start md:pl-8 lg:pl-16 max-w-xl">
            <p className="text-sm md:text-base lg:text-lg text-gray-800 mb-4">
              Nestled on a sprawling four-acre eco-friendly campus along the Coimbatore-Palakkad main road in Navakkarai, AJK College of Nursing boasts state-of-the-art infrastructure.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-800">
              Our facilities are designed to provide a conducive learning environment, ensuring that students have access to the best resources and technology. The campus is equipped with modern classrooms, advanced laboratories, and comprehensive library to support the academic and practical needs of our nursing students.
            </p>
          </div>
        </div>

        {/* Animations and oval path */}
      </div>

      {/* Mission and Vision Section */}
      <div className="w-full bg-gradient-to-br">
        <div className="container mx-auto px-4 md:px-6">
          {/* Center rotating image */}
          <div className="flex justify-center -mb-16 md:-mb-20">

              <div className="relative flex justify-center items-start z-50" ref={imageRef}>
                {/* White Background Circle - perfectly centered */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[150px] md:w-[215px] md:h-[215px] rounded-full bg-white z-0 " />
              
                {/* Spinning Image - also centered */}
                <Image
                  src="/images/mission.webp"
                  alt="Healthcare Cell Structure"
                  width={200}
                  height={200}
                  className="animate-spin-slow rounded-full w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] relative z-10"
                  style={{
      animation: "spin 20s linear infinite",
                  }}
                />
              </div>
          </div>

          {/* Mission and Vision content boxes */}
          <div className=" relative top-28 md:top-0 grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto rounded-tr-lg"> 
            {/* Mission Box */}
            <div className=" bg-pink-100/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-pink-200/50 inverted-radius-right shadow-xl">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Mission</h2>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                The institution is committed to providing high-quality education to nursing students and equipping them to
                work effectively at all entry points of practice
              </p>
            </div>

            {/* Vision Box */}
            <div className="bg-pink-100/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-pink-200/50 inverted-radius-left">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Vision</h2>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                Aspire to be a centre of excellence in nursing education and prepare nurses who will be an epitome of
                nursing, providing holistic care at various health care setting universally
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}

      <div className="top-20 md:top-0  py-12 md:py-16 px-0 !pt-20 relative w-full mb-20 md:mb-0">
        {/* Main Heading */}
        <div className="text-center mb-12 md:mb-16 w-full">
          <h1 className="text-2xl md:text-4xl lg:text-6xl !text-[#9A8C92] font-light leading-tight w-full max-w-none px-4">
           Enroll in one of Tamil Nadu's <br/>
           most trusted nursing colleges<span/>
          </h1>
        </div>

        {/* Marquee Rows */}
        <div className="space-y-3 md:space-y-4 relative w-full ">
          {features.map((row, rowIndex) => (
            <div key={rowIndex} className="overflow-hidden w-full">
              <div
                className={`flex gap-4 md:gap-6 ${rowIndex === 1 ? "marquee-left" : "marquee-right"} w-full`}
                style={{ width: "max-content" }}
              >
                {/* Duplicate the row for seamless animation */}
                {[...row, ...row].map((feature, index) => (
                  <div
                    key={index}
                    className={`${feature.color} rounded-l shadow-sm flex-shrink-0 flex items-center justify-center`}
                    style={{
                      minWidth: "300px",
                      width: "300px",
                      height: "80px",
                      maxHeight: "80px",
                    }}
                  >
                    <span className="text-gray-800 font-medium text-sm md:text-lg whitespace-nowrap">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Static Center 3 Cards Overlay */}
          <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center pointer-events-none select-none z-10 px-4 items-center">
            <div className="bg-rose-400 rounded-l shadow-lg text-center flex items-center justify-center"
              style={{ minWidth: "300px", width: "300px", height: "80px", maxHeight: "80px" }}>
              <span className="text-sm md:text-xl font-medium text-[#3a001a]">Modern Campus</span>
            </div>
            <div className="bg-white rounded-l shadow-lg text-center flex items-center justify-center"
              style={{ minWidth: "300px", width: "300px", height: "80px", maxHeight: "80px" }}>
              <span className="text-sm md:text-xl font-medium text-[#3a001a]">Clinical Training</span>
            </div>
            <div className="bg-rose-100 rounded-l shadow-lg text-center flex items-center justify-center"
              style={{ minWidth: "300px", width: "300px", height: "80px", maxHeight: "80px" }}>
              <span className="text-sm md:text-xl font-medium text-[#3a001a]">100% Placement Assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consolidated Styles */}
      <style jsx>{`
        /* Responsive background sizing for mobile */
        @media (max-width: 768px) {
          .hero-section {
            background-size: 80% auto !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            background-size: 60% auto !important;
          }
        }
        
        @keyframes oval1 {
          0%   { transform: translate(-50%, -50%) scale(1.2) translateX(90px) translateY(0px); z-index: 3; filter: blur(0); }
          33%  { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(50px); z-index: 2; filter: blur(2px); }
          66%  { transform: translate(-50%, -50%) scale(0.7) translateX(-90px) translateY(0px); z-index: 1; filter: blur(6px); }
          100% { transform: translate(-50%, -50%) scale(1.2) translateX(90px) translateY(0px); z-index: 3; filter: blur(0); }
        }
        @keyframes oval2 {
          0%   { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(50px); z-index: 2; filter: blur(2px); }
          33%  { transform: translate(-50%, -50%) scale(0.7) translateX(-90px) translateY(0px); z-index: 1; filter: blur(6px); }
          66%  { transform: translate(-50%, -50%) scale(1.2) translateX(90px) translateY(0px); z-index: 3; filter: blur(0); }
          100% { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(50px); z-index: 2; filter: blur(2px); }
        }
        @keyframes oval3 {
          0%   { transform: translate(-50%, -50%) scale(0.7) translateX(-90px) translateY(0px); z-index: 1; filter: blur(6px); }
          33%  { transform: translate(-50%, -50%) scale(1.2) translateX(90px) translateY(0px); z-index: 3; filter: blur(0); }
          66%  { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(50px); z-index: 2; filter: blur(2px); }
          100% { transform: translate(-50%, -50%) scale(0.7) translateX(-90px) translateY(0px); z-index: 1; filter: blur(6px); }
        }
        .oval-anim {
          will-change: transform, filter;
        }
        .oval-1 {
          animation: oval1 6s linear infinite;
          z-index: 3;
        }
        .oval-2 {
          animation: oval2 6s linear infinite;
          z-index: 2;
        }
        .oval-3 {
          animation: oval3 6s linear infinite;
          z-index: 1;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @media (min-width: 768px) {
          @keyframes oval1 {
            0%   { transform: translate(-50%, -50%) scale(1.2) translateX(180px) translateY(0px); z-index: 3; filter: blur(0); }
            33%  { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(100px); z-index: 2; filter: blur(2px); }
            66%  { transform: translate(-50%, -50%) scale(0.7) translateX(-180px) translateY(0px); z-index: 1; filter: blur(6px); }
            100% { transform: translate(-50%, -50%) scale(1.2) translateX(180px) translateY(0px); z-index: 3; filter: blur(0); }
          }
          @keyframes oval2 {
            0%   { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(100px); z-index: 2; filter: blur(2px); }
            33%  { transform: translate(-50%, -50%) scale(0.7) translateX(-180px) translateY(0px); z-index: 1; filter: blur(6px); }
            66%  { transform: translate(-50%, -50%) scale(1.2) translateX(180px) translateY(0px); z-index: 3; filter: blur(0); }
            100% { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(100px); z-index: 2; filter: blur(2px); }
          }
          @keyframes oval3 {
            0%   { transform: translate(-50%, -50%) scale(0.7) translateX(-180px) translateY(0px); z-index: 1; filter: blur(6px); }
            33%  { transform: translate(-50%, -50%) scale(1.2) translateX(180px) translateY(0px); z-index: 3; filter: blur(0); }
            66%  { transform: translate(-50%, -50%) scale(0.9) translateX(0px) translateY(100px); z-index: 2; filter: blur(2px); }
            100% { transform: translate(-50%, -50%) scale(0.7) translateX(-180px) translateY(0px); z-index: 1; filter: blur(6px); }
          }
          .oval-1, .oval-2, .oval-3 { animation-duration: 8s; }
        }
      `}</style>

      <style jsx global>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-right {
          animation: scroll-right 25s linear infinite;
        }
        .marquee-left {
          animation: scroll-left 25s linear infinite;
        }
      `}</style>
    </section>
  );
} 