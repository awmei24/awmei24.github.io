import type { HTMLAttributes, ReactNode } from "react";

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
      className={`py-16 md:py-32 ${tinted ? sectionTint : ""} ${className}`}
    >
      {children}
    </section>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  /* on ink/night grounds plain sage reads fine (6.5:1+); sage-ink is for light grounds */
  onDark?: boolean;
}

/* Small mono eyebrow labels — almanac style. One of the two label variants (the other is Meta). */
export function SectionLabel({ children, className = "", onDark = false }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[13px] md:text-xs font-normal tracking-[0.22em] uppercase ${onDark ? "text-sage" : "text-sage-ink"} mb-8 ${className}`}
    >
      <span aria-hidden="true" className="block w-7 border-t border-sage mb-2.5" />
      {children}
    </p>
  );
}

interface MetaProps extends HTMLAttributes<HTMLSpanElement> {
  /* text color utility; defaults to muted */
  tone?: string;
}

/* Small mono metadata — dates, years, read times, companies. No rule. */
export function Meta({ children, className = "", tone = "text-muted", ...rest }: MetaProps) {
  return (
    <span {...rest} className={`font-mono text-[11px] tracking-[0.06em] ${tone} ${className}`}>
      {children}
    </span>
  );
}
