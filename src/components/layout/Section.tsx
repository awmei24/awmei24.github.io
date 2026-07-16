import type { ReactNode } from "react";

/* Subtle warm wash used by alternating sections for separation */
export const sectionTint = "bg-parchment/50 dark:bg-night-raised/60";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tinted?: boolean;
}

export function Section({ id, children, className = "", tinted = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${tinted ? sectionTint : ""} ${className}`}
    >
      {children}
    </section>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

/* Small mono eyebrow labels — almanac style */
export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[13px] md:text-xs font-normal tracking-[0.22em] uppercase text-sage mb-8 ${className}`}
    >
      <span aria-hidden="true" className="block w-7 border-t border-sage mb-2.5" />
      {children}
    </p>
  );
}
