# Server Setup and Migration Guide

## Prerequisites
- **Node.js** (v18 or later) and **npm** installed.
- **MySQL** server running and a database created for the LMS (update the connection details in `src/db/db.js`).
- **Redis** installed locally or via Docker.

## Install Dependencies
```bash
cd d:\LMSAPI\kpripo\packages\server
npm install
```

## Start Redis
You can run Redis locally or with Docker:
```bash
# Using Docker (recommended)
docker run -d --name redis -p 6379:6379 redis:latest
```
Or start the Redis service if it is installed on your machine.

## Run Database Migrations
All migration scripts are located in the `migrate` folder. The migration runner will automatically discover and execute them.
```bash
npm run migrate
```
You should see output similar to:
```
✅ Database connected.
Found 5 migrations.
🚀 Running migration: 20260124_01_auth_tables.js
✅ 20260124_01_auth_tables.js completed.
... (other migrations) ...
✨ All migrations completed successfully.
```

## Start the Server
```bash
npm start
```
The server will start on the port defined in your `.env` (default 3000). You can now access the API at `http://localhost:<PORT>`.

## Development Mode (Hot Reload)
If you prefer hot‑reloading during development, use the `nodemon` script:
```bash
npm run dev
```

## Verify Setup
1. Ensure Redis is running (`redis-cli ping` should return `PONG`).
2. Verify the database tables were created (check your MySQL client). 
3. Hit a health‑check endpoint, e.g., `GET /api/health` (if defined), to confirm the server is up.

---
*These steps assume a fresh clone of the repository. Adjust paths or environment variables as needed for your setup.*

## Production Deployment

### Build
```bash
npm run build   # compiles TypeScript to JavaScript in `dist/`
```

### Environment
- Set `NODE_ENV=production`
- Provide production `.env` with DB credentials, Redis URL, and any secrets.

### Run with Process Manager
```bash
npm install -g pm2
pm2 start dist/index.js --name lms-api
pm2 save
pm2 startup
```

### Docker (optional)
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```
Build and run:
```bash
docker build -t lms-api .
docker run -d -p 3000:3000 --env-file .env lms-api
```

### Reverse Proxy (Nginx)
Configure Nginx to forward traffic to the Node process.

### Monitoring
Use PM2 logs or any monitoring solution.

