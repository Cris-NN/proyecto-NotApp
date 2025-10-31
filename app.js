import express from 'express';
import expressOasGenerator from 'express-oas-generator';
import cors from 'cors';
import userRoutes from './routes/userRouter.js';
import notaRouter from './routes/notaRouter.js';
import inicioRouter from './routes/frontRouter.js';
import cookieParser from 'cookie-parser';


const app = express();

expressOasGenerator.init(app, {
  docsPath: '/api-docs',
  docsFile: './swagger.json',
});


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use('/', inicioRouter);
app.use('/user', userRoutes);
app.use('/nota', notaRouter);

export default app;
