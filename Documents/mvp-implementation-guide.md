# EchoHub MVP Implementation Guide

## Overview

This guide provides a step-by-step implementation plan for building the EchoHub MVP, covering both backend (NestJS + PostgreSQL + Prisma) and frontend (Next.js 15) integration.

**Timeline**: 8-10 weeks  
**Goal**: Launch with 7 core features and get 20 active users

---

## Phase 1: Backend Foundation (Week 1-2)

### Week 1: Project Setup & Authentication

#### Day 1-2: Initialize Backend

```bash
# Create NestJS project
npm i -g @nestjs/cli
nest new echohub-backend
cd echohub-backend

# Install dependencies
npm install @prisma/client prisma
npm install @nestjs/passport passport passport-jwt passport-google-oauth20
npm install @nestjs/jwt bcrypt class-validator class-transformer
npm install @nestjs/config

# Install dev dependencies
npm install -D @types/passport-jwt @types/bcrypt @types/passport-google-oauth20
```

#### Day 2-3: Database Setup

```bash
# Initialize Prisma
npx prisma init

# Copy schema from database-schema.md to prisma/schema.prisma
# Update DATABASE_URL in .env

# Create initial migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

#### Day 3-5: Authentication Module

**Files to create**:

- `src/auth/auth.module.ts`
- `src/auth/auth.controller.ts`
- `src/auth/auth.service.ts`
- `src/auth/strategies/jwt.strategy.ts`
- `src/auth/strategies/google.strategy.ts`
- `src/auth/guards/jwt-auth.guard.ts`
- `src/auth/dto/signup.dto.ts`
- `src/auth/dto/login.dto.ts`

**Key implementations**:

1. Email/password signup with bcrypt hashing
2. Login with JWT token generation
3. Google OAuth integration
4. JWT validation guard
5. Password reset flow (optional for MVP)

**Test endpoints**:

```bash
POST /auth/signup
POST /auth/login
GET  /auth/google
GET  /auth/google/callback
GET  /auth/me (protected)
```

#### Day 5-7: Users Module

**Files to create**:

- `src/users/users.module.ts`
- `src/users/users.controller.ts`
- `src/users/users.service.ts`
- `src/users/dto/update-user.dto.ts`

**Key implementations**:

1. Get user profile
2. Update user profile
3. Update user settings
4. Delete account

**Test endpoints**:

```bash
GET    /users/profile
PATCH  /users/profile
PATCH  /users/settings
DELETE /users/account
```

### Week 2: Core Data Models

#### Day 8-10: Clients Module

**Files to create**:

- `src/clients/clients.module.ts`
- `src/clients/clients.controller.ts`
- `src/clients/clients.service.ts`
- `src/clients/dto/create-client.dto.ts`
- `src/clients/dto/update-client.dto.ts`

**Key implementations**:

1. CRUD operations for clients
2. Ownership validation (user can only access their clients)
3. Status management (active/paused/completed)
4. Archive functionality
5. Pagination for client list

**Test endpoints**:

```bash
GET    /clients?status=ACTIVE&page=1&limit=20
POST   /clients
GET    /clients/:id
PATCH  /clients/:id
DELETE /clients/:id
PATCH  /clients/:id/archive
```

#### Day 10-12: Projects Module

**Files to create**:

- `src/projects/projects.module.ts`
- `src/projects/projects.controller.ts`
- `src/projects/projects.service.ts`
- `src/projects/dto/create-project.dto.ts`
- `src/projects/dto/update-project.dto.ts`
- `src/projects/dto/create-milestone.dto.ts`

**Key implementations**:

1. CRUD operations for projects
2. Milestone management (create, update, complete, delete)
3. Status transitions
4. Deadline tracking
5. Project completion

**Test endpoints**:

```bash
GET    /clients/:clientId/projects
POST   /clients/:clientId/projects
GET    /projects/:id
PATCH  /projects/:id
DELETE /projects/:id
POST   /projects/:id/milestones
PATCH  /projects/:id/milestones/:milestoneId
DELETE /projects/:id/milestones/:milestoneId
```

#### Day 12-14: Notes Module

**Files to create**:

- `src/notes/notes.module.ts`
- `src/notes/notes.controller.ts`
- `src/notes/notes.service.ts`
- `src/notes/dto/create-note.dto.ts`
- `src/notes/dto/update-note.dto.ts`

**Key implementations**:

1. Create notes for clients or projects
2. Rich text content storage (HTML)
3. Update and delete notes
4. List notes by client or project

**Test endpoints**:

```bash
POST   /clients/:clientId/notes
POST   /projects/:projectId/notes
GET    /notes/:id
PATCH  /notes/:id
DELETE /notes/:id
GET    /clients/:clientId/notes
GET    /projects/:projectId/notes
```

---

## Phase 2: Advanced Features (Week 3-4)

### Week 3: Files & AI

#### Day 15-17: Files Module

**Files to create**:

- `src/files/files.module.ts`
- `src/files/files.controller.ts`
- `src/files/files.service.ts`
- `src/files/dto/upload-file.dto.ts`

**Dependencies**:

```bash
npm install @nestjs/platform-express multer
npm install aws-sdk  # For S3
# OR
npm install @aws-sdk/client-s3  # For Cloudflare R2
```

**Key implementations**:

1. File upload with validation (size, type)
2. S3/R2 integration
3. File metadata storage
4. File download with signed URLs
5. File deletion (from storage + database)

**Test endpoints**:

```bash
POST   /files/upload (multipart/form-data)
GET    /files/:id
GET    /files/:id/download
DELETE /files/:id
GET    /clients/:clientId/files
GET    /projects/:projectId/files
```

#### Day 17-19: AI Module (Gemini Integration)

**Files to create**:

- `src/ai/ai.module.ts`
- `src/ai/ai.controller.ts`
- `src/ai/ai.service.ts`
- `src/ai/dto/generate-summary.dto.ts`

**Dependencies**:

```bash
npm install @google/generative-ai
```

**Key implementations**:

1. Gemini API integration
2. Project summary generation
3. Client summary generation
4. Usage tracking and tier limits
5. Summary caching

**Test endpoints**:

```bash
POST   /ai/summarize/project/:id
POST   /ai/summarize/client/:id
GET    /ai/usage
```

**Example prompt**:

```typescript
const prompt = `Summarize the following project in 3-5 bullet points:

Title: ${project.title}
Description: ${project.description}
Status: ${project.status}
Deadline: ${project.deadline}

Notes:
${notes.map((n) => n.content).join("\n\n")}

Provide a concise summary of the current status and next steps.`;
```

#### Day 19-21: Activity Module

**Files to create**:

- `src/activity/activity.module.ts`
- `src/activity/activity.service.ts`

**Key implementations**:

1. Automatic activity logging (via interceptor or service calls)
2. Activity timeline retrieval
3. Filtering by client/project
4. Pagination

**Integration**:

- Call `activityService.log()` after every mutation
- Example: After creating a client, log `CLIENT_CREATED` activity

---

### Week 4: Search & Notifications

#### Day 22-24: Search Module

**Files to create**:

- `src/search/search.module.ts`
- `src/search/search.controller.ts`
- `src/search/search.service.ts`

**Key implementations**:

1. PostgreSQL full-text search
2. Search across clients, projects, notes
3. Result ranking by relevance
4. Pagination

**Test endpoints**:

```bash
GET /search?q=website&page=1&limit=10
GET /search/clients?q=acme
GET /search/projects?q=redesign
```

**SQL Example**:

```sql
SELECT * FROM clients
WHERE to_tsvector('english', name || ' ' || COALESCE(company, ''))
      @@ plainto_tsquery('english', $1)
