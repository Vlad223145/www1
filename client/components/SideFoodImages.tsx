import { useEffect, useState } from "react";

export default function SideFoodImages() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {/* Big Mac from left side */}
      <div
        className="absolute w-80 h-60 md:w-96 md:h-72 lg:w-[450px] lg:h-80 transition-transform duration-1000 ease-out"
        style={{
          left: "-40%",
          top: "40%",
          transform: `translateX(${Math.min(scrollY * 0.5, 120)}px) translateY(${scrollY * 0.08}px) rotate(-8deg)`,
          backgroundImage:
            'url("https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F82c7669770c14bd589067bd61affef5b?format=webp&width=800")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
          zIndex: 5,
        }}
      />

      {/* Pizza from right side */}
      <div
        className="absolute w-80 h-60 md:w-96 md:h-72 lg:w-[450px] lg:h-80 transition-transform duration-1000 ease-out"
        style={{
          right: "-40%",
          top: "50%",
          transform: `translateX(${Math.max(-scrollY * 0.5, -120)}px) translateY(${scrollY * 0.05}px) rotate(8deg)`,
          backgroundImage:
            'url("https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F942e2e480c034395b4d0939979ca74a4?format=webp&width=800")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
          zIndex: 5,
        }}
      />
    </div>
  );
}
