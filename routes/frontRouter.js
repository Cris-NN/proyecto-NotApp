import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { authFrontMiddleware } from '../controllers/userController.js';

const __filename = fileURLToPath(import.meta.url); // devuelve la URL acutal, y la funcion lo transforma a una ruta real de archivo
const __dirname = path.dirname(__filename); // se obtiene solamente el directorio donde esta el archivo

const router = express.Router();
// router.use(authMiddleware);

router.get('/home/'/*,authFrontMiddleware*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'))
} )

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/inicio.html'))
});

export default router;