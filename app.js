import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import inicioRouter from './routes/inicioRouter.js';

const app = express();


//////////////CONFIGURACIONES
// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
///////////////



app.use('/', inicioRouter);


export default app;