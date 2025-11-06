"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";

gsap.registerPlugin(ScrollTrigger);

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface ContactFormProps {
  contactInfo: ContactInfo;
}

export default function ContactForm({ contactInfo }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      [formRef.current, infoRef.current],
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would send this to your backend/API
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setSubmitStatus("success");

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
      setSubmitStatus("idle");
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="md:py-24 py-8 px-6 relative z-10 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-7xl font-bold text-white mb-4 uppercase"
          >
            Contáctanos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos listos para impulsar tu próximo proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FormInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nombre Completo"
              />
            </div>

            <div className="relative">
              <FormInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <FormInput
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Empresa"
                />
              </div>

              <div className="relative">
                <FormInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <div className="relative">
              <FormInput
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Mensaje"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="tracking-wide"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </Button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-900/30 border-2 border-green-500 rounded-lg text-green-300">
                ¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-900/30 border-2 border-red-500 rounded-lg text-red-300">
                Hubo un error al enviar. Por favor, intenta de nuevo.
              </div>
            )}
          </form>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Email
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-lg text-white hover:text-gray-300 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Teléfono
                  </h4>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-lg text-white hover:text-gray-300 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Dirección
                  </h4>
                  <p className="text-lg text-white leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4 uppercase">
                Horario de Atención
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Lunes a Viernes: 9:00 AM - 6:00 PM
                <br />
                Sábados: 10:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
