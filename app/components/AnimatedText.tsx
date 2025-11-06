"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
  ease?: string;
  yStart?: number;
  delay?: number;
  triggerOnScroll?: boolean;
  triggerStart?: string;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  stagger = 0.05,
  duration = 1,
  ease = "back.out(1.7)",
  yStart = 100,
  delay = 0,
  triggerOnScroll = true,
  triggerStart = "top 80%",
  once = true,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into characters
    const splitText = new SplitType(textRef.current, {
      types: "chars",
      tagName: "span",
    });

    // Set initial state for characters
    gsap.set(splitText.chars, {
      opacity: 0,
      y: yStart,
    });

    if (triggerOnScroll) {
      // Animate on scroll
      gsap.to(splitText.chars, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: ease,
        stagger: stagger,
        delay: delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: triggerStart,
          once: once,
        },
      });
    } else {
      // Animate immediately on mount
      gsap.to(splitText.chars, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: ease,
        stagger: stagger,
        delay: delay,
      });
    }

    // Cleanup
    return () => {
      splitText.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [
    text,
    stagger,
    duration,
    ease,
    yStart,
    delay,
    triggerOnScroll,
    triggerStart,
    once,
  ]);

  return (
    <div
      ref={textRef}
      className={`overflow-hidden ${className}`}
      style={{ display: "inline-block" }}
    >
      {text}
    </div>
  );
}
