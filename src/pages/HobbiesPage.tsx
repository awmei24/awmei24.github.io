import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { PageHero } from "../components/layout/PageHero";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { LeafSprig, TinyMushroom, FloralDivider } from "../components/decorative/Botanical";
import { PotteryWheel } from "../components/garden/PotteryWheel";
import { Lightbox } from "../components/ui/Lightbox";
import { GalleryCard } from "../components/ui/GalleryCard";
import { PostRow } from "../components/ui/PostRow";
import { useLightbox } from "../hooks/useLightbox";
import { usePageTitle } from "../hooks/usePageTitle";
import { hobbies, type HobbyCategory } from "../lib/content";
import type { LightboxState } from "../components/ui/Lightbox";

const PREVIEW_COUNT = 3;

/* ── Section block ──────────────────────────────────────────────────────── */
function HobbySection({
  category,
  onOpenLightbox,
}: {
  category: HobbyCategory;
  onOpenLightbox: (state: LightboxState) => void;
}) {
  const preview = category.items.slice(0, PREVIEW_COUNT);
  const hasMore = category.items.length > PREVIEW_COUNT;

  return (
    <div className="py-16 border-b border-parchment dark:border-night-raised last:border-0">
      <FadeIn>
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-3">
            <span className="text-lg text-stone font-semibold select-none" aria-hidden="true">
              ✦
            </span>
            <h2 className="font-serif font-normal text-2xl md:text-3xl text-ink dark:text-cream tracking-tight">
              {category.label}
            </h2>
          </div>
          <Link
            to={category.path}
            className="font-mono text-xs text-sage link-sage whitespace-nowrap"
          >
            see all →
          </Link>
        </div>
        <p className="font-serif italic text-sm text-stone font-normal mb-8 ml-9">
          {category.description}
        </p>
      </FadeIn>

      <div className="ml-9">
        {category.layout === "post" ? (
          <StaggerGroup>
            {preview.map((item) => (
              <PostRow
                key={item.id}
                size="sm"
                href={item.link}
                title={item.title}
                description={item.subtitle}
                date={item.date}
              />
            ))}
          </StaggerGroup>
        ) : (
          <StaggerGroup className="grid grid-cols-3 gap-x-4 gap-y-6">
            {preview.map((item) => (
              <GalleryCard key={item.id} item={item} variant="preview" onOpenLightbox={onOpenLightbox} />
            ))}
          </StaggerGroup>
        )}

        {hasMore && (
          <FadeIn delay={0.1}>
            <Link
              to={category.path}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-stone font-light link-sage"
            >
              <span>see {category.items.length - PREVIEW_COUNT} more</span>
              <span className="text-sage">→</span>
            </Link>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

/* ── HobbiesPage ────────────────────────────────────────────────────────── */
export function HobbiesPage() {
  const lightbox = useLightbox();
  usePageTitle("hobbies");

  return (
    <PageTransition>
      <PageHero
        label="hobbies"
        title={
          <>
            the rest of<br />
            <span className="italic text-stone">the garden.</span>
          </>
        }
        titleClassName="max-w-xl"
        description="a peek into how i spend my time outside of work."
        decorations={
          <>
            <div className="absolute top-12 right-8 md:right-24 text-sage-light opacity-40">
              <LeafSprig size={80} />
            </div>
            <div className="absolute bottom-8 right-32 text-sage opacity-25">
              <TinyMushroom size={44} />
            </div>
          </>
        }
      >
        <div className="mt-6">
          <PotteryWheel />
        </div>
      </PageHero>

      <Section>
        <Container>
          {hobbies.map((category) => (
            <HobbySection key={category.id} category={category} onOpenLightbox={lightbox.open} />
          ))}
        </Container>
      </Section>

      <Section tinted>
        <Container narrow>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <FloralDivider color="var(--color-sage-light)" />
              <p className="font-serif italic text-sm text-stone font-light">
                always adding more to the collection ✦
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Lightbox state={lightbox.state} onClose={lightbox.close} />
    </PageTransition>
  );
}
