# EchoHub Site Structure

## Public Marketing Site (Pre-Login)

### 1. Homepage (`/`)

**Purpose**: Convert visitors into signups

**Sections**:

- Hero with value proposition and primary CTA
- Bento grid showcasing product UI
- Problem → Solution split section
- Live mini-demos (timeline + AI summary)
- Features grid (6 core features)
- Social proof (logos + testimonials)
- Pricing comparison table
- FAQ accordion
- Final CTA (sticky footer)
- Footer with links

**CTAs**: "Start Free" (primary), "See Demo" (secondary)

---

### 2. Features Page (`/features`)

**Purpose**: Deep dive into capabilities

**Sections**:

- Hero: "Everything you need to manage clients"
- Feature showcase (expanded from homepage)
  - Client Hubs (with screenshot)
  - AI Summaries (with demo)
  - Project Management (with timeline visual)
  - Search & Organization
  - File Management
  - Smart Notifications
- Comparison table (EchoHub vs scattered tools)
- Integration roadmap preview
- CTA: "Start organizing your clients"

---

### 3. Pricing Page (`/pricing`)

**Purpose**: Clear pricing information and conversion

**Sections**:

- Hero: "Simple, transparent pricing"
- Pricing cards (Free, Pro, Team)
  - Feature comparison table
  - Monthly/Annual toggle
  - FAQ specific to pricing
- "Founding Member" discount banner (limited time)
- ROI calculator (optional: "Save X hours per week")
- CTA: "Start your free trial"

---

### 4. About Page (`/about`)

**Purpose**: Build trust and tell the story

**Sections**:

- Hero: "Built by freelancers, for freelancers"
- Origin story (why we built EchoHub)
- Mission and values
- Team section (if applicable)
- Roadmap preview
- Community and support
- CTA: "Join the community"

---

### 5. Blog (`/blog`)

**Purpose**: SEO, education, community building

**Sections**:

- Blog index (grid of posts)
- Categories: Tips, Updates, Case Studies, Tutorials
- Individual blog post template
- Newsletter signup
- Related posts
- CTA: "Try EchoHub"

**Example Posts**:

- "5 Ways Freelancers Lose Money to Disorganization"
- "How to Use AI to Summarize Client Feedback"
- "The Ultimate Client Onboarding Checklist"

---

### 6. Use Cases (`/use-cases`)

**Purpose**: Show specific applications

**Sections**:

- Hero: "EchoHub for every type of freelancer"
- Use case cards:
  - Designers & Creatives
  - Developers & Engineers
  - Consultants & Coaches
  - Writers & Content Creators
  - Agencies & Small Teams
- Each card links to dedicated page with:
  - Specific pain points
  - How EchoHub solves them
  - Testimonial from that user type
  - Relevant features
  - CTA

---

### 7. Contact (`/contact`)

**Purpose**: Support and sales inquiries

**Sections**:

- Hero: "We're here to help"
- Contact form (name, email, message)
- Support email and response time
- FAQ link
- Social media links
- Office hours (if applicable)

---

### 8. Legal Pages

**Purpose**: Compliance and transparency

**Pages**:

- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/security` - Security practices
- `/cookies` - Cookie policy

**Sections** (standard legal content):

- Clear, readable language
- Last updated date
- Contact for questions

---

## Authenticated App (Post-Login)

### 9. Dashboard (`/dashboard`)

**Purpose**: Overview of all work

**Sections**:

- Welcome header with user name
- Quick stats (clients, projects, deadlines)
- Upcoming deadlines (next 7 days)
- Recent activity feed
- Quick actions (Add Client, Add Project)
- Active clients grid (card view)

**Navigation**: Sidebar with Dashboard, Clients, Search, Settings

---

### 10. Clients List (`/clients`)

**Purpose**: View and manage all clients

**Sections**:

- Header with "Add Client" button
- Filter/sort options (Active, Paused, Completed)
- Client cards grid:
  - Client name and company
  - Number of active projects
  - Last activity date
  - Quick actions (View, Edit, Archive)
- Empty state: "Add your first client"

---

### 11. Client Hub (`/clients/[id]`)

**Purpose**: Single source of truth for a client

**Sections**:

- Client header (name, company, status, edit button)
- Tabs:
  - **Overview**: Quick stats, recent activity
  - **Projects**: List of all projects for this client
  - **Notes**: Rich text notes area
  - **Files**: Uploaded files and attachments
  - **Timeline**: Chronological activity log
- Sidebar:
  - Client details (email, phone, etc.)
  - Quick actions (Add Project, Add Note)
  - AI Summary button

---

### 12. Project View (`/clients/[clientId]/projects/[projectId]`)

**Purpose**: Detailed project management

**Sections**:

- Project header (title, status, deadline)
- Description and details
- Milestones checklist
- Notes section (rich text)
- File attachments
- Activity timeline
- AI Summary button
- Edit/Delete actions

---

### 13. Search (`/search`)

**Purpose**: Find anything quickly

**Sections**:

- Search bar (autofocus)
- Recent searches
- Search results grouped by:
  - Clients
  - Projects
  - Notes
- Empty state: "Try searching for a client or project"

---

### 14. Settings (`/settings`)

**Purpose**: User preferences and account management

**Sections** (tabs):

- **Profile**: Name, email, timezone, avatar
- **Account**: Password change, delete account
- **Notifications**: Email preferences (deadlines, summaries)
- **Billing**: Current plan, payment method, invoices
- **Preferences**: Theme (light/dark), date format
- **Integrations**: (Future: Gmail, Calendar, etc.)

---

### 15. Onboarding (`/onboarding`)

**Purpose**: Guide new users through setup

**Sections** (multi-step flow):

1. Welcome screen
2. "What type of work do you do?" (optional)
3. "Add your first client" (interactive)
4. "Create a project" (interactive)
5. "Try AI summary" (demo)
6. "You're all set!" → Redirect to dashboard

**Design**: Modal overlay or dedicated page with progress indicator

---

## Special Pages

### 16. 404 Page (`/404`)

**Sections**:

- Friendly error message
- Search bar
- Links to homepage, dashboard, support
- Illustration or animation

---

### 17. 500 Error Page (`/500`)

**Sections**:

- "Something went wrong" message
- "We've been notified" reassurance
- Link to status page or support
- Retry button

---

### 18. Maintenance Page (`/maintenance`)

**Sections**:

- "We'll be back soon" message
- Estimated downtime
- Subscribe for updates
- Social media links

---

## Navigation Structure

### Public Site Header

```
Logo | Features | Pricing | About | Blog | [Login] [Start Free]
```

### Authenticated App Sidebar

```
[User Avatar]
- Dashboard
- Clients
- Search
- Settings
- [Upgrade to Pro] (if free user)
- Help & Support
- Logout
```

### Mobile Navigation

- Hamburger menu for public site
- Bottom tab bar for authenticated app:
  - Dashboard
  - Clients
  - Search
  - Settings

---

## URL Structure

### Public Routes

```
/                          → Homepage
/features                  → Features page
/pricing                   → Pricing page
/about                     → About page
/blog                      → Blog index
/blog/[slug]               → Individual post
/use-cases                 → Use cases overview
/use-cases/[type]          → Specific use case
/contact                   → Contact form
/terms                     → Terms of Service
/privacy                   → Privacy Policy
/security                  → Security page
```

### Authenticated Routes

```
/dashboard                 → Main dashboard
/clients                   → Clients list
/clients/[id]              → Client hub
/clients/[id]/projects/[id] → Project detail
/search                    → Search page
/settings                  → Settings (with tabs)
/onboarding                → First-time user flow
```

### Auth Routes

```
/login                     → Login page
/signup                    → Signup page
/forgot-password           → Password reset request
/reset-password/[token]    → Password reset form
/verify-email/[token]      → Email verification
```

---

## Responsive Breakpoints

- **Mobile**: < 640px (single column, bottom nav)
- **Tablet**: 640px - 1024px (2 columns, sidebar collapses)
- **Desktop**: > 1024px (full layout, persistent sidebar)

---

## SEO & Meta Structure

### Homepage

```
Title: EchoHub – AI Workspace for Freelancers | Manage Clients in One Place
Description: Stop juggling tools. EchoHub unifies clients, projects, and communications with AI summaries and smart organization. Free for 3 clients.
```

### Features

```
Title: Features – Client Management, AI Summaries & More | EchoHub
Description: Explore EchoHub's features: Client Hubs, AI-powered summaries, project tracking, file management, and smart notifications.
```

### Pricing

```
Title: Pricing – Free & Pro Plans | EchoHub
Description: Start free with 3 clients. Upgrade to Pro for unlimited clients, AI summaries, and advanced features. $20/month.
```

---

## Analytics Events to Track

### Public Site

- `page_view` (all pages)
- `cta_clicked` (which CTA, which page)
- `demo_opened` (which demo)
- `pricing_toggle` (monthly/annual)
- `faq_opened` (which question)
- `signup_started`
- `signup_completed`

### Authenticated App

- `client_created`
- `project_created`
- `ai_summary_generated`
- `file_uploaded`
- `search_performed`
- `settings_updated`
- `upgrade_clicked`
- `onboarding_completed`

---

## Future Pages (Post-MVP)

- `/integrations` – Gmail, Calendar, Slack, etc.
- `/templates` – Proposal templates, workflow templates
- `/changelog` – Product updates
- `/roadmap` – Public roadmap
- `/community` – Forum or Discord link
- `/api-docs` – API documentation (when available)
- `/partners` – Partner program
- `/affiliates` – Affiliate program

---

## Content Hierarchy

**Priority 1 (MVP)**:

- Homepage
- Pricing
- Login/Signup
- Dashboard
- Clients
- Client Hub
- Project View
- Settings
- Onboarding

**Priority 2 (Post-MVP)**:

- Features page
- About page
- Blog
- Use cases
- Search page

**Priority 3 (Future)**:

- Integrations
- Templates
- Changelog
- Community
- API docs
