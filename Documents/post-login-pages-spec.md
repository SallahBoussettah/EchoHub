# Post-Login Pages Specification

## Overview

This document specifies the design and functionality of all authenticated (post-login) pages for EchoHub MVP.

---

## Layout Structure

### Authenticated Layout (`app/(authenticated)/layout.tsx`)

**Components**:

- Sidebar (persistent, collapsible on mobile)
- Top bar (user avatar, notifications, search)
- Main content area

**Sidebar Navigation**:

```
[User Avatar + Name]
- Dashboard
- Clients
- Search
- Settings
---
[Upgrade to Pro] (if free user)
- Help & Support
- Logout
```

**Mobile**: Bottom tab bar instead of sidebar

---

## 1. Dashboard (`/dashboard`)

### Purpose

Overview of all work with quick stats and upcoming deadlines

### Layout

```
┌─────────────────────────────────────────┐
│  Welcome back, [Name]!                  │
│  [Quick Actions: Add Client | Add Project] │
├─────────────────────────────────────────┤
│  Stats Cards (3 columns)                │
│  - Total Clients                        │
│  - Active Projects                      │
│  - Overdue Items                        │
├─────────────────────────────────────────┤
│  Upcoming Deadlines (next 7 days)       │
│  [Project cards with deadline badges]   │
├─────────────────────────────────────────┤
│  Recent Activity (last 10 actions)      │
│  [Timeline with icons and timestamps]   │
└─────────────────────────────────────────┘
```

### API Calls

- `GET /dashboard` - Fetch all dashboard data

### Components to Build

- `DashboardStats.tsx` - Stats cards
- `UpcomingDeadlines.tsx` - Deadline list
- `RecentActivity.tsx` - Activity timeline
- `QuickActions.tsx` - Add client/project buttons

---

## 2. Clients List (`/clients`)

### Purpose

View and manage all clients

### Layout

```
┌─────────────────────────────────────────┐
│  Clients                                │
│  [Search] [Filter: All/Active/Paused]   │
│  [+ Add Client]                         │
├─────────────────────────────────────────┤
│  Client Cards (Grid)                    │
│  ┌──────────────┐ ┌──────────────┐     │
│  │ Acme Corp    │ │ TechStart    │     │
│  │ 3 projects   │ │ 1 project    │     │
│  │ Active       │ │ Active       │     │
│  └──────────────┘ └──────────────┘     │
└─────────────────────────────────────────┘
```

### API Calls

- `GET /clients?status=ACTIVE&page=1` - List clients
- `POST /clients` - Create client
- `DELETE /clients/:id` - Delete client

### Components to Build

- `ClientCard.tsx` - Individual client card
- `ClientFilters.tsx` - Status filter dropdown
- `AddClientModal.tsx` - Create client form

---

## 3. Client Hub (`/clients/[id]`)

### Purpose

Single source of truth for a client

### Layout

```
┌─────────────────────────────────────────┐
│  [← Back] Acme Corp                     │
│  contact@acme.com | Active | [Edit]     │
├─────────────────────────────────────────┤
│  Tabs: Overview | Projects | Notes |    │
│        Files | Timeline                 │
├─────────────────────────────────────────┤
│  [Tab Content]                          │
│                                         │
│  Overview: Quick stats + recent activity│
│  Projects: List of projects             │
│  Notes: Rich text notes                 │
│  Files: Uploaded files                  │
│  Timeline: Activity log                 │
└─────────────────────────────────────────┘
```

### API Calls

- `GET /clients/:id` - Fetch client details
- `GET /clients/:id/projects` - Fetch projects
- `GET /clients/:id/notes` - Fetch notes
- `GET /clients/:id/files` - Fetch files
- `GET /clients/:id/activity` - Fetch activity
- `POST /ai/summarize/client/:id` - Generate AI summary

### Components to Build

