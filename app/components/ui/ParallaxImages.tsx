"use client";

import { useEffect, useState } from "react";
import { useParallax } from "../../hooks/useParallax";

// Parallax images configuration - desktop speeds
const PARALLAX_IMAGE_CONFIG_DESKTOP = {
  image1: { speed: 0.8, direction: "up" as const, distance: 600 },
  image2: { speed: 0.4, direction: "up" as const, distance: 600 },
  image3: { speed: 0.7, direction: "up" as const, distance: 400 },
  image4: { speed: 0.8, direction: "up" as const, distance: 700 },
  image5: { speed: 0.3, direction: "up" as const, distance: 650 },
  image6: { speed: 0.6, direction: "up" as const, distance: 500 },
  image7: { speed: 0.4, direction: "up" as const, distance: 500 },
};

// Parallax images configuration - mobile speeds (reduced/slower)
const PARALLAX_IMAGE_CONFIG_MOBILE = {
  image1: { speed: 1.2, direction: "up" as const, distance: 600 },
  image2: { speed: 0.8, direction: "up" as const, distance: 600 },
  image3: { speed: 1.2, direction: "up" as const, distance: 400 },
  image4: { speed: 1.2, direction: "up" as const, distance: 700 },
  image5: { speed: 0.6, direction: "up" as const, distance: 650 },
  image6: { speed: 1.0, direction: "up" as const, distance: 500 },
  image7: { speed: 0.8, direction: "up" as const, distance: 500 },
};

export default function ParallaxImages() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use mobile or desktop config based on screen size
  const config = isMobile
    ? PARALLAX_IMAGE_CONFIG_MOBILE
    : PARALLAX_IMAGE_CONFIG_DESKTOP;

  // Parallax image refs
  const image1Ref = useParallax(config.image1);
  const image2Ref = useParallax(config.image2);
  const image3Ref = useParallax(config.image3);
  const image4Ref = useParallax(config.image4);
  const image5Ref = useParallax(config.image5);
  const image6Ref = useParallax(config.image6);
  const image7Ref = useParallax(config.image7);
  return (
    <>
      {/* Image 1 - top: 250px/500px */}
      <div
        ref={image1Ref}
        className="absolute md:top-[500px] top-[500px] -left-4 md:left-24 w-24 h-24 md:w-48 md:h-48 pointer-events-none z-1"
      >
        <img
          src="/images/lemon1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image 2 - top: 340px/480px */}
      <div
        ref={image2Ref}
        className="absolute md:top-[340px] top-[440px] -right-12 md:right-24 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-1"
      >
        <img
          src="/images/menta1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image 3 - top: 800px/1800px */}
      <div
        ref={image3Ref}
        className="absolute md:top-[1800px] top-[900px] -left-8 md:left-24 w-32 h-32 md:w-64 md:h-64 pointer-events-none z-1"
      >
        <img
          src="/images/flor2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image 4 - top: 2200px */}
      <div
        ref={image4Ref}
        className="absolute md:top-[2200px] top-[3200px] right-80 md:right-32 w-32 h-32 md:w-56 md:h-56 pointer-events-none z-1"
      >
        <img
          src="/images/lemon1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image 5 - top: 4000px */}
      <div
        ref={image5Ref}
        className="absolute top-[4000px] -right-10 md:right-28 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-1"
      >
        <img
          src="/images/menta1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image 6 - top: 4200px */}
      <div
        ref={image6Ref}
        className="absolute top-[4200px] left-10 md:left-24 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-1"
      >
        <img
          src="/images/lemon2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Image 7 - top: 5200px */}
      <div
        ref={image7Ref}
        className="absolute md:top-[5200px] top-[4850px] -right-10 md:right-20 w-32 h-32 md:w-60 md:h-60 pointer-events-none z-1"
      >
        <img
          src="/images/flor2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
}
