# EchoHub MVP Definition

## MVP Philosophy

Ship the **minimum** feature set that solves the **core problem**: freelancers losing track of client communications, deadlines, and project details across fragmented tools.

**Timeline**: 8-10 weeks  
**Goal**: Get 20 active users managing real clients within 30 days of launch

---

## Core Problem We're Solving

Freelancers juggle Gmail, Notion, Trello, Google Docs, and spreadsheets. They lose messages, miss deadlines, and waste time context-switching. They need **one calm place** to see everything about a client.

---

## MVP Feature Set

### 1. Authentication & Onboarding

**What**: Simple, fast signup flow

- Email/password authentication
- Google OAuth (single sign-on)
- Basic profile setup (name, timezone, work type)
- 2-minute onboarding tutorial (interactive walkthrough)

**Why**: Low friction to get started; no complex setup

---

### 2. Client Hub (Core Feature)

**What**: Dedicated space for each client with all relevant information

- Create/edit/archive client profiles
- Client details: name, email, company, status (active/paused/completed)
- Project association (one client can have multiple projects)
- Quick notes section (rich text editor)
- File attachments (drag-and-drop, max 10MB per file)
- Activity timeline (chronological log of all interactions)

**Why**: This is the heart of EchoHub – the "single source of truth" for each client

**Constraints**:

- Free tier: 3 active clients max
- Pro tier: Unlimited clients

---

### 3. Project Management (Simplified)

**What**: Basic project tracking within client hubs

- Create projects with title, description, deadline
- Project status: Not Started / In Progress / Review / Completed
- Milestone list (simple checklist, not Gantt charts)
- Notes per project (rich text)
- File attachments per project

**Why**: Freelancers need to track deliverables, not run complex PM workflows

**Constraints**:

- No dependencies, no Gantt charts, no resource allocation
- Keep it simple: title, deadline, status, notes

---

### 4. AI Summaries (Differentiator)

**What**: AI-powered summarization of project notes and communications

- "Summarize this project" button on any project
- Generates 3-5 bullet point summary of current status
- Uses Google Gemini 2.5 Flash API
- Cached summaries (regenerate on demand)

**Why**: This is the AI magic that saves time and provides clarity

**Constraints**:

- Free tier: 5 AI summaries per month
- Pro tier: 100 AI summaries per month
- Simple prompt engineering, no fine-tuning

---

### 5. Dashboard (Overview)

**What**: Single-page overview of all work

- List of active clients (card view)
- Upcoming deadlines (next 7 days)
- Recent activity feed (last 10 actions)
- Quick stats: total clients, active projects, overdue items

**Why**: Freelancers need to see "what's urgent" at a glance

**Constraints**:

- No complex analytics or charts
- Focus on actionable information

---

### 6. Search

**What**: Fast search across all content

- Search clients by name
- Search projects by title or description
- Search notes by content
- Instant results (no pagination)

**Why**: Finding information quickly is critical

**Constraints**:

- Basic text search (PostgreSQL full-text search)
- No advanced filters in MVP

---

### 7. Notifications (Email Only)

**What**: Simple email reminders

- Deadline approaching (24 hours before)
- Overdue project alert
- Weekly summary email (optional, user preference)

**Why**: Keep users engaged without building complex in-app notifications

**Constraints**:

- Email only (no push, no SMS)
- User can disable in settings

---

## What's NOT in MVP

### Explicitly Excluded (Save for Post-MVP)

- ❌ Gmail/Outlook integration (too complex for MVP)
- ❌ Proposal generator (nice-to-have, not core)
- ❌ Calendar integration
- ❌ Time tracking
- ❌ Team collaboration features
- ❌ Client portal (client-facing view)
- ❌ Mobile app (web-responsive is enough)
- ❌ Advanced AI (sentiment analysis, follow-up suggestions)
- ❌ Invoicing or payments
- ❌ Custom branding
- ❌ API access
- ❌ Zapier integration
- ❌ Real-time collaboration
- ❌ Comments/mentions system

**Rationale**: These features are valuable but not essential to solve the core problem. Ship fast, validate, then add.

---

## Technical Stack (MVP)

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (dark theme already built)
- **UI Components**: Radix UI primitives (headless)
- **Icons**: Lucide React
- **Rich Text**: Tiptap or Lexical (lightweight)
- **Animations**: GSAP (already implemented)

### Backend

- **Runtime**: Node.js with Next.js API routes
- **Database**: PostgreSQL (local/Oracle VPS)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Storage**: AWS S3 or Cloudflare R2
- **AI**: Google Gemini 2.5 Flash

### Infrastructure

- **Hosting**: Vercel (frontend + API routes)
- **Database**: PostgreSQL on Oracle VPS
- **Email**: Resend or SendGrid
- **Analytics**: Vercel Analytics + PostHog (optional)
- **Error Tracking**: Sentry

### Development Tools

- **TypeScript**: Strict mode
- **Linting**: ESLint + Prettier
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Version Control**: Git + GitHub

---

## User Flow (MVP)

### First-Time User

