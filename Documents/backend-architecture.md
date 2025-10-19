# EchoHub Backend Architecture (MVP)

## Overview

This document defines the backend architecture for EchoHub MVP using **NestJS**, **PostgreSQL**, and **Prisma ORM**.

---

## Tech Stack Decision

### Why NestJS?

- TypeScript-first with excellent type safety
- Modular architecture (perfect for scaling post-MVP)
- Built-in dependency injection
- Excellent documentation and community
- Native support for REST APIs and future GraphQL
- Integrated validation with class-validator
- Easy testing with Jest

### Why Prisma over Sequelize?

- **Type Safety**: Auto-generated TypeScript types from schema
- **Developer Experience**: Intuitive query API, no raw SQL needed
- **Migrations**: Declarative schema with automatic migrations
- **Modern**: Better suited for TypeScript projects
- **Performance**: Optimized queries with connection pooling
- **Prisma Studio**: Built-in database GUI for debugging

### Database: PostgreSQL

- Robust and reliable for production
- Excellent full-text search (for MVP search feature)
- JSON support for flexible data (activity logs, metadata)
- Running locally for development
- Will be hosted on Oracle VPS for production

---

## Project Structure

```
backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   │
│   ├── auth/                      # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── google.strategy.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── dto/
│   │       ├── signup.dto.ts
│   │       ├── login.dto.ts
│   │       └── auth-response.dto.ts
│   │
│   ├── users/                     # User management
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── clients/                   # Client management
│   │   ├── clients.module.ts
│   │   ├── clients.controller.ts
│   │   ├── clients.service.ts
│   │   ├── entities/
│   │   │   └── client.entity.ts
│   │   └── dto/
│   │       ├── create-client.dto.ts
│   │       └── update-client.dto.ts
│   │
│   ├── projects/                  # Project management
│   │   ├── projects.module.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   ├── entities/
│   │   │   ├── project.entity.ts
│   │   │   └── milestone.entity.ts
│   │   └── dto/
│   │       ├── create-project.dto.ts
│   │       ├── update-project.dto.ts
│   │       └── create-milestone.dto.ts
│   │
│   ├── notes/                     # Notes system
│   │   ├── notes.module.ts
│   │   ├── notes.controller.ts
│   │   ├── notes.service.ts
│   │   ├── entities/
│   │   │   └── note.entity.ts
│   │   └── dto/
│   │       ├── create-note.dto.ts
│   │       └── update-note.dto.ts
│   │
│   ├── files/                     # File upload/management
│   │   ├── files.module.ts
│   │   ├── files.controller.ts
│   │   ├── files.service.ts
│   │   ├── entities/
│   │   │   └── file.entity.ts
│   │   └── dto/
│   │       └── upload-file.dto.ts
│   │
│   ├── ai/                        # AI summaries (Gemini API)
│   │   ├── ai.module.ts
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   └── dto/
│   │       ├── generate-summary.dto.ts
│   │       └── summary-response.dto.ts
│   │
│   ├── search/                    # Search functionality
│   │   ├── search.module.ts
│   │   ├── search.controller.ts
│   │   └── search.service.ts
│   │
│   ├── notifications/             # Email notifications
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.ts
│   │   └── templates/
│   │       ├── deadline-reminder.hbs
│   │       └── weekly-summary.hbs
│   │
│   ├── activity/                  # Activity timeline
│   │   ├── activity.module.ts
│   │   ├── activity.service.ts
│   │   └── entities/
│   │       └── activity.entity.ts
│   │
│   ├── common/                    # Shared utilities
│   │   ├── decorators/
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   │
│   └── prisma/                    # Prisma service
│       ├── prisma.module.ts
│       └── prisma.service.ts
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── migrations/                # Migration history
│   └── seed.ts                    # Seed data for development
│
├── test/                          # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example                   # Environment variables template
├── .env                           # Local environment (gitignored)
├── nest-cli.json                  # NestJS CLI config
├── package.json
├── tsconfig.json
└── README.md
```

---

## Core Modules Breakdown

### 1. Auth Module

**Responsibilities**:

