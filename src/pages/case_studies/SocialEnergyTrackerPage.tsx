import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../../components/layout/Container";
import { Section, SectionLabel } from "../../components/layout/Section";
import { FadeIn, StaggerGroup } from "../../components/motion/FadeIn";
import { PageTransition } from "../../components/motion/PageTransition";
import { LeafSprig, FloralDivider, Sprout, SmallLeaf } from "../../components/decorative/Botanical";
import { Tag } from "../../components/ui/Tag";
import { fadeUp } from "../../lib/motion";

/* ─────────────────────────────────────────────────────────────────────────────
   MEDIA SLOTS
   All files live in: public/case_studies/social-energy-tracker/
   Reference them here as: /case_studies/social-energy-tracker/<filename>
   ───────────────────────────────────────────────────────────────────────────── */

const BASE = "/case_studies/social-energy-tracker";

const SCREENSHOTS: { src: string; caption: string }[] = [
  // { src: `${BASE}/logging-step1.png`, caption: "step 1 — energy level" },
  // { src: `${BASE}/logging-step2.png`, caption: "step 2 — interaction type" },
  // { src: `${BASE}/logging-step3.png`, caption: "step 3 — tags + journal" },
];

const ANALYTICS_SCREENSHOTS: { src: string; caption: string }[] = [
  // { src: `${BASE}/analytics.png`, caption: "analytics overview" },
  // { src: `${BASE}/timeline.png`, caption: "activity timeline" },
];

const JOURNAL_SCREENSHOTS: { src: string; caption: string }[] = [
  // { src: `${BASE}/journal.png`, caption: "journal — book view" },
];

const DEMO_VIDEO = "";                              // `${BASE}/demo.mp4`
const FLOW_PRELIMINARY = `${BASE}/prelim_flow.png`;
const FLOW_UPDATED = `${BASE}/final_flow.png`;

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <FloralDivider color="var(--color-sage-light)" />
    </div>
  );
}

function CaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-sage tracking-widest uppercase mb-3">
      {children}
    </p>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-sage pl-6 py-1 my-8">
      <p className="text-base md:text-lg font-light text-ink dark:text-cream leading-relaxed italic">
        {children}
      </p>
    </div>
  );
}

function Quote({ text, attribution }: { text: string; attribution: string }) {
  return (
    <div className="bg-parchment dark:bg-night-raised rounded-2xl px-7 py-6 my-2">
      <p className="text-sm text-stone font-light italic leading-relaxed mb-3">"{text}"</p>
      <p className="text-xs text-sage font-medium tracking-wide">— {attribution}</p>
    </div>
  );
}

function InterviewCard({
  initials,
  role,
  context,
  quote,
  takeaway,
}: {
  initials: string;
  role: string;
  context: string;
  quote: string;
  takeaway: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-cream dark:bg-night border border-parchment dark:border-night-raised rounded-2xl p-7 flex flex-col gap-5"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-sage-light/30 flex items-center justify-center shrink-0">
          <span className="text-sm font-medium text-sage">{initials}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-ink dark:text-cream">{role}</p>
          <p className="text-xs text-stone font-light italic">{context}</p>
        </div>
      </div>
      <p className="text-sm text-stone font-light leading-relaxed italic">
        "{quote}"
      </p>
      <div className="pt-3 border-t border-parchment dark:border-night-raised">
        <p className="text-xs font-medium text-sage tracking-wide uppercase mb-1">takeaway</p>
        <p className="text-xs text-stone font-light leading-relaxed">{takeaway}</p>
      </div>
    </motion.div>
  );
}

function PrincipleCard({ principle, detail }: { principle: string; detail: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-parchment dark:bg-night-raised rounded-2xl p-6 flex flex-col gap-3"
    >
      <div className="flex items-start gap-2">
        <SmallLeaf size={16} color="var(--color-sage)" className="mt-0.5 shrink-0" />
        <p className="text-sm font-medium text-ink dark:text-cream">{principle}</p>
      </div>
      <p className="text-xs text-stone font-light leading-relaxed">{detail}</p>
    </motion.div>
  );
}

