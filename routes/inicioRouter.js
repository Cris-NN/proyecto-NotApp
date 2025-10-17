import express from 'express';
import {login} from '../controllers/inicioController.js';

const router = express.Router(); // inicializo una ruta

router.get('/', login) 

export default router;
