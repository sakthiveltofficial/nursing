// components/FooterSection.tsx
'use client';

import React from 'react';

// Logo Component
const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Graphic Element */}
      <div className="relative">
        {/* Bottom blue shape - gentle hill/wave */}
        <div className="w-8 h-6 sm:w-10 sm:h-8 md:w-12 md:h-10 bg-blue-700 rounded-b-lg transform -skew-x-12"></div>
        {/* Top green shape - overlapping hill */}
        <div className="absolute -top-1 -left-1 w-6 h-4 sm:w-8 sm:h-6 md:w-10 md:h-8 bg-green-500 rounded-b-lg transform -skew-x-12"></div>
        {/* Stars in upward-curving arc */}
        <div className="absolute -top-2 -left-1 flex space-x-1 transform -rotate-12">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-blue-500 transform rotate-45"></div>
          ))}
        </div>
      </div>
      
      {/* Text */}
      
    </div>
  );
};

const FooterSection = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-full mx-auto">
        <div className="bg-[#2f0014] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Section - Contact Info */}
          <div className="w-full lg:w-1/3 bg-[#2f0014] p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <div className="space-y-6 sm:space-y-8">
              {/* College Branding */}
              <div className="space-y-3 sm:space-y-4">
                <div className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                  AJK Nursing College
                </div>
                <div className="text-pink-200 text-sm sm:text-base md:text-lg font-light">
                  Excellence in Nursing Education
                </div>
                <div className="text-pink-200 text-xs sm:text-sm md:text-base font-light">
                  Since 2003
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4 sm:space-y-6">
                {/* Email Section */}
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-pink-200 mb-1 sm:mb-2 font-medium">
                    Email
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-white break-all">
                    hello@ajknursingcollege.com
                  </p>
                </div>
                
                {/* Location Section */}
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-pink-200 mb-1 sm:mb-2 font-medium">
                    Location
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
                    2972 Westheimer Rd. Santa Ana,<br />
                    Illinois 85486
                  </p>
                </div>
                
                {/* Phone Section */}
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-pink-200 mb-1 sm:mb-2 font-medium">
                    Phone
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-white">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Navigation */}
          <div className="w-full lg:w-2/3 bg-[#ffaabd] p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 rounded-t-xl sm:rounded-t-2xl lg:rounded-t-none lg:rounded-r-xl lg:rounded-r-2xl relative">
            <div className="h-full flex flex-col justify-between">
              {/* Navigation Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <a href="#home" className="group flex items-center space-x-2 text-[#2f0014] hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-[#2f0014] group-hover:bg-white rounded-full transition-all duration-300"></div>
                    <span className="text-sm sm:text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Home
                    </span>
                  </a>
                  <a href="#about" className="group flex items-center space-x-2 text-[#2f0014] hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-[#2f0014] group-hover:bg-white rounded-full transition-all duration-300"></div>
                    <span className="text-sm sm:text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      About us
                    </span>
                  </a>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <a href="#admissions" className="group flex items-center space-x-2 text-[#2f0014] hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-[#2f0014] group-hover:bg-white rounded-full transition-all duration-300"></div>
                    <span className="text-sm sm:text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Admissions
                    </span>
                  </a>
                  <a href="#facilities" className="group flex items-center space-x-2 text-[#2f0014] hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-[#2f0014] group-hover:bg-white rounded-full transition-all duration-300"></div>
                    <span className="text-sm sm:text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Facilities
                    </span>
                  </a>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <a href="#gallery" className="group flex items-center space-x-2 text-[#2f0014] hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-[#2f0014] group-hover:bg-white rounded-full transition-all duration-300"></div>
                    <span className="text-sm sm:text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Gallery
                    </span>
                  </a>
                  <a href="#contact" className="group flex items-center space-x-2 text-[#2f0014] hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-[#2f0014] group-hover:bg-white rounded-full transition-all duration-300"></div>
                    <span className="text-sm sm:text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Contact us
                    </span>
                  </a>
                </div>
              </div>
              
              {/* Logo Section - Between Navigation and CTA */}
              
              
              {/* Bottom Section */}
              <div className="mt-6 sm:mt-8 md:mt-10">
                {/* Scroll to Top Button - Mobile Only */}
                <div className="block sm:hidden">
                  <button
                    onClick={scrollToTop}
                    className="w-full bg-[#2f0014] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1a0010] transition-all duration-300 transform hover:scale-105"
                  >
                    Back to Top
                  </button>
                </div>
                
                {/* Desktop Call to Action */}
                <div className="hidden sm:block">
                  <div className="text-center">
                    <p className="text-[#2f0014] text-sm sm:text-base font-medium mb-2">
                      Ready to start your nursing journey?
                    </p>
                    <button className="bg-[#2f0014] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#1a0010] transition-all duration-300 transform hover:scale-105">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            © 2024 AJK Nursing College. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;