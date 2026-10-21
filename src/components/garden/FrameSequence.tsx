import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FrameSequenceProps {
  frame: number;
  count: number;
  renderFrame: (i: number) => ReactNode;
  /* seconds for a new frame to ease in */
  fadeIn?: number;
  /* seconds the previous frame stays solid underneath before dropping out */
  hold?: number;
  /* seconds a later frame takes to clear when stepping backwards (a reset) */
  reset?: number;
}

/* Stacks same-canvas frames in place and cross-fades to `frame`: the new frame
   eases in on top (later frames stack higher) while the old one stays solid
   underneath, then quietly drops out — no dip in between. */
export function FrameSequence({ frame, count, renderFrame, fadeIn = 0.9, hold = 0.8, reset = 0.3 }: FrameSequenceProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={i === frame ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={
            i === frame
              ? { duration: fadeIn, ease: "easeInOut" }
              : i > frame
                ? { duration: reset, ease: "easeOut" }
                : { opacity: { delay: hold, duration: 0.3 }, scale: { delay: hold, duration: 0 } }
          }
          className="absolute inset-0 block"
          style={{ originX: 0.5, originY: 0.88 }}
        >
          {renderFrame(i)}
        </motion.span>
      ))}
    </>
  );
}
