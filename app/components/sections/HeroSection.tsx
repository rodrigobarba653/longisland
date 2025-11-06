"use client";

import { useRef } from "react";
import { useParallax } from "../../hooks/useParallax";
import HeroHeading from "./HeroHeading";
import Button from "../ui/Button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  onAnimationReady?: (element: HTMLElement | null) => void;
}

export default function HeroSection({
  title,
  subtitle,
  onAnimationReady,
}: HeroSectionProps) {
  // Parallax configuration for hero elements
  const headingParallax = useParallax({
    speed: 1.5,
    direction: "up" as const,
    distance: 200,
    start: "top top",
    end: "bottom top",
  });

  const subheadingParallax = useParallax({
    speed: 1,
    direction: "down" as const,
    distance: 100,
    start: "top top",
    end: "bottom top",
  });

  return (
    <section className="md:min-h-[110vh] min-h-[80vh] flex items-center justify-center px-4 relative z-10">
      <div className="text-center max-w-6xl w-full relative z-10 md:pt-0 pt-32">
        <div className="w-full" ref={headingParallax}>
          <HeroHeading
            text={title}
            className="text-[2.6rem] md:text-9xl font-bold text-black mb-6 leading-tight inline-block uppercase"
            onAnimationReady={(element) => {
              if (onAnimationReady) {
                onAnimationReady(element);
              }
            }}
          />
        </div>
        <p
          ref={subheadingParallax}
          className="text-lg md:text-xl font-normal text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
        >
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Button
            className="md:w-fit w-full justify-center"
            href="#contact"
            variant="primary"
            size="lg"
          >
            Contáctanos ✨
          </Button>
          <Button
            className="md:w-fit w-full justify-center"
            href="#portfolio"
            variant="outline"
            size="lg"
          >
            Ver Portafolio 🚀
          </Button>
        </div>
      </div>
    </section>
  );
}

