# PostgreSQL Local Setup Guide

## Installation

### Windows

1. **Download PostgreSQL**
   - Go to https://www.postgresql.org/download/windows/
   - Download the installer (latest version)
   - Run the installer

2. **During Installation**
   - Remember the password you set for the `postgres` user
   - Default port: 5432 (keep it)
   - Install pgAdmin (GUI tool) - recommended

3. **Verify Installation**
   ```bash
   psql --version
   ```

### macOS

**Using Homebrew** (recommended):
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Verify installation
psql --version
```

**Using Postgres.app**:
- Download from https://postgresapp.com/
- Drag to Applications folder
- Open and click "Initialize"

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
psql --version
```

---

## Create Database for EchoHub

### Method 1: Using Command Line

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE echohub;

# Verify database was created
\l

# Exit
\q
```

### Method 2: Using createdb Command

```bash
# Create database directly
createdb echohub -U postgres

# Or if you have a different user
createdb echohub -U your_username
```

### Method 3: Using pgAdmin (GUI)

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click "Databases" → "Create" → "Database"
4. Name: `echohub`
5. Click "Save"

---

## Configure Connection String

Update your `backend/.env` file:

```env
# Default PostgreSQL connection (Windows/Linux)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/echohub?schema=public"

# macOS (if using default user)
DATABASE_URL="postgresql://your_username@localhost:5432/echohub?schema=public"
```

**Replace**:
- `postgres` with your PostgreSQL username
- `your_password` with your PostgreSQL password
- `your_username` with your macOS username (if applicable)

---

## Test Connection

```bash
# Navigate to backend folder
cd backend

# Test connection with Prisma
npx prisma db pull

# Should connect successfully without errors
```

---

## Common Issues

### Issue: "psql: command not found"

**Windows**:
- Add PostgreSQL to PATH:
  - Search "Environment Variables"
  - Edit "Path" variable
  - Add: `C:\Program Files\PostgreSQL\15\bin`

**macOS**:
```bash
# Add to ~/.zshrc or ~/.bash_profile
export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"
source ~/.zshrc
```

**Linux**:
```bash
# PostgreSQL should be in PATH by default
# If not, add to ~/.bashrc:
export PATH="/usr/lib/postgresql/15/bin:$PATH"
source ~/.bashrc
```

### Issue: "password authentication failed"

**Solution**:
```bash
# Reset postgres user password
sudo -u postgres psql
ALTER USER postgres PASSWORD 'new_password';
\q
```

### Issue: "could not connect to server"

**Solution**:
```bash
# Check if PostgreSQL is running

# Windows
# Open Services → Find "postgresql-x64-15" → Start

# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Issue: "database does not exist"

**Solution**:
```bash
# Create the database
createdb echohub -U postgres
```

---

## Useful Commands

```bash
# Connect to PostgreSQL
psql -U postgres

# List all databases
\l

# Connect to echohub database
\c echohub

# List all tables
\dt

# Describe a table
\d table_name

# Exit
\q

# Drop database (WARNING: deletes all data)
dropdb echohub -U postgres
```

---

## GUI Tools (Optional)

### pgAdmin (Recommended)
- Comes with PostgreSQL installer
- Full-featured database management
- Good for beginners

### DBeaver
- Download: https://dbeaver.io/
- Cross-platform
- Supports multiple databases

### TablePlus
- Download: https://tableplus.com/
- Modern UI
- macOS/Windows/Linux

### Prisma Studio (Built-in)
```bash
cd backend
npm run prisma:studio
# Opens at http://localhost:5555
```

---

## Production Setup (Oracle VPS)

When you're ready to deploy to Oracle VPS:

1. **Install PostgreSQL on VPS**
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```

2. **Configure for Remote Access**
   ```bash
   # Edit postgresql.conf
   sudo nano /etc/postgresql/15/main/postgresql.conf
   # Change: listen_addresses = '*'
   
   # Edit pg_hba.conf
   sudo nano /etc/postgresql/15/main/pg_hba.conf
   # Add: host all all 0.0.0.0/0 md5
   
   # Restart PostgreSQL
   sudo systemctl restart postgresql
   ```

3. **Configure Firewall**
   ```bash
   sudo ufw allow 5432/tcp
   ```

4. **Create Production Database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE echohub_production;
   CREATE USER echohub_user WITH PASSWORD 'strong_password';
   GRANT ALL PRIVILEGES ON DATABASE echohub_production TO echohub_user;
   \q
   ```

5. **Update Backend .env**
   ```env
   DATABASE_URL="postgresql://echohub_user:strong_password@your_vps_ip:5432/echohub_production?schema=public"
   ```

---

## Security Best Practices

1. **Use Strong Passwords**
   - Never use default passwords
   - Use password managers

2. **Limit Remote Access**
   - Only allow specific IPs in pg_hba.conf
   - Use SSH tunneling for remote access

3. **Regular Backups**
   ```bash
   # Backup database
   pg_dump echohub -U postgres > backup.sql
   
   # Restore database
   psql echohub -U postgres < backup.sql
   ```

4. **Keep PostgreSQL Updated**
   ```bash
   # Check version
   psql --version
   
   # Update (varies by OS)
   sudo apt update && sudo apt upgrade postgresql
   ```

---

## Next Steps

Once PostgreSQL is set up:

1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Generate Prisma Client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start backend: `npm run start:dev`

Your database is ready! 🎉
