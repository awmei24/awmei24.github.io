# Social Energy Tracker — UX Case Study

**Role:** UX Designer & Developer  
**Timeline:** ~2 weeks  
**Platform:** Mobile-first web app (Capacitor iOS)  
**Tools:** React, Vite, styled-components, Figma, Capacitor

---

## Overview

Social Energy Tracker is a mobile app that helps young professionals understand why they feel socially drained. Users log their social interactions in under 10 seconds, and the app surfaces patterns over time — showing which kinds of interactions cost energy and which restore it.

The project began as a personal observation: as a hyperactive extrovert, I noticed that not all social interactions felt the same. Conversations with introverted friends surfaced a gap in self-awareness — people sensed they were drained but couldn't explain why. I wanted to build something that made that invisible pattern visible.

---

## Problem Definition

**User:** Socially drained young professionals who don't know why they feel the way they do after social interactions.

**Problem:** People lack awareness of which types of social interactions affect their energy — positively or negatively. Without data, patterns stay invisible and behavior can't change.

There are journaling apps. There are mood trackers. But nothing designed specifically around the social dimension of energy: who you interact with, how many people, what kind of setting, and how it made you feel.

---

## Research

### Research Questions

- What kinds of social interactions feel draining? Are there consistent patterns?
- Do people currently track their social interactions in any way?
- Would someone use an app like this? What would make or break adoption?
- Why do certain social interactions drain people?

### User Interviews

I conducted three semi-structured interviews with participants across different professional contexts.

---

**Interview 1 — JW**  
*Senior product designer, mid-sized tech company, early 30s, self-described introvert*

JW finds 1:1 interactions with first-time acquaintances the most draining — characterized by hedged language ("I think," "I'm guessing") and high cognitive effort. She journals regularly but has never thought to track social interactions specifically.

Key quote: *"I'd use it, but it can't be slow. I can't be typing in all my thoughts."*

**Takeaway:** Speed and low friction are non-negotiable. Any mandatory typing kills adoption.

---

**Interview 2 — SL**  
*Business analyst, consulting firm, mid-20s*

SL finds large group settings most draining — specifically situations where she feels she doesn't get a chance to contribute, or feels pressure to manage others' emotions. She's conscious of "everyone's opinion" in the room. She doesn't currently track interactions and isn't sure they're worth tracking: *"work is just more draining in general."*

She saw potential value but was skeptical she'd use it consistently herself.

**Takeaway:** The value proposition needs to feel personal, not abstract. Low-commitment logging lowers the bar to try.

---

**Interview 3 — HD**  
*Data analyst, small investment firm, late 20s*

HD's draining moment: *"When there's one guy who keeps talking but I don't totally get their vibe, or what they're talking about."* — a mismatch of conversational register. He doesn't track anything currently.

Key quote: *"If it's quick and easy, I'd use it."*

**Takeaway:** Speed is the threshold for adoption. The interaction cost has to feel lighter than the benefit.

---

### Research Synthesis

Across all three interviews, two things stood out:

1. **Speed is the primary adoption lever.** All three participants were open to the concept but would drop off if logging felt effortful. The threshold is roughly: no interaction should require more than 10 seconds.
2. **The "why" is unclear to users.** Nobody could easily articulate why certain interactions drained them. The app doesn't need to tell them — it needs to show them patterns they can interpret themselves.

---

## Design Principles

These principles shaped every decision from screen count to interaction design:

| Principle | What it means in practice |
|---|---|
| **Log in under 10 seconds** | No mandatory typing. Tap-based inputs only. |
| **Typing is optional** | Journal prompts are offered, never required. |
| **Emotional safety** | No negative framing, no judgment. The interface is neutral. |
| **Mobile-first** | Designed for one-handed use. Large tap targets. No hover states as primary interactions. |

---

## User Flow

### Preliminary Flow

Early explorations had a start screen as a decision gate: log an interaction or view analytics. This led to a redundant layer of navigation — users had to make a choice before doing anything.

### Updated Flow

The revised flow removes the start screen entirely. The app opens directly to analytics (the "home" view), with logging always one tap away from the bottom navigation.

```
Open app → Analytics (home)
         → [bottom nav] Log → Logging screen → Journal prompt? (optional) → Done
         → [bottom nav] Journal → Digital journal (entries with flip animation)
```

This maps to how users actually behave: they log after an interaction, then check analytics later when reflecting. The home view gives them a reason to return.

---

## Solution

### Logging Flow

The log form is split into three fast steps to reduce cognitive load per screen:

1. **Energy level** — three options: Drained / Neutral / Energized, represented by icons
2. **Interaction type + group size** — tap to select; no typing
3. **Tags + optional journal** — pre-set tags for common contexts (first-time, one-on-one, work, etc.) with a free-text option; followed by an optional journal prompt

Total time for a minimal log: under 10 seconds. The journal step is skippable.

**Journal prompts** are randomized from a bank of 20 reflective questions — enough variety that repeat users see something new, but grounded in the context of the log they just submitted. Examples:

- *"What was the moment that shifted the energy for you?"*
- *"Was there anything left unsaid?"*
- *"What would have made this interaction feel lighter?"*

### Analytics

The analytics view gives users three lenses on their data:

- **Energy breakdown** — a horizontal bar chart showing the proportion of drained / neutral / energized interactions
- **Interaction types** — counts per category so users can spot which contexts appear most
- **Recent activity timeline** — a vertical timeline with color-coded dots, showing the pattern of interactions over recent days

The timeline is the most useful view for spotting patterns — a string of red dots on Mondays, for example, tells a clearer story than a number.

### Digital Journal

Journal entries are displayed as a physical book metaphor: a single page with a spine, supporting a CSS 3D page-flip gesture. Users swipe left to advance, swipe right to go back, or use nav buttons. The drag interaction maps 1:1 with finger movement, with physics-based easing on release.

This makes re-reading past entries feel intentional — you're leafing through something, not scrolling a feed.

---

## Reflection

### What worked

- The tap-first logging flow genuinely hits the <10s target for a basic log. Early testing with the prototype confirmed users didn't feel burdened.
- Removing the start screen simplified navigation significantly. Users immediately understood where they were.
- The energy iconography (with visual variants for light/dark contexts) communicates state without words — no translation issues, no literacy dependency.

### What I'd explore next

- **Patterns over time:** The analytics view shows totals, but doesn't yet answer "why am I consistently drained on Thursdays?" — a calendar heatmap or weekly rhythm view could surface this.
- **Reminders:** A gentle nudge after a likely social event (end of workday, Friday afternoon) could improve logging consistency without feeling invasive.
- **Qualitative themes:** If enough journal entries accumulate, NLP clustering could surface recurring words or themes — surfacing the "why" more explicitly.
- **Multi-user / shared context:** Scoped to local storage for now. Cloud sync would unlock cross-device use and optional sharing.

---

## Deliverable

The app is built as a mobile-first web app wrapped in Capacitor for iOS distribution. The prototype follows the production user flow and is available in Figma.

> View prototype → *[Figma link]*  
> View live app → *[App Store / TestFlight link]*

---

*This case study documents the research, design decisions, and tradeoffs behind Social Energy Tracker. All interview participants consented to their anonymized responses being used for research purposes.*
