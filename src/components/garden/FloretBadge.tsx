import { Sway } from "./Sway";
import { LeafSprig } from "../decorative/Botanical";

/* Small sage leaf — overlaps the arched portrait frame. */
export function FloretBadge({ className = "" }: { className?: string }) {
  return (
    <Sway duration={6} className={className}>
      <span
        aria-hidden="true"
        className="block text-sage select-none drop-shadow-[0_6px_12px_rgba(31,31,31,0.22)]"
      >
        <LeafSprig size={42} />
      </span>
    </Sway>
  );
}
