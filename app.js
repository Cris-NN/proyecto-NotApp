import express from 'express';
import cors from 'cors';
import userRoutes from './routes/inicioRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/', userRoutes);// /api/users

export default app;
