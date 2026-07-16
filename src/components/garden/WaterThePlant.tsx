import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "awm:garden:watered";
/* drag events accumulated over the sprout before each growth step —
   higher = slower, more gradual growth toward 50% and 100% */
const POUR_PER_STAGE = 512;
/* total watering from bare seedling to full bloom */
const TOTAL_POUR = POUR_PER_STAGE * 2;

type Stage = 0 | 1 | 2; // seedling → sprout → bloom

function WateringCanIcon({ pouring }: { pouring: boolean }) {
  return (
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none" aria-hidden="true">
      {/* body */}
      <path
        d="M12 14 h16 v12 a4 4 0 0 1 -4 4 h-8 a4 4 0 0 1 -4 -4 z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* handle */}
      <path d="M15 14 a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {/* spout */}
      <path d="M28 18 L38 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M36 8 L40 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* droplets from the spout while pouring */}
      {pouring && (
        <g>
          <motion.circle
            cx="39" cy="14" r="1.2" fill="currentColor"
            animate={{ cy: [14, 24], opacity: [0.9, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeIn" }}
          />
          <motion.circle
            cx="41" cy="13" r="1" fill="currentColor"
            animate={{ cy: [13, 23], opacity: [0.8, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeIn", delay: 0.2 }}
          />
        </g>
      )}
    </svg>
  );
}

/* `growth` is a continuous 0→1 value so the plant swells in real time while
   it's being watered — the discrete stages just gate when new parts appear. */
function PlantIcon({ stage, growth }: { stage: Stage; growth: number }) {
  return (
    <svg width="52" height="56" viewBox="0 0 52 56" fill="none" aria-hidden="true">
      {/* soil mound */}
      <path d="M14 52 Q26 46 38 52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* everything above the soil grows smoothly as water accumulates */}
      <motion.g
        initial={false}
        animate={{ scaleY: 0.68 + growth * 0.32, scaleX: 0.8 + growth * 0.2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "26px 52px" }}
      >
      {/* stage 0 — seedling nub */}
      <motion.g
        initial={false}
        animate={{ opacity: 1 }}
      >
        <path d="M26 50 L26 44" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M26 46 C26 46 22.5 45 21.5 42" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      </motion.g>
      {/* stage 1 — taller sprout with leaves */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "26px 50px" }}
          >
            <path d="M26 44 L26 28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M26 38 C26 38 19 36 17 29 C22 27 26 31 26 38Z" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
            <path d="M26 33 C26 33 33 30 35 24 C30 22 26 26 26 33Z" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>
      {/* stage 2 — bloom */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "26px 28px" }}
          >
            <path d="M26 28 L26 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="26" cy="12" r="3" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <circle cx="26" cy="5.5" r="2.4" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="20" cy="9" r="2.4" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="32" cy="9" r="2.4" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="21.5" cy="15.5" r="2.4" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="30.5" cy="15.5" r="2.4" stroke="currentColor" strokeWidth="1" fill="none" />
          </motion.g>
        )}
      </AnimatePresence>
      </motion.g>
    </svg>
  );
}

/* ── Shared state ────────────────────────────────────────────────────────────
   Egg #1 — the watering can and the sprout can now live in different spots on
   the page (the can frames the portrait, the sprout sits by the copy). Drag the
   can all the way over to the sprout to grow it; tap / Enter also waters. */
interface WaterGarden {
  stage: Stage;
  growth: number;
  pouring: boolean;
  message: string;
  reduce: boolean;
  plantRef: React.RefObject<HTMLButtonElement | null>;
  water: (amount: number) => void;
  resetPlant: () => void;
  handleDrag: (e: unknown, info: { point: { x: number; y: number } }) => void;
  endPour: () => void;
}

const WaterGardenContext = createContext<WaterGarden | null>(null);

function useWaterGarden() {
  const ctx = useContext(WaterGardenContext);
  if (!ctx) throw new Error("Garden pieces must be rendered inside <WaterGardenProvider>");
  return ctx;
}

export function WaterGardenProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion() ?? false;
  const alreadyBloomed = localStorage.getItem(STORAGE_KEY) === "true";
  const [stage, setStage] = useState<Stage>(alreadyBloomed ? 2 : 0);
  const [growth, setGrowth] = useState(alreadyBloomed ? 1 : 0);
  const [pouring, setPouring] = useState(false);
  const [message, setMessage] = useState("");
  /* total water poured so far (0 → TOTAL_POUR); drives continuous growth */
  const poured = useRef(alreadyBloomed ? TOTAL_POUR : 0);
  const plantRef = useRef<HTMLButtonElement>(null);

  /* Add `amount` water and let the plant grow smoothly toward the next stage. */
  function water(amount: number) {
    if (stage === 2) return;
    poured.current = Math.min(TOTAL_POUR, poured.current + amount);
    const g = poured.current / TOTAL_POUR;
    setGrowth(g);
    const nextStage: Stage = g >= 1 ? 2 : g >= 0.5 ? 1 : 0;
    setStage((s) => {
      if (nextStage > s) {
        if (nextStage === 2) {
          localStorage.setItem(STORAGE_KEY, "true");
          setMessage("🌿 thanks for tending");
        } else {
          setMessage("the sprout is growing…");
        }
      }
      return nextStage > s ? nextStage : s;
    });
  }

  function resetPlant() {
    if (stage !== 2) return;
    localStorage.removeItem(STORAGE_KEY);
    poured.current = 0;
    setGrowth(0);
    setStage(0);
    setMessage("replanted — water it again sometime");
  }

  function handleDrag(_: unknown, info: { point: { x: number; y: number } }) {
    const plant = plantRef.current?.getBoundingClientRect();
    if (!plant || stage === 2) return;
    const over =
      info.point.x > plant.left - 24 &&
      info.point.x < plant.right + 24 &&
      info.point.y > plant.top - 40 &&
      info.point.y < plant.bottom + 20;
    setPouring(over);
    /* water a little on every frame the can hovers the sprout, so the plant
       visibly swells while you're pouring — not only when you stop */
    if (over) water(1);
  }

  return (
    <WaterGardenContext.Provider
      value={{
        stage, growth, pouring, message, reduce, plantRef,
        water, resetPlant, handleDrag,
        endPour: () => setPouring(false),
      }}
    >
      {children}
    </WaterGardenContext.Provider>
  );
}

/* The sprout / flower — lives near the copy; clicking a full bloom replants it. */
export function GardenPlant({ className = "" }: { className?: string }) {
  const { stage, growth, pouring, message, reduce, plantRef, resetPlant } = useWaterGarden();

  return (
    <div className={`group flex items-end gap-2 ${className}`}>
      <motion.button
        ref={plantRef}
        type="button"
        onClick={resetPlant}
        aria-label={
          stage === 2
            ? "a blooming flower — click to replant it"
            : "a little sprout waiting to be watered"
        }
        className={`text-sage ${stage === 2 ? "cursor-pointer" : "cursor-default"} bg-transparent border-0 p-0`}
        animate={pouring && !reduce ? { rotate: [-3, 3, -3] } : { rotate: 0 }}
        transition={{ duration: 0.4, repeat: pouring ? Infinity : 0 }}
      >
        <PlantIcon stage={stage} growth={growth} />
      </motion.button>

      {/* hint appears on approach (hover/focus); the bloomed thanks stays visible */}
      <span
        className={`font-serif italic text-xs whitespace-nowrap mb-1 select-none transition duration-300 ${
          stage === 2
            ? "text-sage opacity-100"
            : "text-stone/70 dark:text-sage-light/70 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
        }`}
      >
        {stage === 2 ? "thanks for tending :)" : "psst—water me!"}
      </span>

      {/* polite announcements for screen readers */}
      <span aria-live="polite" className="sr-only">
        {message}
      </span>
    </div>
  );
}

/* The watering can — sits as a framing accent on the portrait. Drag it over the
   sprout to water; tap / Enter waters too (accessible fallback). */
export function GardenWateringCan({ className = "" }: { className?: string }) {
  const { pouring, reduce, water, handleDrag, endPour } = useWaterGarden();

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="watering can — drag it over the sprout (or press enter) to water"
      className={`text-stone/70 dark:text-sage-light/70 cursor-grab active:cursor-grabbing touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage rounded ${className}`}
      drag={!reduce}
      dragSnapToOrigin
      dragMomentum={false}
      onDrag={handleDrag}
      onDragEnd={endPour}
      onTap={() => water(POUR_PER_STAGE)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          water(POUR_PER_STAGE);
        }
      }}
      whileHover={{ rotate: -8 }}
      whileDrag={{ rotate: -28, scale: 1.05, zIndex: 50 }}
    >
      <WateringCanIcon pouring={pouring} />
    </motion.div>
  );
}
