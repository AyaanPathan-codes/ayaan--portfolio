import React, { useEffect, useRef } from "react";

const CustomCursor = React.memo(() => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let visible = false;

    const move = (e: MouseEvent) => {
      if (!visible) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        visible = true;
      }
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      ring.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    };

    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      visible = false;
    };

    const show = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      visible = true;
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          background: "hsl(183 100% 50%)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-foreground/30"
        style={{
          opacity: 0,
          mixBlendMode: "difference",
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      />
    </>
  );
});

CustomCursor.displayName = "CustomCursor";
export default CustomCursor;
