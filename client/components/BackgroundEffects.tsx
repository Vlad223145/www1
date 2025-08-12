import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient orbs that follow mouse */}
      <div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-brand/5 to-yellow-400/5 blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl transition-all duration-1500 ease-out"
        style={{
          left: mousePos.x - 128 + Math.sin(scrollY * 0.001) * 100,
          top: mousePos.y - 128 + Math.cos(scrollY * 0.001) * 100,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-brand/20 rounded-full animate-pulse`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              transform: `translateY(${Math.sin(scrollY * 0.005 + i) * 50}px)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Animated gradient lines */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFB400" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Diagonal lines */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1={`${i * 25}%`}
              y1="0%"
              x2={`${i * 25 + 100}%`}
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{
                transform: `translateX(${Math.sin(scrollY * 0.002 + i) * 20}px)`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Particle system */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (0.1 + i * 0.02)}px) rotate(${scrollY * 0.1 + i * 10}deg)`,
              animation: `gentle-float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, #FFB400 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #3B82F6 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #10B981 0%, transparent 50%),
            linear-gradient(135deg, transparent 0%, rgba(255, 180, 0, 0.1) 50%, transparent 100%)
          `,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
    </div>
  );
}
