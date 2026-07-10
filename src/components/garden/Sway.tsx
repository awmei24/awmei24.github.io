import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SwayProps {
  children: ReactNode;
  className?: string;
  /* seconds per sway cycle — vary per element so botanicals aren't in lockstep */
  duration?: number;
  hover?: boolean;
}

/* Living botanicals (egg #4): gentle idle sway, stronger wobble on hover. */
export function Sway({ children, className, duration = 5, hover = true }: SwayProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "50% 90%" }}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      whileHover={hover ? { rotate: 9, scale: 1.1 } : undefined}
    >
      {children}
    </motion.div>
  );
}
