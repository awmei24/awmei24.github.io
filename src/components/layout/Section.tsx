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

/* Small numbered/labeled section markers — editorial style */
export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-medium tracking-widest uppercase text-[var(--color-sage)] mb-8 ${className}`}
    >
      {children}
    </p>
  );
}
