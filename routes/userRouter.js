import express from 'express';
import {login, createUser, logout/*inicio*/} from '../controllers/userController.js';

const router = express.Router(); // inicializo una ruta

router.post('/createUser', createUser)
router.post('/login', login)
router.post('/logout', logout);
// router.get('/inicio', inicio)

export default router;