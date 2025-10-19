# EchoHub — Landing Page Build Kit (2025)

**Goal**: Ship a cinematic, non-generic landing page for EchoHub that feels premium and human. No gradients. Light‑neutral palette with matte highlights, soft shadows, micro‑interactions, and purposeful motion.

---

## 1) Concept & Positioning

- **Value promise**: “One calm place for all your client chaos.”
- **Design vibe**: Minimal, tactile, editorial. Paper‑like surfaces, subtle borders, and soft elevation (no glassmorphism, no neon gradient blobs).
- **Motion ethos**: Elegant, not flashy. Use motion to guide the eye, reveal hierarchy, and choreograph reading, never to distract. Respect `prefers-reduced-motion`.

---

## 2) Visual Language (Tokens)

> Tailwind v4 CSS-first config via `@theme` → exposes tokens as CSS variables.

**Palette (OKLCH)**

- Base: `--bg: oklch(0.98 0.01 95)` (warm paper), `--fg: oklch(0.22 0.03 265)` (ink)
- Muted: `--muted: oklch(0.96 0.01 95)`, `--muted-ink: oklch(0.40 0.02 265)`
- Accents (use sparingly):

  - `--accent-ink: oklch(0.42 0.10 30)` (copper brown for tiny details)
  - `--accent-sky: oklch(0.80 0.07 240)` (subtle link state)

**Type**

- Display: "Geist VF", fallback `system-ui`.
- Text: "Inter VF", fallback `system-ui`.
- Scale: `--step--1: 0.88rem`, `--step0: 1rem`, `--step1: 1.125rem`, `--step2: 1.25rem`, `--step3: 1.5rem`, `--step4: 1.875rem`, `--step5: 2.25rem`, `--step6: 3rem`.

**Radius & Shadows**

- Radius: `--r-sm: .375rem`, `--r-md: .75rem`, `--r-xl: 1.25rem`, `--r-2xl: 1.75rem`.
- Shadow (matte): `--shadow-100: 0 1px 0 rgba(0,0,0,.06)`, `--shadow-200: 0 8px 24px rgba(0,0,0,.06)`, `--shadow-300: 0 24px 48px rgba(0,0,0,.08)`.

**Borders**

- Hairline neutral: `--line: color-mix(in oklab, var(--fg) 10%, transparent)`.

---

## 3) Information Architecture

- **Hero** — "Control your freelance chaos" + primary CTA + product film strip.
- **Problem → Solution** — Side‑by‑side (split section) with scannable bullets.
- **Live Mini‑Demos** — Client Hub timeline scroller + AI Summary reveal.
- **Features** — 6 tiles (Client Hubs, AI Summaries, Proposals, Scheduler, Inbox Sync, Dashboard).
- **Proof** — Logos, quick testimonials, tiny metrics.
- **Pricing** — Free / Pro / Team with footnotes.
- **FAQ** — 6–8 questions, progressive disclosure.
- **Final CTA** — Sticky footer bar + anchor to signup.

---

## 4) Section‑by‑Section Spec (UX + Content)

### Hero (Cinematic)

- Large headline (2.25–3rem): “One calm place for all your client chaos.”
- Subhead: 2 lines max. Emphasize AI summaries + centralized comms.
- CTAs: Primary “Start free” + Secondary “See a live demo”.
- Visual: A horizontal film‑strip of real UI fragments (cards) that parallax subtly and snap into place; on scroll, pieces align into a clean dashboard composition.

### Problem → Solution

- Left: "Fragmentation hurts" (Notion/Gmail/Trello/Docs icons as neutral outlines).
- Right: "EchoHub consolidates" with micro‑diagram arrows; tap/hover highlights.

### Live Mini‑Demos

- **Client Hub Timeline**: Draggable timeline with milestone chips (GSAP inertia). On release, chips snap to dates → shows structured notes.
- **AI Summary Reveal**: Masked text reveal from raw notes → polished summary (SplitText + clip‑path reveal). Toggle “raw ↔ summarized”.

### Features Grid

- 6 cards, monochrome illustrations, crisp borders, micro‑lift on hover with `translate-y-0.5` and shadow delta.

### Proof

- 6 grayscale client logos; tap to see a one‑line testimonial (View Transition swap).

### Pricing

- Neutral cards, footnotes for limits. Toggle monthly/annual (no price dancing). CTA repeats.

### FAQ

- Accordion with smooth height measure (content measurement pre‑computed to avoid layout jank). Keyboard accessible.

### Final CTA

- Soft sticky footer bar appears after 50% scroll; GSAP `ScrollTrigger` pins and fades in.

---

## 5) Motion & Interaction Blueprint

