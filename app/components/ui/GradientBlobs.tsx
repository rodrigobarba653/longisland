"use client";

import { useParallax } from "../../hooks/useParallax";
import GradientBlob from "./GradientBlob";

// Gradient blob parallax configuration
const BLOB_PARALLAX_CONFIG = {
  blob1: { speed: 0.5, direction: "up" as const, distance: 400 },
  blob2: { speed: 1, direction: "up" as const, distance: 350 },
  blob3: { speed: 1.5, direction: "up" as const, distance: 300 },
  blob4: { speed: 0.8, direction: "up" as const, distance: 250 },
  blob5: { speed: 1.2, direction: "down" as const, distance: 300 },
  blob6: { speed: 0.6, direction: "up" as const, distance: 400 },
  blob7: { speed: 1.3, direction: "up" as const, distance: 280 },
  blob8: { speed: 0.9, direction: "down" as const, distance: 320 },
  blob9: { speed: 1.1, direction: "up" as const, distance: 350 },
  blob10: { speed: 0.7, direction: "up" as const, distance: 380 },
};

// Gradient blob visual configuration
const BLOB_CONFIG = [
  {
    top: 200,
    color1: "#7C3AED",
    color2: "#DB2777",
    size: 400,
    blobTop: "40%",
    blobLeft: "10%",
    opacity: 0.35,
    blur: 60,
    animationDuration: 25,
  },
  {
    top: 700,
    color1: "#2563EB",
    color2: "#7C3AED",
    size: 350,
    blobTop: "100%",
    blobLeft: "92%",
    opacity: 0.35,
    blur: 50,
    animationDuration: 20,
  },
  {
    top: 400,
    color1: "#DB2777",
    color2: "#F59E0B",
    size: 300,
    blobTop: "50%",
    blobLeft: "50%",
    opacity: 0.45,
    blur: 55,
    animationDuration: 30,
  },
  {
    top: 1200,
    color1: "#10B981",
    color2: "#3B82F6",
    size: 280,
    blobTop: "30%",
    blobLeft: "75%",
    opacity: 0.3,
    blur: 50,
    animationDuration: 22,
  },
  {
    top: 1800,
    color1: "#F59E0B",
    color2: "#EF4444",
    size: 320,
    blobTop: "60%",
    blobLeft: "20%",
    opacity: 0.4,
    blur: 65,
    animationDuration: 28,
  },
  {
    top: 2400,
    color1: "#8B5CF6",
    color2: "#EC4899",
    size: 250,
    blobTop: "80%",
    blobLeft: "85%",
    opacity: 0.35,
    blur: 45,
    animationDuration: 18,
  },
  {
    top: 3000,
    color1: "#06B6D4",
    color2: "#8B5CF6",
    size: 360,
    blobTop: "40%",
    blobLeft: "50%",
    opacity: 0.3,
    blur: 70,
    animationDuration: 25,
  },
  {
    top: 3600,
    color1: "#F97316",
    color2: "#EAB308",
    size: 290,
    blobTop: "70%",
    blobLeft: "15%",
    opacity: 0.4,
    blur: 55,
    animationDuration: 32,
  },
  {
    top: 4200,
    color1: "#6366F1",
    color2: "#EC4899",
    size: 270,
    blobTop: "25%",
    blobLeft: "90%",
    opacity: 0.35,
    blur: 50,
    animationDuration: 20,
  },
  {
    top: 4800,
    color1: "#14B8A6",
    color2: "#3B82F6",
    size: 310,
    blobTop: "50%",
    blobLeft: "60%",
    opacity: 0.3,
    blur: 60,
    animationDuration: 26,
  },
  {
    top: 5200,
    color1: "#7C3AED",
    color2: "#DB2777",
    size: 400,
    blobTop: "40%",
    blobLeft: "10%",
    opacity: 0.35,
    blur: 60,
    animationDuration: 25,
  },
  {
    top: 6900,
    color1: "#2563EB",
    color2: "#7C3AED",
    size: 350,
    blobTop: "100%",
    blobLeft: "92%",
    opacity: 0.35,
    blur: 50,
    animationDuration: 20,
  },
  {
    top: 8400,
    color1: "#DB2777",
    color2: "#F59E0B",
    size: 300,
    blobTop: "50%",
    blobLeft: "50%",
    opacity: 0.45,
    blur: 55,
    animationDuration: 30,
  },
];

export default function GradientBlobs() {
  // Create parallax refs for each blob
  const blobRefs = [
    useParallax(BLOB_PARALLAX_CONFIG.blob1),
    useParallax(BLOB_PARALLAX_CONFIG.blob2),
    useParallax(BLOB_PARALLAX_CONFIG.blob3),
    useParallax(BLOB_PARALLAX_CONFIG.blob4),
    useParallax(BLOB_PARALLAX_CONFIG.blob5),
    useParallax(BLOB_PARALLAX_CONFIG.blob6),
    useParallax(BLOB_PARALLAX_CONFIG.blob7),
    useParallax(BLOB_PARALLAX_CONFIG.blob8),
    useParallax(BLOB_PARALLAX_CONFIG.blob9),
    useParallax(BLOB_PARALLAX_CONFIG.blob10),
  ];

  return (
    <>
      {BLOB_CONFIG.map((config, index) => (
        <div
          key={index}
          ref={blobRefs[index]}
          className="absolute left-0 w-full pointer-events-none z-1"
          style={{ top: `${config.top}px` }}
        >
          <GradientBlob
            color1={config.color1}
            color2={config.color2}
            size={config.size}
            top={config.blobTop}
            left={config.blobLeft}
            opacity={config.opacity}
            blur={config.blur}
            animationDuration={config.animationDuration}
          />
        </div>
      ))}
    </>
  );
}
