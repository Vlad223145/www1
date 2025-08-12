import { useEffect, useState } from "react";

interface DeliveryPartner {
  name: string;
  backgroundImage: string;
  color: string;
}

interface FloatingLogosProps {
  partners: DeliveryPartner[];
}

export default function FloatingLogos({ partners }: FloatingLogosProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {/* Large floating logos */}
      {partners.slice(0, 3).map((partner, index) => (
        <div
          key={index}
          className="absolute w-32 h-32 md:w-48 md:h-48 rounded-3xl animate-gentle-float opacity-40"
          style={{
            backgroundImage: `url(${partner.backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            left: `${15 + index * 25}%`,
            top: `${20 + index * 15}%`,
            transform: `translateY(${scrollY * (0.1 + index * 0.05)}px) rotate(${index * 15}deg)`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + index * 0.5}s`,
          }}
        />
      ))}

      {/* Medium floating logos */}
      {partners.slice(3).map((partner, index) => (
        <div
          key={index + 3}
          className="absolute w-20 h-20 md:w-32 md:h-32 rounded-2xl animate-gentle-float opacity-30"
          style={{
            backgroundImage: `url(${partner.backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            right: `${10 + index * 20}%`,
            top: `${30 + index * 20}%`,
            transform: `translateY(${scrollY * (0.15 + index * 0.03)}px) rotate(${-index * 20}deg)`,
            animationDelay: `${(index + 3) * 0.3}s`,
            animationDuration: `${5 + index * 0.3}s`,
          }}
        />
      ))}

      {/* Small scattered logos */}
      {partners.slice(0, 4).map((partner, index) => (
        <div
          key={index + 6}
          className="absolute w-12 h-12 md:w-20 md:h-20 rounded-xl animate-gentle-float opacity-20"
          style={{
            backgroundImage: `url(${partner.backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            left: `${80 - index * 15}%`,
            bottom: `${15 + index * 10}%`,
            transform: `translateY(${scrollY * (0.08 + index * 0.02)}px) rotate(${index * 45}deg)`,
            animationDelay: `${(index + 6) * 0.4}s`,
            animationDuration: `${6 + index * 0.2}s`,
          }}
        />
      ))}

      {/* Additional small elements for mobile */}
      <div className="md:hidden">
        {partners.slice(2, 5).map((partner, index) => (
          <div
            key={index + 10}
            className="absolute w-8 h-8 rounded-lg animate-gentle-float opacity-25"
            style={{
              backgroundImage: `url(${partner.backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              left: `${5 + index * 30}%`,
              top: `${60 + index * 8}%`,
              transform: `translateY(${scrollY * (0.12 + index * 0.03)}px) rotate(${index * 60}deg)`,
              animationDelay: `${(index + 10) * 0.2}s`,
              animationDuration: `${3 + index * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
