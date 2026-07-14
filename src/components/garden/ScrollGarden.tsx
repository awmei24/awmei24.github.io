import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useGarden } from "./GardenContext";
import { LeafSprig, Fern, TinyMushroom, Sprout, WildFlower } from "../decorative/Botanical";

const PLANTS: Record<string, { Mark: typeof LeafSprig; label: string }> = {
  about: { Mark: LeafSprig, label: "about" },
  work: { Mark: Fern, label: "work" },
  hobbies: { Mark: TinyMushroom, label: "hobbies" },
  writing: { Mark: Sprout, label: "writing" },
  contact: { Mark: WildFlower, label: "contact" },
};

/* Returns true when the given rgb(a) string reads as a dark color, null if it's
   fully transparent (so we can keep walking up the ancestor chain). */
function colorIsDark(color: string): boolean | null {
  const m = color.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  const alpha = m[4] !== undefined ? Number(m[4]) : 1;
  if (alpha === 0) return null;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/* Watches whatever section sits *behind* the ref element and reports whether
   that backdrop is dark, so the garden can contrast against it. */
function useBackdropIsDark(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  trigger: unknown,
) {
  const [isDark, setIsDark] = useState(false);
  /* holds the latest sampler so route-change re-samples always use it */
  const sampleRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!active) return;

    function sample() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      /* probe just above the very bottom, near the strip's leading edge */
      const x = rect.left + Math.min(rect.width, 48) / 2;
      const y = rect.top + rect.height / 2;
      /* the strip is pointer-events-none, so this returns the section behind it */
      let node = document.elementFromPoint(x, y) as HTMLElement | null;
      while (node) {
        const verdict = colorIsDark(getComputedStyle(node).backgroundColor);
        if (verdict !== null) {
          setIsDark(verdict);
          return;
        }
        node = node.parentElement;
      }
      setIsDark(false);
    }
    sampleRef.current = sample;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sample();
      });
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, active]);

  /* Re-sample after navigation — the strip is a persistent global, so a route
     change (e.g. onto the dark contact page, which may not scroll) otherwise
     leaves a stale tone. Sample a few times to catch the page-transition end. */
  useEffect(() => {
    if (!active) return;
    const timers = [80, 450, 850].map((ms) =>
      setTimeout(() => sampleRef.current(), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, [trigger, active]);

  return isDark;
}

/* Egg #2 — a plant sprouts in this bottom strip for each chapter you explore. */
export function ScrollGarden() {
  const { grown } = useGarden();
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const onDark = useBackdropIsDark(ref, grown.length > 0, pathname);

  if (grown.length === 0) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed bottom-0 left-4 md:left-10 z-[5] flex items-end gap-2 pointer-events-none opacity-60"
    >
      {grown.map((id, i) => {
        const plant = PLANTS[id];
        if (!plant) return null;
        const { Mark } = plant;
        /* dark ink over light sections, soft cream over dark sections —
           with a subtle alternation for variety within each mode */
        const tone = onDark
          ? i % 2 === 0
            ? "text-cream"
            : "text-sage-light"
          : i % 2 === 0
            ? "text-ink"
            : "text-stone";
        return (
          <motion.div
            key={id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 2 }}
            transition={
              reduce
                ? { duration: 0.4 }
                : { type: "spring", stiffness: 240, damping: 14, delay: i === grown.length - 1 ? 0.3 : 0 }
            }
            style={{ transformOrigin: "bottom center" }}
            className={`${tone} transition-colors duration-500`}
          >
            <Mark size={22 + ((i * 7) % 10)} />
          </motion.div>
        );
      })}
    </div>
  );
}
