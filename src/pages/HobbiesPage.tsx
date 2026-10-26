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
import { visibleHobbies, type HobbyCategory } from "../lib/content";
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
    <div className="py-12 md:py-16 border-b border-hairline dark:border-night-raised first:pt-0 last:border-0">
      <FadeIn>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-serif font-normal text-2xl md:text-3xl text-ink dark:text-cream tracking-tight">
            {category.label}
          </h2>
          <Link
            to={category.path}
            className="font-mono text-xs text-sage-ink link-sage whitespace-nowrap py-1.5"
          >
            see all →
          </Link>
        </div>
        <p className="font-serif italic text-sm text-muted font-normal mb-8">
          {category.description}
        </p>
      </FadeIn>

      <div>
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
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
            {preview.map((item) => (
              <GalleryCard key={item.id} item={item} variant="preview" onOpenLightbox={onOpenLightbox} />
            ))}
          </StaggerGroup>
        )}

        {hasMore && (
          <FadeIn delay={0.1}>
            <Link
              to={category.path}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted link-sage"
            >
              <span>see {category.items.length - PREVIEW_COUNT} more</span>
              <span className="text-sage-ink">→</span>
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
            <span className="italic text-muted">the garden.</span>
          </>
        }
        titleClassName="max-w-xl"
        description="clay, side projects, and writing, mostly."
        decorations={
          <>
            <div className="md:hidden absolute top-12 right-8 text-sage-light opacity-40">
              <LeafSprig size={80} />
            </div>
            <div className="absolute bottom-8 right-32 text-sage opacity-25">
              <TinyMushroom size={44} />
            </div>
            {/* md+: the wheel sits beside the title, aligned to the content column's right edge */}
            <div className="hidden md:block absolute inset-x-0 top-36 bottom-20 pointer-events-none">
              <Container className="h-full flex items-center justify-end">
                <div className="pointer-events-auto">
                  <PotteryWheel />
                </div>
              </Container>
            </div>
          </>
        }
      >
        {/* phones: no room beside the title, so it stays under the copy */}
        <div className="mt-6 md:hidden">
          <PotteryWheel />
        </div>
      </PageHero>

      <Section>
        <Container>
          {visibleHobbies.map((category) => (
            <HobbySection key={category.id} category={category} onOpenLightbox={lightbox.open} />
          ))}
        </Container>
      </Section>

      <Section tinted>
        <Container narrow>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <FloralDivider color="var(--color-sage-light)" />
              <p className="font-serif italic text-sm text-muted">
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
