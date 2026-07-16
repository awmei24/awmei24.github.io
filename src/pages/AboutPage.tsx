import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { PageHero } from "../components/layout/PageHero";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { LeafSprig, FloralDivider, Sprout } from "../components/decorative/Botanical";
import { usePageTitle } from "../hooks/usePageTitle";
import { bio, experience } from "../lib/content";
import { fadeUp } from "../lib/motion";
import selfPortrait from "../assets/about.webp";

export function AboutPage() {
  usePageTitle("about");
  return (
    <PageTransition>
      <PageHero label="about" title={bio.name} />

      {/* ── Bio + portrait ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Portrait */}
            <FadeIn className="md:col-span-4">
              <div className="relative">
                <div className="overflow-hidden rounded-[24px] border-[1.5px] border-sage-light/60 shadow-[0_30px_60px_-24px_rgba(31,31,31,0.28)]">
                  <img
                    src={selfPortrait}
                    alt="portrait of amanda"
                    width={900}
                    height={1200}
                    decoding="async"
                    className="w-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-5 -right-4 text-sage"
                  animate={{ rotate: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LeafSprig size={44} />
                </motion.div>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <FloralDivider color="var(--color-sage-light)" />
                <p className="font-serif italic text-sm text-stone tracking-wide leading-relaxed">
                  "growth requires just a little tlc."
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span className="text-sm text-stone font-medium">
                    {bio.available ? "open to opportunities" : "not currently available"}
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Bio text */}
            <StaggerGroup className="md:col-span-8 flex flex-col gap-6 pt-2">
              {bio.about.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <p className="text-lg leading-[1.8] text-stone font-normal">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-3 mt-4">
                  {["intentional development", "data & analytics", "systems thinking", "behavior design", "tools for thought"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-sage/50 bg-sage/15 text-stone dark:text-sage-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </StaggerGroup>
          </div>
        </Container>
      </Section>

      {/* ── Experience ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <FadeIn>
                <SectionLabel>experience</SectionLabel>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="font-serif font-normal text-4xl md:text-5xl text-ink dark:text-cream tracking-[-0.02em] leading-tight mt-4 mb-8">
                  where i've<br />
                  <span className="italic text-stone">grown.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Sprout size={56} color="var(--color-sage)" className="opacity-60" />
              </FadeIn>
            </div>

            <StaggerGroup className="md:col-span-8">
              {experience.map((role) => (
                <motion.div
                  key={`${role.company}-${role.period}`}
                  variants={fadeUp}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8 border-b border-parchment dark:border-night-raised last:border-0"
                >
                  <div className="sm:col-span-3">
                    <span className="text-xs font-mono text-sage tracking-wide">
                      {role.period}
                    </span>
                  </div>
                  <div className="sm:col-span-9">
                    <p className="font-mono text-[11px] text-sage tracking-[0.22em] uppercase mb-1">
                      {role.company}
                    </p>
                    <h3 className="font-serif font-medium text-lg text-ink dark:text-cream mb-3">
                      {role.title}
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                      {role.notes.map((note) => (
                        <li key={note} className="text-sm text-stone font-normal flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-sage-light shrink-0" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="pt-8">
                <a
                  href="https://drive.google.com/file/d/1-IuUadJVuTOqIphv52uRCMod4t4RsStx/view?usp=drive_link"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[13px] text-stone dark:text-sage-light link-sage"
                >
                  view my résumé
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            </StaggerGroup>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section>
        <Container narrow>
          <FadeIn>
            <div className="text-center flex flex-col items-center gap-6">
              <FloralDivider color="var(--color-sage-light)" />
              <p className="font-serif italic text-lg text-stone font-light">
                want to see what i've built?
              </p>
              <Link
                to="/work"
                className="inline-block px-6 py-3 rounded-full border border-sage text-sage font-mono text-[13px] tracking-wide hover:bg-sage hover:text-ink transition-colors duration-300"
              >
                view my work →
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </PageTransition>
  );
}
