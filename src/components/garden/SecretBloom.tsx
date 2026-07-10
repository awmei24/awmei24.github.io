import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useGarden } from "./GardenContext";

const SECRET_WORDS = ["grow", "ceramics"];
const NOTE = "you found the garden 🌿 — thanks for looking closely.";
const NOTE_MS = 3800;
const PETAL_COUNT = 22;
const PETAL_GLYPHS = ["❋", "✿", "🍃"];

interface Petal {
  id: number;
  startX: number;
  driftX: number;
  delay: number;
  glyph: string;
  size: number;
}

function makePetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    driftX: (Math.random() - 0.5) * 160,
    delay: Math.random() * 0.7,
    glyph: PETAL_GLYPHS[i % PETAL_GLYPHS.length],
    size: 14 + Math.random() * 12,
  }));
}

/* Egg #7 — type "grow" (or "ceramics") anywhere for a full-page bloom. */
export function SecretBloom() {
  const reduce = useReducedMotion();
  const { foundSecret } = useGarden();
  const [active, setActive] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const buffer = useRef("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-12);
      if (SECRET_WORDS.some((w) => buffer.current.endsWith(w))) {
        buffer.current = "";
        setPetals(makePetals());
        setActive(true);
        foundSecret();
        window.setTimeout(() => setActive(false), NOTE_MS);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [foundSecret]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <div aria-hidden="true" className="fixed inset-0 z-[95] pointer-events-none overflow-hidden">
            {!reduce &&
              petals.map((p) => (
                <motion.span
                  key={p.id}
                  className={p.id % 2 === 0 ? "absolute text-sage" : "absolute text-sage-light"}
                  style={{ left: `${p.startX}%`, top: "-5%", fontSize: p.size }}
                  initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    y: window.innerHeight * 1.15,
                    x: p.driftX,
                    opacity: [0, 0.8, 0.8, 0],
                    rotate: 240,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, delay: p.delay, ease: "easeIn" }}
                >
                  {p.glyph}
                </motion.span>
              ))}
            <motion.p
              initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center px-8 text-center"
            >
              <span className="font-serif italic text-xl md:text-2xl text-ink dark:text-cream bg-cream/85 dark:bg-night/85 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-[0_16px_40px_-16px_rgba(31,31,31,0.25)]">
                {NOTE}
              </span>
            </motion.p>
          </div>
        )}
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {active ? NOTE : ""}
      </span>
    </>
  );
}
