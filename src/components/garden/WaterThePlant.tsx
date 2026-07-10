import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "awm:garden:watered";
/* drag events accumulated over the sprout before each growth step */
const POUR_PER_STAGE = 22;

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

function PlantIcon({ stage }: { stage: Stage }) {
  return (
    <svg width="52" height="56" viewBox="0 0 52 56" fill="none" aria-hidden="true">
      {/* soil mound */}
      <path d="M14 52 Q26 46 38 52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
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
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
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
            initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
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
    </svg>
  );
}

/* Egg #1 — drag the watering can over the sprout to grow it (click also works). */
export function WaterThePlant({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>(() =>
    localStorage.getItem(STORAGE_KEY) === "true" ? 2 : 0
  );
  const [pouring, setPouring] = useState(false);
  const [message, setMessage] = useState("");
  const pourProgress = useRef(0);
  const plantRef = useRef<HTMLButtonElement>(null);

  function grow() {
    setStage((s) => {
      const next = Math.min(2, s + 1) as Stage;
      if (next === 2) {
        localStorage.setItem(STORAGE_KEY, "true");
        setMessage("🌿 thanks for tending");
      } else if (next > s) {
        setMessage("the sprout is growing…");
      }
      return next;
    });
  }

  function resetPlant() {
    if (stage !== 2) return;
    localStorage.removeItem(STORAGE_KEY);
    pourProgress.current = 0;
    setStage(0);
    setMessage("replanted — water it again sometime");
  }

  function handleDrag(_: unknown, info: { point: { x: number; y: number } }) {
    const plant = plantRef.current?.getBoundingClientRect();
    if (!plant || stage === 2) return;
    const over =
      info.point.x > plant.left - 14 &&
      info.point.x < plant.right + 14 &&
      info.point.y > plant.top - 40 &&
      info.point.y < plant.bottom + 10;
    setPouring(over);
    if (over) {
      pourProgress.current += 1;
      if (pourProgress.current >= POUR_PER_STAGE) {
        pourProgress.current = 0;
        grow();
      }
    }
  }

  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {/* the plant — clicking a full bloom replants it */}
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
        <PlantIcon stage={stage} />
      </motion.button>

      {/* the watering can — draggable; tap/Enter also waters */}
      {stage < 2 && (
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="watering can — drag it over the sprout (or press enter) to water"
          className="text-stone/70 dark:text-sage-light/70 cursor-grab active:cursor-grabbing touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage rounded"
          drag={!reduce}
          dragSnapToOrigin
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={() => setPouring(false)}
          onTap={grow}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              grow();
            }
          }}
          whileDrag={{ rotate: -28, scale: 1.05 }}
        >
          <WateringCanIcon pouring={pouring} />
        </motion.div>
      )}

      {/* bloom feedback */}
      <AnimatePresence>
        {message === "🌿 thanks for tending" && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-serif italic text-xs text-sage whitespace-nowrap mb-2"
          >
            {message}
          </motion.span>
        )}
      </AnimatePresence>

      {/* polite announcements for screen readers */}
      <span aria-live="polite" className="sr-only">
        {message}
      </span>
    </div>
  );
}
