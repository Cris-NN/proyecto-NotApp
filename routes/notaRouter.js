import express from 'express';
import {
  createNota,
  obtenerTodas,
  modificarNota,
  eliminarNota
} from '../controllers/notasController.js';
import { authMiddleware } from '../controllers/userController.js';

const router = express.Router();
router.use(authMiddleware); // esto quiere decir que todas las rutas requeriran el login

router.post('/', createNota);
router.get('/', obtenerTodas);
router.put('/:id', modificarNota);
router.delete('/:id', eliminarNota);

export default router;