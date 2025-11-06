"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextAdvancedProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  variant?: "once" | "scrub";

  // Letter animation config
  stagger?: number;
  duration?: number;
  ease?: string;
  yStart?: number;

  // Block-level reveal config
  skewY?: number;
  yPercent?: number;
  blur?: number;
  scale?: number;

  // Gradient wipe config
  enableGradientWipe?: boolean;
  wipeDuration?: number;

  // ScrollTrigger config
  triggerStart?: string;
  triggerEnd?: string;
  scrubAmount?: number;
  once?: boolean;
  manualTrigger?: boolean; // If true, don't use ScrollTrigger, wait for manual trigger
  onAnimationReady?: (element: HTMLElement) => void; // Callback when animation is ready

  // Accessibility
  disableAnimation?: boolean;
}

export default function AnimatedTextAdvanced({
  text,
  as: Component = "div",
  className = "",
  variant = "once",

  // Letter defaults
  stagger = 0.06,
  duration = 0.7,
  ease = "power4.out",
  yStart = 100,

  // Block defaults
  skewY = 5,
  yPercent = 10,
  blur = 8,
  scale = 0.98,

  // Gradient wipe
  enableGradientWipe = true,
  wipeDuration = 1.2,

  // ScrollTrigger defaults
  triggerStart = "top 80%",
  triggerEnd = "top 30%",
  scrubAmount = 0.5,
  once = true,
  manualTrigger = false,
  onAnimationReady,

  // Accessibility
  disableAnimation = false,
}: AnimatedTextAdvancedProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Skip animation if disabled or reduced motion preferred
    if (disableAnimation || prefersReducedMotion) {
      return;
    }

    if (!containerRef.current || !textRef.current) return;

    // Split text into words and characters
    const splitText = new SplitType(textRef.current, {
      types: "words,chars",
      tagName: "span",
    });

    // Ensure words stay together (don't break across lines)
    if (splitText.words) {
      splitText.words.forEach((word) => {
        word.style.display = "inline-block";
        word.style.whiteSpace = "nowrap";
      });
    }

    // Set will-change for performance
    if (splitText.chars) {
      splitText.chars.forEach((char) => {
        char.style.display = "inline-block";
        char.style.willChange = "transform, opacity";
      });
    }

    // Create ScrollTrigger config (only if not manual trigger)
    const scrollTriggerConfig = manualTrigger
      ? undefined
      : {
          trigger: containerRef.current,
          start: triggerStart,
          end: triggerEnd,
          ...(variant === "once" && {
            toggleActions: "play none none none",
            onEnterBack: once
              ? undefined
              : () => timelineRef.current?.restart(),
            onLeaveBack: once
              ? undefined
              : () => timelineRef.current?.progress(0).pause(),
          }),
          ...(variant === "scrub" && {
            scrub: scrubAmount,
            pin: false,
          }),
        };

    // Create GSAP timeline
    const tl = gsap.timeline({
      paused: manualTrigger,
      scrollTrigger: scrollTriggerConfig,
    });

    // Store timeline reference
    timelineRef.current = tl;

    // Set up manual trigger method immediately after timeline creation
    if (manualTrigger && containerRef.current) {
      (containerRef.current as any).__animateHero = () => {
        timelineRef.current?.restart();
      };
      if (onAnimationReady) {
        onAnimationReady(containerRef.current);
      }
    }

    // LAYER 1: Block-level container reveal
    // Set initial state and animate
    tl.fromTo(
      containerRef.current,
      {
        skewY: skewY,
        yPercent: yPercent,
        scale: scale,
        filter: `blur(${blur}px)`,
      },
      {
        skewY: 0,
        yPercent: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: variant === "scrub" ? 1 : duration * 1.5,
        ease: ease,
      },
      0
    );

    // LAYER 2: Per-letter animation
    // Set initial state for letters (only if not manual trigger)
    if (splitText.chars && splitText.chars.length > 0) {
      if (!manualTrigger) {
        gsap.set(splitText.chars, {
          opacity: 0,
          y: yStart,
        });
      }

      // Always use fromTo for consistent animation
      tl.fromTo(
        splitText.chars,
        {
          opacity: 0,
          y: yStart,
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: ease,
          stagger: stagger,
        },
        variant === "scrub" ? 0 : 0.1
      );
    }

    // LAYER 3: Gradient wipe effect
    if (enableGradientWipe && maskRef.current) {
      gsap.set(maskRef.current, {
        y: "-100%",
      });

      tl.to(
        maskRef.current,
        {
          y: "100%",
          duration: variant === "scrub" ? 1 : wipeDuration,
          ease: "power2.inOut",
        },
        0
      );
    }

    // Cleanup
    return () => {
      // Remove will-change for performance
      if (splitText.chars) {
        splitText.chars.forEach((char) => {
          char.style.willChange = "auto";
        });
      }

      splitText.revert();
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [
    text,
    variant,
    stagger,
    duration,
    ease,
    yStart,
    skewY,
    yPercent,
    blur,
    scale,
    enableGradientWipe,
    wipeDuration,
    triggerStart,
    triggerEnd,
    scrubAmount,
    once,
    manualTrigger,
    onAnimationReady,
    disableAnimation,
    prefersReducedMotion,
  ]);

  // Render without animation if disabled or reduced motion
  if (disableAnimation || prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component
      ref={containerRef as any}
      className={`relative inline-block ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Main text layer */}
      <div
        ref={textRef}
        className="relative z-10"
        style={{
          lineHeight: "1",
          overflow: "visible",
          display: "block",
        }}
      >
        {text}
      </div>

      {/* Gradient wipe overlay */}
      {enableGradientWipe && (
        <div
          ref={maskRef}
          className="absolute inset-0 z-20 pointer-events-none gradient-wipe"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            mixBlendMode: "overlay",
          }}
        />
      )}
    </Component>
  );
}
