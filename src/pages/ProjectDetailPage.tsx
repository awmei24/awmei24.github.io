import { useParams, Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { Tag } from "../components/ui/Tag";
import { Sprout, LeafSprig, FloralDivider } from "../components/decorative/Botanical";
import { projects } from "../lib/content";
import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
          <p className="text-[var(--color-stone)] font-light">project not found.</p>
          <Link to="/work" className="link-sage text-sm text-[var(--color-sage)]">
            ← back to work
          </Link>
        </div>
      </PageTransition>
    );
  }

  const { caseStudy } = project;

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
              to="/work"
              className="text-xs text-[var(--color-sage)] font-light link-sage inline-block mb-6"
            >
              ← work
            </Link>
          </FadeIn>
          <FadeIn delay={0.04}>
            <SectionLabel>{project.year}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-[0.95] mt-4 max-w-2xl">
              {project.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-base italic text-[var(--color-sage)] font-light mt-4 max-w-md leading-relaxed">
              {project.tagline}
            </p>
          </FadeIn>
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
                className="inline-block mt-6 text-sm text-[var(--color-sage)] font-light link-sage"
              >
                visit project →
              </a>
            </FadeIn>
          )}
        </Container>
      </section>

      {/* ── Body ── */}
      <Section>
        <Container narrow>
          {caseStudy ? (
            <>
              {caseStudy.overview && (
                <FadeIn>
                  <p className="text-base text-[var(--color-stone)] font-light leading-relaxed mb-14">
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
                        <h2 className="text-xs font-mono text-[var(--color-sage)] tracking-widest uppercase mt-3">
                          {section.label}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-4">
                        {section.body.map((para, i) => (
                          <p key={i} className="text-sm text-[var(--color-stone)] font-light leading-relaxed">
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
                        className="w-full rounded-2xl object-cover bg-[var(--color-parchment)]"
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
                <div className="text-[var(--color-sage)] opacity-60">
                  <Sprout size={64} color="var(--color-sage)" />
                </div>
                <p className="text-base font-light text-[var(--color-stone)] max-w-xs leading-relaxed">
                  working on the case study—check back soon to see what has grown.
                </p>
                <Link
                  to="/work"
                  className="text-xs text-[var(--color-sage)] font-light link-sage mt-2"
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
