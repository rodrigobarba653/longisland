"use client";

interface ClientScrollProps {
  clients: string[];
}

export default function ClientScroll({ clients }: ClientScrollProps) {
  return (
    <section className="py-16 relative z-0 overflow-hidden">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">
          Clientes que confían en nosotros
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll">
          {/* First set of logos */}
          {clients.map((client, index) => (
            <div
              key={`client-1-${index}`}
              className="shrink-0 md:mx-8 mx-2 flex items-center justify-center h-20 w-40"
            >
              <span className="text-2xl font-bold text-gray-400 uppercase tracking-wide text-center">
                {client}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`client-2-${index}`}
              className="shrink-0 md:mx-8 mx-2 flex items-center justify-center h-20 w-40"
            >
              <span className="text-2xl font-bold text-gray-400 uppercase tracking-wide text-center">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