/* Mobile phone frame for screenshots */
function MobileFrame({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full max-w-[200px] mx-auto">
        {/* Phone shell */}
        <div className="rounded-[2rem] border-2 border-stone/20 bg-ink p-2 shadow-xl">
          {/* Notch */}
          <div className="w-16 h-4 bg-ink rounded-full mx-auto mb-1 relative z-10" />
          {/* Screen */}
          <div className="rounded-[1.4rem] overflow-hidden aspect-[9/19] bg-parchment dark:bg-night-raised">
            <img src={src} alt={caption} className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
      <p className="text-xs text-stone font-light italic text-center">{caption}</p>
    </div>
  );
}

/* Placeholder when no screenshot is provided */
function MobilePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full max-w-[200px] mx-auto">
        <div className="rounded-[2rem] border-2 border-dashed border-sage-light/50 bg-cream dark:bg-night p-2">
          <div className="w-16 h-4 bg-parchment dark:bg-night-raised rounded-full mx-auto mb-1" />
          <div className="rounded-[1.4rem] aspect-[9/19] bg-parchment dark:bg-night-raised flex flex-col items-center justify-center gap-2 p-4">
            <Sprout size={28} color="var(--color-sage-light)" />
            <p className="text-[10px] text-sage-light font-light text-center leading-snug">screenshot<br />coming soon</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-stone/50 font-light italic text-center">{label}</p>
    </div>
  );
}

