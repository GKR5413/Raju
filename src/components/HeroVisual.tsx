import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import DepthHover from "./DepthHover";

// ─── types ──────────────────────────────────────────────────────────────────
type Seg = { text: string; cls: string };
type ScriptLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; segs: Seg[] }
  | { kind: "blank" };

type DisplayItem =
  | { kind: "cmd"; text: string; typed: string; done: boolean }
  | { kind: "out"; segs: Seg[] }
  | { kind: "blank" }
  | { kind: "prompt" };

// ─── terminal script ─────────────────────────────────────────────────────────
const script: ScriptLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", segs: [
    { text: "raju",              cls: "text-amber-400"   },
    { text: "@gottumukkala",     cls: "text-neutral-600" },
    { text: "  ·  Software Eng", cls: "text-neutral-500" },
  ]},
  { kind: "blank" },

  { kind: "cmd", text: "./stack --list" },
  { kind: "out", segs: [{ text: "  backend  ", cls: "text-blue-400"   }, { text: "Java · Python · Spring",  cls: "text-neutral-400" }] },
  { kind: "out", segs: [{ text: "  cloud    ", cls: "text-blue-400"   }, { text: "AWS · Docker · K8s",      cls: "text-neutral-400" }] },
  { kind: "out", segs: [{ text: "  ai       ", cls: "text-violet-400" }, { text: "LangChain · RAG · OpenAI", cls: "text-neutral-400" }] },
  { kind: "blank" },

  { kind: "cmd", text: "git log --oneline | head -3" },
  { kind: "out", segs: [{ text: "a3f2b1 ", cls: "text-purple-400" }, { text: "✓ ", cls: "text-emerald-400" }, { text: "ship payment microservice",  cls: "text-neutral-400" }] },
  { kind: "out", segs: [{ text: "9d8e7f ", cls: "text-purple-400" }, { text: "✓ ", cls: "text-emerald-400" }, { text: "integrate AI code gen",       cls: "text-neutral-400" }] },
  { kind: "out", segs: [{ text: "5c4b3a ", cls: "text-purple-400" }, { text: "✓ ", cls: "text-emerald-400" }, { text: "k8s auto-scaling pipeline",   cls: "text-neutral-400" }] },
  { kind: "blank" },

  { kind: "cmd", text: "echo $STATUS" },
  { kind: "out", segs: [
    { text: "● ", cls: "text-emerald-400" },
    { text: "open to work · Kansas City, MO", cls: "text-neutral-500" },
  ]},
];

// ─── floating badges ─────────────────────────────────────────────────────────
const badges = [
  { name: "Java",       color: "#e8a027", style: { top: "3%",  left: "0%"   }, delay: 0.6, dur: 3.5 },
  { name: "Python",     color: "#4b8bbe", style: { top: "0%",  left: "57%"  }, delay: 0.9, dur: 4.0 },
  { name: "React",      color: "#61dafb", style: { top: "35%", left: "87%"  }, delay: 1.2, dur: 3.2 },
  { name: "TypeScript", color: "#3178c6", style: { top: "77%", left: "67%"  }, delay: 0.7, dur: 4.2 },
  { name: "AWS",        color: "#ff9900", style: { top: "82%", left: "4%"   }, delay: 1.0, dur: 3.8 },
  { name: "Docker",     color: "#2496ed", style: { top: "41%", left: "-3%"  }, delay: 0.8, dur: 4.5 },
  { name: "LangChain",  color: "#84cc16", style: { top: "-4%", left: "27%"  }, delay: 1.1, dur: 3.6 },
  { name: "Kubernetes", color: "#326ce5", style: { top: "60%", left: "85%"  }, delay: 0.5, dur: 4.3 },
];

