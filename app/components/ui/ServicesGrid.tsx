"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  emoji: string;
  title: string;
  description: string;
  services: string[];
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate heading and body sliding from left
    gsap.fromTo(
      [headingRef.current, bodyRef.current],
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none play reverse",
        },
      }
    );

    // Animate cards with fade-in and move up stagger
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "sine.inOut",
        stagger: 0.2,
        delay: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none play reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="md:py-24 py-8 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <h2
            ref={headingRef}
            className="text-3xl leading-tight md:text-7xl font-bold text-black mb-4 uppercase"
          >
            Lo que hacemos
          </h2>
          <p ref={bodyRef} className="text-xl text-gray-600">
            Soluciones integrales para impulsar tu marca
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/50"
              style={{
                boxShadow: "0 8px 32px rgba(124, 58, 237, 0.1)",
                perspective: "1000px",
              }}
            >
              {/* Emoji Icon */}
              <div className="text-4xl mb-4">{service.emoji}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Services List */}
              <ul className="space-y-2">
                {service.services.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="mr-2 text-black">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
