import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CeramicsWheelFrame } from "../decorative/Botanical";
import { FrameSequence } from "./FrameSequence";

/* empty wheel → centred clay → shaped up into a little vase */
const FRAMES = 8;
const LAST = FRAMES - 1;
/* seconds the whole throw takes, spread evenly across the frames */
const SPIN_S = 6;

/* Egg #8 — click to spin the wheel and throw a little pot (ceramics nod). */
export function PotteryWheel({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const thrown = frame === LAST;

  useEffect(() => () => {
    if (interval.current) clearInterval(interval.current);
  }, []);

  function throwPot() {
    if (spinning) return;
    if (reduce) {
      setFrame((f) => (f === LAST ? 0 : LAST));
      return;
    }
    setFrame(0);
    setSpinning(true);
    let next = 0;
    interval.current = setInterval(() => {
      next += 1;
      setFrame(next);
      if (next === LAST) {
        if (interval.current) clearInterval(interval.current);
        setSpinning(false);
      }
    }, (SPIN_S * 1000) / LAST);
  }

  return (
    <button
      type="button"
      onClick={throwPot}
      aria-label="throw a pot"
      title="throw a pot"
      className={`group relative inline-flex flex-col items-center bg-transparent border-0 p-1 cursor-pointer text-sage hover:text-clay transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage rounded ${className}`}
    >
      {/* the frames share one canvas, so they stack in place */}
      <span className="relative block" style={{ width: 120, height: 120 }}>
        <FrameSequence
          frame={frame}
          count={FRAMES}
          fadeIn={0.6}
          hold={0.5}
          renderFrame={(i) => <CeramicsWheelFrame frame={i} size={120} className="block" />}
        />
      </span>
      {/* out of flow and centred under the wheel, so the label swap never resizes
          the button and nudges the wheel sideways */}
      <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70 transition-opacity duration-200">
        {thrown ? "a little pot ✦" : "throw a pot"}
      </span>
    </button>
  );
}
