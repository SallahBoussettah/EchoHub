# EchoHub Database Schema (Prisma)

## Overview

This document defines the complete PostgreSQL database schema for EchoHub MVP using Prisma ORM.

---

## Prisma Schema File

Location: `backend/prisma/schema.prisma`

```prisma
// This is your Prisma schema file
// Learn more: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER & AUTHENTICATION
// ============================================

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String?  // Null for OAuth users
  avatar    String?  // URL to avatar image
  timezone  String   @default("UTC")
  workType  String?  // e.g., "Designer", "Developer", "Consultant"

  // OAuth
  googleId  String?  @unique

  // Subscription
  plan      Plan     @default(FREE)
  aiUsage   Int      @default(0) // AI summaries used this month
  aiLimit   Int      @default(5) // AI summaries limit per month

  // Preferences
  emailNotifications      Boolean @default(true)
  deadlineReminders       Boolean @default(true)
  weeklySummary           Boolean @default(false)

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  clients   Client[]
  projects  Project[]
  notes     Note[]
  files     File[]
  activities Activity[]

  @@map("users")
}

enum Plan {
  FREE
  PRO
  TEAM
}

// ============================================
// CLIENTS
// ============================================

model Client {
  id          String       @id @default(cuid())
  name        String
  email       String?
  phone       String?
  company     String?
  website     String?
  status      ClientStatus @default(ACTIVE)

  // Metadata
  notes       String?      // Quick notes field

  // Ownership
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Timestamps
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  archivedAt  DateTime?

  // Relations
  projects    Project[]
  clientNotes Note[]
  files       File[]
  activities  Activity[]

  @@index([userId])
  @@index([status])
  @@map("clients")
}

enum ClientStatus {
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

// ============================================
// PROJECTS
// ============================================

model Project {
  id          String        @id @default(cuid())
  title       String
  description String?
  status      ProjectStatus @default(NOT_STARTED)
  deadline    DateTime?

  // Ownership
  clientId    String
  client      Client        @relation(fields: [clientId], references: [id], onDelete: Cascade)
  userId      String
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Timestamps
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  completedAt DateTime?

  // Relations
  milestones  Milestone[]
  notes       Note[]
  files       File[]
  activities  Activity[]
  aiSummaries AiSummary[]

  @@index([clientId])
  @@index([userId])
  @@index([status])
  @@index([deadline])
  @@map("projects")
}

enum ProjectStatus {
  NOT_STARTED
  IN_PROGRESS
  REVIEW
  COMPLETED
}

// ============================================
// MILESTONES
// ============================================

model Milestone {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  order       Int      // For sorting

  // Ownership
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  completedAt DateTime?

  @@index([projectId])
  @@map("milestones")
}

// ============================================
// NOTES
// ============================================

model Note {
  id        String   @id @default(cuid())
  content   String   // Rich text (HTML or JSON)

  // Associations (one of these will be set)
  clientId  String?
  client    Client?  @relation(fields: [clientId], references: [id], onDelete: Cascade)
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)

  // Ownership
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([clientId])
  @@index([projectId])
  @@index([userId])
  @@map("notes")
}

// ============================================
// FILES
// ============================================

model File {
  id          String   @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int      // In bytes
  url         String   // S3/R2 URL

  // Associations (one of these will be set)
  clientId    String?
  client      Client?  @relation(fields: [clientId], references: [id], onDelete: Cascade)
  projectId   String?
  project     Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)

  // Ownership
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Timestamps
  createdAt   DateTime @default(now())

  @@index([clientId])
  @@index([projectId])
  @@index([userId])
  @@map("files")
}

// ============================================
// AI SUMMARIES
// ============================================

model AiSummary {
  id        String   @id @default(cuid())
  content   String   // Generated summary
  type      SummaryType

  // Associations
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)

  // Metadata
  tokensUsed Int     // Gemini API tokens
  model     String   @default("gemini-2.5-flash")

  // Timestamps
  createdAt DateTime @default(now())

  @@index([projectId])
  @@map("ai_summaries")
}

enum SummaryType {
  PROJECT
  CLIENT
}

// ============================================
// ACTIVITY LOG
// ============================================

model Activity {
  id          String       @id @default(cuid())
  action      ActivityType
  description String       // Human-readable description
  metadata    Json?        // Additional data (flexible)

  // Associations (optional)
  clientId    String?
  client      Client?      @relation(fields: [clientId], references: [id], onDelete: Cascade)
  projectId   String?
  project     Project?     @relation(fields: [projectId], references: [id], onDelete: Cascade)

  // Ownership
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Timestamp
  createdAt   DateTime     @default(now())

  @@index([userId])
  @@index([clientId])
  @@index([projectId])
  @@index([createdAt])
  @@map("activities")
}

enum ActivityType {
  CLIENT_CREATED
  CLIENT_UPDATED
  CLIENT_ARCHIVED
  PROJECT_CREATED
  PROJECT_UPDATED
  PROJECT_COMPLETED
  MILESTONE_COMPLETED
  NOTE_CREATED
  NOTE_UPDATED
  FILE_UPLOADED
  FILE_DELETED
  AI_SUMMARY_GENERATED
}
```

