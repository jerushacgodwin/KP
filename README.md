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


