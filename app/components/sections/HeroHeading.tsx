"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface HeroHeadingProps {
  text: string;
  className?: string;
  onAnimationReady?: (element: HTMLElement) => void;
}

export default function HeroHeading({
  text,
  className = "",
  onAnimationReady,
}: HeroHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRef = useRef(false); // Track if initial animation has played

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Split text into words and characters
    const splitText = new SplitType(textRef.current, {
      types: "words,chars",
      tagName: "span",
    });

    // Ensure words stay together
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

    // Create timeline (paused, will be manually triggered)
    const tl = gsap.timeline({
      paused: true,
    });

    timelineRef.current = tl;

    // Set up manual trigger method
    if (containerRef.current) {
      (containerRef.current as any).__animateHero = () => {
        if (timelineRef.current) {
          timelineRef.current.restart();
          hasPlayedRef.current = true;
        }
      };

      if (onAnimationReady) {
        onAnimationReady(containerRef.current);
      }
    }

    // LAYER 1: Container animation
    tl.fromTo(
      containerRef.current,
      { skewY: 0, yPercent: 0, scale: 1, filter: "blur(0px)" },
      { skewY: 0, yPercent: 0, scale: 1, filter: "blur(0px)", duration: 0 },
      0
    );

    // LAYER 2: Letter animation
    if (splitText.chars && splitText.chars.length > 0) {
      tl.fromTo(
        splitText.chars,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.5)",
          stagger: 0.05,
        },
        0.1
      );
    }

    // Set up ScrollTrigger for re-entering
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => {
        // Only trigger if we've already played the initial animation
        if (hasPlayedRef.current && timelineRef.current) {
          timelineRef.current.restart();
        }
      },
      onEnterBack: () => {
        // Only trigger if we've already played the initial animation
        if (hasPlayedRef.current && timelineRef.current) {
          timelineRef.current.restart();
        }
      },
    });

    // Cleanup
    return () => {
      if (splitText.chars) {
        splitText.chars.forEach((char) => {
          char.style.willChange = "auto";
        });
      }
      splitText.revert();
      tl.kill();
      scrollTrigger.kill();
    };
  }, [text, onAnimationReady]);

  return (
    <h1
      ref={containerRef as any}
      className={`relative inline-block ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
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
    </h1>
  );
}

