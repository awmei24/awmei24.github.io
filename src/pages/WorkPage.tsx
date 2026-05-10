import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { Tag } from "../components/ui/Tag";
import { SmallLeaf, LeafSprig } from "../components/decorative/Botanical";
import { projects } from "../lib/content";
import { springPop } from "../lib/motion";

export function WorkPage() {
  return (
    <PageTransition>
      {/* ── Header ── */}
      <section className="pt-36 pb-20 bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)] relative overflow-hidden">
        <div className="absolute top-12 right-8 md:right-20 text-[var(--color-sage-light)] opacity-40">
          <LeafSprig size={80} />
        </div>
        <Container>
          <FadeIn>
            <SectionLabel>work</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-[0.95] mt-4 max-w-lg">
              things i've made<br />
              <span className="italic text-[var(--color-stone)]">and tended to.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-base text-[var(--color-stone)] font-light mt-6 max-w-md leading-relaxed">
              product and engineering case studies — built with care and curiosity.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ── Projects ── */}
      <Section>
        <Container>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                variants={springPop}
                className={`group relative bg-[var(--color-cream)] dark:bg-[var(--color-night)] border border-[var(--color-parchment)] dark:border-[var(--color-night-raised)] rounded-2xl overflow-hidden ${
                  i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"
                }`}
              >
                <Link to={`/work/${project.id}`} className="block p-8 hover-lift">
                  <motion.div
                    className="absolute top-5 right-5 opacity-0 group-hover:opacity-100"
                    initial={{ rotate: -20, scale: 0.6 }}
                    whileHover={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    <SmallLeaf size={22} color="var(--color-sage)" />
                  </motion.div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[var(--color-sage)] tracking-widest uppercase">
                      {project.year} — {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm italic text-[var(--color-sage)] mb-4 font-light">{project.tagline}</p>
                  <p className="text-sm text-[var(--color-stone)] leading-relaxed mb-6 font-light">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-sage)] rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                </Link>
              </motion.article>
            ))}
          </StaggerGroup>
        </Container>
      </Section>
    </PageTransition>
  );
}
