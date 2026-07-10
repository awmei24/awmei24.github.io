import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${className}`}
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
      className={`font-mono text-xs font-normal tracking-[0.22em] uppercase text-sage mb-8 ${className}`}
    >
      {children}
    </p>
  );
}