// ─── component ───────────────────────────────────────────────────────────────
const HeroVisual = () => {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [items, setItems] = useState<DisplayItem[]>([]);

  // live clock
  const fmt = () =>
    new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  // char-by-char typing engine
  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const run = async () => {
      await sleep(380);

      for (const line of script) {
        if (cancelled) return;

        if (line.kind === "cmd") {
          // push skeleton with empty typed text
          setItems((p) => [...p, { kind: "cmd", text: line.text, typed: "", done: false }]);
          await sleep(90);

          // type each char
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return;
            const partial = line.text.slice(0, i);
            setItems((p) => {
              const next = [...p];
              next[next.length - 1] = { kind: "cmd", text: line.text, typed: partial, done: false };
              return next;
            });
            await sleep(38 + Math.random() * 32); // 38–70 ms — feels natural
          }

          // mark done (removes inline cursor, output follows)
          setItems((p) => {
            const next = [...p];
            next[next.length - 1] = { kind: "cmd", text: line.text, typed: line.text, done: true };
            return next;
          });
          await sleep(170);

        } else if (line.kind === "out") {
          setItems((p) => [...p, { kind: "out", segs: line.segs }]);
          await sleep(52);

        } else {
          setItems((p) => [...p, { kind: "blank" }]);
          await sleep(22);
        }
      }

      if (!cancelled) setItems((p) => [...p, { kind: "prompt" }]);
    };

    run();
    return () => { cancelled = true; };
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-full max-w-[420px] h-[410px] mx-auto">

      {/* SVG orbital rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none text-stone-400 dark:text-stone-700"
        style={{ opacity: 0.22 }}
        aria-hidden="true"
      >
        <motion.ellipse
          cx="50%" cy="50%" rx="44%" ry="43%"
          fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 9"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        />
        <ellipse
          cx="50%" cy="50%" rx="49%" ry="48%"
          fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 11"
        />
      </svg>

      {/* Floating tech badges */}
      {badges.map((b) => (
        <motion.div
          key={b.name}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1, y: [0, -11, 0] } : {}}
          transition={{
            opacity: { duration: 0.35, delay: b.delay },
            scale:   { duration: 0.35, delay: b.delay },
            y:       { duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay },
          }}
          style={{ position: "absolute", zIndex: 20, ...b.style }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
            bg-white/95 dark:bg-neutral-900/95
            border border-stone-200/90 dark:border-stone-800/90
            shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]
            backdrop-blur-sm whitespace-nowrap"
        >
          <motion.span
            animate={{ scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: b.dur * 0.7, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: b.color }}
          />
          <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
            {b.name}
          </span>
        </motion.div>
      ))}

      {/* Terminal card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[308px]"
        style={{ zIndex: 10 }}
      >
        {/* Multi-layer glow */}
        <div className="absolute -inset-10 rounded-3xl blur-3xl pointer-events-none opacity-[0.18]
          bg-gradient-to-br from-stone-400 via-stone-300 to-transparent
          dark:from-indigo-900 dark:via-blue-900 dark:to-transparent" />
        <div className="absolute -inset-4 rounded-2xl blur-xl pointer-events-none opacity-[0.12]
          bg-stone-300 dark:bg-blue-800" />

        {/* Gradient border */}
        <div
          className="rounded-xl p-px"
          style={{ background: "linear-gradient(145deg, #444 0%, #2a2a2a 40%, #555 70%, #333 100%)" }}
        >
          <DepthHover depth="subtle" scaleEffect={false} shadowColor="dark">
            <div
              className="rounded-xl bg-neutral-950 overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              {/* ── Title bar ── */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-neutral-900/90 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.6)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.5)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 ml-1 select-none">
                    ~/portfolio
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-600 tabular-nums select-none">
                  {time}
                </span>
              </div>

              {/* ── Body ── */}
              <div className="relative px-4 py-3 font-mono text-[11px] leading-[1.72] min-h-[220px]">
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
                    zIndex: 5,
                  }}
                />

                {items.map((item, i) => (
                  <div key={i} style={{ position: "relative", zIndex: 1 }}>
                    {item.kind === "cmd" && (
                      <div className="flex items-center">
                        <span className="text-emerald-500 select-none">$&nbsp;</span>
                        <span className="text-stone-100">{item.done ? item.text : item.typed}</span>
                        {!item.done && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-[6px] h-[13px] bg-stone-200 ml-0.5 rounded-[1px] align-middle"
                          />
                        )}
                      </div>
                    )}
                    {item.kind === "out" && (
                      <div>
                        {item.segs.map((s, j) => (
                          <span key={j} className={s.cls}>{s.text}</span>
                        ))}
                      </div>
                    )}
                    {item.kind === "blank" && <div className="h-[7px]" />}
                    {item.kind === "prompt" && (
                      <div className="flex items-center">
                        <span className="text-emerald-500 select-none">$&nbsp;</span>
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-[6px] h-[13px] bg-emerald-400 ml-0.5 rounded-[1px] align-middle"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── Status bar ── */}
              <div className="flex items-center justify-between px-3 py-[5px] bg-[#0d2818]/60 border-t border-white/[0.05]">
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                    />
                    <span className="text-emerald-500">connected</span>
                  </span>
                  <span className="text-neutral-600">git:main</span>
                  <span className="text-neutral-600">node:v20</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-700">zsh 5.9</span>
              </div>
            </div>
          </DepthHover>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