/* Video player or placeholder */
function VideoSlot({ src, label }: { src: string; label: string }) {
  if (src) {
    return (
      <div className="rounded-2xl overflow-hidden bg-ink aspect-video w-full shadow-xl">
        <video src={src} controls className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="rounded-2xl border-2 border-dashed border-sage-light/40 bg-cream dark:bg-night aspect-video w-full flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-full border-2 border-sage-light/50 flex items-center justify-center">
        <span className="text-sage-light text-lg ml-1">▷</span>
      </div>
      <p className="text-xs text-sage-light font-light italic">{label}</p>
    </div>
  );
}

function ScreenshotRow({
  items,
  fallbacks,
}: {
  items: { src: string; caption: string }[];
  fallbacks: string[];
}) {
  const slots = items.length > 0 ? items : fallbacks.map((label) => ({ src: "", caption: label }));
  return (
    <div className={`grid gap-6 mt-8 ${slots.length === 1 ? "grid-cols-1 max-w-xs mx-auto" : slots.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
      {slots.map((s, i) =>
        s.src
          ? <MobileFrame key={i} src={s.src} caption={s.caption} />
          : <MobilePlaceholder key={i} label={s.caption} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────────────────────── */
export function SocialEnergyTrackerPage() {
  return (
    <PageTransition>

      {/* ── Header ── */}
      <section className="pt-36 pb-20 bg-parchment dark:bg-night-raised relative overflow-hidden">
        <div className="absolute top-12 right-8 md:right-20 text-sage-light opacity-40">
          <LeafSprig size={90} />
        </div>
        <Container>
          <FadeIn>
            <Link to="/work" className="text-xs text-sage font-light link-sage inline-block mb-6">
              ← work
            </Link>
          </FadeIn>
          <FadeIn delay={0.04}>
            <SectionLabel>case study</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-ink dark:text-cream leading-[0.95] mt-4 max-w-2xl">
              social energy<br />
              <span className="italic text-stone">tracker</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-base italic text-sage font-light mt-5 max-w-md leading-relaxed">
              a tool for understanding your own social patterns over time.
            </p>
          </FadeIn>

          {/* Meta strip */}
          <FadeIn delay={0.2}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                { label: "role", value: "ux designer & developer" },
                { label: "timeline", value: "~2 weeks" },
                { label: "platform", value: "mobile-first web / capacitor ios" },
                { label: "tools", value: "react, vite, figma, capacitor" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-mono text-sage tracking-widest uppercase mb-1">{label}</p>
                  <p className="text-sm text-stone font-light leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="flex flex-wrap gap-2 mt-8">
              {["ui/ux design", "data analysis", "self-reflection", "react", "capacitor"].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Overview ── */}
      <Section>
        <Container narrow>
          <FadeIn>
            <SectionDivider />
            <CaseLabel>overview</CaseLabel>
            <p className="text-lg md:text-xl font-light text-stone leading-[1.9]">
              social energy tracker is a mobile app that helps young professionals understand why they feel socially drained.
              users log their social interactions in under 10 seconds, and the app surfaces patterns over time — showing which
              kinds of interactions cost energy and which restore it.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Callout>
              the project began as a personal observation: not all social interactions feel the same. i wanted to build
              something that made that invisible pattern visible.
            </Callout>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Demo video ── */}
      <Section className="bg-parchment dark:bg-night-raised py-12">
        <Container>
          <FadeIn>
            <CaseLabel>demo</CaseLabel>
            <VideoSlot src={DEMO_VIDEO} label="app walkthrough — coming soon" />
          </FadeIn>
        </Container>
      </Section>

      {/* ── Problem ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <FadeIn>
                <SectionDivider />
                <CaseLabel>problem definition</CaseLabel>
                <h2 className="text-3xl md:text-4xl font-light text-ink dark:text-cream tracking-tight leading-tight mt-2">
                  the invisible<br />
                  <span className="italic text-stone">pattern.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.08}>
                <div className="mt-8 opacity-60">
                  <Sprout size={52} color="var(--color-sage)" />
                </div>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <StaggerGroup className="flex flex-col gap-5 pt-2">
                <motion.div variants={fadeUp}>
                  <p className="text-xs font-mono text-sage tracking-widest uppercase mb-2">user</p>
                  <p className="text-sm text-stone font-light leading-relaxed">
                    socially drained young professionals who don't know why they feel the way they do after social interactions.
                  </p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <p className="text-xs font-mono text-sage tracking-widest uppercase mb-2">problem</p>
                  <p className="text-sm text-stone font-light leading-relaxed">
                    people lack awareness of which types of social interactions affect their energy — positively or negatively.
                    without data, patterns stay invisible and behavior can't change.
                  </p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <div className="bg-parchment dark:bg-night-raised rounded-2xl p-6 mt-2">
                    <p className="text-sm text-stone font-light leading-relaxed">
                      there are journaling apps. there are mood trackers. but nothing designed specifically around the
                      relationship between your energy and your social interactions: <span className="text-ink dark:text-cream font-medium">who 
                      you interact with, how many people, what kind of setting, and how it made you feel.</span>
                    </p>
                  </div>
                </motion.div>
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Research ── */}
      <Section className="bg-parchment dark:bg-night-raised">
        <Container>
          <FadeIn>
            <SectionDivider />
            <CaseLabel>research</CaseLabel>
            <h2 className="text-3xl md:text-4xl font-light text-ink dark:text-cream tracking-tight leading-tight mt-2 mb-3">
              three interviews.<br />
              <span className="italic text-stone">one clear signal.</span>
            </h2>
            <p className="text-sm text-stone font-light max-w-lg leading-relaxed mb-10">
              i conducted semi-structured interviews across different professional contexts, probing on current behavior,
              pain points, and what would make or break adoption.
            </p>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <InterviewCard
              initials="JW"
              role="senior product designer"
              context="mid-sized tech company · early 30s · self-described introvert"
              quote="I'd use it, but it can't be slow. I can't be typing in all my thoughts."
              takeaway="Speed and low friction are non-negotiable. Any mandatory typing kills adoption."
            />
            <InterviewCard
              initials="SL"
              role="business analyst"
              context="consulting firm · mid-20s"
              quote="Work is just more draining in general — I'm not sure it's worth tracking."
              takeaway="The value proposition needs to feel personal, not abstract. Low-commitment logging lowers the bar to try."
            />
            <InterviewCard
              initials="HD"
              role="data analyst"
              context="small investment firm · late 20s"
              quote="If it's quick and easy, I'd use it."
              takeaway="Speed is the threshold for adoption. The interaction cost has to feel lighter than the benefit."
            />
          </StaggerGroup>

          {/* Synthesis */}
          <FadeIn>
            <div className="border border-sage-light/30 rounded-2xl p-8 max-w-2xl">
              <p className="text-xs font-mono text-sage tracking-widest uppercase mb-5">synthesis</p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start">
                  <span className="text-sage font-mono text-sm shrink-0 mt-0.5">01</span>
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-cream mb-1">speed is the primary adoption lever</p>
                    <p className="text-sm text-stone font-light leading-relaxed">all three participants were open to the concept but would drop off if logging felt effortful. the threshold is roughly: no interaction should require more than 10 seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-sage font-mono text-sm shrink-0 mt-0.5">02</span>
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-cream mb-1">the "why" is unclear to users</p>
                    <p className="text-sm text-stone font-light leading-relaxed">nobody could easily articulate why certain interactions drained them. the app doesn't need to tell them — it needs to show them patterns they can interpret themselves.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Design Principles ── */}
      <Section>
        <Container>
          <FadeIn>
            <SectionDivider />
            <CaseLabel>design principles</CaseLabel>
            <h2 className="text-3xl md:text-4xl font-light text-ink dark:text-cream tracking-tight leading-tight mt-2 mb-10">
              every decision<br />
              <span className="italic text-stone">flowed from these.</span>
            </h2>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <PrincipleCard
              principle="log in under 10 seconds"
              detail="no mandatory typing. tap-based inputs only. the friction of logging must always feel lighter than the benefit of knowing."
            />
            <PrincipleCard
              principle="typing is optional"
              detail="journal prompts are offered, never required. the app never blocks progress on a free-text field."
            />
            <PrincipleCard
              principle="emotional safety"
              detail="no negative framing, no judgment. the interface is neutral — it reflects, it doesn't evaluate."
            />
            <PrincipleCard
              principle="mobile-first"
              detail="designed for one-handed use. large tap targets. no hover states as primary interactions."
            />
          </StaggerGroup>
        </Container>
      </Section>

      {/* ── User Flow ── */}
      <Section className="bg-parchment dark:bg-night-raised">
        <Container>
          <FadeIn>
            <SectionDivider />
            <CaseLabel>user flow</CaseLabel>
            <h2 className="text-3xl md:text-4xl font-light text-ink dark:text-cream tracking-tight leading-tight mt-2 mb-10">
              removing friction<br />
              <span className="italic text-stone">at every step.</span>
            </h2>
          </FadeIn>
          <StaggerGroup className="flex flex-col gap-8">
            {/* Preliminary flow */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-xs font-mono text-stone/50 tracking-widest uppercase">preliminary flow</p>
              {FLOW_PRELIMINARY ? (
                <div className="relative rounded-2xl overflow-hidden border border-stone">
                  <img src={FLOW_PRELIMINARY} alt="preliminary user flow" className="w-full object-contain bg-cream dark:bg-night" />
                  <div className="absolute bottom-4 left-4 opacity-20 pointer-events-none">
                    <Sprout size={40} color="var(--color-stone)" />
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl border border-stone bg-cream dark:bg-night aspect-[16/7] flex items-center justify-center overflow-hidden">
                  <p className="text-xs text-stone/40 font-light italic">flow diagram coming soon</p>
                  <div className="absolute bottom-4 left-4 opacity-20 pointer-events-none">
                    <Sprout size={40} color="var(--color-stone)" />
                  </div>
                </div>
              )}
              <p className="text-xs text-stone/60 font-light italic">a redundant layer — users had to make a choice before doing anything.</p>
            </motion.div>

            {/* Updated flow */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-xs font-mono text-sage tracking-widest uppercase">updated flow</p>
              {FLOW_UPDATED ? (
                <div className="relative rounded-2xl overflow-hidden border border-sage">
                  <img src={FLOW_UPDATED} alt="updated user flow" className="w-full object-contain bg-cream dark:bg-night" />
                  <div className="absolute top-4 right-4 opacity-25 pointer-events-none">
                    <Sprout size={40} color="var(--color-sage)" />
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl border border-sage bg-cream dark:bg-night aspect-[16/7] flex items-center justify-center overflow-hidden">
                  <p className="text-xs text-sage-light font-light italic">flow diagram coming soon</p>
                  <div className="absolute top-4 right-4 opacity-25 pointer-events-none">
                    <Sprout size={40} color="var(--color-sage)" />
                  </div>
                </div>
              )}
              <p className="text-xs text-sage font-light italic">opens directly to analytics — logging always one tap away.</p>
            </motion.div>
          </StaggerGroup>
        </Container>
      </Section>

      {/* ── Solution ── */}
      <Section>
        <Container>
          <FadeIn>
            <SectionDivider />
            <CaseLabel>solution</CaseLabel>
            <h2 className="text-3xl md:text-4xl font-light text-ink dark:text-cream tracking-tight leading-tight mt-2 mb-14">
              three screens.<br />
              <span className="italic text-stone">one clear loop.</span>
            </h2>
          </FadeIn>

          {/* Logging flow */}
          <div className="mb-20">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-cream bg-sage px-2.5 py-1 rounded-full tracking-widest">01</span>
                <h3 className="text-xl font-light text-ink dark:text-cream">logging flow</h3>
              </div>
              <p className="text-sm text-stone font-light leading-relaxed max-w-lg mb-2">
                split into three fast steps to reduce cognitive load per screen. total time for a minimal log: under 10 seconds.
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="flex flex-wrap gap-3 mt-5 mb-2">
                {[
                  "1. energy level — drained / neutral / energized",
                  "2. interaction type + group size",
                  "3. tags + optional journal",
                ].map((step) => (
                  <div key={step} className="bg-parchment dark:bg-night-raised rounded-full px-4 py-2 text-xs text-stone font-light">
                    {step}
                  </div>
                ))}
              </div>
            </FadeIn>
            <ScreenshotRow
              items={SCREENSHOTS}
              fallbacks={[
                "step 1 — energy level",
                "step 2 — interaction type",
                "step 3 — tags + journal",
              ]}
            />
            <br></br>
            <FadeIn delay={0.1}>
              <Quote
                text="journal prompts are randomized from a bank of 20 reflective questions — enough variety that repeat users see something new."
                attribution="design decision"
              />
            </FadeIn>
          </div>

          {/* Analytics */}
          <div className="mb-20">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-cream bg-sage px-2.5 py-1 rounded-full tracking-widest">02</span>
                <h3 className="text-xl font-light text-ink dark:text-cream">analytics</h3>
              </div>
              <p className="text-sm text-stone font-light leading-relaxed max-w-lg mb-2">
                three lenses on your data — breakdown, category counts, and a timeline. the timeline is the most useful view for spotting patterns: a string of red dots on mondays tells a clearer story than a number.
              </p>
            </FadeIn>
            <ScreenshotRow
              items={ANALYTICS_SCREENSHOTS}
              fallbacks={["energy breakdown", "activity timeline"]}
            />
          </div>

          {/* Journal */}
          <div className="mb-6">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-cream bg-sage px-2.5 py-1 rounded-full tracking-widest">03</span>
                <h3 className="text-xl font-light text-ink dark:text-cream">digital journal</h3>
              </div>
              <p className="text-sm text-stone font-light leading-relaxed max-w-lg mb-2">
                entries are displayed as a physical book metaphor with a CSS 3D page-flip gesture. the drag interaction maps 1:1 with finger movement. re-reading past entries feels intentional — you're leafing through something, not scrolling a feed.
              </p>
            </FadeIn>
            <ScreenshotRow
              items={JOURNAL_SCREENSHOTS}
              fallbacks={["journal — book view"]}
            />
          </div>
        </Container>
      </Section>

      {/* ── Reflection ── */}
      <Section className="bg-parchment dark:bg-night-raised">
        <Container>
          <FadeIn>
            <SectionDivider />
            <CaseLabel>reflection</CaseLabel>
            <h2 className="text-3xl md:text-4xl font-light text-ink dark:text-cream tracking-tight leading-tight mt-2 mb-10">
              what i learned<br />
              <span className="italic text-stone">along the way.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-cream dark:bg-night rounded-2xl p-7">
                <p className="text-xs font-mono text-sage tracking-widest uppercase mb-5">what worked</p>
                <ul className="flex flex-col gap-4">
                  {[
                    "the tap-first logging flow genuinely hits the <10s target — early testing confirmed users didn't feel burdened.",
                    "removing the start screen simplified navigation significantly. users immediately understood where they were.",
                    "energy iconography communicates state without words — no translation issues, no literacy dependency.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-sage/15 text-sage text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                      <p className="text-sm text-stone font-light leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="bg-cream dark:bg-night rounded-2xl p-7">
                <p className="text-xs font-mono text-sage tracking-widest uppercase mb-5">what i'd explore next</p>
                <ul className="flex flex-col gap-4">
                  {[
                    { title: "patterns over time", detail: "a calendar heatmap or weekly rhythm view — the current analytics shows totals, not 'why am i drained every thursday?'" },
                    { title: "reminders", detail: "a gentle nudge after a likely social event (end of workday) could improve logging consistency without feeling invasive." },
                    { title: "qualitative themes", detail: "with enough entries, nlp clustering could surface recurring words — making the 'why' more explicit." },
                    { title: "multi-user / cloud", detail: "scoped to local storage for now. cloud sync would unlock cross-device use and optional sharing." },
                  ].map(({ title, detail }, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-sage font-mono text-xs mt-1 shrink-0">→</span>
                      <div>
                        <p className="text-sm font-medium text-ink dark:text-cream">{title}</p>
                        <p className="text-xs text-stone font-light leading-relaxed mt-0.5">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* ── Deliverable ── */}
      <Section>
        <Container narrow>
          <FadeIn>
            <div className="flex flex-col items-center gap-6 text-center">
              <FloralDivider color="var(--color-sage-light)" />
              <h2 className="text-2xl font-light text-ink dark:text-cream tracking-tight">
                see it in action
              </h2>
              <p className="text-sm text-stone font-light max-w-sm leading-relaxed">
                the app is built as a mobile-first web app wrapped in capacitor for ios distribution.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#"
                  className="inline-block px-6 py-3 rounded-full bg-sage text-ink text-sm font-medium tracking-wide hover:opacity-90 transition-opacity duration-200 opacity-50 cursor-not-allowed"
                  title="coming soon"
                >
                  view figma prototype →
                </a>
                <a
                  href="#"
                  className="inline-block px-6 py-3 rounded-full border border-sage text-sage text-sm font-medium tracking-wide hover:bg-sage hover:text-ink transition-colors duration-300 opacity-50 cursor-not-allowed"
                  title="coming soon"
                >
                  testflight / app store →
                </a>
              </div>
              <p className="text-xs text-stone/50 font-light italic">links coming soon</p>
              <Link to="/work" className="text-xs text-sage font-light link-sage mt-4">
                ← back to work
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

    </PageTransition>
  );
}
