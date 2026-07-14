import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { Tag } from "../components/ui/Tag";
import { SmallLeaf } from "../components/decorative/Botanical";
import { PageHero } from "../components/layout/PageHero";
import { usePageTitle } from "../hooks/usePageTitle";
import { projects } from "../lib/content";
import { springPop } from "../lib/motion";

export function WorkPage() {
  usePageTitle("work");

  return (
    <PageTransition>
      <PageHero
        label="work"
        title={
          <>
            things i've made<br />
            <span className="italic text-stone">and tended to.</span>
          </>
        }
        titleClassName="max-w-lg"
        description="product and engineering case studies — built with care and curiosity."
      />

      {/* ── Projects ── */}
      <Section>
        <Container>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                variants={springPop}
                className="hover-lift group relative bg-parchment dark:bg-night-raised border border-hairline dark:border-night-raised rounded-[18px] overflow-hidden"
              >
                <Link to={`/work/${project.id}`} className="block p-8">
                  <motion.div
                    className="absolute top-5 right-5 opacity-0 group-hover:opacity-100"
                    initial={{ rotate: -20, scale: 0.6 }}
                    whileHover={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    <SmallLeaf size={22} color="var(--color-sage)" />
                  </motion.div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-clay tracking-widest uppercase">
                      {project.year} — {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-[26px] font-medium text-ink dark:text-cream leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="font-serif italic text-base text-stone mb-4 font-light">{project.tagline}</p>
                  <p className="text-sm text-stone leading-relaxed mb-6 font-light">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-sage rounded-full"
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
