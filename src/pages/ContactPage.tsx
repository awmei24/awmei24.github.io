import { Container } from "../components/layout/Container";
import { Section, SectionLabel } from "../components/layout/Section";
import { FadeIn } from "../components/motion/FadeIn";
import { PageTransition } from "../components/motion/PageTransition";
import { LeafSprig, TinyMushroom, FloralDivider } from "../components/decorative/Botanical";
import { PillLink } from "../components/ui/PillLink";
import { usePageTitle } from "../hooks/usePageTitle";
import { bio, socials } from "../lib/content";

export function ContactPage() {
  usePageTitle("contact");
  return (
    <PageTransition>
      <Section
        className="min-h-[100dvh] flex flex-col justify-center bg-ink dark:bg-night relative overflow-hidden pt-24"
      >
        <div className="absolute top-16 right-10 text-sage opacity-20">
          <LeafSprig size={100} />
        </div>
        <div className="absolute bottom-16 left-10 text-sage opacity-15">
          <TinyMushroom size={60} />
        </div>
        <div className="absolute bottom-32 right-20 text-sage opacity-10">
          <LeafSprig size={60} />
        </div>

        <Container narrow>
          <FadeIn>
            <SectionLabel>get in touch</SectionLabel>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h1 className="font-serif font-normal text-4xl md:text-6xl text-cream tracking-[-0.02em] leading-tight mb-6">
              let's talk about<br />
              <span className="italic text-sage-light">something interesting.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="text-base text-sage-light font-normal leading-relaxed mb-12 max-w-md">
              i'm always open to conversations about data, education, interesting problems, and the way design shapes how people feel.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="flex flex-wrap gap-6 items-center mb-16">
              <PillLink href={socials.email} size="lg">
                send an email →
              </PillLink>
              <div className="flex items-center gap-5">
                {(
                  [
                    ["linkedin", socials.linkedin],
                    ["github", socials.github],
                    ["instagram", socials.instagram],
                    ["bluesky", socials.bluesky],
                  ] as const
                ).map(([label, href], i) => (
                  <span key={label} className="flex items-center gap-5">
                    {i > 0 && <span className="text-stone" aria-hidden="true">·</span>}
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sage-light hover:text-sage transition-colors duration-200 font-mono text-xs tracking-[0.06em] link-sage"
                    >
                      {label}
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <FloralDivider color="var(--color-stone)" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="font-mono text-[11px] text-stone">
                © 2026 {bio.name} — handcrafted with care
              </p>
              <p className="font-serif italic text-sm text-sage">
                designed & built in the garden ✦
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </PageTransition>
  );
}