AND user_id = $2
ORDER BY ts_rank(...) DESC
LIMIT 10;
```

#### Day 24-26: Notifications Module

**Files to create**:

- `src/notifications/notifications.module.ts`
- `src/notifications/notifications.service.ts`
- `src/notifications/notifications.controller.ts`

**Dependencies**:

```bash
npm install @nestjs/schedule
npm install resend  # Or sendgrid
npm install handlebars  # For email templates
```

**Key implementations**:

1. Email service integration (Resend)
2. Deadline reminder emails (cron job)
3. Weekly summary emails (cron job)
4. User notification preferences

**Cron jobs**:

```typescript
@Cron('0 9 * * *')  // Daily at 9 AM
async sendDeadlineReminders() {
  // Find projects with deadlines in next 24 hours
  // Send email to users
}

@Cron('0 9 * * 1')  // Weekly on Monday at 9 AM
async sendWeeklySummaries() {
  // Generate weekly summary for each user
  // Send email
}
```

#### Day 26-28: Dashboard Endpoint

**Files to create**:

- `src/dashboard/dashboard.module.ts`
- `src/dashboard/dashboard.controller.ts`
- `src/dashboard/dashboard.service.ts`

**Key implementations**:

1. Aggregate user statistics
2. Upcoming deadlines (next 7 days)
3. Recent activity feed
4. Active clients count

**Test endpoint**:

```bash
GET /dashboard
```

**Response**:

```json
{
  "stats": {
    "totalClients": 5,
    "activeProjects": 8,
    "overdueProjects": 2
  },
  "upcomingDeadlines": [...],
  "recentActivity": [...]
}
```

---

## Phase 3: Frontend Integration (Week 5-6)

### Week 5: Authentication & Dashboard

#### Day 29-31: Frontend Auth Setup

**Files to create**:

- `app/lib/api.ts` - API client with axios
- `app/lib/auth.ts` - Auth context and hooks
- `app/contexts/AuthContext.tsx`

**Dependencies**:

```bash
cd frontend
npm install axios
npm install js-cookie
npm install @tanstack/react-query
```

**Key implementations**:

1. API client with interceptors (add JWT token)
2. Auth context (login, logout, user state)
3. Protected route wrapper
4. Token refresh logic

**Update login/signup pages**:

- Connect forms to backend API
- Handle success/error states
- Redirect to dashboard on success
- Store JWT token in httpOnly cookie or localStorage

#### Day 31-33: Dashboard Page

**Files to create**:

- `app/(authenticated)/dashboard/page.tsx`
- `app/(authenticated)/layout.tsx` - Authenticated layout with sidebar
- `app/components/Sidebar.tsx`
- `app/components/DashboardStats.tsx`
- `app/components/UpcomingDeadlines.tsx`
- `app/components/RecentActivity.tsx`

**Key implementations**:

1. Fetch dashboard data from `/dashboard` endpoint
2. Display stats cards
3. Upcoming deadlines list
4. Recent activity feed
5. Quick actions (Add Client, Add Project)

#### Day 33-35: Clients List Page

**Files to create**:

- `app/(authenticated)/clients/page.tsx`
- `app/components/ClientCard.tsx`
- `app/components/ClientFilters.tsx`

**Key implementations**:

1. Fetch clients from `/clients` endpoint
2. Display clients in grid layout
3. Filter by status (Active, Paused, Completed)
4. Search clients
5. "Add Client" modal/form

---

### Week 6: Client Hub & Projects

#### Day 36-38: Client Hub Page

**Files to create**:

- `app/(authenticated)/clients/[id]/page.tsx`
- `app/components/ClientHeader.tsx`
- `app/components/ClientTabs.tsx`
- `app/components/ClientProjects.tsx`
- `app/components/ClientNotes.tsx`
- `app/components/ClientFiles.tsx`
- `app/components/ClientTimeline.tsx`

**Key implementations**:

1. Fetch client details from `/clients/:id`
2. Tabbed interface (Overview, Projects, Notes, Files, Timeline)
3. Edit client modal
4. Add project form
5. Add note form
6. File upload
7. AI summary button

#### Day 38-40: Project Detail Page

**Files to create**:

- `app/(authenticated)/clients/[clientId]/projects/[projectId]/page.tsx`
- `app/components/ProjectHeader.tsx`
- `app/components/MilestoneList.tsx`
- `app/components/ProjectNotes.tsx`
- `app/components/ProjectFiles.tsx`

**Key implementations**:

1. Fetch project details from `/projects/:id`
2. Display project info (title, description, status, deadline)
3. Milestone checklist (with completion toggle)
4. Notes section
5. File attachments
6. AI summary button
7. Edit project modal

#### Day 40-42: Search & Settings

**Files to create**:

- `app/(authenticated)/search/page.tsx`
- `app/(authenticated)/settings/page.tsx`
- `app/components/SearchResults.tsx`
- `app/components/SettingsTabs.tsx`

**Key implementations**:

1. Search page with instant results
2. Group results by type (Clients, Projects, Notes)
3. Settings page with tabs (Profile, Account, Notifications, Billing)
4. Update profile form
5. Notification preferences toggles
6. Plan upgrade CTA (if free user)

---

## Phase 4: Polish & Testing (Week 7-8)

### Week 7: Rich Text Editor & File Upload

#### Day 43-45: Rich Text Editor Integration

**Dependencies**:

```bash
npm install @tiptap/react @tiptap/starter-kit
# OR
npm install lexical @lexical/react
```

**Files to update**:

- `app/components/NoteEditor.tsx`

**Key implementations**:

1. Rich text editor component
2. Toolbar (bold, italic, lists, links)
3. Save notes as HTML
4. Display notes with proper formatting

#### Day 45-47: File Upload UI

**Files to create**:

- `app/components/FileUpload.tsx`
- `app/components/FileList.tsx`

**Key implementations**:

1. Drag-and-drop file upload
2. File type and size validation
3. Upload progress indicator
4. File preview (images)
5. Download and delete actions

#### Day 47-49: AI Summary UI

**Files to create**:

- `app/components/AiSummaryButton.tsx`
- `app/components/AiSummaryModal.tsx`

**Key implementations**:

1. "Summarize with AI" button
2. Loading state during generation
3. Display summary in modal
4. Copy to clipboard
5. Usage limit indicator

---

### Week 8: Testing & Bug Fixes

#### Day 50-52: Backend Testing

**Test files to create**:

- `src/auth/auth.service.spec.ts`
- `src/clients/clients.service.spec.ts`
- `src/projects/projects.service.spec.ts`
- `test/auth.e2e-spec.ts`
- `test/clients.e2e-spec.ts`

**Key tests**:

1. Unit tests for services
2. E2E tests for critical flows (signup, login, create client, create project)
3. Test ownership validation
4. Test tier limits (AI usage)

#### Day 52-54: Frontend Testing

**Test files to create**:

- `app/__tests__/login.test.tsx`
- `app/__tests__/dashboard.test.tsx`
- `e2e/auth.spec.ts` (Playwright)

**Key tests**:

1. Component tests with React Testing Library
2. E2E tests for user flows (signup → create client → create project)
3. Test error handling
4. Test loading states

#### Day 54-56: Bug Fixes & Polish

**Focus areas**:

1. Fix any bugs found during testing
2. Improve error messages
3. Add loading skeletons
4. Optimize API calls (reduce unnecessary requests)
5. Add empty states (no clients, no projects)
6. Mobile responsiveness fixes
7. Accessibility improvements (keyboard navigation, ARIA labels)

---

## Phase 5: Deployment & Launch (Week 9-10)

### Week 9: Deployment Setup

#### Day 57-59: Backend Deployment

**Platform**: Railway, Render, or Fly.io

**Steps**:

1. Set up PostgreSQL on Oracle VPS
2. Set up environment variables
3. Run migrations on production database
4. Deploy backend to hosting platform
5. Test all endpoints in production
6. Set up error tracking (Sentry)
7. Configure CORS for frontend domain

**Environment variables**:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=strong-random-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GEMINI_API_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
RESEND_API_KEY=...
FRONTEND_URL=https://echohub.com
```

