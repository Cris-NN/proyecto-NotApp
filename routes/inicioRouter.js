import express from 'express';
import {login, createUser, inicio} from '../controllers/usuarioController.js';

const router = express.Router(); // inicializo una ruta

router.post('/createUser', createUser)
router.post('/login', login)
router.get('/', inicio)

export default router;
