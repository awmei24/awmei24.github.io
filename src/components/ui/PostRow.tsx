import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

interface PostRowProps {
  href?: string;
  title: string;
  description?: string;
  date?: string;
  /* Replaces the default date span, e.g. date + read time on the writing page */
  meta?: ReactNode;
  /* "sm" = compact row on the hobbies index; "lg" = full row on detail pages */
  size?: "sm" | "lg";
}

/* External-link list row used for writing posts and post-style hobby items. */
export function PostRow({ href, title, description, date, meta, size = "lg" }: PostRowProps) {
  const dateSpan = date && (
    <span className="font-mono text-[11px] text-stone dark:text-sage-light whitespace-nowrap shrink-0">{date}</span>
  );

  if (size === "sm") {
    return (
      <motion.a
        href={href ?? "#"}
        target="_blank"
        rel="noreferrer"
        variants={fadeUp}
        className="group flex justify-between items-baseline gap-4 py-4 border-b border-parchment dark:border-night-raised last:border-0"
      >
        <div className="min-w-0">
          <p className="font-serif font-medium text-base text-ink dark:text-cream group-hover:text-sage transition-colors duration-200 leading-snug">
            {title}
          </p>
          {description && (
            <p className="text-xs text-stone font-normal italic mt-0.5">{description}</p>
          )}
        </div>
        {meta ?? dateSpan}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href ?? "#"}
      target="_blank"
      rel="noreferrer"
      variants={fadeUp}
      className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 py-7 border-b border-parchment dark:border-night-raised last:border-0"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-serif font-medium text-lg md:text-xl text-ink dark:text-cream group-hover:text-sage transition-colors duration-200 leading-snug mb-1.5">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-stone font-normal leading-relaxed line-clamp-2">{description}</p>
        )}
      </div>
      {meta ?? dateSpan}
    </motion.a>
  );
}
