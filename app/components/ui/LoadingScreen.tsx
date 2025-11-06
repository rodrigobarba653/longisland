"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Minimum loading time to ensure everything is ready
    const minLoadTime = setTimeout(() => {
      // Wait for GSAP and ScrollTrigger to be ready
      if (typeof window !== "undefined") {
        // Ensure ScrollTrigger is registered
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);
          
          // Wait a bit more for all animations to register
          setTimeout(() => {
            // Fade out loading screen
            gsap.to(".loading-screen", {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
              onComplete: () => {
                onComplete();
              },
            });
          }, 300);
        });
      }
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minLoadTime);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-black uppercase tracking-tight mb-4">
            Long Island
          </h1>
          <div className="w-64 md:w-96 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-black transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-500 uppercase tracking-wider">
          {progress < 100 ? "Loading..." : "Ready"}
        </p>
      </div>
    </div>
  );
}

