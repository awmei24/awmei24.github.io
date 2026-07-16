import type { ReactNode } from "react";

/* Rounded-rectangle photo frame shared by the home and about portraits */
export function PortraitFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border-[1.5px] border-sage-light/60 shadow-[0_30px_60px_-24px_rgba(31,31,31,0.28)] ${className}`}
    >
      {children}
    </div>
  );
}
