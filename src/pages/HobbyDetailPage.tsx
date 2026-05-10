import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { LeafSprig, FloralDivider } from "../components/decorative/Botanical";
import { Lightbox } from "../components/ui/Lightbox";
import { hobbies, type HobbyCategory } from "../lib/content";
import { fadeUp, springPop } from "../lib/motion";

interface LightboxState {
  images: string[];
  title: string;
  subtitle?: string;
}

/* ── Image card ────────────────────────────────────────────────────────────── */
function ImageCard({
  item,
  onOpenLightbox,
}: {
  item: HobbyCategory["items"][number];
  onOpenLightbox: (state: LightboxState) => void;
}) {
  const galleryImages = item.images ?? (item.image ? [item.image] : []);
  const hasGallery = galleryImages.length > 0;
  const thumbnail = item.image ?? item.images?.[0];

  function handleClick() {
    if (hasGallery) onOpenLightbox({ images: galleryImages, title: item.title, subtitle: item.subtitle });
  }

  return (
    <motion.div
      variants={springPop}
      className={`flex flex-col ${hasGallery ? "cursor-pointer group" : ""}`}
      onClick={handleClick}
    >
      {/* Image area */}
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)] flex items-center justify-center relative">
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
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
            <LeafSprig size={40} color="var(--color-sage)" />
          </div>
        )}
      </div>
      {/* Caption */}
      <div className="mt-3">
        <p className="text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-snug">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-xs text-[var(--color-stone)] font-light italic mt-0.5">{item.subtitle}</p>
        )}
        {item.date && (
          <p className="text-xs text-[var(--color-sage-light)] font-light mt-1">{item.date}</p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Post row (writing layout) ─────────────────────────────────────────────── */
function PostRow({ item }: { item: HobbyCategory["items"][number] }) {
  return (
    <motion.a
      href={item.link ?? "#"}
      target="_blank"
      rel="noreferrer"
      variants={fadeUp}
      className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 py-7 border-b border-[var(--color-parchment)] dark:border-[var(--color-night-raised)] last:border-0"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] group-hover:text-[var(--color-sage)] transition-colors duration-200 leading-snug mb-1.5">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm text-[var(--color-stone)] font-light leading-relaxed">
            {item.subtitle}
          </p>
        )}
      </div>
      {item.date && (
        <span className="text-xs text-[var(--color-stone)] font-light whitespace-nowrap shrink-0">
          {item.date}
        </span>
      )}
    </motion.a>
  );
}

/* ── HobbyDetailPage ───────────────────────────────────────────────────────── */
export function HobbyDetailPage() {
  const { hobbyId } = useParams<{ hobbyId: string }>();
  const category = hobbies.find((h) => h.id === hobbyId);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  if (!category) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
          <p className="text-[var(--color-stone)] font-light">page not found.</p>
          <Link to="/hobbies" className="link-sage text-sm text-[var(--color-sage)]">
            ← back to hobbies
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* ── Header ── */}
      <section className="pt-36 pb-20 bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)] relative overflow-hidden">
        <div className="absolute top-12 right-8 md:right-20 text-[var(--color-sage-light)] opacity-40">
          <LeafSprig size={80} />
        </div>
        <Container>
          <FadeIn>
            <Link
              to="/hobbies"
              className="text-xs text-[var(--color-sage)] font-light link-sage inline-block mb-6"
            >
              ← hobbies
            </Link>
          </FadeIn>
          <FadeIn delay={0.04}>
            <SectionLabel>{category.label}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-[0.95] mt-4">
              {category.label}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-base text-[var(--color-stone)] font-light mt-4 max-w-md leading-relaxed italic">
              {category.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ── Items ── */}
      <Section>
        <Container>
          {category.layout === "post" ? (
            <>
              <FadeIn>
                <div className="mb-10 max-w-2xl">
                  <FloralDivider color="var(--color-sage-light)" />
                </div>
              </FadeIn>
              <div className="max-w-2xl">
                <StaggerGroup>
                  {category.items.map((item) => (
                    <PostRow key={item.id} item={item} />
                  ))}
                </StaggerGroup>
                {category.id === "writing" && (
                  <FadeIn delay={0.2}>
                    <div className="mt-10">
                      <a
                        href="https://amandawangmei.substack.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-5 py-2.5 rounded-full border border-[var(--color-sage)] text-[var(--color-sage)] text-sm font-medium tracking-wide hover:bg-[var(--color-sage)] hover:text-[var(--color-ink)] transition-colors duration-300"
                      >
                        visit substack →
                      </a>
                    </div>
                  </FadeIn>
                )}
              </div>
            </>
          ) : (
            <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <ImageCard key={item.id} item={item} onOpenLightbox={setLightbox} />
              ))}
            </StaggerGroup>
          )}
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
