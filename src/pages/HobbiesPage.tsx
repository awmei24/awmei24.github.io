import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { LeafSprig, TinyMushroom, FloralDivider } from "../components/decorative/Botanical";
import { Lightbox } from "../components/ui/Lightbox";
import { hobbies, type HobbyCategory } from "../lib/content";
import { springPop, fadeUp } from "../lib/motion";

const PREVIEW_COUNT = 3;

const categoryGlyph: Record<string, string> = {
  ceramics: "✦",
  dancing: "✦",
  youtube: "✦",
  writing: "✦",
};

interface LightboxState {
  images: string[];
  title: string;
  subtitle?: string;
}

/* ── Image preview card ─────────────────────────────────────────────────── */
function ImagePreviewCard({
  item,
  onOpenLightbox,
}: {
  item: HobbyCategory["items"][number];
  onOpenLightbox: (state: LightboxState) => void;
}) {
  const galleryImages = item.images ?? (item.image ? [item.image] : []);
  const hasGallery = galleryImages.length > 0;

  function handleClick() {
    if (hasGallery) onOpenLightbox({ images: galleryImages, title: item.title, subtitle: item.subtitle });
  }

  return (
    <motion.div
      variants={springPop}
      className={`flex flex-col ${hasGallery ? "cursor-pointer group" : ""}`}
      onClick={handleClick}
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)] flex items-center justify-center relative">
        {item.image || (item.images && item.images[0]) ? (
          <>
            <img
              src={item.image ?? item.images![0]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            {galleryImages.length > 1 && (
              <span className="absolute bottom-2 right-2 bg-[var(--color-ink)]/60 text-[var(--color-cream)] text-[10px] px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                +{galleryImages.length - 1}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full opacity-30">
            <LeafSprig size={36} color="var(--color-sage)" />
          </div>
        )}
      </div>
      <p className="text-xs font-medium text-[var(--color-stone)] mt-2 leading-snug">{item.title}</p>
      {item.date && (
        <p className="text-xs text-[var(--color-sage-light)] font-light">{item.date}</p>
      )}
    </motion.div>
  );
}

/* ── Post preview row ───────────────────────────────────────────────────── */
function PostPreviewRow({ item }: { item: HobbyCategory["items"][number] }) {
  return (
    <motion.a
      href={item.link ?? "#"}
      target="_blank"
      rel="noreferrer"
      variants={fadeUp}
      className="group flex justify-between items-baseline gap-4 py-4 border-b border-[var(--color-parchment)] dark:border-[var(--color-night-raised)] last:border-0"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] group-hover:text-[var(--color-sage)] transition-colors duration-200 leading-snug">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-xs text-[var(--color-stone)] font-light italic mt-0.5">{item.subtitle}</p>
        )}
      </div>
      {item.date && (
        <span className="text-xs text-[var(--color-stone)] font-light whitespace-nowrap shrink-0">{item.date}</span>
      )}
    </motion.a>
  );
}

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
    <div className="py-16 border-b border-[var(--color-parchment)] dark:border-[var(--color-night-raised)] last:border-0">
      <FadeIn>
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-3">
            <span className="text-lg text-[var(--color-stone)] select-none" aria-hidden="true">
              {categoryGlyph[category.id] ?? "✦"}
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--color-ink)] dark:text-[var(--color-cream)] tracking-tight">
              {category.label}
            </h2>
          </div>
          <Link
            to={category.path}
            className="text-xs text-[var(--color-sage)] font-light link-sage whitespace-nowrap"
          >
            see all →
          </Link>
        </div>
        <p className="text-sm text-[var(--color-stone)] font-light italic mb-8 ml-9">
          {category.description}
        </p>
      </FadeIn>

      <div className="ml-9">
        {category.layout === "post" ? (
          <StaggerGroup>
            {preview.map((item) => (
              <PostPreviewRow key={item.id} item={item} />
            ))}
          </StaggerGroup>
        ) : (
          <StaggerGroup className="grid grid-cols-3 gap-4">
            {preview.map((item) => (
              <ImagePreviewCard key={item.id} item={item} onOpenLightbox={onOpenLightbox} />
            ))}
          </StaggerGroup>
        )}

        {hasMore && (
          <FadeIn delay={0.1}>
            <Link
              to={category.path}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-stone)] font-light link-sage"
            >
              <span>see {category.items.length - PREVIEW_COUNT} more</span>
              <span className="text-[var(--color-sage)]">→</span>
            </Link>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

/* ── HobbiesPage ────────────────────────────────────────────────────────── */
export function HobbiesPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <PageTransition>
      <section className="pt-36 pb-20 bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)] relative overflow-hidden">
        <div className="absolute top-12 right-8 md:right-24 text-[var(--color-sage-light)] opacity-40">
          <LeafSprig size={80} />
        </div>
        <div className="absolute bottom-8 right-32 text-[var(--color-sage)] opacity-25">
          <TinyMushroom size={44} />
        </div>
        <Container>
          <FadeIn>
            <SectionLabel>hobbies</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-[0.95] mt-4 max-w-xl">
              the rest of<br />
              <span className="italic text-[var(--color-stone)]">the garden.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-base text-[var(--color-stone)] font-light mt-6 max-w-md leading-relaxed">
              a peek into how i spend my time outside of work.
            </p>
          </FadeIn>
        </Container>
      </section>

      <Section>
        <Container>
          {hobbies.map((category) => (
            <HobbySection key={category.id} category={category} onOpenLightbox={setLightbox} />
          ))}
        </Container>
      </Section>

      <Section className="bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)]">
        <Container narrow>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <FloralDivider color="var(--color-sage-light)" />
              <p className="text-sm text-[var(--color-stone)] font-light italic">
                always adding more to the collection ✦
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Lightbox
        images={lightbox?.images ?? []}
        title={lightbox?.title ?? ""}
        subtitle={lightbox?.subtitle}
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
      />
    </PageTransition>
  );
}
