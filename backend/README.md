# EchoHub Backend

Backend API for EchoHub - Built with NestJS, Prisma, and PostgreSQL.

## Tech Stack

- **Framework**: NestJS 10
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT + Google OAuth
- **AI**: Anthropic Claude API
- **File Storage**: AWS S3 / Cloudflare R2
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL installed and running locally
- Google Gemini API key
- Google OAuth credentials (optional)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your credentials

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with test data
npm run prisma:seed
```

### Development

```bash
# Start development server
npm run start:dev

# The API will be available at http://localhost:3001/api/v1
```

### Database Management

```bash
# Create a new migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database (WARNING: deletes all data)
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

## Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── users/             # User management
│   ├── clients/           # Client management
│   ├── projects/          # Project management
│   ├── notes/             # Notes system
│   ├── files/             # File upload/management
│   ├── ai/                # AI summaries
│   ├── search/            # Search functionality
│   ├── notifications/     # Email notifications
│   ├── activity/          # Activity logging
│   ├── dashboard/         # Dashboard endpoint
│   ├── common/            # Shared utilities
│   ├── prisma/            # Prisma service
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Migration history
│   └── seed.ts            # Seed data
├── test/                  # E2E tests
└── package.json
```

## API Documentation

### Base URL

```
http://localhost:3001/api/v1
```

### Authentication Endpoints

```
POST   /auth/signup              # Register new user
POST   /auth/login               # Login with email/password
GET    /auth/google              # Google OAuth
GET    /auth/google/callback     # Google OAuth callback
GET    /auth/me                  # Get current user (protected)
```

### Client Endpoints

```
GET    /clients                  # List all clients
POST   /clients                  # Create new client
GET    /clients/:id              # Get client details
PATCH  /clients/:id              # Update client
DELETE /clients/:id              # Delete client
```

### Project Endpoints

```
GET    /clients/:clientId/projects    # List projects for client
POST   /clients/:clientId/projects    # Create project
GET    /projects/:id                  # Get project details
PATCH  /projects/:id                  # Update project
DELETE /projects/:id                  # Delete project
```

For full API documentation, see `/Documents/backend-architecture.md`

## Environment Variables

See `.env.example` for all required environment variables.

## Deployment

### Production Build

```bash
npm run build
npm run start:prod
```

### Hosting Options

- **Backend**: Oracle VPS (planned), Railway, Render, Fly.io
- **Database**: PostgreSQL on Oracle VPS (planned)
- **File Storage**: Cloudflare R2, AWS S3

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Implementation Guide](../Documents/mvp-implementation-guide.md)
- [Database Schema](../Documents/database-schema.md)

## License

MIT
