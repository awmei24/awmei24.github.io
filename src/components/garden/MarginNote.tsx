import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { marginNotes } from "../../lib/content";

const ROTATE_MS = 20_000;

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

/* Egg #11 — rotating almanac marginalia; starts from a day-of-year pick. */
export function MarginNote({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(() => dayOfYear() % marginNotes.length);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % marginNotes.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [reduce]);

  if (marginNotes.length === 0) return null;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.6 }}
          className="font-serif italic text-xs text-stone/70 dark:text-sage-light/60 tracking-wide"
        >
          {marginNotes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
