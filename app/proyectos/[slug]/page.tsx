"use client";

import { projects } from "../../data/projects";
import { createSlug, findProjectBySlug } from "../../utils/slug";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProyectoPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = findProjectBySlug(slug, projects);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!project) {
      setNotFound(true);
      return;
    }

    // Hero animation
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll(".hero-element");
      gsap.fromTo(
        heroElements,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    // Content animation
    if (contentRef.current) {
      const contentElements = contentRef.current.querySelectorAll(".content-element");
      gsap.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [project]);

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Proyecto no encontrado</h1>
          <p className="text-gray-600 mb-8">El proyecto que buscas no existe.</p>
          <Link
            href="/portfolio"
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
            <span>Volver a proyectos</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.image})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-6 pb-12 md:pb-16">
            {/* Back Button */}
            <div className="mb-8 hero-element">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-300 group"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
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
                <span>Volver a proyectos</span>
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 uppercase hero-element">
              {project.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 hero-element">
              {project.category && (
                <span className="text-sm md:text-base uppercase tracking-wider">
                  {project.category}
                </span>
              )}
              {project.client && (
                <span className="text-sm md:text-base before:content-['•'] before:mr-4">
                  {project.client}
                </span>
              )}
              {project.year && (
                <span className="text-sm md:text-base before:content-['•'] before:mr-4">
                  {project.year}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-24">
        {/* Description */}
        <div className="content-element mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 uppercase">
            Sobre el Proyecto
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Image */}
        <div className="content-element mb-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            />
          </div>
        </div>

        {/* Additional Content Placeholder */}
        <div className="content-element grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-black mb-4 uppercase">
              Desafío
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Desarrollar una solución integral que combine estrategia, diseño
              y tecnología para alcanzar los objetivos del cliente y generar un
              impacto significativo en su mercado.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black mb-4 uppercase">
              Solución
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Implementamos un enfoque multidisciplinario que integra branding,
              desarrollo digital y estrategia de marketing para crear una
              experiencia cohesiva y efectiva.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="content-element pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/portfolio"
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
              <span>Ver todos los proyectos</span>
            </Link>

            <div className="flex items-center gap-4">
              {projects.findIndex((p) => p.id === project.id) > 0 && (
                <Link
                  href={`/proyectos/${createSlug(projects[projects.findIndex((p) => p.id === project.id) - 1].title)}`}
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="hidden md:inline">Anterior</span>
                </Link>
              )}
              {projects.findIndex((p) => p.id === project.id) < projects.length - 1 && (
                <Link
                  href={`/proyectos/${createSlug(projects[projects.findIndex((p) => p.id === project.id) + 1].title)}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-300"
                >
                  <span className="hidden md:inline">Siguiente</span>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

