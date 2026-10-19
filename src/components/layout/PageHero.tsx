import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { SectionLabel, sectionTint } from "./Section";
import { FadeIn } from "../motion/FadeIn";
import { LeafSprig } from "../decorative/Botanical";

interface PageHeroProps {
  label: string;
  title: ReactNode;
  titleClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  back?: { to: string; label: string };
  /* Overrides the default top-right leaf sprig */
  decorations?: ReactNode;
  children?: ReactNode;
}

/* The one back-link style, shared by page heroes, placeholders and NotFound */
export function BackLink({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`font-mono text-xs text-sage-ink link-sage inline-block py-1.5 ${className}`}>
      ← {children}
    </Link>
  );
}

/* Shared parchment page header used by all section pages. */
export function PageHero({
  label,
  title,
  titleClassName = "",
  description,
  descriptionClassName = "text-base text-muted mt-6 max-w-md leading-relaxed",
  back,
  decorations,
  children,
}: PageHeroProps) {
  return (
    <section className={`pt-28 pb-12 md:pt-36 md:pb-20 relative overflow-hidden ${sectionTint}`}>
      {decorations ?? (
        <div className="absolute top-12 right-8 md:right-20 text-sage-light opacity-40">
          <LeafSprig size={80} />
        </div>
      )}
      <Container>
        {back && (
          <FadeIn>
            <BackLink to={back.to} className="mb-4">{back.label}</BackLink>
          </FadeIn>
        )}
        <FadeIn delay={back ? 0.04 : 0}>
          <SectionLabel>{label}</SectionLabel>
        </FadeIn>
        <FadeIn delay={back ? 0.08 : 0.06}>
          <h1
            className={`font-serif font-normal text-5xl md:text-7xl tracking-[-0.02em] text-ink dark:text-cream leading-[0.95] mt-4 ${titleClassName}`}
          >
            {title}
          </h1>
        </FadeIn>
        {description && (
          <FadeIn delay={0.12}>
            <p className={descriptionClassName}>{description}</p>
          </FadeIn>
        )}
        {children}
      </Container>
    </section>
  );
}