- `ClientHeader.tsx` - Client name, status, actions
- `ClientTabs.tsx` - Tab navigation
- `ClientOverview.tsx` - Overview tab content
- `ClientProjects.tsx` - Projects tab content
- `ClientNotes.tsx` - Notes tab content
- `ClientFiles.tsx` - Files tab content
- `ClientTimeline.tsx` - Timeline tab content
- `EditClientModal.tsx` - Edit client form
- `AddProjectModal.tsx` - Create project form
- `AddNoteForm.tsx` - Create note form
- `FileUpload.tsx` - File upload component

---

## 4. Project Detail (`/clients/[clientId]/projects/[projectId]`)

### Purpose

Detailed project management

### Layout

```
┌─────────────────────────────────────────┐
│  [← Back to Client] Website Redesign    │
│  Status: In Progress | Deadline: Dec 31 │
│  [Edit] [Complete] [Delete]             │
├─────────────────────────────────────────┤
│  Description                            │
│  Complete redesign of company website   │
├─────────────────────────────────────────┤
│  Milestones                             │
│  ☑ Wireframes                           │
│  ☐ Design mockups                       │
│  ☐ Development                          │
│  [+ Add Milestone]                      │
├─────────────────────────────────────────┤
│  Notes                                  │
│  [Rich text editor]                     │
│  [Summarize with AI]                    │
├─────────────────────────────────────────┤
│  Files                                  │
│  [Drag & drop to upload]                │
│  - wireframes.pdf                       │
│  - mockup.png                           │
└─────────────────────────────────────────┘
```

### API Calls

- `GET /projects/:id` - Fetch project details
- `PATCH /projects/:id` - Update project
- `POST /projects/:id/milestones` - Add milestone
- `PATCH /projects/:id/milestones/:milestoneId` - Update milestone
- `POST /projects/:id/notes` - Create note
- `POST /files/upload` - Upload file
- `POST /ai/summarize/project/:id` - Generate AI summary

### Components to Build

- `ProjectHeader.tsx` - Project title, status, actions
- `ProjectDescription.tsx` - Description section
- `MilestoneList.tsx` - Milestone checklist
- `ProjectNotes.tsx` - Notes section with rich text editor
- `ProjectFiles.tsx` - File list with upload
- `EditProjectModal.tsx` - Edit project form
- `AiSummaryButton.tsx` - AI summary trigger
- `AiSummaryModal.tsx` - Display AI summary

---

## 5. Search (`/search`)

### Purpose

Find anything quickly

### Layout

```
┌─────────────────────────────────────────┐
│  [Search input with autofocus]          │
├─────────────────────────────────────────┤
│  Results for "website"                  │
│                                         │
│  Clients (2)                            │
│  - Acme Corp                            │
│  - WebCo                                │
│                                         │
│  Projects (3)                           │
│  - Website Redesign                     │
│  - Website Maintenance                  │
│  - New Website                          │
│                                         │
│  Notes (1)                              │
│  - "Client wants modern website..."     │
└─────────────────────────────────────────┘
```

### API Calls

- `GET /search?q=query` - Search all content

### Components to Build

- `SearchInput.tsx` - Search input with debounce
- `SearchResults.tsx` - Grouped results
- `SearchResultItem.tsx` - Individual result

---

## 6. Settings (`/settings`)

### Purpose

User preferences and account management

### Layout

```
┌─────────────────────────────────────────┐
│  Settings                               │
│  Tabs: Profile | Account | Notifications│
│        | Billing                         │
├─────────────────────────────────────────┤
│  [Tab Content]                          │
│                                         │
│  Profile: Name, email, timezone, avatar │
│  Account: Password change, delete       │
│  Notifications: Email preferences       │
│  Billing: Current plan, upgrade         │
└─────────────────────────────────────────┘
```

### API Calls

- `GET /users/profile` - Fetch user profile
- `PATCH /users/profile` - Update profile
- `PATCH /users/settings` - Update settings
- `DELETE /users/account` - Delete account

