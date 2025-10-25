import { useEffect, useRef } from "react";

interface LightRaysProps {
  raysOrigin?: "top-center" | "top-left" | "top-right" | "center" | "bottom-center";
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const LightRays = ({
  raysOrigin = "top-center",
  raysColor = "#00ffff",
  raysSpeed = 1.5,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.1,
  distortion = 0.05,
  className = "",
}: LightRaysProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (followMouse) {
        mousePos.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const getOriginPoint = () => {
      const { width, height } = canvas;
      const baseOrigins = {
        "top-center": { x: width / 2, y: 0 },
        "top-left": { x: 0, y: 0 },
        "top-right": { x: width, y: 0 },
        "center": { x: width / 2, y: height / 2 },
        "bottom-center": { x: width / 2, y: height },
      };

      const base = baseOrigins[raysOrigin];
      
      if (followMouse) {
        return {
          x: base.x + (mousePos.current.x - 0.5) * width * mouseInfluence,
          y: base.y + (mousePos.current.y - 0.5) * height * mouseInfluence,
        };
      }
      
      return base;
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const origin = getOriginPoint();
      const numRays = 80;
      
      time += 0.01 * raysSpeed;

      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2 * lightSpread;
        const noise = Math.sin(time + i * noiseAmount) * distortion;
        const finalAngle = angle + noise;
        
        const length = canvas.height * rayLength;
        const endX = origin.x + Math.cos(finalAngle) * length;
        const endY = origin.y + Math.sin(finalAngle) * length;

        const gradient = ctx.createLinearGradient(origin.x, origin.y, endX, endY);
        
        const opacity = 0.15 + Math.sin(time + i * 0.5) * 0.1;
        gradient.addColorStop(0, raysColor + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, raysColor + '10');
        gradient.addColorStop(1, raysColor + '00');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.sin(time + i) * 0.5;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion]);

  return (
    <canvas
      ref={canvasRef}
      className={`light-rays ${className}`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default LightRays;
