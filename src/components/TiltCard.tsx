import React, { useCallback, useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  style?: React.CSSProperties;
}

const TiltCard = React.memo(({ children, className = "", maxTilt = 6, scale = 1.02, style }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const applyTilt = useCallback((clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(${scale}, ${scale}, ${scale})`;
  }, [maxTilt, scale]);

  const resetTilt = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    applyTilt(e.clientX, e.clientY);
  }, [applyTilt]);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) applyTilt(touch.clientX, touch.clientY);
  }, [applyTilt]);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={resetTilt}
      onTouchMove={onTouchMove}
      onTouchEnd={resetTilt}
      className={className}
      style={{ transition: "transform 0.2s ease-out", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
});

TiltCard.displayName = "TiltCard";
export default TiltCard;
