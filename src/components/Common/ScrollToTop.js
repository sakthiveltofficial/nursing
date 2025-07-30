'use client';

import React from 'react';

const ScrollToTop = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-50 bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <svg 
        className="w-6 h-6 text-black font-bold" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={3} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};

export default ScrollToTop; 