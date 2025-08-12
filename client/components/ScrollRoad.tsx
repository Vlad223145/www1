import { useEffect, useState } from "react";
import { Truck, Home } from "lucide-react";

export default function ScrollRoad() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Create much longer wavy path for bigger animation
  const createWavyPath = () => {
    const width = 800; // Made much wider
    const height = 150; // Made taller
    const points = [];

    for (let x = 0; x <= width; x += 1) {
      // More complex wave pattern for interesting road
      const y =
        height / 2 +
        Math.sin(x * 0.01) * 30 +
        Math.sin(x * 0.03) * 15 +
        Math.cos(x * 0.005) * 20;
      points.push(`${x},${y}`);
    }

    return `M ${points.join(" L ")}`;
  };

  const pathData = createWavyPath();

  // Calculate car position more precisely to follow the path
  const getCarPosition = (progress: number) => {
    const pathLength = 800;
    const x = progress * pathLength;

    // Calculate Y position based on the same wave function
    const y =
      75 +
      Math.sin(x * 0.01) * 30 +
      Math.sin(x * 0.03) * 15 +
      Math.cos(x * 0.005) * 20;

    return { x, y };
  };

  const carPos = getCarPosition(scrollProgress);

  // Car should complete its journey when user scrolls past this section
  // This ensures they won't see the completion animation
  const adjustedProgress = Math.min(scrollProgress * 1.5, 1);

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <svg
        width="800"
        height="150"
        viewBox="0 0 800 150"
        className="w-full h-32 md:h-40"
      >
        {/* Road path - thicker and more visible */}
        <path
          d={pathData}
          stroke="#FFB400"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0"
        />

        {/* Start dot - bigger */}
        <circle cx="0" cy="75" r="8" fill="black" />

        {/* End dot with house - positioned at actual end */}
        <circle cx="800" cy="75" r="8" fill="black" />

        {/* Car moving along the path - follows exact curve */}
        <g
          style={{
            transform: `translate(${carPos.x}px, ${carPos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <foreignObject x="-16" y="-16" width="32" height="32">
            <div className="flex items-center justify-center w-8 h-8">
              <Truck className="w-8 h-8 text-black" />
            </div>
          </foreignObject>
        </g>

        {/* House at the end */}
        <g transform="translate(785, 60)">
          <foreignObject x="-16" y="-16" width="32" height="32">
            <div className="flex items-center justify-center w-8 h-8">
              <Home className="w-8 h-8 text-black" />
            </div>
          </foreignObject>
        </g>

        {/* Progress indicator dots along the path */}
        {[0.2, 0.4, 0.6, 0.8].map((position, index) => {
          const dotPos = getCarPosition(position);
          return (
            <circle
              key={index}
              cx={dotPos.x}
              cy={dotPos.y}
              r="3"
              fill={scrollProgress >= position ? "#FFB400" : "#E5E7EB"}
              className="transition-colors duration-300"
            />
          );
        })}
      </svg>
    </div>
  );
}
