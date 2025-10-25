import { useState, useRef, useEffect } from "react";

interface GlassIconItem {
  icon: React.ReactNode;
  color: string;
  label: string;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const GlassIcons = ({ items, className = "" }: GlassIconsProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500/20 to-cyan-500/20 border-blue-400/30",
      purple: "from-purple-500/20 to-pink-500/20 border-purple-400/30",
      red: "from-red-500/20 to-rose-500/20 border-red-400/30",
      indigo: "from-indigo-500/20 to-blue-500/20 border-indigo-400/30",
      orange: "from-orange-500/20 to-amber-500/20 border-orange-400/30",
      green: "from-green-500/20 to-emerald-500/20 border-green-400/30",
    };
    return colorMap[color] || colorMap.blue;
  };

  const getHoverColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50",
      purple: "hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50",
      red: "hover:from-red-500/30 hover:to-rose-500/30 hover:border-red-400/50",
      indigo: "hover:from-indigo-500/30 hover:to-blue-500/30 hover:border-indigo-400/50",
      orange: "hover:from-orange-500/30 hover:to-amber-500/30 hover:border-orange-400/50",
      green: "hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50",
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-40 blur-3xl transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.2), transparent 70%)`,
        }}
      />

      {/* Glass icons grid - single item layout */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
                 {items.map((item, index) => (
           <div
             key={index}
             className={`
               relative group bg-gradient-to-br ${getColorClasses(item.color)}
               backdrop-blur-xl border rounded-2xl w-full h-full
               transition-all duration-300 cursor-pointer
               ${getHoverColorClasses(item.color)}
               ${hoveredIndex === index ? "scale-105 shadow-2xl" : "scale-100"}
               ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-60" : "opacity-100"}
             `}
             onMouseEnter={() => setHoveredIndex(index)}
             onMouseLeave={() => setHoveredIndex(null)}
             style={{
               transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
             }}
           >
             {/* Content - adapts to single or multiple items */}
             {items.length > 1 ? (
               <div className="flex flex-col items-center justify-center h-full p-6 space-y-3">
                 <div className="text-4xl text-white/90 group-hover:scale-110 transition-transform duration-300">
                   {item.icon}
                 </div>
                 <div className="text-sm font-medium text-white/80 text-center">
                   {item.label}
                 </div>
               </div>
             ) : (
               <div className="flex flex-col h-full">
                 {item.icon}
               </div>
             )}

             {/* Hover glow effect */}
             {hoveredIndex === index && (
               <div
                 className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
                 style={{
                   background: `radial-gradient(circle at center, currentColor, transparent 70%)`,
                   filter: `blur(20px)`,
                 }}
               />
             )}
           </div>
         ))}
      </div>

      {/* Glass border effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-[1px] rounded-[inherit] border border-white/10"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default GlassIcons;