1. Land on homepage → Click "Start Free"
2. Sign up with email or Google
3. Quick onboarding: "What type of work do you do?" (optional)
4. See empty dashboard with "Add your first client" CTA
5. Create first client → Add a project → Write notes
6. Click "Summarize with AI" → See magic happen
7. Explore dashboard, add more clients

### Returning User

1. Log in → See dashboard
2. Check upcoming deadlines
3. Click into a client hub
4. Update project status or add notes
5. Use search to find old project
6. Generate AI summary for weekly update

---

## Success Metrics (MVP)

### Acquisition

- 100 signups in first month
- 50% signup completion rate
- 30% from Product Hunt, 30% from organic, 40% from communities

### Activation

- 70% of users create at least 1 client
- 50% of users create at least 1 project
- 30% of users try AI summary feature

### Retention

- 40% of users return within 7 days
- 25% of users active after 30 days
- Average 3 sessions per week for active users

### Revenue (Optional for MVP)

- 5 paying customers ($20/month Pro plan)
- $100 MRR by end of month 2

### Qualitative

- 5 user interviews with feedback
- NPS score > 40
- At least 3 testimonials or case studies

---

## Launch Strategy

### Pre-Launch (Week 1-2)

- Build in public on Twitter/X
- Share progress screenshots and demos
- Create waitlist landing page
- Engage with freelancer communities (Reddit, Indie Hackers)

### Launch Week

- Product Hunt launch (Tuesday or Wednesday)
- Post on Hacker News Show HN
- Share on Twitter, LinkedIn, Reddit (r/freelance, r/SideProject)
- Email waitlist with early access
- Offer "Founding Member" discount (50% off first year)

### Post-Launch (Week 2-4)

- Daily engagement with users (support, feedback)
- Weekly feature updates based on feedback
- User interviews (5-10 users)
- Iterate on onboarding flow
- Fix critical bugs and UX issues

---

## MVP Development Timeline

### Week 1-2: Foundation

- Set up Next.js project structure
- Configure Tailwind, TypeScript, Prisma
- Set up database schema
- Implement authentication (NextAuth)
- Basic routing and layout

### Week 3-4: Core Features

- Client Hub CRUD operations
- Project management system
- Rich text editor integration
- File upload system
- Dashboard overview

### Week 5-6: AI & Polish

- Gemini API integration
- AI summary generation
- Search functionality
- Email notifications setup
- Responsive design refinements

### Week 7-8: Testing & Launch Prep

- User testing with 5-10 beta users
- Bug fixes and performance optimization
- SEO optimization
- Analytics setup
- Launch materials (Product Hunt, social posts)

### Week 9-10: Launch & Iterate

- Public launch
- Monitor metrics and user feedback
- Rapid iteration on critical issues
- Plan post-MVP features based on data

---

## Pricing (MVP)

### Free Plan

- 3 active clients
- 5 projects per client
- 5 AI summaries per month
- 100MB file storage
- Email support

### Pro Plan ($20/month or $200/year)

- Unlimited clients
- Unlimited projects
- 100 AI summaries per month
- 10GB file storage
- Priority email support
- Early access to new features

**Rationale**: Free tier is generous enough to be useful, but limited enough to encourage upgrades. Pro tier is priced for individual freelancers ($20-40 is standard for productivity tools).

---

## Risk Assessment

### Technical Risks

- **AI costs**: Mitigate with caching and usage limits
- **Database scaling**: PostgreSQL on Oracle VPS, can scale vertically or add read replicas
- **File storage costs**: Implement strict limits, compress images

### Product Risks

- **User adoption**: Mitigate with strong onboarding and clear value prop
- **Feature creep**: Stick to MVP scope, resist adding features pre-launch
- **Competition**: Focus on freelancer-specific workflows, not generic PM

### Business Risks

- **Monetization**: Validate willingness to pay with early users
- **Retention**: Build habit-forming features (daily summaries, reminders)
- **Support burden**: Keep features simple to reduce support needs

---

## Definition of Done (MVP)

The MVP is complete when:

- ✅ All 7 core features are functional and tested
- ✅ Landing page is live and converting
- ✅ Authentication works (email + Google)
- ✅ Users can create clients, projects, and notes
- ✅ AI summaries generate correctly
- ✅ Dashboard shows accurate data
- ✅ Search returns relevant results
- ✅ Email notifications send reliably
- ✅ Mobile-responsive on all pages
- ✅ No critical bugs or security issues
- ✅ Analytics and error tracking configured
- ✅ 5 beta users have tested and provided feedback
- ✅ Launch materials ready (Product Hunt, social posts)

---

## Post-MVP Priorities (Based on User Feedback)

**If users want better communication tracking**:
→ Add Gmail integration

**If users struggle with proposals**:
→ Add proposal generator

**If users need team features**:
→ Add collaboration and shared workspaces

**If users want more AI**:
→ Add follow-up suggestions and sentiment analysis

**If users need financial tracking**:
→ Add invoicing and payment tracking

**Listen to users, validate with data, then build.**
