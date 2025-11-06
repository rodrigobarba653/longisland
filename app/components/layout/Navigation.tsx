"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";

interface NavigationProps {
  items?: { label: string; href: string }[];
}

export default function Navigation({ items }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate offcanvas menu
  useEffect(() => {
    if (isOpen) {
      gsap.to("#offcanvas", {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to("#offcanvas-overlay", {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });
    } else {
      gsap.to("#offcanvas", {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to("#offcanvas-overlay", {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-full max-w-7xl px-6 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div
          className={`transition-all duration-300 rounded-full px-8 ${
            scrolled
              ? "bg-white/70 backdrop-blur-xl shadow-lg"
              : "bg-white/40 backdrop-blur-md"
          }`}
          style={{
            border: scrolled ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
          }}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="#"
                className="text-2xl font-bold text-black hover:text-gray-700 transition-colors"
              >
                LongIsland
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {items?.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-label="Open menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className="block h-0.5 w-full bg-black transition-all" />
                <span className="block h-0.5 w-full bg-black transition-all" />
                <span className="block h-0.5 w-4 bg-black transition-all ml-auto" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Overlay */}
      <div
        id="offcanvas-overlay"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 pointer-events-none opacity-0"
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Offcanvas Menu */}
      <div
        id="offcanvas"
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white/90 backdrop-blur-2xl z-70 shadow-2xl transform translate-x-full"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-label="Close menu"
            >
              <div className="w-6 h-6 relative">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-black transform -translate-y-1/2 rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-black transform -translate-y-1/2 -rotate-45" />
              </div>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-8 py-8">
            <ul className="space-y-6">
              {items?.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-bold text-black hover:text-gray-600 transition-colors uppercase tracking-wide"
                    style={{
                      animation: isOpen
                        ? `slideIn 0.4s ease-out ${index * 0.1}s both`
                        : "none",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
