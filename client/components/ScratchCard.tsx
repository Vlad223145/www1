import { useRef, useEffect, useState, useCallback } from "react";

interface ScratchCardProps {
  code: string;
  onRevealed?: () => void;
}

export default function ScratchCard({ code, onRevealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Fill with scratch-off surface
    ctx.fillStyle = "#D1D5DB";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add texture pattern
    ctx.fillStyle = "#9CA3AF";
    for (let i = 0; i < rect.width; i += 4) {
      for (let j = 0; j < rect.height; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }

    // Add "Scratch here" text
    ctx.fillStyle = "#6B7280";
    ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal", rect.width / 2, rect.height / 2 - 5);
    ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("your bonus", rect.width / 2, rect.height / 2 + 10);
  }, []);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(
        (x - rect.left) * scaleX,
        (y - rect.top) * scaleY,
        20 * window.devicePixelRatio,
        0,
        2 * Math.PI,
      );
      ctx.fill();

      // Check if enough has been scratched
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparent++;
        }
      }

      const scratchedPercentage = (transparent / (pixels.length / 4)) * 100;

      if (scratchedPercentage > 30 && !isRevealed) {
        setIsRevealed(true);
        onRevealed?.();
      }
    },
    [isRevealed, onRevealed],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsScratching(true);
      scratch(e.clientX, e.clientY);
    },
    [scratch],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isScratching) {
        scratch(e.clientX, e.clientY);
      }
    },
    [isScratching, scratch],
  );

  const handleMouseUp = useCallback(() => {
    setIsScratching(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsScratching(true);
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    },
    [scratch],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (isScratching) {
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
      }
    },
    [isScratching, scratch],
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(false);
  }, []);

  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      setTimeout(initCanvas, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  return (
    <div className="relative w-full h-24 bg-white rounded-xl overflow-hidden">
      {/* Bonus amount underneath */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black text-brand mb-1">{code}</div>
          <div className="text-sm font-bold text-green-600">BONUS</div>
        </div>
      </div>

      {/* Scratch surface */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-pointer select-none touch-none ${
          isRevealed ? "pointer-events-none opacity-0" : ""
        } transition-opacity duration-500`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