- **Libraries**: GSAP core + ScrollTrigger (+ SplitText for headings). Respect `prefers-reduced-motion`.
- **Patterns**

  - **Orchestrated reveals**: Parent timeline controls child delays (stagger).
  - **Parallax film‑strip**: X‑axis parallax on hero items; snap to grid at 20% scroll.
  - **FLIP**: Reflow feature cards into a compact grid on smaller breakpoints.
  - **View Transitions**: FAQ open/close and logo → testimonial swaps.
  - **Reduced motion**: Disable parallax, replace with simple fade + translate of 2–4px.

---

## 6) Accessibility & Performance Budgets

- Color contrast AA minimum (text vs background ≥ 4.5:1).
- Hit targets ≥ 40px; focus visible customized (outline offset).
- CLS < 0.05; LCP < 2.5s on mid‑tier mobile; TTI < 3.5s.
- Hero images preloaded; use `next/image` with proper `sizes` and `priority`.

---

## 7) SEO & Analytics

- Semantic headings; one H1; meta with `next-seo`.
- Open Graph / Twitter images via `@vercel/og` or static assets.
- Event map: `cta_clicked`, `demo_opened`, `pricing_toggle`, `faq_opened`.

---

## 8) Tech Stack & Versions (pin for 2025)

- **Next.js**: 15.x stable (App Router, Turbopack default).
- **React**: 19.2
- **Tailwind CSS**: v4 (CSS-first config, `@tailwindcss/postcss`).
- **GSAP**: 3.13.x (core, ScrollTrigger, SplitText).
- **Icons**: `lucide-react` (outline, neutral).
- **Fonts**: `@next/font/google` Inter or `@vercel/fonts` Geist.
- **SEO**: `next-seo`.

> Use minimal dependencies; avoid bulky UI kits to keep the site distinctive. For primitives, prefer headless patterns + Radix when needed.

---

## 9) Project Structure

```
/app
  /(site)
    page.tsx
    layout.tsx
    components/
      Hero.tsx
      FilmStrip.tsx
      ProblemSolution.tsx
      MiniDemos/
        TimelineDemo.tsx
        SummaryReveal.tsx
      Features.tsx
      Proof.tsx
      Pricing.tsx
      FAQ.tsx
      FinalCTA.tsx
    lib/
      gsapClient.ts
      motionPrefs.ts
    styles/
      globals.css (imports tailwind and theme)
/public
  /media (hero strips, logos)
```

---

## 10) Tailwind v4 CSS (globals extract)

```css
/* src/app/styles/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: "Inter var", system-ui, sans-serif;
  --font-display: "Geist Variable", system-ui, sans-serif;

  --color-bg: oklch(0.98 0.01 95);
  --color-ink: oklch(0.22 0.03 265);
  --color-muted: oklch(0.96 0.01 95);
  --color-line: color-mix(in oklab, var(--color-ink) 10%, transparent);
  --radius: 1.25rem;

  --shadow-100: 0 1px 0 rgba(0, 0, 0, 0.06);
  --shadow-200: 0 8px 24px rgba(0, 0, 0, 0.06);
  --shadow-300: 0 24px 48px rgba(0, 0, 0, 0.08);
}

:root {
  color-scheme: light;
}

body {
  @apply bg-[--color-bg] text-[--color-ink] antialiased;
}

.card {
  @apply rounded-[--radius] border border-[--color-line] shadow-[var(--shadow-100)] bg-white/90 backdrop-blur-[0.5px];
}

.link-underline {
  text-decoration: none;
  position: relative;
}
.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 1px;
  width: 100%;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.link-underline:hover::after {
  transform: scaleX(1);
}
```

---

## 11) GSAP Client Helper

```ts
// src/app/lib/gsapClient.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
```

---

## 12) Hero Interaction (sketch)

```tsx
// src/app/components/Hero.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".h-head", { y: 24, opacity: 0, duration: 0.6 })
        .from(".h-sub", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".h-cta", { opacity: 0, duration: 0.4 }, "-=0.2");

      gsap.utils.toArray(".strip-item").forEach((el, i) => {
        gsap.to(el as Element, {
          xPercent: (i % 2 === 0 ? -1 : 1) * 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=60% top",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-28 pb-24">
      <div className="container mx-auto px-6">
        <h1 className="h-head font-[var(--font-display)] text-[--step6] leading-[1.05] tracking-[-0.02em] max-w-3xl">
          One calm place for all your client chaos.
        </h1>
        <p className="h-sub mt-5 text-[--step2] max-w-2xl opacity-80">
          EchoHub unifies clients, projects, proposals, and comms — with AI
          summaries and a smart scheduler.
        </p>
        <div className="h-cta mt-8 flex gap-3">
          <a className="btn-primary" href="#signup">
            Start free
          </a>
          <a className="btn-ghost" href="#demo">
            See a live demo
          </a>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-6 gap-4 px-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="strip-item card h-40" />
        ))}
      </div>
    </section>
  );
}
```

