import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PillLinkProps {
  children: ReactNode;
  /* internal route (renders <Link>) — mutually exclusive with href */
  to?: string;
  /* external url or mailto (renders <a>) */
  href?: string;
  variant?: "outline" | "solid";
  size?: "md" | "lg";
  className?: string;
}

const VARIANT = {
  outline:
    "border border-sage text-sage hover:bg-sage hover:text-ink transition-colors duration-300",
  solid:
    "bg-ink text-cream dark:bg-cream dark:text-ink hover:bg-stone dark:hover:bg-parchment transition-colors duration-200",
};

const SIZE = {
  md: "px-5 py-2.5",
  lg: "px-6 py-3",
};

/* Rounded pill call-to-action used across pages */
export function PillLink({
  children,
  to,
  href,
  variant = "outline",
  size = "md",
  className = "",
}: PillLinkProps) {
  const classes = `inline-block rounded-full font-mono text-[13px] tracking-wide ${VARIANT[variant]} ${SIZE[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      className={classes}
    >
      {children}
    </a>
  );
}