#### Day 59-61: Frontend Deployment

**Platform**: Vercel

**Steps**:

1. Update API base URL to production backend
2. Set up environment variables on Vercel
3. Deploy to Vercel
4. Test all pages in production
5. Set up custom domain
6. Configure SEO metadata
7. Set up analytics (Vercel Analytics + PostHog)

**Environment variables**:

```env
NEXT_PUBLIC_API_URL=https://api.echohub.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
```

#### Day 61-63: Final Testing

**Checklist**:

- [ ] Signup flow works (email + Google)
- [ ] Login flow works
- [ ] Create client works
- [ ] Create project works
- [ ] Add notes works
- [ ] Upload files works
- [ ] AI summary works
- [ ] Search works
- [ ] Email notifications work
- [ ] Dashboard loads correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Fast page loads (< 2s)

---

### Week 10: Launch & Iteration

#### Day 64-66: Beta Testing

**Steps**:

1. Invite 5-10 beta users
2. Collect feedback via interviews
3. Monitor error logs and analytics
4. Fix critical bugs
5. Iterate on UX issues

#### Day 67-69: Public Launch

**Launch checklist**:

- [ ] Product Hunt post ready
- [ ] Twitter/X announcement thread
- [ ] LinkedIn post
- [ ] Reddit posts (r/freelance, r/SideProject)
- [ ] Hacker News Show HN post
- [ ] Email waitlist (if any)
- [ ] Blog post on website
- [ ] Demo video ready

