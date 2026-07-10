import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SPIN_S = 2.6;

/* Egg #8 — click to spin the wheel and throw a little pot (ceramics nod). */
export function PotteryWheel({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [spinning, setSpinning] = useState(false);
  const [thrown, setThrown] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function throwPot() {
    if (spinning) return;
    if (reduce) {
      setThrown((t) => !t);
      return;
    }
    setThrown(false);
    setSpinning(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSpinning(false);
      setThrown(true);
    }, SPIN_S * 1000);
  }

  return (
    <button
      type="button"
      onClick={throwPot}
      aria-label="throw a pot"
      title="throw a pot"
      className={`group inline-flex flex-col items-center gap-1 bg-transparent border-0 p-1 cursor-pointer text-sage hover:text-clay transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage rounded ${className}`}
    >
      <svg width="56" height="52" viewBox="0 0 56 52" fill="none" aria-hidden="true">
        {/* the pot — squashed clay that rises while the wheel spins */}
        <motion.g
          style={{ transformOrigin: "28px 34px" }}
          initial={false}
          animate={
            spinning
              ? { scaleY: [0.25, 0.6, 0.9, 1], scaleX: [1.5, 1.2, 1.05, 1] }
              : thrown
                ? { scaleY: 1, scaleX: 1 }
                : { scaleY: 0.25, scaleX: 1.5 }
          }
          transition={
            spinning
              ? { duration: SPIN_S, ease: "easeOut" }
              : { type: "spring", stiffness: 240, damping: 15 }
          }
        >
          <path
            d="M20 12 h16 c-1 3 -0.5 5 1.5 7 c2.5 2.5 2.5 8 -1 11 c-2.5 2.2 -4.5 4 -8.5 4 s-6 -1.8 -8.5 -4 c-3.5 -3 -3.5 -8.5 -1 -11 c2 -2 2.5 -4 1.5 -7Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M22 12 c2 1.5 10 1.5 12 0" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
        </motion.g>
        {/* wheel disc */}
        <motion.g
          style={{ transformOrigin: "28px 38px" }}
          animate={spinning ? { rotateY: 360 * 3 } : { rotateY: 0 }}
          transition={spinning ? { duration: SPIN_S, ease: "easeOut" } : { duration: 0 }}
        >
          <ellipse cx="28" cy="38" rx="17" ry="4.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </motion.g>
        <path d="M28 42.5 L28 47" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M19 49 h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70 transition-opacity duration-200">
        {thrown ? "a little pot ✦" : "throw a pot"}
      </span>
    </button>
  );
}
