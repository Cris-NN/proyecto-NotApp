import express from 'express';
import cors from 'cors';
import userRoutes from './routes/inicioRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes);// /api/users

export default app;
