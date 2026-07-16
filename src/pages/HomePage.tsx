import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { SectionLabel } from "../components/layout/Section";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { Sprout, TinyMushroom, FloralDivider } from "../components/decorative/Botanical";
import { Sway } from "../components/garden/Sway";
import { WaterGardenProvider, GardenPlant, GardenWateringCan } from "../components/garden/WaterThePlant";
import { MarginNote } from "../components/garden/MarginNote";
import { usePageTitle } from "../hooks/usePageTitle";
import { bio, projects, chapters } from "../lib/content";
import { fadeUp, springPop, staggerContainer, slideLeft } from "../lib/motion";
import selfPortrait from "../assets/self-portrait.webp";

/* ── Almanac chapter index row ────────────────────────────────────────────── */
function ChapterRow({ chapter }: { chapter: typeof chapters[number] }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={chapter.path}
        className="group grid grid-cols-[40px_1fr_30px] sm:grid-cols-[64px_200px_1fr_30px] items-baseline gap-2 px-2 py-5 border-b border-hairline dark:border-night-raised transition-colors duration-200 hover:bg-parchment dark:hover:bg-night-raised"
      >
        <span className="font-mono text-[13px] text-clay">{chapter.index}</span>
        <span>
          <span className="block font-serif font-medium text-[19px] md:text-2xl text-ink dark:text-cream group-hover:text-sage transition-colors duration-200">
            {chapter.label}
          </span>
          <span className="block sm:hidden text-[13px] text-stone font-normal leading-snug mt-1">
            {chapter.description}
          </span>
        </span>
        <span className="hidden sm:block text-sm text-stone font-normal leading-snug">
          {chapter.description}
        </span>
        <span
          aria-hidden="true"
          className="text-sage font-semibold justify-self-end transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

/* ── Featured project card ────────────────────────────────────────────────── */
function FeaturedCard({ project }: { project: typeof projects[number] }) {
  return (
    <motion.div variants={springPop}>
      <Link
        to="/work"
        className="hover-lift group flex flex-col justify-between h-full p-8 rounded-[18px] border border-hairline dark:border-night-raised bg-parchment dark:bg-night-raised relative overflow-hidden"
      >
        <div>
          <span className="font-mono text-xs text-clay tracking-widest uppercase">
            {project.year}
          </span>
          <h3 className="font-serif text-[26px] font-medium text-ink dark:text-cream mt-3 mb-2 leading-snug group-hover:text-sage transition-colors duration-200">
            {project.title}
          </h3>
          <p className="font-serif italic text-base text-stone font-normal mb-5">
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-sage/50 bg-sage/15 text-stone dark:text-sage-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-sage rounded-full"
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
  usePageTitle();

  const nameWords = bio.name.split(" ");
  const firstName = nameWords[0];
  const middleNames = nameWords.slice(1, -1).join(" ");
  const lastName = nameWords[nameWords.length - 1];

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="min-h-[92dvh] flex flex-col justify-center relative overflow-hidden pt-24 pb-16">
        {/* almanac marginalia, literally in the margin on widescreen */}
        <MarginNote className="hidden lg:block absolute top-28 right-10 max-w-[210px] text-right" />
        <Container>
          <WaterGardenProvider>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-y-10 md:gap-14 items-center">
            <div className="max-md:contents md:col-start-1">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-md:order-1"
            >
              <motion.p
                variants={slideLeft}
                className="font-mono text-[13px] md:text-xs font-normal tracking-[0.22em] uppercase text-sage mb-8"
              >
                {bio.location}  ✦  open to opportunities
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-serif font-normal text-[52px] md:text-[88px] tracking-[-0.02em] text-ink dark:text-cream leading-[0.92] mb-7"
              >
                {firstName}
                <br />
                {middleNames} <span className="italic text-clay">{lastName}</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-serif italic font-normal text-[18px] md:text-[27px] text-stone leading-relaxed"
              >
                {bio.tagline}
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-md:order-3 md:mt-10"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-y-4">
                <Link
                  to="/work"
                  className="inline-block px-5 py-2.5 rounded-full bg-ink text-cream dark:bg-cream dark:text-ink font-mono text-[13px] tracking-wide hover:bg-stone dark:hover:bg-parchment transition-colors duration-200"
                >
                  view work ↓
                </Link>
                <p className="ml-10 font-mono text-xs text-stone/70 dark:text-sage-light/70">
                  <Link to="/about" className="link-sage hover:text-stone dark:hover:text-sage-light">
                    about me
                  </Link>
                  <span className="mx-2.5" aria-hidden="true">·</span>
                  <Link to="/contact" className="link-sage hover:text-stone dark:hover:text-sage-light">
                    say hello
                  </Link>
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-16">
                <GardenPlant />
              </motion.div>
            </motion.div>
            </div>

            {/* Arched portrait (egg #1 lives at its base) */}
            <motion.div
              className="max-md:order-2 md:col-start-2 flex flex-col items-center md:items-end"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative w-full max-w-[340px] md:max-w-[380px]">
                <div className="aspect-[4/5] overflow-hidden rounded-[24px] border-[1.5px] border-sage-light/60 shadow-[0_30px_60px_-24px_rgba(31,31,31,0.28)] bg-parchment dark:bg-night-raised">
                  <img
                    src={selfPortrait}
                    alt="portrait of amanda"
                    width={800}
                    height={800}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Egg #1 — the watering can frames the portrait; drag it down
                    to the sprout by the copy to grow it */}
                <GardenWateringCan className="absolute -bottom-4 -right-3 z-20" />
              </div>
            </motion.div>
          </div>
          </WaterGardenProvider>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 left-6 md:left-16 hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <motion.div
              className="w-px h-10 bg-sage-light origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-sage">scroll</span>
          </motion.div>
        </Container>
      </section>

      {/* ── Chapter index (the almanac) ── */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute bottom-10 right-8 md:right-16 text-sage opacity-30">
          <Sway duration={6.5}>
            <TinyMushroom size={44} />
          </Sway>
        </div>
        <Container>
          <FadeIn>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif font-normal text-3xl md:text-4xl text-ink dark:text-cream tracking-tight">
                a few places <span className="italic text-stone">to wander.</span>
              </h2>
              <span className="font-mono text-xs tracking-[0.22em] uppercase text-sage" aria-hidden="true">
                index
              </span>
            </div>
          </FadeIn>

          <StaggerGroup>
            <div className="border-t border-ink dark:border-cream">
              {chapters.map((chapter) => (
                <ChapterRow key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </StaggerGroup>

          <FadeIn delay={0.15}>
            <MarginNote className="lg:hidden mt-6 flex justify-end text-right" />
          </FadeIn>
        </Container>
      </section>

      {/* ── Intro pull-quote ── */}
      <section className="pt-24 md:pt-28 pb-20 md:pb-24">
        <Container narrow>
          <FadeIn>
            <figure className="flex flex-col items-center gap-7 text-center">
              <FloralDivider color="var(--color-sage)" />
              <blockquote className="font-serif italic font-normal text-[22px] md:text-[26px] leading-relaxed text-ink dark:text-cream">
                {bio.intro}
              </blockquote>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* ── Selected work ── */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute top-16 left-4 md:left-8 text-sage-light opacity-25">
          <Sway duration={4.2}>
            <Sprout size={48} />
          </Sway>
        </div>
        <Container>
          <FadeIn>
            <SectionLabel className="mb-10">selected work</SectionLabel>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </StaggerGroup>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-px bg-hairline dark:bg-night" />
              <Link to="/work" className="link-sage font-mono text-xs text-stone dark:text-sage-light whitespace-nowrap">
                all projects →
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageTransition>
  );
}
