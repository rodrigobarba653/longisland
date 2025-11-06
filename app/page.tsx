"use client";

import { useState, useEffect, useRef } from "react";
import HeroSection from "./components/sections/HeroSection";
import GradientBlobs from "./components/ui/GradientBlobs";
import InsetImageSection from "./components/sections/InsetImageSection";
import ClientScroll from "./components/ui/ClientScroll";
import ServicesGrid from "./components/ui/ServicesGrid";
import PortfolioCarousel from "./components/sections/PortfolioCarousel";
import ProcessSection from "./components/sections/ProcessSection";
import ContactForm from "./components/sections/ContactForm";
import ParallaxImages from "./components/ui/ParallaxImages";
import LoadingScreen from "./components/ui/LoadingScreen";
import { content } from "./data/content";
import { projects } from "./data/projects";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const heroHeadingRef = useRef<HTMLElement | null>(null);

  // Prevent body scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Trigger hero animation after loading completes
  useEffect(() => {
    if (!isLoading && heroHeadingRef.current) {
      // Small delay to ensure page is fully visible
      setTimeout(() => {
        const animateHero = (heroHeadingRef.current as any)?.__animateHero;
        if (animateHero) {
          animateHero();
        }
      }, 300);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div
        className={`overflow-x-hidden relative bg-white ${
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        {/* Parallax Images - Global component */}
        <ParallaxImages />

        {/* Gradient Blobs Background - Absolute positioned with parallax */}
        <GradientBlobs />

        {/* Hero Section */}
        <HeroSection
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          onAnimationReady={(element) => {
            heroHeadingRef.current = element;
          }}
        />

        {/* Client Logo Scroll */}
        <ClientScroll clients={content.clients} />

        {/* Services Grid */}
        <ServicesGrid services={content.services} />

        {/* Inset Image Section */}
        <InsetImageSection
          imageSrc="/images/section2-bg.jpg"
          initialInsetX={550}
          initialInsetY={250}
          finalInsetX={50}
          finalInsetY={150}
          mobileInitialInsetX={190}
          mobileInitialInsetY={120}
          mobileFinalInsetX={16}
          mobileFinalInsetY={40}
          heading={content.about.title}
          body={content.about.body}
          ctaText={content.about.cta}
          ctaHref="#about"
        />

        {/* Portfolio Carousel */}
        <PortfolioCarousel items={projects} />

        {/* Process Section */}
        <ProcessSection steps={content.process} />

        {/* Contact Form */}
        <ContactForm contactInfo={content.contact} />
      </div>
    </>
  );
}
