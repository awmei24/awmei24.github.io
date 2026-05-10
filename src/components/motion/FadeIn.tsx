import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export function StaggerGroup({ children, className, once = true }: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
