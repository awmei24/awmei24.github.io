import { useParams, Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { PageHero } from "../components/layout/PageHero";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { FloralDivider } from "../components/decorative/Botanical";
import { Lightbox } from "../components/ui/Lightbox";
import { GalleryCard } from "../components/ui/GalleryCard";
import { PostRow } from "../components/ui/PostRow";
import { useLightbox } from "../hooks/useLightbox";
import { usePageTitle } from "../hooks/usePageTitle";
import { hobbies } from "../lib/content";

export function HobbyDetailPage() {
  const { hobbyId } = useParams<{ hobbyId: string }>();
  const category = hobbies.find((h) => h.id === hobbyId);
  const lightbox = useLightbox();
  usePageTitle(category?.label ?? "not found");

  if (!category) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
          <p className="text-stone font-light">page not found.</p>
          <Link to="/hobbies" className="link-sage text-sm text-sage">
            ← back to hobbies
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHero
        label={category.label}
        title={category.label}
        back={{ to: "/hobbies", label: "hobbies" }}
        description={category.description}
        descriptionClassName="font-serif italic text-base text-stone font-light mt-4 max-w-md leading-relaxed"
      />

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
                    <PostRow
                      key={item.id}
                      href={item.link}
                      title={item.title}
                      description={item.subtitle}
                      date={item.date}
                    />
                  ))}
                </StaggerGroup>
                {category.id === "writing" && (
                  <FadeIn delay={0.2}>
                    <div className="mt-10">
                      <a
                        href="https://amandawangmei.substack.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-5 py-2.5 rounded-full border border-sage text-sage font-mono text-[13px] tracking-wide hover:bg-sage hover:text-ink transition-colors duration-300"
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
                <GalleryCard key={item.id} item={item} onOpenLightbox={lightbox.open} />
              ))}
            </StaggerGroup>
          )}
        </Container>
      </Section>

      <Lightbox state={lightbox.state} onClose={lightbox.close} />
    </PageTransition>
  );
}
