import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { FloralDivider, LeafSprig } from "../components/decorative/Botanical";
import { posts, type Post } from "../lib/content";
import { fadeUp } from "../lib/motion";

function PostRow({ post }: { post: Post }) {
  return (
    <motion.a
      href={post.link ?? "#"}
      target="_blank"
      rel="noreferrer"
      variants={fadeUp}
      className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 py-7 border-b border-[var(--color-parchment)] dark:border-[var(--color-night-raised)] last:border-0"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-medium text-[var(--color-ink)] dark:text-[var(--color-cream)] group-hover:text-[var(--color-sage)] transition-colors duration-200 leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--color-stone)] font-light leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
        <span className="text-xs text-[var(--color-stone)] font-light whitespace-nowrap">{post.date}</span>
        <span className="text-xs text-[var(--color-sage-light)] font-light whitespace-nowrap">{post.readTime} read</span>
      </div>
    </motion.a>
  );
}

export function WritingPage() {
  return (
    <PageTransition>
      {/* ── Header ── */}
      <section className="pt-36 pb-20 bg-[var(--color-parchment)] dark:bg-[var(--color-night-raised)] relative overflow-hidden">
        <div className="absolute top-12 right-8 md:right-20 text-[var(--color-sage-light)] opacity-40">
          <LeafSprig size={80} />
        </div>
        <Container>
          <FadeIn>
            <SectionLabel>writing</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[var(--color-ink)] dark:text-[var(--color-cream)] leading-[0.95] mt-4 max-w-lg">
              things i've been<br />
              <span className="italic text-[var(--color-stone)]">thinking about.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-base text-[var(--color-stone)] font-light mt-6 max-w-md leading-relaxed">
              essays, notes, and half-formed thoughts — published on substack.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ── Posts ── */}
      <Section>
        <Container narrow>
          <FadeIn>
            <div className="mb-10">
              <FloralDivider color="var(--color-sage-light)" />
            </div>
          </FadeIn>

          <StaggerGroup>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </StaggerGroup>

          <FadeIn delay={0.2}>
            <div className="mt-12">
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
        </Container>
      </Section>
    </PageTransition>
  );
}
