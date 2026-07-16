import { useParams } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { PageHero } from "../components/layout/PageHero";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { FloralDivider } from "../components/decorative/Botanical";
import { Lightbox } from "../components/ui/Lightbox";
import { GalleryCard } from "../components/ui/GalleryCard";
import { PostRow } from "../components/ui/PostRow";
import { PillLink } from "../components/ui/PillLink";
import { NotFound } from "../components/ui/NotFound";
import { useLightbox } from "../hooks/useLightbox";
import { usePageTitle } from "../hooks/usePageTitle";
import { hobbies, socials } from "../lib/content";

export function HobbyDetailPage() {
  const { hobbyId } = useParams<{ hobbyId: string }>();
  const category = hobbies.find((h) => h.id === hobbyId);
  const lightbox = useLightbox();
  usePageTitle(category?.label ?? "not found");

  if (!category) {
    return <NotFound message="page not found." backTo="/hobbies" backLabel="back to hobbies" />;
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
                      <PillLink href={socials.substack}>visit substack →</PillLink>
                    </div>
                  </FadeIn>
                )}
              </div>
            </>
          ) : (
            <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
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