**Launch day**:

1. Post on Product Hunt (Tuesday or Wednesday)
2. Share on social media
3. Engage with comments and feedback
4. Monitor server performance
5. Fix any critical issues immediately

#### Day 70: Post-Launch Monitoring

**Metrics to track**:

- Signups per day
- Activation rate (% who create a client)
- AI summary usage
- Error rates
- Page load times
- User feedback

**Iterate based on feedback**:

- Fix bugs reported by users
- Improve onboarding flow
- Add small UX improvements
- Plan post-MVP features

---

## API Integration Checklist

### Frontend → Backend Integration

#### Authentication

- [ ] Signup form → `POST /auth/signup`
- [ ] Login form → `POST /auth/login`
- [ ] Google OAuth → `GET /auth/google`
- [ ] Get current user → `GET /auth/me`
- [ ] Logout → Clear token

#### Dashboard

- [ ] Fetch dashboard data → `GET /dashboard`

#### Clients

- [ ] List clients → `GET /clients`
- [ ] Create client → `POST /clients`
- [ ] Get client → `GET /clients/:id`
- [ ] Update client → `PATCH /clients/:id`
- [ ] Delete client → `DELETE /clients/:id`
- [ ] Archive client → `PATCH /clients/:id/archive`

#### Projects

- [ ] List projects → `GET /clients/:clientId/projects`
- [ ] Create project → `POST /clients/:clientId/projects`
- [ ] Get project → `GET /projects/:id`
- [ ] Update project → `PATCH /projects/:id`
- [ ] Delete project → `DELETE /projects/:id`
- [ ] Add milestone → `POST /projects/:id/milestones`
- [ ] Update milestone → `PATCH /projects/:id/milestones/:milestoneId`
- [ ] Delete milestone → `DELETE /projects/:id/milestones/:milestoneId`

