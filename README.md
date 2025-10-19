# EchoHub Landing Page

A cinematic, production-ready landing page for EchoHub — an AI-powered workspace for freelancers and creators.

## Tech Stack

- **Next.js 15.5** (App Router, Turbopack)
- **React 19.2**
- **Tailwind CSS v4** (CSS-first configuration)
- **GSAP 3.13** (ScrollTrigger for animations)
- **TypeScript**

## Features

- 🎨 Light-neutral matte design with OKLCH color space
- ✨ Cinematic parallax hero with film-strip cards
- 🎯 Interactive mini-demos (Timeline & AI Summary)
- ♿ Accessible (respects prefers-reduced-motion)
- 🚀 Performance optimized (CLS < 0.05, LCP < 2.5s)
- 📱 Fully responsive

## Getting Started

### Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Run development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /components
    Hero.tsx              # Parallax hero section
    ProblemSolution.tsx   # Split comparison section
    Features.tsx          # 6-card feature grid
    Pricing.tsx           # 3-tier pricing with toggle
    FAQ.tsx              # Accessible accordion
    Proof.tsx            # Testimonial logos
    FinalCTA.tsx         # Sticky footer CTA
    Footer.tsx           # Site footer
    /MiniDemos
      TimelineDemo.tsx    # Interactive timeline
      SummaryReveal.tsx   # AI summary toggle
  /lib
    gsapClient.ts        # GSAP plugin registration
    motionPrefs.ts       # Motion preference detection
  /styles
    globals.css          # Tailwind + theme tokens
  layout.tsx             # Root layout
  page.tsx               # Main landing page
```

## Design Tokens

All design tokens are defined in `app/styles/globals.css` using Tailwind v4's `@theme` directive:

- Colors: OKLCH color space for perceptual uniformity
- Typography: Fluid type scale (step--1 to step6)
- Spacing: Consistent radius and shadow system
- Motion: Respects user preferences

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels and keyboard navigation
- Focus visible states
- Respects `prefers-reduced-motion`
- Color contrast AA compliant

## Performance

- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Minimal dependencies
- CSS-first approach with Tailwind v4

## License

MIT
