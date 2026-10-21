import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { readFlag, writeFlag } from "../../lib/storage";
import { WateringCan, WildFlowerFrame } from "../decorative/Botanical";
import { FrameSequence } from "./FrameSequence";

const STORAGE_KEY = "awm:garden:watered";
/* seconds of pouring over the sprout per growth step —
   higher = slower, more gradual growth toward 50% and 100% */
const SECONDS_PER_STAGE = 2.5;
/* growth added by one tap / Enter on the can */
const STAGE_STEP = 0.5;

type Stage = 0 | 1 | 2; // seedling → sprout → bloom

function stageOf(growth: number): Stage {
  return growth >= 1 ? 2 : growth >= STAGE_STEP ? 1 : 0;
}

const CAN_WIDTH = 52;
/* the spout's opening, as a fraction of the cropped can (it points up-left, toward the sprout) */
const SPOUT_TIP = { x: 0.08, y: 0.3 };
/* matches the can's whileDrag tilt; droplets counter-rotate so they fall straight down */
const POUR_TILT = -28;

function WateringCanIcon({ pouring }: { pouring: boolean }) {
  return (
    <span className="relative block">
      <WateringCan width={CAN_WIDTH} className="block" />
      {/* droplets from the spout while pouring */}
      {pouring && (
        <span
          className="absolute block"
          style={{ left: `${SPOUT_TIP.x * 100}%`, top: `${SPOUT_TIP.y * 100}%`, rotate: `${-POUR_TILT}deg` }}
        >
          {[
            { size: 2.6, drift: -2, delay: 0 },
            { size: 2, drift: -4, delay: 0.18 },
            { size: 2.2, drift: -1, delay: 0.34 },
          ].map((d, i) => (
            <motion.span
              key={i}
              className="absolute block rounded-full bg-current"
              style={{ width: d.size, height: d.size, left: -d.size / 2, top: -d.size / 2 }}
              animate={{ y: [0, 16], x: [0, d.drift], opacity: [0.9, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeIn", delay: d.delay }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

/* stem → one leaf → two leaves → bud while watering; the full wildflower only at bloom */
const SPROUT_FRAMES = 4;

function frameOf(growth: number) {
  return growth >= 1 ? SPROUT_FRAMES : Math.min(SPROUT_FRAMES - 1, Math.floor(growth * SPROUT_FRAMES));
}

/* `growth` is a continuous 0→1 value; it steps through the wildflower frames
   and swells slightly in real time while the plant is being watered. */
function PlantIcon({ growth }: { growth: number }) {
  const frame = frameOf(growth);
  const grow = { duration: 0.3, ease: "easeOut" } as const;

  return (
    <span className="relative block" style={{ width: 52, height: 56 }}>
      <svg width="52" height="56" viewBox="0 0 52 56" fill="none" aria-hidden="true">
        {/* soil mound */}
        <path d="M14 52 Q26 46 38 52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
      {/* the frames share one canvas, so they stack in place; the stem base sits ~88% down it */}
      <motion.span
        initial={false}
        animate={{ scale: 0.9 + growth * 0.1 }}
        transition={grow}
        className="absolute left-0 top-1 block"
        style={{ width: 52, height: 52, originX: 0.5, originY: 0.88 }}
      >
        <FrameSequence
          frame={frame}
          count={SPROUT_FRAMES + 1}
          renderFrame={(i) => <WildFlowerFrame frame={i} size={52} className="block" />}
        />
      </motion.span>
    </span>
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
  const [growth, setGrowth] = useState(() => (readFlag(STORAGE_KEY) ? 1 : 0));
  const stage = stageOf(growth);
  const [pouring, setPouring] = useState(false);
  const [message, setMessage] = useState("");
  /* mirrors `growth` so water() can compare before/after without a stale closure */
  const growthRef = useRef(growth);
  const plantRef = useRef<HTMLButtonElement>(null);

  /* Add `amount` (0→1 scale) of water; announce and persist when a stage is crossed. */
  const water = useCallback((amount: number) => {
    const prev = growthRef.current;
    if (prev >= 1) return;
    const next = Math.min(1, prev + amount);
    growthRef.current = next;
    setGrowth(next);

    const from = stageOf(prev);
    const to = stageOf(next);
    if (to === from) return;
    if (to === 2) {
      writeFlag(STORAGE_KEY, true);
      setMessage("🌿 thanks for tending");
      setPouring(false);
    } else {
      setMessage("the sprout is growing…");
    }
  }, []);

  /* while the can hovers the sprout, pour at a steady rate per second —
     independent of mouse polling rate, and still pours if the can is held still */
  useEffect(() => {
    if (!pouring) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      water(((now - last) / 1000) * (STAGE_STEP / SECONDS_PER_STAGE));
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pouring, water]);

  function resetPlant() {
    if (stage !== 2) return;
    writeFlag(STORAGE_KEY, false);
    growthRef.current = 0;
    setGrowth(0);
    setMessage("replanted — water it again sometime");
  }

  function handleDrag(_: unknown, info: { point: { x: number; y: number } }) {
    const plant = plantRef.current?.getBoundingClientRect();
    if (!plant || growthRef.current >= 1) return;
    /* info.point is page-relative (pageX/Y); the rect is viewport-relative */
    const x = info.point.x - window.scrollX;
    const y = info.point.y - window.scrollY;
    const over =
      x > plant.left - 24 &&
      x < plant.right + 24 &&
      y > plant.top - 40 &&
      y < plant.bottom + 20;
    setPouring(over);
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
        <PlantIcon growth={growth} />
      </motion.button>

      {/* hint appears on approach (hover/focus); the bloomed thanks stays visible */}
      <span
        className={`font-serif italic text-xs whitespace-nowrap mb-1 select-none transition duration-300 ${
          stage === 2
            ? "text-sage-ink opacity-100"
            : "text-muted dark:text-sage-light/70 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
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
  /* framer-motion still fires onTap when a drag is released over the can,
     so a drag must not also count as a tap-to-water */
  const dragged = useRef(false);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="watering can — drag it over the sprout (or press enter) to water"
      className={`text-muted dark:text-sage-light/70 cursor-grab active:cursor-grabbing touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage rounded ${className}`}
      drag={!reduce}
      dragSnapToOrigin
      dragMomentum={false}
      onPointerDown={() => (dragged.current = false)}
      onDragStart={() => (dragged.current = true)}
      onDrag={handleDrag}
      onDragEnd={endPour}
      onTap={() => {
        if (!dragged.current) water(STAGE_STEP);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          water(STAGE_STEP);
        }
      }}
      whileHover={{ rotate: -8 }}
      whileDrag={{ rotate: POUR_TILT, scale: 1.05, zIndex: 50 }}
    >
      <WateringCanIcon pouring={pouring} />
    </motion.div>
  );
}
