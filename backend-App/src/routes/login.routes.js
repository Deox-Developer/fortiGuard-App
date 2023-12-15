// Importaciones necesarias
import { Router } from 'express';
import { login, logout } from '../modules/auth/login.controller.js';

const router = Router();

// Ruta para iniciar sesión
router.post('/singin', login);
router.post('/logout', logout);

export default router;