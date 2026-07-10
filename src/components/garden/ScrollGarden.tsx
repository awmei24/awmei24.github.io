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

/* Egg #2 — a plant sprouts in this bottom strip for each chapter you explore. */
export function ScrollGarden() {
  const { grown } = useGarden();
  const reduce = useReducedMotion();

  if (grown.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-4 md:left-10 z-[5] flex items-end gap-2 pointer-events-none opacity-50"
    >
      {grown.map((id, i) => {
        const plant = PLANTS[id];
        if (!plant) return null;
        const { Mark } = plant;
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
            className={i % 2 === 0 ? "text-sage" : "text-sage-light"}
          >
            <Mark size={22 + ((i * 7) % 10)} />
          </motion.div>
        );
      })}
    </div>
  );
}
