import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCustomTheme } from "@/App";

const HeroBlobs = () => {
  const { theme } = useCustomTheme();
  const isTouchRef = useRef(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 35, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 35, damping: 22 });

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchRef.current) return;

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX - window.innerWidth / 2);
      rawY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  const isDark = theme === "dark";

  const blobA = isDark ? "#2a3060" : "#d6c9a8";
  const blobB = isDark ? "#1e2848" : "#c9b59a";
  const blobC = isDark ? "#252d5a" : "#ddd0b2";

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Blob A — autonomous drift top-left → center-left → top-right */}
      <motion.div
        animate={{
          x: ["0%", "20%", "45%", "20%", "0%"],
          y: ["0%", "15%", "5%", "-10%", "0%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "55%",
          height: "65%",
          borderRadius: "50%",
          background: blobA,
          filter: "blur(100px)",
          opacity: 0.22,
        }}
      />

      {/* Blob B — autonomous drift bottom-right → center → bottom-left */}
      <motion.div
        animate={{
          x: ["0%", "-25%", "-40%", "-20%", "0%"],
          y: ["0%", "-10%", "8%", "5%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: "50%",
          height: "60%",
          borderRadius: "50%",
          background: blobB,
          filter: "blur(100px)",
          opacity: 0.22,
        }}
      />

      {/* Blob C — lazily follows cursor */}
      <motion.div
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: blobC,
          filter: "blur(100px)",
          opacity: 0.18,
        }}
      />
    </div>
  );
};

export default HeroBlobs;
