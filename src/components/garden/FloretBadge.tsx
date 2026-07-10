import { Sway } from "./Sway";

/* Small ochre floret badge — overlaps the arched portrait frame. */
export function FloretBadge({ className = "" }: { className?: string }) {
  return (
    <Sway duration={6} className={className}>
      <span
        aria-hidden="true"
        className="flex items-center justify-center w-11 h-11 rounded-full bg-ochre text-ink font-serif italic text-xl shadow-[0_8px_20px_-8px_rgba(31,31,31,0.4)] select-none"
      >
        ✿
      </span>
    </Sway>
  );
}
