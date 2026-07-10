import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { PageHero } from "../components/layout/PageHero";
import { FadeIn, StaggerGroup } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { FloralDivider } from "../components/decorative/Botanical";
import { PostRow } from "../components/ui/PostRow";
import { usePageTitle } from "../hooks/usePageTitle";
import { posts } from "../lib/content";

export function WritingPage() {
  usePageTitle("writing");

  return (
    <PageTransition>
      <PageHero
        label="writing"
        title={
          <>
            things i've been<br />
            <span className="italic text-stone">thinking about.</span>
          </>
        }
        titleClassName="max-w-lg"
        description="essays, notes, and half-formed thoughts — published on substack."
      />

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
              <PostRow
                key={post.id}
                href={post.link}
                title={post.title}
                description={post.excerpt}
                meta={
                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                    <span className="font-mono text-[11px] text-stone dark:text-sage-light whitespace-nowrap">{post.date}</span>
                    <span className="font-mono text-[11px] text-sage-light whitespace-nowrap">{post.readTime} read</span>
                  </div>
                }
              />
            ))}
          </StaggerGroup>

          <FadeIn delay={0.2}>
            <div className="mt-12">
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
        </Container>
      </Section>
    </PageTransition>
  );
}
