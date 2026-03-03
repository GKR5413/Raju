import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

type HoverState = "default" | "text" | "link";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const [hoverState, setHoverState] = useState<HoverState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);
  const stateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleState = (next: HoverState, delay: number) => {
    if (stateTimer.current) clearTimeout(stateTimer.current);
    stateTimer.current = setTimeout(() => setHoverState(next), delay);
  };

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice.current) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tag = el.tagName;

      if (
        tag === "A" ||
        tag === "BUTTON" ||
        el.closest("a, button") ||
        el.getAttribute("role") === "button"
      ) {
        scheduleState("link", 80);
      } else if (
        ["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "LI"].includes(tag)
      ) {
        scheduleState("text", 80);
      } else {
        // Longer delay on collapse so crossing line gaps doesn't flicker
        scheduleState("default", 220);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (stateTimer.current) clearTimeout(stateTimer.current);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice.current) return null;
  if (!isVisible) return null;

  const isText = hoverState === "text";
  const isLink = hoverState === "link";

  const ringSize = isText ? 240 : isLink ? 200 : 96;
  const dotSize = isLink ? 10 : 7;

  // Rendered via portal directly into document.body so the fixed element
  // lives outside any React stacking context (no parent transforms / opacity
  // layers that would confine mix-blend-mode to a sub-tree).
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999999,
        mixBlendMode: "difference",
      }}
    >
      {/* Outer ring — spring lag */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: isText ? "#ffffff" : "transparent",
          border: isText ? "none" : "1.5px solid #ffffff",
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 80, damping: 22, mass: 1.2 }}
      />
      {/* Inner dot — direct position */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </div>,
    document.body
  );
};

export default CustomCursor;
