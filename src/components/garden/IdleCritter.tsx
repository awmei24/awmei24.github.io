import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const IDLE_MS = 40_000;
/* minimum gap between appearances so the snail stays rare and charming */
const MIN_GAP_MS = 90_000;
const CRAWL_S = 14;

function Snail() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
      {/* shell spiral */}
      <circle cx="14" cy="12" r="7" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M14 12 a3.5 3.5 0 0 1 3.5 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* body */}
      <path d="M7 19 C10 20 22 20 26 19 C28.5 18.5 29 16 28 14" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* antennae */}
      <path d="M28 14 L30 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M28.5 14.5 L32.5 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="30" cy="7.4" r="0.8" fill="currentColor" />
      <circle cx="33" cy="10" r="0.8" fill="currentColor" />
    </svg>
  );
}

/* Egg #9 — after ~40s of inactivity a small snail crawls across the bottom. */
export function IdleCritter() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const lastShown = useRef(0);

  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;

    function arm() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (performance.now() - lastShown.current >= MIN_GAP_MS || lastShown.current === 0) {
          lastShown.current = performance.now();
          setActive(true);
        } else {
          arm();
        }
      }, IDLE_MS);
    }

    const events = ["mousemove", "scroll", "keydown", "pointerdown"] as const;
    const reset = () => arm();
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    arm();
    return () => {
      clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [reduce]);

  if (reduce || !active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed bottom-0.5 z-[6] text-stone/50 dark:text-sage-light/40 pointer-events-none"
      initial={{ x: -50 }}
      animate={{ x: typeof window !== "undefined" ? window.innerWidth + 50 : 2000 }}
      transition={{ duration: CRAWL_S, ease: "linear" }}
      onAnimationComplete={() => setActive(false)}
    >
      <Snail />
    </motion.div>
  );
}
