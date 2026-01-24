# School Management System Monorepo

This repository is a **Lerna-based monorepo** that manages multiple packages including **Billing**, **Server**, and a front-end **Application**.

## Prerequisites

- Node.js (v18+ recommended)
- Yarn
- Lerna

## Installation & Setup

Clone the repository and install dependencies:

```bash
yarn install
npx lerna bootstrap
```

### Build & Start Packages

#### 1. Build Billing Package
```bash
cd packages/billing
npm run build
```

#### 2. Start Server
```bash
cd ../server
npm run start
```

#### 3. Run Application
```bash
cd ../../application
npm run dev
```

## Features

- Timetable Management – Multi-division, multi-class scheduling.
- Attendance System – Bulk marking, filtering, CSV export, and API integration.
- Billing & Fees Module – School/class fee structure and transactions.
- Lesson Management – Add lessons with optional file upload.
- Profile & School Settings – Manage school details, classes, and roles.

## Tech Stack

- Monorepo Manager: Lerna
- Frontend: Next.js, PrimeReact, React Hook Form, Zod
- Backend: Node.js, Express, Sequelize (MySQL)
- Database: MySQL/PostgreSQL (configurable)

## Scripts

- yarn install – Install dependencies
- npx lerna bootstrap – Link dependencies between packages
- npm run build – Build packages
- npm run start – Start server
- npm run dev – Start application in development mode

## License

## Production Deployment

Follow these steps to deploy the entire suite to a production environment.

### 1. Environment Configuration
Ensure you have production `.env` files in the following locations:
- `packages/server/.env` (DB credentials, Redis URL, SMTP details)
- `application/.env.local` (`NEXT_PUBLIC_API_URL` pointing to your production server)

### 2. Build All Packages
From the root directory, run the build command to compile the frontend and backend:
```bash
npm run build
```

### 3. Running the Services

We recommend using **PM2** to manage the processes.

#### Backend (Server)
```bash
cd packages/server
pm2 start dist/index.js --name lms-backend
```

#### Frontend (Application)
```bash
cd application
pm2 start "npm run start" --name lms-frontend
```

### 4. Reverse Proxy (Nginx)
Setup Nginx to handle incoming traffic and proxy it to the correct ports:
- **Backend:** `http://localhost:4000`
- **Frontend:** `http://localhost:3000`

### 5. Services Checklist
- [x] Redis server is running and accessible.
- [x] MySQL database is migrated (`npm run migrate` in `packages/server`).
- [x] SMTP credentials are valid (App Password for Gmail).
