import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import Magnetic from "./Magnetic";
import HeroBlobs from "./HeroBlobs";
import HeroVisual from "./HeroVisual";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI/LLM Engineer",
  "Cloud & DevOps",
];

const stats = [
  { value: 3, label: "yrs experience" },
  { value: 3, label: "companies" },
  { value: 4, label: "projects shipped" },
  { value: 1, label: "OSS contribution" },
];

function AnimatedStat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, Math.round);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, { duration: 1.2, delay, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, motionVal, value, delay]);

  return (
    <div className="flex flex-col items-center">
      <motion.span
        ref={ref}
        className="text-2xl font-semibold text-stone-800 dark:text-stone-200 tabular-nums"
      >
        {rounded}
      </motion.span>
      <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mt-0.5 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Parallax motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 50, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 50, damping: 18 });

  const nameX = useTransform(springX, (v) => v * -14);
  const nameY = useTransform(springY, (v) => v * -8);
  const roleX = useTransform(springX, (v) => v * 7);
  const roleY = useTransform(springY, (v) => v * 4);
  const descX = useTransform(springX, (v) => v * -5);
  const descY = useTransform(springY, (v) => v * -3);
  const ctaX  = useTransform(springX, (v) => v * 3);
  const ctaY  = useTransform(springY, (v) => v * 2);
  const socX  = useTransform(springX, (v) => v * -2);
  const socY  = useTransform(springY, (v) => v * -1);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    rawY.set((e.clientY - (rect.top  + rect.height / 2)) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-stone-50 dark:bg-neutral-950"
      itemScope
      itemType="https://schema.org/Person"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 0 — ambient blobs */}
      <HeroBlobs />

      {/* Layer 1 — dot grid */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 1,
        }}
      />

      {/* Layer 2 — gradient washes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-stone-50/60 to-stone-100/40 dark:from-neutral-950/90 dark:via-neutral-950/70 dark:to-neutral-900/40"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-100/60 to-transparent dark:from-neutral-900/30 dark:to-transparent"
        style={{ zIndex: 2 }}
      />

      {/* Layer 3 — floating geometric accents */}
      {[
        { size: 180, top: "12%",  left: "3%",  delay: 0,   dur: 10 },
        { size: 90,  bottom: "18%", right: "6%", delay: 2, dur: 13 },
        { size: 260, top: "55%",  left: "40%", delay: 1,   dur: 15 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            top: s.top,
            bottom: (s as { bottom?: string }).bottom,
            left: (s as { left?: string }).left,
            right: (s as { right?: string }).right,
            borderRadius: "50%",
            border: "1px solid currentColor",
            opacity: 0.055,
            zIndex: 2,
          }}
          className="text-stone-900 dark:text-stone-100 pointer-events-none"
        />
      ))}

      {/* Main content */}
      <div
        className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
        style={{ zIndex: 10 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left column ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                />
                <span>Open to work</span>
                <span className="text-stone-300 dark:text-stone-600">—</span>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">Kansas City</span>,{" "}
                  <span itemProp="addressRegion">MO</span>
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ x: nameX, y: nameY }}
              className="mb-6"
            >
              <h1
                className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.1]"
                itemProp="name"
              >
                <span itemProp="givenName">Raju</span>{" "}
                <span className="text-stone-400 dark:text-stone-500" itemProp="familyName">
                  Gottumukkala
                </span>
              </h1>
            </motion.div>

            {/* Role ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ x: roleX, y: roleY }}
              className="mb-8 h-8 overflow-hidden"
            >
              <p
                className="text-xl sm:text-2xl text-stone-600 dark:text-stone-300 font-light"
                itemProp="jobTitle"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                    className="inline-block"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ x: descX, y: descY }}
              className="mb-10"
            >
              <p
                className="text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl"
                itemProp="description"
              >
                Building scalable fintech systems and AI-integrated platforms with{" "}
                <span className="text-stone-700 dark:text-stone-300">Java</span>,{" "}
                <span className="text-stone-700 dark:text-stone-300">Python</span>,{" "}
                <span className="text-stone-700 dark:text-stone-300">React</span>, and{" "}
                <span className="text-stone-700 dark:text-stone-300">LLM frameworks</span>. MS in
                Computer Science from UMKC.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ x: ctaX, y: ctaY }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Magnetic speed={0.2}>
                <Button
                  size="lg"
                  className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-white px-6 py-5 text-sm font-medium rounded-full transition-all duration-300"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get in touch
                </Button>
              </Magnetic>
              <Magnetic speed={0.2}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="group text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-6 py-5 text-sm font-medium rounded-full transition-all duration-300"
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View projects
                  <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Magnetic>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ x: socX, y: socY }}
              className="flex items-center gap-1 mb-10"
            >
              {[
                { icon: Github,   href: "https://github.com/GKR5413",          label: "GitHub"   },
                { icon: Linkedin, href: "https://linkedin.com/in/RAJU5413/",   label: "LinkedIn" },
                { icon: Mail,     href: "mailto:gkr5413@gmail.com",            label: "Email"    },
              ].map((social) => (
                <Magnetic key={social.label} speed={0.3}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors duration-200"
                    onClick={() => window.open(social.href, "_blank")}
                  >
                    <social.icon className="h-[18px] w-[18px]" />
                  </Button>
                </Magnetic>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-start gap-6"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-start gap-6">
                  <AnimatedStat value={stat.value} label={stat.label} delay={i * 0.15} />
                  {i < stats.length - 1 && (
                    <span className="text-stone-300 dark:text-stone-700 mt-2 select-none">·</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — terminal visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hidden lg:flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ChevronDown className="h-5 w-5 text-stone-300 dark:text-stone-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
