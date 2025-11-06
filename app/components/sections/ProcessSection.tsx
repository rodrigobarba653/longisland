"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image?: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export default function ProcessSection({ steps }: ProcessSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
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
    // Skip desktop animations if mobile
    if (isMobile) return;

    if (
      !containerRef.current ||
      !imageRef.current ||
      !stepsContainerRef.current
    )
      return;

    // Calculate height needed for all steps
    const stepHeight = window.innerHeight * 0.9;
    const totalHeight = steps.length * stepHeight;

    // Set container height
    gsap.set(stepsContainerRef.current, {
      height: totalHeight,
    });

    // Pin the image while scrolling through steps
    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalHeight}`,
      pin: imageRef.current,
      pinSpacing: true,
    });

    // Create scroll triggers for each step
    steps.forEach((step, index) => {
      const stepStart = index * stepHeight;
      const stepEnd = (index + 1) * stepHeight;
      const stepElement = stepRefs.current[index];

      if (!stepElement) return;

      // Pin each step while scrolling through its section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top+=${stepStart} top`,
        end: `top+=${stepEnd} top`,
        pin: stepElement,
        pinSpacing: false,
        onEnter: () => {
          setCurrentStep(index);
          gsap.to(stepElement, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
          if (index > 0 && stepRefs.current[index - 1]) {
            gsap.to(stepRefs.current[index - 1], {
              opacity: 0,
              y: -50,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
        onEnterBack: () => {
          setCurrentStep(index);
          gsap.to(stepElement, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
          if (index < steps.length - 1 && stepRefs.current[index + 1]) {
            gsap.to(stepRefs.current[index + 1], {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
        onLeave: () => {
          if (index < steps.length - 1) {
            gsap.to(stepElement, {
              opacity: 0,
              y: -50,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          if (index > 0) {
            gsap.to(stepElement, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
      });

      // Initially hide all steps except first
      if (index > 0) {
        gsap.set(stepElement, {
          opacity: 0,
          y: 50,
        });
      } else {
        gsap.set(stepElement, {
          opacity: 1,
          y: 0,
        });
      }
    });

    // Cleanup
    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [steps, isMobile]);

  // Mobile layout: Vertical timeline with connecting line
  if (isMobile) {
    return (
      <section id="process" className="py-12 relative z-10">
        <div className="px-6 max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4 uppercase">
            Cómo Trabajamos
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Un proceso probado que transforma ideas en resultados tangibles
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="px-6 max-w-2xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>

            {/* Steps */}
            {steps.map((step, index) => (
              <div key={index} className="relative pl-18 pb-12 last:pb-0">
                {/* Circle on timeline */}
                <div className="absolute -left-4 top-0 w-18 h-18 rounded-full bg-black flex items-center justify-center z-10">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-4">
                  <h3 className="text-2xl font-bold text-black mb-3 uppercase leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout: 50/50 split with pinned image
  return (
    <section id="process" className=" py-24 relative z-10">
      <div className="px-6 max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold text-black mb-4 uppercase">
          Cómo Trabajamos
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Un proceso probado que transforma ideas en resultados tangibles
        </p>
      </div>

      {/* 50/50 Split Container */}
      <div ref={containerRef} className="flex">
        {/* Image Column - Will be pinned */}
        <div ref={imageRef} className="w-1/2">
          <div className="h-screen w-full">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1600&fit=crop"
              alt="Process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Column - Scrollable Steps */}
        <div className="w-1/2 relative h-screen!">
          <div ref={stepsContainerRef} className="relative">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="absolute w-full flex items-center justify-center"
                style={{
                  top: `${index * 90}vh`,
                  height: "90vh",
                }}
              >
                <div className="px-8 py-24 max-w-2xl">
                  <div className="mb-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center mb-8">
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold text-black mb-6 uppercase leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