- User registration (email/password)
- Google OAuth integration
- JWT token generation and validation
- Password hashing (bcrypt)
- Email verification (optional for MVP)

**Endpoints**:

```
POST   /auth/signup              # Register new user
POST   /auth/login               # Login with email/password
POST   /auth/google              # Google OAuth callback
POST   /auth/refresh             # Refresh JWT token
POST   /auth/logout              # Logout (invalidate token)
GET    /auth/me                  # Get current user
```

### 2. Users Module

**Responsibilities**:

- User profile management
- Settings and preferences
- Account deletion

**Endpoints**:

```
GET    /users/profile            # Get user profile
PATCH  /users/profile            # Update profile
PATCH  /users/settings           # Update settings
DELETE /users/account            # Delete account
```

### 3. Clients Module

**Responsibilities**:

- CRUD operations for clients
- Client status management (active/paused/completed)
- Client archiving
- User ownership validation

**Endpoints**:

```
GET    /clients                  # List all clients (with filters)
POST   /clients                  # Create new client
GET    /clients/:id              # Get client details
PATCH  /clients/:id              # Update client
DELETE /clients/:id              # Delete client
PATCH  /clients/:id/archive      # Archive client
GET    /clients/:id/activity     # Get client activity timeline
```

### 4. Projects Module

**Responsibilities**:

- CRUD operations for projects
- Project status management
- Milestone tracking
- Deadline management

**Endpoints**:

```
GET    /clients/:clientId/projects              # List projects for client
POST   /clients/:clientId/projects              # Create project
GET    /projects/:id                            # Get project details
PATCH  /projects/:id                            # Update project
DELETE /projects/:id                            # Delete project
POST   /projects/:id/milestones                 # Add milestone
PATCH  /projects/:id/milestones/:milestoneId    # Update milestone
DELETE /projects/:id/milestones/:milestoneId    # Delete milestone
```

### 5. Notes Module

**Responsibilities**:

- Rich text note storage
- Notes attached to clients or projects
- Note versioning (optional for MVP)

**Endpoints**:

```
POST   /clients/:clientId/notes       # Create note for client
POST   /projects/:projectId/notes     # Create note for project
GET    /notes/:id                     # Get note
PATCH  /notes/:id                     # Update note
DELETE /notes/:id                     # Delete note
```

### 6. Files Module

**Responsibilities**:

- File upload to S3/Cloudflare R2
- File metadata storage
- File association with clients/projects
- File size and type validation

**Endpoints**:

```
POST   /files/upload                  # Upload file
GET    /files/:id                     # Get file metadata
GET    /files/:id/download            # Download file
DELETE /files/:id                     # Delete file
GET    /clients/:clientId/files       # List files for client
GET    /projects/:projectId/files     # List files for project
```

### 7. AI Module

**Responsibilities**:

- Gemini API integration
- Summary generation from notes/projects
- Usage tracking (for tier limits)
- Caching summaries

**Endpoints**:

```
POST   /ai/summarize/project/:id     # Generate project summary
POST   /ai/summarize/client/:id      # Generate client summary
GET    /ai/usage                     # Get AI usage stats
```

### 8. Search Module

**Responsibilities**:

- Full-text search across clients, projects, notes
- PostgreSQL full-text search
- Result ranking and relevance

**Endpoints**:

```
GET    /search?q=query               # Search all content
GET    /search/clients?q=query       # Search clients only
GET    /search/projects?q=query      # Search projects only
```

### 9. Notifications Module

**Responsibilities**:

- Email sending (Resend/SendGrid)
- Deadline reminders (cron job)
- Weekly summary emails
- User notification preferences

**Endpoints**:

```
GET    /notifications/preferences    # Get notification settings
PATCH  /notifications/preferences    # Update notification settings
```

### 10. Activity Module

**Responsibilities**:

- Log all user actions
- Generate activity timeline
- Activity filtering and pagination

**Endpoints**:

```
GET    /activity                     # Get user activity feed
GET    /clients/:id/activity         # Get client activity
GET    /projects/:id/activity        # Get project activity
```

---

## Authentication Flow

### Email/Password Registration

