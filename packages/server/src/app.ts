import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDb, sequelize } from './db/db';
import { connectRedis } from './db/redis';
import userRoutes from './routes/user.routes';
import studentRoutes from './routes/student.routers';
import teacherRoutes from './routes/teacher.routers';
import financeRoutes from './routes/finance.routes';
import eventRoutes from './routes/event.routes';
import iclassRoutes from './routes/iclass.routes';
import hrRoutes from './routes/hr.routes';
import libraryRoutes from './routes/library.routes';
import transportRoutes from './routes/transport.routes';
import hostelRoutes from './routes/hostel.routes';
import attendanceRoutes from './routes/attendance.routes';
import examRoutes from './routes/exam.routes';

dotenv.config({ path: path.join(__dirname, '../.env') });
connectDb();
connectRedis();

// Define Express app
const app: Application = express();

// Static uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'src/uploads')));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Explicitly allow frontend origin
  credentials: true // Allow cookies to be sent/received
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('hi');
});

// Routes
app.use('/user', userRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/finance', financeRoutes);
app.use('/events', eventRoutes);
app.use('/class', iclassRoutes);
app.use('/hr', hrRoutes);
app.use('/library', libraryRoutes);
app.use('/transport', transportRoutes);
app.use('/hostel', hostelRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/exams', examRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;
