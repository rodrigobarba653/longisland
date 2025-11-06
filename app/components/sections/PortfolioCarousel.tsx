"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Button from "../ui/Button";
import { Project } from "../../data/projects";
import { createSlug } from "../../utils/slug";

interface PortfolioCarouselProps {
  items: Project[];
}

export default function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToSlide = (index: number) => {
    if (
      isAnimating ||
      index === currentIndex ||
      index < 0 ||
      index >= items.length
    ) {
      return;
    }

    setIsAnimating(true);
    const slides = containerRef.current?.querySelectorAll(".slide");
    if (!slides) return;

    slides.forEach((slide, i) => {
      const slideEl = slide as HTMLElement;
      const offset = i - index;

      let targetScale: number;
      let targetX: number;
      let targetOpacity: number;
      let zIndex: number;

      // Mobile-specific positioning
      const sideSlideScale = isMobile ? 0.6 : 0.5;
      const sideSlideX = isMobile ? 200 : 600;
      const hiddenSlideX = isMobile ? 400 : 1200;

      if (offset === 0) {
        // Current slide - center and full size
        targetScale = 1;
        targetX = 0;
        targetOpacity = 1;
        zIndex = 10;
      } else if (offset === -1) {
        // Next slide - left side, small
        targetScale = sideSlideScale;
        targetX = -sideSlideX;
        targetOpacity = 0.6;
        zIndex = 5;
      } else if (offset === 1) {
        // Previous slide - right side, small
        targetScale = sideSlideScale;
        targetX = sideSlideX;
        targetOpacity = 0.6;
        zIndex = 5;
      } else if (offset < -1) {
        // Further slides on the right - hidden
        targetScale = sideSlideScale;
        targetX = hiddenSlideX;
        targetOpacity = 0;
        zIndex = 1;
      } else {
        // Further slides on the left - hidden
        targetScale = sideSlideScale;
        targetX = -hiddenSlideX;
        targetOpacity = 0;
        zIndex = 1;
      }

      gsap.to(slideEl, {
        scale: targetScale,
        x: targetX,
        opacity: targetOpacity,
        zIndex: zIndex,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          if (i === index) {
            setIsAnimating(false);
          }
        },
      });
    });

    setCurrentIndex(index);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    goToSlide(currentIndex + 1);
  };

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    goToSlide(currentIndex - 1);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    goToSlide(index);
  };

  // Initialize positions on mount
  useEffect(() => {
    const slides = containerRef.current?.querySelectorAll(".slide");
    if (!slides) return;

    slides.forEach((slide, i) => {
      const slideEl = slide as HTMLElement;
      const offset = i;

      let initialScale: number;
      let initialX: number;
      let initialOpacity: number;
      let zIndex: number;

      const sideSlideScale = isMobile ? 0.6 : 0.5;
      const sideSlideX = isMobile ? 200 : 600;
      const hiddenSlideX = isMobile ? 400 : 1200;

      if (offset === 0) {
        initialScale = 1;
        initialX = 0;
        initialOpacity = 1;
        zIndex = 10;
      } else if (offset === 1) {
        initialScale = sideSlideScale;
        initialX = -sideSlideX;
        initialOpacity = 0.6;
        zIndex = 5;
      } else if (offset > 1) {
        initialScale = sideSlideScale;
        initialX = -hiddenSlideX;
        initialOpacity = 0;
        zIndex = 1;
      } else {
        initialScale = sideSlideScale;
        initialX = sideSlideX;
        initialOpacity = 0.6;
        zIndex = 5;
      }

      gsap.set(slideEl, {
        scale: initialScale,
        x: initialX,
        opacity: initialOpacity,
        zIndex: zIndex,
      });
    });
  }, [isMobile]);

  return (
    <section className="md:py-24 py-8 md:px-6 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:mb-16 mb-4">
          <h2 className="text-3xl md:text-7xl font-bold text-black mb-4 uppercase">
            Portafolio
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Proyectos que han impulsado marcas
          </p>
          <div className="flex justify-center">
            <Button
              href="/portfolio"
              variant="primary"
              size="lg"
              className="group tracking-wide transform hover:scale-105"
            >
              <span>Ver todos</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden px-4"
        >
          {/* Slides */}
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={(e) => {
                // Only navigate if clicking on the slide itself, not on navigation buttons
                if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.slide-content')) {
                  router.push(`/proyectos/${createSlug(item.title)}`);
                }
              }}
              className="slide absolute w-full max-w-[90vw] h-[60vh] md:w-[800px] md:h-[600px] overflow-hidden shadow-2xl cursor-pointer group"
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* Image */}
              <div
                className="slide-content w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                  {item.category && (
                    <span className="text-xs md:text-sm uppercase tracking-wider text-white/80 mb-2 block">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 uppercase group-hover:translate-y-[-4px] transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-200 leading-relaxed">
                    {item.description}
                  </p>
                  {/* Meta Info */}
                  {(item.client || item.year) && (
                    <div className="flex items-center gap-3 mt-3 text-xs md:text-sm text-white/70">
                      {item.client && <span>{item.client}</span>}
                      {item.year && (
                        <span className="before:content-['•'] before:mr-3">
                          {item.year}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Left Arrow - Previous */}
            <button
              onClick={(e) => goToPrev(e)}
              disabled={currentIndex === 0 || isAnimating}
              className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0 || isAnimating
                  ? "bg-white/60 backdrop-blur-md border border-white/20 opacity-30 cursor-not-allowed shadow-lg"
                  : "bg-white/60 backdrop-blur-md border border-black opacity-90 hover:bg-white/20 hover:border-white/40 cursor-pointer shadow-lg hover:shadow-xl"
              }`}
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-black drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow - Next */}
            <button
              onClick={(e) => goToNext(e)}
              disabled={currentIndex === items.length - 1 || isAnimating}
              className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === items.length - 1 || isAnimating
                  ? "bg-white/60 backdrop-blur-md border border-black/20 opacity-30 cursor-not-allowed shadow-lg"
                  : "bg-white/60 backdrop-blur-md border border-black hover:bg-white/20 hover:border-white/40 cursor-pointer shadow-lg hover:shadow-xl "
              }`}
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-black drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dot Indicators - Outside carousel container */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(index, e)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-black w-8 md:w-10 h-1.5 md:h-2 opacity-100"
                    : "bg-black/40 hover:bg-black/70 w-1.5 md:w-2 h-1.5 md:h-2 opacity-60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
