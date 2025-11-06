"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GradientBlobProps {
  color1?: string;
  color2?: string;
  size?: number;
  top?: string;
  left?: string;
  opacity?: number;
  blur?: number;
  animationDuration?: number;
}

export default function GradientBlob({
  color1 = "#8B5CF6",
  color2 = "#EC4899",
  size = 400,
  top = "50%",
  left = "50%",
  opacity = 0.3,
  blur = 60,
  animationDuration = 20,
}: GradientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    // Organic floating animation
    gsap.to(blobRef.current, {
      x: "+=100",
      y: "+=50",
      rotation: "+=15",
      duration: animationDuration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle scale pulsing
    gsap.to(blobRef.current, {
      scale: 1.1,
      duration: animationDuration / 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [animationDuration]);

  return (
    <div
      ref={blobRef}
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        transform: "translate(-50%, -50%)",
        opacity,
        filter: `blur(${blur}px)`,
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Gradient definition */}
          <linearGradient
            id={`gradient-${color1}-${color2}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>

          {/* Noise filter */}
          <filter id={`noise-${color1}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="3.5"
              numOctaves="8"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="3" intercept="-1" />
            </feComponentTransfer>
            <feBlend mode="overlay" in2="SourceGraphic" result="blend" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.5" />
              <feFuncG type="linear" slope="1.5" />
              <feFuncB type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Organic blob shape */}
        <path
          d="M47.1,-57.7C59.9,-48.3,68.4,-32.7,71.7,-16.2C75.1,0.3,73.3,17.6,65.6,31.8C57.9,46.1,44.3,57.3,28.8,63.4C13.3,69.5,-4.1,70.5,-20.3,66.1C-36.5,61.7,-51.5,51.9,-60.3,38.2C-69.1,24.5,-71.7,6.9,-68.9,-9.7C-66.1,-26.3,-58,-41.9,-46.3,-51.5C-34.6,-61.1,-19.3,-64.7,-2.8,-61.3C13.7,-57.9,34.3,-67.1,47.1,-57.7Z"
          transform="translate(100 100)"
          fill={`url(#gradient-${color1}-${color2})`}
          filter={`url(#noise-${color1})`}
        />
      </svg>
    </div>
  );
}