### Components to Build

- `SettingsTabs.tsx` - Tab navigation
- `ProfileSettings.tsx` - Profile form
- `AccountSettings.tsx` - Account management
- `NotificationSettings.tsx` - Notification preferences
- `BillingSettings.tsx` - Plan and billing

---

## 7. Onboarding (`/onboarding`)

### Purpose

Guide new users through setup

### Layout

Multi-step modal or dedicated page with progress indicator

**Steps**:

1. Welcome screen
2. "What type of work do you do?" (optional)
3. "Add your first client" (interactive)
4. "Create a project" (interactive)
5. "Try AI summary" (demo)
6. "You're all set!" → Redirect to dashboard

### API Calls

- Same as regular flows (create client, create project, etc.)

### Components to Build

- `OnboardingFlow.tsx` - Multi-step wizard
- `OnboardingStep.tsx` - Individual step component

---

## Design Consistency

### Colors (from existing theme)

- Background: `var(--color-bg)`
- Surface: `var(--color-surface)`
- Text: `var(--color-ink)`
- Muted text: `var(--color-muted-ink)`
- Accent: `var(--color-accent)`
- Border: `var(--color-line)`

### Typography

- Headings: `font-family: var(--font-display)` (Outfit)
- Body: `font-family: var(--font-sans)` (Inter)

### Components

- Cards: `rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]`
- Buttons: `rounded-xl px-6 py-3 font-semibold`
- Inputs: `rounded-xl px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-line)]`

### Spacing

- Section padding: `p-6` or `p-8`
- Card gap: `gap-4` or `gap-6`
- Content max-width: `max-w-7xl mx-auto`

---

## Responsive Design

### Breakpoints

- Mobile: `< 640px` (single column, bottom nav)
- Tablet: `640px - 1024px` (2 columns, collapsible sidebar)
- Desktop: `> 1024px` (full layout, persistent sidebar)

### Mobile Considerations

- Sidebar becomes bottom tab bar
- Cards stack vertically
- Tables become scrollable
- Modals become full-screen

---

## Loading States

### Skeleton Screens

Use skeleton loaders for:

- Dashboard stats
- Client cards
- Project lists
- Activity timeline

### Spinners

Use spinners for:

- Form submissions
- AI summary generation
- File uploads

---

## Error Handling

### Error Messages

- Display errors inline (below form fields)
- Use toast notifications for global errors
- Provide actionable error messages

### Empty States

- "No clients yet" → CTA to add first client
- "No projects yet" → CTA to add first project
- "No search results" → Suggest different query

---

## Accessibility

### Requirements

- Semantic HTML (headings, lists, buttons)
- ARIA labels for icons and actions
- Keyboard navigation (Tab, Enter, Escape)
- Focus visible states
- Color contrast AA compliant

---

## Performance

### Optimization

- Lazy load components (React.lazy)
- Debounce search input (300ms)
- Paginate long lists (20 items per page)
- Cache API responses (React Query)
- Optimize images (Next.js Image component)

---

## Testing Checklist

### User Flows

- [ ] Signup → Onboarding → Dashboard
- [ ] Create client → Add project → Add note
- [ ] Upload file → Download file
- [ ] Generate AI summary
- [ ] Search for client/project
- [ ] Update profile settings
- [ ] Delete client (with confirmation)

### Edge Cases

- [ ] Empty states (no clients, no projects)
- [ ] Error states (API failure, network error)
- [ ] Loading states (slow API response)
- [ ] Long text (client name, project description)
- [ ] Large files (10MB limit)
- [ ] AI quota exceeded

---

## Next Steps

1. Build authenticated layout with sidebar
2. Build dashboard page
3. Build clients list page
4. Build client hub page
5. Build project detail page
6. Build search page
7. Build settings page
8. Build onboarding flow
9. Test all user flows
10. Fix bugs and polish

**Reference**: See `mvp-implementation-guide.md` for detailed implementation steps.
