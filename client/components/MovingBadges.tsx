import { useEffect, useState } from "react";

export default function MovingBadges() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const badges = [
    {
      text: "€20",
      size: "text-8xl",
      color: "bg-brand/10",
      x: 10,
      y: 15,
      speed: 0.5,
    },
    {
      text: "FREE",
      size: "text-6xl",
      color: "bg-green-500/10",
      x: 75,
      y: 25,
      speed: 0.3,
    },
    {
      text: "DELIVERY",
      size: "text-5xl",
      color: "bg-blue-500/10",
      x: 85,
      y: 5,
      speed: 0.7,
    },
    {
      text: "BONUS",
      size: "text-7xl",
      color: "bg-purple-500/10",
      x: 5,
      y: 35,
      speed: 0.4,
    },
    {
      text: "SAVE",
      size: "text-6xl",
      color: "bg-red-500/10",
      x: 70,
      y: 45,
      speed: 0.6,
    },
    {
      text: "FAST",
      size: "text-5xl",
      color: "bg-orange-500/10",
      x: 45,
      y: 8,
      speed: 0.8,
    },
    {
      text: "NOW",
      size: "text-4xl",
      color: "bg-pink-500/10",
      x: 25,
      y: 55,
      speed: 0.9,
    },
    {
      text: "INSTANT",
      size: "text-5xl",
      color: "bg-indigo-500/10",
      x: 90,
      y: 35,
      speed: 0.2,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`absolute font-black ${badge.size} ${badge.color} text-gray-200 rounded-3xl px-4 py-2 transform rotate-12 opacity-20 select-none`}
          style={{
            left: `${badge.x}%`,
            top: `${badge.y}%`,
            transform: `translateY(${scrollY * badge.speed}px) rotate(${12 + scrollY * badge.speed * 0.1}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {badge.text}
        </div>
      ))}
    </div>
  );
}
