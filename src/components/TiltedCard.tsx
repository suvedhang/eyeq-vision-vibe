import { useState, useRef, useEffect } from "react";

interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const TiltedCard = ({
  imageSrc,
  altText = "",
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = true,
  overlayContent,
  children,
  className = "",
}: TiltedCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * rotateAmplitude;
    const rotateY = ((centerX - x) / centerX) * rotateAmplitude;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className={`tilted-card-container ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
    >
      <div
        ref={cardRef}
        className="tilted-card-inner"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${
            isHovered ? scaleOnHover : 1
          })`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            style={{
              height: imageHeight,
              width: imageWidth,
              objectFit: "cover",
              borderRadius: "12px",
            }}
            className="tilted-card-image"
          />
        ) : (
          <div
            style={{
              height: imageHeight,
              width: imageWidth,
              borderRadius: "12px",
            }}
            className="bg-card border border-border p-6 flex flex-col justify-center"
          >
            {children}
          </div>
        )}

        {displayOverlayContent && overlayContent && isHovered && (
          <div
            className="tilted-card-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.7)",
              borderRadius: "12px",
              transform: "translateZ(20px)",
            }}
          >
            {overlayContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default TiltedCard;
