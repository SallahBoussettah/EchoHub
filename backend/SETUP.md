# EchoHub Backend Setup Guide

## Quick Start

Follow these steps to get the backend running locally.

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your credentials
```

**Required variables**:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret key for JWT tokens
- `GEMINI_API_KEY` - Gemini API key (get from https://aistudio.google.com/app/apikey)

**Optional variables** (for full functionality):

- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - For Google OAuth
- `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` - For file uploads
- `RESEND_API_KEY` - For email notifications

### 3. Set Up Database (Local PostgreSQL)

**Need help installing PostgreSQL?** See [POSTGRESQL-SETUP.md](./POSTGRESQL-SETUP.md) for detailed installation instructions.

Make sure PostgreSQL is installed and running on your machine.

```bash
# Create a new database
createdb echohub

# Or using psql
psql -U postgres
CREATE DATABASE echohub;
\q
```

Update your `.env` file with the connection string:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/echohub?schema=public"
```

Replace `postgres` with your PostgreSQL username and `your_password` with your password.

**Troubleshooting?** Check [POSTGRESQL-SETUP.md](./POSTGRESQL-SETUP.md) for common issues and solutions.

### 4. Run Database Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# (Optional) Seed database with test data
npm run prisma:seed
```

### 5. Start Development Server

```bash
npm run start:dev
```

The API will be available at: **http://localhost:3001/api/v1**

### 6. Test the API

```bash
# Health check
curl http://localhost:3001/api/v1/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## Testing Authentication

### Signup

```bash
curl -X POST http://localhost:3001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

### Get Current User (Protected Route)

```bash
curl http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Database Management

### View Database in GUI

```bash
npm run prisma:studio
```

Opens Prisma Studio at http://localhost:5555

### Create New Migration

```bash
npm run prisma:migrate
```

### Reset Database (WARNING: Deletes all data)

```bash
npx prisma migrate reset
```

---

## Next Steps

Now that the backend is running, you can:

1. **Build more modules** - Follow the implementation guide in `/Documents/mvp-implementation-guide.md`
2. **Connect frontend** - Update frontend API URL to `http://localhost:3001/api/v1`
3. **Test endpoints** - Use Postman or Insomnia to test API endpoints

---

## Module Implementation Order

Follow this order to build the MVP:

### Week 1-2: Foundation ✅

- [x] Auth module (signup, login, JWT)
- [x] Users module (basic structure)
- [x] Prisma setup
- [ ] Google OAuth (optional for MVP)

### Week 3: Core Features

- [ ] Clients module (CRUD operations)
- [ ] Projects module (CRUD + milestones)
- [ ] Notes module (rich text storage)

### Week 4: Advanced Features

- [ ] Files module (S3/R2 upload)
- [ ] AI module (Claude integration)
- [ ] Activity module (logging)
- [ ] Search module (full-text search)

### Week 5: Polish

- [ ] Notifications module (email reminders)
- [ ] Dashboard endpoint (aggregated data)
- [ ] Testing (unit + E2E)
- [ ] Error handling improvements

---

## Common Issues

### Issue: "Cannot find module '@prisma/client'"

**Solution**:

```bash
npm run prisma:generate
```

### Issue: "Database connection failed"

**Solution**:

- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running
- Test connection with: `npx prisma db pull`
- See [POSTGRESQL-SETUP.md](./POSTGRESQL-SETUP.md) for detailed troubleshooting

### Issue: "JWT_SECRET is not defined"

**Solution**:

- Add `JWT_SECRET` to your `.env` file
- Generate a random secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Issue: Port 3001 already in use

**Solution**:

- Change `PORT` in `.env` to a different port (e.g., 3002)
- Or kill the process using port 3001

---

## Useful Commands

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open database GUI
npm run prisma:seed        # Seed test data

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run E2E tests
npm run test:cov           # Test coverage

# Code Quality
npm run lint               # Lint code
npm run format             # Format code with Prettier

# Production
npm run build              # Build for production
npm run start:prod         # Start production server
```

---

## Resources

- **Implementation Guide**: `/Documents/mvp-implementation-guide.md`
- **Database Schema**: `/Documents/database-schema.md`
- **Backend Architecture**: `/Documents/backend-architecture.md`
- **NestJS Docs**: https://docs.nestjs.com/
- **Prisma Docs**: https://www.prisma.io/docs/

---

## Need Help?

1. Check the implementation guide for detailed steps
2. Review the backend architecture doc for design decisions
3. Look at existing modules for code examples
4. Test endpoints with Postman/Insomnia

**Happy coding!** 🚀
