import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number; // Lower = faster, Higher = slower (0.5 to 2)
  direction?: "up" | "down";
  distance?: number; // How far to move in pixels
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const {
    speed = 1,
    direction = "down",
    distance = 100,
    start = "top bottom",
    end = "bottom top",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const yValue = direction === "up" ? -distance : distance;

    const animation = gsap.to(element, {
      y: yValue,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: speed,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed, direction, distance, start, end]);

  return ref;
}
