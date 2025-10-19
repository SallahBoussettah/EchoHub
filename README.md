# EchoHub - AI Workspace for Freelancers

One calm place for all your client chaos. Manage clients, projects, and communications with AI-powered summaries.

## 🚀 Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
# API at http://localhost:3001/api/v1
```

## 📁 Project Structure

```
EchoHub/
├── frontend/          # Next.js 15 application
├── backend/           # NestJS API
└── Documents/         # All documentation
```

## 📚 Documentation

- **[SUMMARY.md](./SUMMARY.md)** - What we've built and current status
- **[Backend Setup](./backend/SETUP.md)** - Step-by-step backend setup
- **[PostgreSQL Setup](./backend/POSTGRESQL-SETUP.md)** - Local database installation
- **[Implementation Guide](./Documents/mvp-implementation-guide.md)** - Week-by-week plan
- **[Database Schema](./Documents/database-schema.md)** - Complete Prisma schema
- **[Backend Architecture](./Documents/backend-architecture.md)** - Design decisions
- **[Next Steps](./Documents/NEXT-STEPS.md)** - What to build next

## 🎯 MVP Features

1. ✅ Authentication (email + Google OAuth)
2. ⏳ Client Hub (CRUD, status management)
3. ⏳ Project Management (milestones, deadlines)
4. ⏳ AI Summaries (Gemini API)
5. ⏳ Dashboard (overview, stats, activity)
6. ⏳ Search (full-text across all content)
7. ⏳ Email Notifications (deadline reminders)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, Tailwind v4, React 19
- **Backend**: NestJS 10, Prisma, PostgreSQL
- **AI**: Google Gemini 2.5 Flash
- **Database**: PostgreSQL (local/Oracle VPS)
- **File Storage**: Cloudflare R2
- **Email**: Resend

## 📖 Getting Started

1. Read [SUMMARY.md](./SUMMARY.md) for project overview
2. Follow [backend/SETUP.md](./backend/SETUP.md) to set up backend
3. Follow [Documents/mvp-implementation-guide.md](./Documents/mvp-implementation-guide.md) for implementation

## 📝 License

MIT
