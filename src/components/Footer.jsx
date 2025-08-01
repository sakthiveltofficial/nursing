"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Admissions", href: "/admissions" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ]

  return (
    <footer className="bg-[#2F0014] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Footer - Very Compact */}
        <div className="block md:hidden py-4">
          <div className="text-center space-y-3">
            {/* Logo */}
            <div>
              <Image
                src="/logo.png"
                alt="AJK College of Nursing"
                width={120}
                height={48}
                className="h-8 w-auto object-contain mx-auto"
              />
            </div>

            {/* Contact Info - Single Line */}
            <div className="flex justify-center items-center space-x-4 text-xs text-gray-300">
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>info@ajkcollege.edu</span>
              </div>
            </div>

            {/* Social Media - Small Icons */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-pink-300 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>

            {/* Copyright - Single Line */}
            <p className="text-gray-400 text-xs">© {new Date().getFullYear()} AJK College of Nursing</p>
          </div>
        </div>

        {/* Desktop Footer - Full Version */}
        <div className="hidden md:block py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="AJK College of Nursing"
                  width={160}
                  height={64}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Excellence in nursing education and healthcare training. Empowering future healthcare professionals with
                knowledge and compassion.
              </p>
              {/* Social Media */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-pink-300 transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-pink-300 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    Palakkad - Coimbatore Rd, Navakkarai, Coimbatore, Tamil Nadu 641105
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-pink-300 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">+91 123 456 7890</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-pink-300 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">info@ajkcollege.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="hidden md:block border-t border-gray-700 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AJK College of Nursing. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-pink-300 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-pink-300 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
