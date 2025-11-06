"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

interface InsetImageSectionProps {
  imageSrc: string;
  initialInsetX: number; // Initial horizontal inset (desktop)
  initialInsetY: number; // Initial vertical inset (desktop)
  finalInsetX: number; // Final horizontal inset (desktop)
  finalInsetY: number; // Final vertical inset (desktop)
  // Mobile-specific values (optional)
  mobileInitialInsetX?: number;
  mobileInitialInsetY?: number;
  mobileFinalInsetX?: number;
  mobileFinalInsetY?: number;
  heading?: string; // Optional heading text
  body?: string; // Optional body text
  ctaText?: string; // Optional CTA text
  ctaHref?: string; // Optional CTA link
}

export default function InsetImageSection({
  imageSrc,
  initialInsetX,
  initialInsetY,
  finalInsetX,
  finalInsetY,
  mobileInitialInsetX,
  mobileInitialInsetY,
  mobileFinalInsetX,
  mobileFinalInsetY,
  heading,
  body,
  ctaText,
  ctaHref,
}: InsetImageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const whiteTextRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !imageContainerRef.current ||
      !whiteTextRef.current
    )
      return;

    // Use mobile values if provided, otherwise use desktop values
    const startX = isMobile
      ? mobileInitialInsetX ?? initialInsetX
      : initialInsetX;
    const startY = isMobile
      ? mobileInitialInsetY ?? initialInsetY
      : initialInsetY;
    const endX = isMobile ? mobileFinalInsetX ?? finalInsetX : finalInsetX;
    const endY = isMobile ? mobileFinalInsetY ?? finalInsetY : finalInsetY;

    // Animate the inset from initialInset to finalInset as we scroll
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center", // Pin when section is centered in viewport
        end: isMobile ? "+=600" : "+=1000", // Shorter scroll distance on mobile
        scrub: 1,
        pin: true, // Pin the section while animation plays
      },
    });

    // Animate image inset
    timeline.fromTo(
      imageContainerRef.current,
      {
        inset: `${startY}px ${startX}px`, // top/bottom left/right
      },
      {
        inset: `${endY}px ${endX}px`, // top/bottom left/right
        ease: "none",
      },
      0
    );

    // Animate white text clip-path to match the inset
    timeline.fromTo(
      whiteTextRef.current,
      {
        clipPath: `inset(${startY}px ${startX}px)`,
      },
      {
        clipPath: `inset(${endY}px ${endX}px)`,
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [
    initialInsetX,
    initialInsetY,
    finalInsetX,
    finalInsetY,
    mobileInitialInsetX,
    mobileInitialInsetY,
    mobileFinalInsetX,
    mobileFinalInsetY,
    isMobile,
  ]);

  return (
    <section
      ref={sectionRef}
      className="md:min-h-[150vh] min-h-[80vh] relative flex items-center justify-center z-10"
    >
      <div
        ref={imageContainerRef}
        className="absolute bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-white/50" />
      </div>

      {/* Content overlay - Gray text (base layer, visible outside inset) */}
      {(heading || body || ctaText) && (
        <div className="relative z-50 text-center max-w-4xl px-6">
          {heading && (
            <h2 className="text-3xl md:text-6xl font-bold mb-8 uppercase text-black">
              {heading}
            </h2>
          )}
          {body && (
            <p className="text-base md:text-lg leading-relaxed text-black mb-6">
              {body}
            </p>
          )}
          {ctaText && ctaHref && (
            <Button
              href={ctaHref}
              variant="text-arrow"
              className="text-lg font-semibold"
            >
              {ctaText}
            </Button>
          )}
        </div>
      )}

      {/* White text overlay (clipped to inset area) */}
      {(heading || body || ctaText) && (
        <div
          ref={whiteTextRef}
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{
            clipPath: `inset(${
              isMobile ? mobileInitialInsetY ?? initialInsetY : initialInsetY
            }px ${
              isMobile ? mobileInitialInsetX ?? initialInsetX : initialInsetX
            }px)`,
          }}
        >
          {/* Dark blur overlay for text readability */}
          <div className="absolute inset-0 flex items-center justify-center top-40">
            <div className="w-[1120px] h-96 bg-black/40 blur-3xl" />
          </div>

          <div className="text-center max-w-4xl px-6 relative z-10">
            {heading && (
              <h2 className="text-3xl md:text-6xl font-bold mb-8 uppercase text-white">
                {heading}
              </h2>
            )}
            {body && (
              <p className="text-base md:text-lg leading-relaxed text-white mb-6">
                {body}
              </p>
            )}
            {ctaText && ctaHref && (
              <Button
                href={ctaHref}
                variant="text-arrow"
                className="text-lg font-semibold text-white hover:text-gray-300"
              >
                {ctaText}
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