---

## Entity Relationships

```
User (1) ──────< (N) Client
User (1) ──────< (N) Project
User (1) ──────< (N) Note
User (1) ──────< (N) File
User (1) ──────< (N) Activity

Client (1) ────< (N) Project
Client (1) ────< (N) Note
Client (1) ────< (N) File
Client (1) ────< (N) Activity

Project (1) ───< (N) Milestone
Project (1) ───< (N) Note
Project (1) ───< (N) File
Project (1) ───< (N) Activity
Project (1) ───< (N) AiSummary
```

---

## Key Design Decisions

### 1. User Model

- **CUID** for IDs (collision-resistant, URL-safe)
- **Nullable password** for OAuth users (Google)
- **AI usage tracking** at user level for tier enforcement
- **Soft preferences** stored directly (no separate table for MVP)

### 2. Client Model

- **Status enum** for lifecycle management
- **Soft delete** via `archivedAt` timestamp
- **Flexible metadata** with quick notes field
- **Cascade delete** removes all related data when client deleted

### 3. Project Model

- **Deadline tracking** with nullable DateTime
- **Status enum** for workflow stages
- **Completion timestamp** for analytics
- **Belongs to both Client and User** for easy querying

### 4. Milestone Model

- **Simple checklist** (no complex dependencies)
- **Order field** for custom sorting
- **Completion tracking** with timestamp

### 5. Note Model

- **Polymorphic association** (can belong to Client OR Project)
- **Rich text content** stored as HTML or JSON
- **No versioning** in MVP (add later if needed)

### 6. File Model

- **Stores metadata only** (actual files in S3/R2)
- **Original filename preserved** for user reference
- **Size tracking** for storage limits
- **Polymorphic association** (Client or Project)

### 7. AI Summary Model

- **Cached summaries** to avoid regenerating
- **Token tracking** for cost monitoring
- **Type enum** for different summary contexts

### 8. Activity Model

- **Flexible metadata** using JSON field
- **Action enum** for type safety
- **Chronological log** with indexed timestamp
- **Optional associations** for filtering

---

## Indexes

### Performance Indexes

```prisma
// User lookups
@@index([email])
@@index([googleId])

// Ownership queries
@@index([userId])
@@index([clientId])
@@index([projectId])

// Status filtering
@@index([status])

// Deadline queries
@@index([deadline])

// Activity timeline
@@index([createdAt])
```

### Full-Text Search (PostgreSQL)

```sql
-- Add full-text search indexes (run after migration)
CREATE INDEX clients_search_idx ON clients USING GIN (to_tsvector('english', name || ' ' || COALESCE(company, '') || ' ' || COALESCE(notes, '')));

CREATE INDEX projects_search_idx ON projects USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

CREATE INDEX notes_search_idx ON notes USING GIN (to_tsvector('english', content));
```

---

## Migrations

### Initial Migration

```bash
npx prisma migrate dev --name init
```

### Example Migration Commands

```bash
# Create new migration
npx prisma migrate dev --name add_client_status

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# View migration status
npx prisma migrate status
```

---

## Seed Data (Development)

Location: `backend/prisma/seed.ts`

```typescript
import {
  PrismaClient,
  Plan,
  ClientStatus,
  ProjectStatus,
} from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@echohub.com" },
    update: {},
    create: {
      email: "test@echohub.com",
      name: "Test User",
      password: hashedPassword,
      plan: Plan.PRO,
      workType: "Designer",
    },
  });

  // Create test clients
  const client1 = await prisma.client.create({
    data: {
      name: "Acme Corp",
      email: "contact@acme.com",
      company: "Acme Corporation",
      status: ClientStatus.ACTIVE,
      userId: user.id,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: "TechStart Inc",
      email: "hello@techstart.io",
      company: "TechStart",
      status: ClientStatus.ACTIVE,
      userId: user.id,
    },
  });

  // Create test projects
  const project1 = await prisma.project.create({
    data: {
      title: "Website Redesign",
      description: "Complete redesign of company website",
      status: ProjectStatus.IN_PROGRESS,
      deadline: new Date("2025-12-31"),
      clientId: client1.id,
      userId: user.id,
      milestones: {
        create: [
          { title: "Wireframes", order: 1, completed: true },
          { title: "Design mockups", order: 2, completed: false },
          { title: "Development", order: 3, completed: false },
        ],
      },
    },
  });

  // Create test notes
  await prisma.note.create({
    data: {
      content:
        "<p>Initial meeting went well. Client wants modern, clean design.</p>",
      projectId: project1.id,
      userId: user.id,
    },
  });

  // Create activity log
  await prisma.activity.create({
    data: {
      action: "PROJECT_CREATED",
      description: 'Created project "Website Redesign"',
      projectId: project1.id,
      clientId: client1.id,
      userId: user.id,
    },
  });

  console.log("✅ Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run seed:

```bash
npx prisma db seed
```

---

## Prisma Client Usage Examples

### Create User

```typescript
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
    password: hashedPassword,
  },
});
```

### Get User with Relations

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    clients: true,
    projects: {
      include: {
        client: true,
        milestones: true,
      },
    },
  },
});
```