---

## 13) Kiro IDE — One‑Shot Prompt

Use this **exact** prompt in Kiro to scaffold the project.

```
You are Kiro IDE. Create a production‑ready Next.js 15 + React 19 + Tailwind v4 landing page for “EchoHub – AI Workspace for Freelancers and Creators”.

### Tech & Versions
- next: ^15.5.x (App Router, Turbopack)
- react: 19.2.x; react-dom: 19.2.x
- tailwindcss: ^4.0.0 with @tailwindcss/postcss (CSS-first @theme config)
- gsap: ^3.13.0 (core, ScrollTrigger, SplitText)
- lucide-react (icons), next-seo, @vercel/analytics (optional)
- Fonts: Inter (next/font/google) or Geist (via @vercel/fonts)

### Rules
- No gradients. Light-neutral matte surfaces, soft shadows, 1px hairline borders.
- Minimal dependencies, no component kits. Use headless patterns. Respect prefers-reduced-motion.
- Pass performance budgets (CLS < .05, LCP < 2.5s mid-mobile). Ship accessible semantics.

### Scaffold
- App Router structure under /app. Components under /app/components.
- Global CSS at /app/styles/globals.css: import tailwind; define @theme tokens (see below).
- Pages/sections: Hero, ProblemSolution, MiniDemos (TimelineDemo + SummaryReveal), Features, Proof, Pricing, FAQ, FinalCTA.

### Implement
1) **Hero** with parallax film-strip of cards (GSAP timeline + ScrollTrigger). CTAs: Start free / See a live demo.
2) **Problem→Solution** split: icon list left (fragmentation), concise copy right (consolidation) with arrow diagram.
3) **MiniDemos**: (a) Draggable timeline with momentum snap; (b) Raw→AI summary mask reveal toggle.
4) **Features Grid** of 6 cards; monochrome illustrations; micro‑lift on hover.
5) **Proof**: grayscale logos with View Transition swap to one‑liners on click.
6) **Pricing**: 3 plans with concise footnotes and monthly/annual toggle.
7) **FAQ**: accessible accordion; arrow rotates; height anim without jank.
8) **Final CTA**: sticky footer bar appears after 50% scroll.

### Motion guard
- Use a `motionPrefs` util (reads prefers-reduced-motion). If reduced, disable parallax and replace with fades.

### Tokens (place in @theme)
- --color-bg, --color-ink, --color-muted, --color-line
- --radius, shadows (100/200/300), type scale steppers

### Deliverables
- Working page.tsx with all sections
- gsapClient.ts with plugin registration
- Basic tests for key utilities (motionPrefs)
- next-seo config with OG tags
- README with setup and scripts

### Copy Seeds
Headline: “One calm place for all your client chaos.”
Subhead: “EchoHub unifies clients, projects, proposals, and comms — with AI summaries and a smart scheduler.”
CTA Primary: “Start free”  Secondary: “See a live demo”
```

---

## 14) Roadmap & Milestones

**Day 1–2 — Foundations**

- Scaffold Next 15 + React 19 + Tailwind v4; tokens; fonts.
- Global layout, nav, footer, SEO config, analytics hook.

**Day 3 — Hero & Motion**

- Build film‑strip; GSAP timelines; responsive; reduced‑motion branch.

**Day 4 — Middle Sections**

- Problem→Solution, MiniDemos, Features; interaction polish.

**Day 5 — Proof, Pricing, FAQ, Final CTA**

- Implement, test accessibility, content polish.

**Day 6 — Perf & QA**

- Image optimization, preloading; Lighthouse pass; tweak motion curves; copy edits.

**Day 7 — Launch**

- UTM wiring, analytics dashboards, error boundaries, 404/500.

---

## 15) A/B Ideas

- Hero headline variants: “Organize clients. Ship faster.” vs control.
- CTA label: “Start free” vs “Try the demo”.
- Film‑strip speed: subtle vs none.

---

## 16) Content Checklist

- Crisp copy (8th‑grade readability), no jargon.
- Remove all lorem ipsum.
- Include legal: Terms/Privacy links in footer.

---

## 17) Commands

```
# install
pnpm add next@15 react@19 react-dom@19 tailwindcss@^4 @tailwindcss/postcss gsap lucide-react next-seo

# dev
pnpm dev

# build
pnpm build && pnpm start
```

---
