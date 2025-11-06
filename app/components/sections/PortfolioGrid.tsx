"use client";

import { Project } from "../../data/projects";
import Link from "next/link";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { createSlug } from "../../utils/slug";

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridItems = gridRef.current?.querySelectorAll(".grid-item");
    if (!gridItems) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power3.out",
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    gridItems.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 30 });
      observer.observe(item);
    });

    return () => {
      gridItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 uppercase">
            Portafolio Completo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Todos nuestros proyectos que han impulsado marcas
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/proyectos/${createSlug(project.title)}`}
              className="grid-item group relative overflow-hidden bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 block"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {project.category && (
                  <span className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    {project.category}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-black mb-3 uppercase group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {project.client && (
                    <span className="font-semibold">{project.client}</span>
                  )}
                  {project.year && (
                    <span className="before:content-['•'] before:mr-4">
                      {project.year}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

