import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { FadeIn } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { LeafSprig, TinyMushroom, FloralDivider } from "../components/decorative/Botanical";
import { bio } from "../lib/content";

export function ContactPage() {
  return (
    <PageTransition>
      <Section
        className="min-h-[100dvh] flex flex-col justify-center bg-[var(--color-ink)] dark:bg-[var(--color-night)] relative overflow-hidden pt-24"
      >
        <div className="absolute top-16 right-10 text-[var(--color-sage)] opacity-20">
          <LeafSprig size={100} />
        </div>
        <div className="absolute bottom-16 left-10 text-[var(--color-sage)] opacity-15">
          <TinyMushroom size={60} />
        </div>
        <div className="absolute bottom-32 right-20 text-[var(--color-sage)] opacity-10">
          <LeafSprig size={60} />
        </div>

        <Container narrow>
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-sage)] mb-8">
              get in touch
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h1 className="text-4xl md:text-6xl font-light text-[var(--color-cream)] tracking-tight leading-tight mb-6">
              let's talk about<br />
              <span className="italic text-[var(--color-sage-light)]">something interesting.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="text-base text-[var(--color-sage-light)] font-light leading-relaxed mb-12 max-w-md">
              i'm always open to conversations about data, education, interesting problems, and the way design shapes how people feel.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="flex flex-wrap gap-6 items-center mb-16">
              <a
                href="mailto:amandawangmei.design@gmail.com"
                className="inline-block px-6 py-3 rounded-full border border-[var(--color-sage)] text-[var(--color-sage)] text-sm font-medium tracking-wide hover:bg-[var(--color-sage)] hover:text-[var(--color-ink)] transition-colors duration-300"
              >
                send an email →
              </a>
              <div className="flex items-center gap-5">
                <a href="https://www.linkedin.com/in/amandawangmei/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[var(--color-sage-light)] hover:text-[var(--color-sage)] transition-colors duration-200 text-sm font-light link-sage">
                  linkedin
                </a>
                <span className="text-[var(--color-stone)]">·</span>
                <a href="https://github.com/awmei24/" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[var(--color-sage-light)] hover:text-[var(--color-sage)] transition-colors duration-200 text-sm font-light link-sage">
                  github
                </a>
                <span className="text-[var(--color-stone)]">·</span>
                <a href="https://www.instagram.com/amand.amei/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[var(--color-sage-light)] hover:text-[var(--color-sage)] transition-colors duration-200 text-sm font-light link-sage">
                  instagram
                </a>
                <span className="text-[var(--color-stone)]">·</span>
                <a href="https://bsky.app/profile/amandawangmei.bsky.social" target="_blank" rel="noreferrer" aria-label="Bluesky" className="text-[var(--color-sage-light)] hover:text-[var(--color-sage)] transition-colors duration-200 text-sm font-light link-sage">
                  bluesky
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <FloralDivider color="var(--color-stone)" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs text-[var(--color-stone)] font-light">
                © 2025 {bio.name} — handcrafted with care
              </p>
              <p className="text-xs text-[var(--color-stone)] font-light italic">
                designed & built in the garden ✦
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </PageTransition>
  );
}
