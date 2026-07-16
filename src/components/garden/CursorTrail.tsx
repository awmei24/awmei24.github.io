import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SmallLeaf } from "../decorative/Botanical";

interface Particle {
  id: number;
  x: number;
  y: number;
  drift: number;
  rotate: number;
  light: boolean;
}

const SPAWN_MS = 80;
const MAX_PARTICLES = 12;
const LIFE_MS = 1300;

/* Egg #3 — sage leaves gently trail the cursor and drift down. */
export function CursorTrail() {
  const reduce = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastSpawn = useRef(0);
  const nextId = useRef(0);

  useEffect(() => {
    if (reduce) return;
    // no hover pointer → no trail (touch devices)
    if (window.matchMedia("(hover: none)").matches) return;

    function onMove(e: PointerEvent) {
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_MS) return;
      lastSpawn.current = now;
      const id = nextId.current++;
      setParticles((ps) => [
        ...ps.slice(-(MAX_PARTICLES - 1)),
        {
          id,
          x: e.clientX,
          y: e.clientY,
          drift: (Math.random() - 0.5) * 48,
          rotate: (Math.random() - 0.5) * 180,
          light: Math.random() > 0.5,
        },
      ]);
      window.setTimeout(
        () => setParticles((ps) => ps.filter((p) => p.id !== id)),
        LIFE_MS
      );
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute ${p.light ? "text-sage-light" : "text-sage"}`}
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0.35, x: 0, y: 0, rotate: 0, scale: 0.9 }}
          animate={{ opacity: 0, x: p.drift, y: 70, rotate: p.rotate, scale: 0.6 }}
          transition={{ duration: LIFE_MS / 1000, ease: "easeOut" }}
        >
          <SmallLeaf size={12} />
        </motion.span>
      ))}
    </div>
  );
}
