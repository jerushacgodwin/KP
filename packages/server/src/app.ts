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

dotenv.config();
connectDb();
connectRedis();

// Define Express app
const app: Application = express();

// Static uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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

export default app;
