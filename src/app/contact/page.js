import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Button from '@/components/Button';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header Section */}
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center lg:items-center justify-between px-10 sm:px-10 md:px-8 lg:px-20 pt-16 sm:pt-20 md:pt-16 lg:pt-32 pb-16 sm:pb-20 md:pb-32 lg:pb-52 gap-8 lg:gap-0">
        <div className="w-full lg:w-auto text-center lg:text-left">
          <h1 className="text-2xl  md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[85px] font-bold !text-[#FB7185] leading-[1.1] tracking-tight">
            Get in touch with us.<br />
            We're here to assist you.
          </h1>
        </div>

        {/* Social Icons - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex flex-col gap-6">
          <IconCircle icon={<FaFacebookF />} />
          <IconCircle icon={<FaInstagram />} />
          <IconCircle icon={<FaTwitter />} />
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-[1400px] w-full px-4 sm:px-6 md:px-8 lg:px-20 pb-12 sm:pb-16 md:pb-20">
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <label htmlFor="name" className="block text-base sm:text-lg md:text-[20px] text-black mb-2 sm:mb-3">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border-b-2 border-gray-200 text-base sm:text-lg md:text-xl focus:outline-none focus:border-[#FB7185] bg-transparent font-normal py-2 sm:py-3"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base sm:text-lg md:text-[20px] text-black mb-2 sm:mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full border-b-2 border-gray-200 text-base sm:text-lg md:text-xl focus:outline-none focus:border-[#FB7185] bg-transparent font-normal py-2 sm:py-3"
                placeholder="Enter your email address"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label htmlFor="phone" className="block text-base sm:text-lg md:text-[20px] text-black mb-2 sm:mb-3">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full border-b-2 border-gray-200 text-base sm:text-lg md:text-xl focus:outline-none focus:border-[#FB7185] bg-transparent font-normal py-2 sm:py-3"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-base sm:text-lg md:text-[20px] text-black mb-2 sm:mb-3">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full border-b-2 border-gray-200 text-base sm:text-lg md:text-xl focus:outline-none focus:border-[#FB7185] bg-transparent font-normal resize-y pt-2 pb-1 sm:pt-3 sm:pb-1 min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
              placeholder="Tell us how we can help you..."
            ></textarea>
          </div>

          {/* Button and Social Icons Container */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Button */}
            <div className="pt-4 sm:pt-6 md:pt-8">
              <Button type="submit" />
            </div>
            
            {/* Social Icons - Visible on mobile, hidden on desktop */}
            <div className="lg:hidden flex flex-row gap-4 pt-4 sm:pt-6 md:pt-8">
              <IconCircle icon={<FaFacebookF />} />
              <IconCircle icon={<FaInstagram />} />
              <IconCircle icon={<FaTwitter />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconCircle({ icon }) {
  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-pink-100 hover:border-pink-300 hover:text-pink-600 transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-lg">
      {icon}
    </div>
  );
} 