#### Notes

- [ ] Create note → `POST /clients/:clientId/notes` or `POST /projects/:projectId/notes`
- [ ] Update note → `PATCH /notes/:id`
- [ ] Delete note → `DELETE /notes/:id`

#### Files

- [ ] Upload file → `POST /files/upload`
- [ ] Download file → `GET /files/:id/download`
- [ ] Delete file → `DELETE /files/:id`

#### AI

- [ ] Generate summary → `POST /ai/summarize/project/:id`
- [ ] Check usage → `GET /ai/usage`

#### Search

- [ ] Search all → `GET /search?q=query`

#### Settings

- [ ] Update profile → `PATCH /users/profile`
- [ ] Update settings → `PATCH /users/settings`

---

## Common Pitfalls & Solutions

### Backend

**Problem**: CORS errors  
**Solution**: Configure CORS in `main.ts`:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

**Problem**: JWT token not validated  
**Solution**: Apply `JwtAuthGuard` to all protected routes:

```typescript
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController { ... }
```

**Problem**: User can access other users' data  
**Solution**: Always filter by `userId` in queries:

```typescript
const clients = await this.prisma.client.findMany({
  where: { userId: user.id },
});
```

**Problem**: AI API costs too high  
**Solution**: Implement caching and usage limits:

```typescript
// Check if summary already exists
const cached = await this.prisma.aiSummary.findFirst({
  where: { projectId, createdAt: { gte: oneDayAgo } },
});
if (cached) return cached;
```

### Frontend

**Problem**: Token not sent with requests  
**Solution**: Add interceptor to axios:

```typescript
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Problem**: Stale data after mutations  
**Solution**: Invalidate React Query cache:

```typescript
const queryClient = useQueryClient();
await createClient(data);
queryClient.invalidateQueries(["clients"]);
```

**Problem**: Slow page loads  
**Solution**: Implement loading states and skeleton screens:

```typescript
if (isLoading) return <Skeleton />;
if (error) return <Error />;
return <Data data={data} />;
```

---

## Post-MVP Priorities

Based on user feedback, prioritize:

1. **Gmail/Outlook integration** (if users want better communication tracking)
2. **Proposal generator** (if users struggle with proposals)
3. **Team collaboration** (if users need team features)
4. **Advanced AI** (if users want more AI features)
5. **Invoicing** (if users need financial tracking)

---

## Resources

### Backend

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Google Gemini API](https://ai.google.dev/docs)

### Frontend

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tiptap Documentation](https://tiptap.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Deployment

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)

---

## Success Criteria

The MVP is complete when:

✅ All 7 core features are functional  
✅ Users can signup, login, and manage clients/projects  
✅ AI summaries generate correctly  
✅ Search returns relevant results  
✅ Email notifications send reliably  
✅ Mobile-responsive on all pages  
✅ No critical bugs or security issues  
✅ 5 beta users have tested and provided feedback  
✅ Deployed to production and accessible  
✅ Launch materials ready (Product Hunt, social posts)

**Now ship it and get feedback!** 🚀