### Create Client with Projects

```typescript
const client = await prisma.client.create({
  data: {
    name: "Acme Corp",
    email: "contact@acme.com",
    userId: user.id,
    projects: {
      create: [
        {
          title: "Website Redesign",
          status: "IN_PROGRESS",
          userId: user.id,
        },
      ],
    },
  },
  include: {
    projects: true,
  },
});
```

### Update Project Status

```typescript
const project = await prisma.project.update({
  where: { id: projectId },
  data: {
    status: "COMPLETED",
    completedAt: new Date(),
  },
});
```

### Search Clients (Full-Text)

```typescript
const clients = await prisma.$queryRaw`
  SELECT * FROM clients
  WHERE to_tsvector('english', name || ' ' || COALESCE(company, '')) @@ plainto_tsquery('english', ${query})
  AND user_id = ${userId}
  ORDER BY ts_rank(to_tsvector('english', name || ' ' || COALESCE(company, '')), plainto_tsquery('english', ${query})) DESC
  LIMIT 10
`;
```

### Get Activity Timeline

```typescript
const activities = await prisma.activity.findMany({
  where: {
    userId: user.id,
  },
  include: {
    client: true,
    project: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 20,
});
```

### Check AI Usage Limit

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { aiUsage: true, aiLimit: true },
});

if (user.aiUsage >= user.aiLimit) {
  throw new Error("AI quota exceeded");
}

// Increment usage
await prisma.user.update({
  where: { id: userId },
  data: { aiUsage: { increment: 1 } },
});
```

---

## Data Validation Rules

### User

- Email: Valid email format, unique
- Password: Min 8 characters (if not OAuth)
- Name: Required, 1-100 characters
- Timezone: Valid IANA timezone string

### Client

- Name: Required, 1-200 characters
- Email: Valid email format (optional)
- Status: Must be valid enum value

### Project

- Title: Required, 1-200 characters
- Status: Must be valid enum value
- Deadline: Must be future date (optional)

### File

- Size: Max 10MB (10,485,760 bytes)
- Type: PDF, PNG, JPG, JPEG, DOCX, TXT only

### Note

- Content: Required, max 50,000 characters

---

## Backup & Recovery

### Manual Backup

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

---

## Performance Considerations

### Connection Pooling

Prisma uses connection pooling by default:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pool size: 10 (default)
}
```

### Query Optimization

- Use `select` to fetch only needed fields
- Use `include` sparingly (avoid N+1 queries)
- Implement pagination for large datasets
- Use indexes for frequently queried fields

### Caching Strategy

- Cache user profile data (Redis)
- Cache AI summaries (in-memory or Redis)
- Cache search results (short TTL)

---

## Security

### SQL Injection Prevention

Prisma automatically parameterizes all queries, preventing SQL injection.

### Data Encryption

- Passwords hashed with bcrypt (salt rounds: 10)
- Sensitive data encrypted at rest (database level)
- Files stored in S3 with encryption enabled

### Access Control

- All queries filtered by `userId`
- Row-level security enforced in application layer
- No direct database access from frontend

---

## Monitoring

### Prisma Studio

```bash
npx prisma studio
```

Opens GUI at `http://localhost:5555` for database inspection.

### Query Logging

```typescript
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
```

### Metrics to Track

- Query execution time
- Connection pool usage
- Database size
- Table row counts
- Index usage

---

## Future Schema Changes (Post-MVP)

### Proposals Module

```prisma
model Proposal {
  id          String   @id @default(cuid())
  title       String
  content     String
  status      ProposalStatus
  clientId    String
  client      Client   @relation(fields: [clientId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Team Collaboration

```prisma
model Team {
  id        String   @id @default(cuid())
  name      String
  members   TeamMember[]
  createdAt DateTime @default(now())
}

model TeamMember {
  id       String @id @default(cuid())
  teamId   String
  team     Team   @relation(fields: [teamId], references: [id])
  userId   String
  user     User   @relation(fields: [userId], references: [id])
  role     TeamRole
}
```

### Email Integration

```prisma
model Email {
  id        String   @id @default(cuid())
  subject   String
  body      String
  from      String
  to        String
  clientId  String?
  client    Client?  @relation(fields: [clientId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

---

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
