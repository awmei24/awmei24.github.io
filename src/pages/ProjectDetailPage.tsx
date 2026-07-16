import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { PageHero } from "../components/layout/PageHero";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { Tag } from "../components/ui/Tag";
import { NotFound } from "../components/ui/NotFound";
import { Sprout, FloralDivider } from "../components/decorative/Botanical";
import { usePageTitle } from "../hooks/usePageTitle";
import { projects } from "../lib/content";
import { fadeUp } from "../lib/motion";

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  usePageTitle(project?.title ?? "not found");

  if (!project) {
    return <NotFound message="project not found." backTo="/work" backLabel="back to work" />;
  }

  const { caseStudy } = project;

  return (
    <PageTransition>
      <PageHero
        label={project.year}
        title={project.title}
        titleClassName="max-w-2xl"
        back={{ to: "/work", label: "work" }}
        description={project.tagline}
        descriptionClassName="font-serif italic text-lg text-stone font-light mt-4 max-w-md leading-relaxed"
      >
        <FadeIn delay={0.16}>
          <div className="flex flex-wrap gap-2 mt-5">
            {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </FadeIn>
        {project.link && (
          <FadeIn delay={0.2}>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 text-sm text-sage font-light link-sage"
            >
              visit project →
            </a>
          </FadeIn>
        )}
      </PageHero>

      {/* ── Body ── */}
      <Section>
        <Container narrow>
          {caseStudy ? (
            <>
              {caseStudy.overview && (
                <FadeIn>
                  <p className="text-base text-stone font-normal leading-relaxed mb-14">
                    {caseStudy.overview}
                  </p>
                </FadeIn>
              )}

              {caseStudy.sections && caseStudy.sections.length > 0 && (
                <StaggerGroup className="flex flex-col gap-14">
                  {caseStudy.sections.map((section) => (
                    <motion.div key={section.label} variants={fadeUp}>
                      <div className="mb-4">
                        <FloralDivider color="var(--color-sage-light)" />
                        <h2 className="font-mono font-bold text-xs text-clay tracking-[0.22em] uppercase mt-3">
                          {section.label}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-4">
                        {section.body.map((para, i) => (
                          <p key={i} className="text-[15px] text-stone font-normal leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </StaggerGroup>
              )}

              {caseStudy.images && caseStudy.images.length > 0 && (
                <FadeIn delay={0.1}>
                  <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {caseStudy.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} — ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-[18px] object-cover bg-parchment"
                      />
                    ))}
                  </div>
                </FadeIn>
              )}
            </>
          ) : (
            /* ── Placeholder ── */
            <FadeIn>
              <div className="flex flex-col items-center gap-6 py-24 text-center">
                <div className="text-sage opacity-60">
                  <Sprout size={64} color="var(--color-sage)" />
                </div>
                <p className="text-base font-normal text-stone max-w-xs leading-relaxed">
                  working on the case study—check back soon to see what has grown.
                </p>
                <Link
                  to="/work"
                  className="text-xs text-sage font-light link-sage mt-2"
                >
                  ← back to work
                </Link>
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>
    </PageTransition>
  );
}
