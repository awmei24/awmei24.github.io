import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { Tag } from "../components/ui/Tag";
import { LeafSprig, Sprout, TinyMushroom, SmallLeaf, FloralDivider } from "../components/decorative/Botanical";
import { bio, projects, chapters } from "../lib/content";
import { fadeUp, springPop, staggerContainer, slideLeft } from "../lib/motion";
import selfPortrait from "../assets/self (1).png";

/* ── Chapter card on homepage ─────────────────────────────────────────────── */
function ChapterCard({ chapter }: { chapter: typeof chapters[number] }) {
  return (
    <motion.div variants={springPop}>
      <Link
        to={chapter.path}
        className="hover-lift group flex flex-col justify-between h-full p-6 rounded-2xl border border-[var(--color-parchment)] bg-[var(--color-cream)] dark:bg-[var(--color-night)] dark:border-[var(--color-night-raised)] relative overflow-hidden min-h-[160px]"
      >
        {/* Index number */}
        <span className="text-xs font-mono text-[var(--color-sage-light)] tracking-widest">
          {chapter.index}
        </span>

        {/* Label + description */}
        <div>
          <h3 className="text-lg font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] mb-1.5 group-hover:text-[var(--color-sage)] transition-colors duration-200">
            {chapter.label}
          </h3>
          <p className="text-sm text-[var(--color-stone)] font-light leading-snug">
            {chapter.description}
          </p>
        </div>

        {/* Arrow that slides in on hover */}
        <motion.span
          className="absolute bottom-5 right-5 text-[var(--color-sage)] text-base opacity-0 group-hover:opacity-100"
          initial={{ x: -6 }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>

        {/* Bottom border grow */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-sage)] rounded-full"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </Link>
    </motion.div>
  );
}

/* ── Featured project card ────────────────────────────────────────────────── */
function FeaturedCard({ project }: { project: typeof projects[number] }) {
  return (
    <motion.div variants={springPop}>
      <Link
        to={`/work`}
        className="hover-lift group flex flex-col justify-between h-full p-8 rounded-2xl border border-[var(--color-parchment)] bg-[var(--color-cream)] dark:bg-[var(--color-night)] dark:border-[var(--color-night-raised)] relative overflow-hidden"
      >
        <motion.div
          className="absolute top-5 right-5 text-[var(--color-sage-light)] opacity-0 group-hover:opacity-100"
          initial={{ rotate: -20, scale: 0.6 }}
          whileHover={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <SmallLeaf size={20} color="var(--color-sage)" />
        </motion.div>

        <div>
          <span className="text-xs font-mono text-[var(--color-sage)] tracking-widest uppercase">
            {project.year}
          </span>
          <h3 className="text-xl font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] mt-3 mb-2 leading-snug group-hover:text-[var(--color-sage)] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm italic text-[var(--color-stone)] font-light mb-4">
            {project.tagline}
          </p>
        </div>

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
    </motion.div>
  );
}

/* ── HomePage ─────────────────────────────────────────────────────────────── */
export function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="min-h-[92dvh] flex flex-col justify-center relative overflow-hidden pt-24 pb-16">
        {/* Ambient botanicals */}
        <motion.div
          className="absolute top-16 right-8 md:right-20 text-[var(--color-sage-light)] opacity-50"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.5, rotate: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <LeafSprig size={72} />
        </motion.div>
        <motion.div
          className="absolute bottom-28 right-14 md:right-36 text-[var(--color-sage)] opacity-35"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          <TinyMushroom size={48} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-4 md:left-8 text-[var(--color-sage-light)] opacity-25"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          <Sprout size={52} />
        </motion.div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Text column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="md:col-span-7 max-w-xl"
            >
              <motion.p variants={slideLeft} className="text-sm font-medium tracking-widest uppercase text-[var(--color-sage)] mb-8">
                {bio.location}  ✦  open to opportunities
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-6xl md:text-8xl font-light tracking-tight text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-[0.92] mb-8"
              >
                {bio.name}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl font-light italic text-[var(--color-stone)] leading-relaxed mb-12"
              >
                {bio.tagline}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
                <Link to="/work" className="link-sage text-[var(--color-ink)] dark:text-[var(--color-cream)] font-medium text-sm tracking-wide">
                  view work ↓
                </Link>
                <span className="text-[var(--color-sage-light)]">·</span>
                <Link to="/about" className="link-sage text-[var(--color-stone)] font-medium text-sm tracking-wide">
                  about me
                </Link>
                <span className="text-[var(--color-sage-light)]">·</span>
                <Link to="/contact" className="link-sage text-[var(--color-stone)] font-medium text-sm tracking-wide">
                  say hello
                </Link>
              </motion.div>
            </motion.div>

            {/* Portrait column */}
            <motion.div
              className="md:col-span-5 flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-[var(--color-sage-light)]/40">
                  <img
                    src={selfPortrait}
                    alt="portrait of amanda"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Small floating decoration */}
                <motion.div
                  className="absolute -bottom-4 -left-4 text-[var(--color-sage)]"
                  animate={{ rotate: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LeafSprig size={40} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 left-6 md:left-16 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <motion.div
              className="w-px h-10 bg-[var(--color-sage-light)] origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            />
            <span className="text-[10px] tracking-widest uppercase text-[var(--color-sage)]">scroll</span>
          </motion.div>
        </Container>
      </section>

      {/* ── Chapter index ── */}
      <section className="py-24 bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)]">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-6 mb-12">
              <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-sage)]">
                explore
              </p>
              <FloralDivider color="var(--color-sage-light)" />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-ink)] dark:text-[var(--color-cream)] tracking-tight mb-12">
              a few places<br />
              <span className="italic text-[var(--color-stone)]">to wander.</span>
            </h2>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* ── Selected work ── */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-sage)] mb-4">
              selected work
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-ink)] dark:text-[var(--color-cream)] tracking-tight mb-12">
              things i've made<br />
              <span className="italic text-[var(--color-stone)]">and tended to.</span>
            </h2>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </StaggerGroup>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-px bg-[var(--color-parchment)]" />
              <Link to="/work" className="link-sage text-sm text-[var(--color-stone)] font-medium whitespace-nowrap">
                all projects →
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageTransition>
  );
}