1. User submits signup form (name, email, password)
2. Backend validates input (email format, password strength)
3. Hash password with bcrypt (salt rounds: 10)
4. Create user in database
5. Generate JWT token (expires in 7 days)
6. Return token + user data

### Google OAuth

1. User clicks "Continue with Google"
2. Frontend redirects to `/auth/google`
3. NestJS Passport Google strategy handles OAuth
4. Backend receives user data from Google
5. Check if user exists (by email)
   - If exists: Login
   - If not: Create new user
6. Generate JWT token
7. Redirect to frontend with token

### JWT Token Structure

```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Protected Routes

- All routes except `/auth/*` require JWT token
- Token sent in `Authorization: Bearer <token>` header
- `JwtAuthGuard` validates token on every request
- User ID extracted from token for ownership checks

---

## Database Schema (Prisma)

See `database-schema.md` for full schema definition.

---

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Pagination Response

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  }
}
```

---

## Error Handling

### HTTP Status Codes

- `200 OK` - Successful GET/PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Custom Error Codes

```typescript
enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE_RESOURCE = "DUPLICATE_RESOURCE",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  AI_QUOTA_EXCEEDED = "AI_QUOTA_EXCEEDED",
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
}
```

---

## Security Considerations

### Authentication

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens expire after 7 days
- Refresh tokens stored in httpOnly cookies
- Google OAuth uses official Passport strategy

### Authorization

- All resources have `userId` foreign key
- Ownership checked on every mutation
- Users can only access their own data

### Input Validation

- All DTOs use `class-validator` decorators
- SQL injection prevented by Prisma (parameterized queries)
- XSS prevention with input sanitization

### Rate Limiting

- Global rate limit: 100 requests/minute per IP
- Auth endpoints: 5 requests/minute per IP
- AI endpoints: Based on user tier

### File Upload

- Max file size: 10MB (MVP)
- Allowed types: PDF, PNG, JPG, DOCX, TXT
- Files scanned for malware (optional: ClamAV)
- Files stored in S3 with signed URLs

---

## Environment Variables

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/echohub

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# File Storage (S3 or Cloudflare R2)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=echohub-files

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@echohub.com

# Frontend URL (for CORS and redirects)
FRONTEND_URL=http://localhost:3000
```

---

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run start:dev
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name add_clients_table

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Enable HTTPS only
- [ ] Configure CORS for frontend domain
- [ ] Set up database backups
- [ ] Enable error tracking (Sentry)
- [ ] Configure rate limiting
- [ ] Set up monitoring (Datadog/New Relic)
- [ ] Run database migrations
- [ ] Test all endpoints

### Hosting Options

- **Backend**: Railway, Render, or Fly.io
- **Database**: PostgreSQL on Oracle VPS
- **File Storage**: Cloudflare R2 or AWS S3
- **Email**: Resend or SendGrid

---

## Performance Optimization

### Database

- Index frequently queried fields (userId, clientId, projectId)
- Use connection pooling (Prisma default)
- Implement pagination for list endpoints
- Use `select` to fetch only needed fields

### Caching

- Cache AI summaries (Redis or in-memory)
- Cache user profile data
- Cache search results (short TTL)

### API

- Compress responses (gzip)
- Use ETags for conditional requests
- Implement request batching (future)

---

## Monitoring & Logging

### Logging

- Use NestJS built-in logger
- Log levels: error, warn, info, debug
- Log all API requests (method, path, status, duration)
- Log all errors with stack traces

### Metrics to Track

- API response times
- Database query times
- AI API usage and costs
- Error rates by endpoint
- User activity (signups, logins, feature usage)

### Alerts

- High error rate (> 5%)
- Slow API responses (> 2s)
- Database connection issues
- AI API failures
- Disk space low (file storage)

---

## Future Considerations (Post-MVP)

### Features

- WebSocket support for real-time updates
- GraphQL API (alongside REST)
- Proposal generation module
- Gmail/Outlook integration
- Calendar integration
- Team collaboration features

### Technical

- Microservices architecture (if needed)
- Message queue (Bull/RabbitMQ) for async tasks
- Redis for caching and sessions
- Elasticsearch for advanced search
- CDN for file delivery

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [Google Gemini API](https://ai.google.dev/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
