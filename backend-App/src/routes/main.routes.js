import { Router } from 'express';
import { authenticateToken } from '../modules/middleware/auth.controller.js'; // Importa el middleware
import accountRoutes from './account.routes.js'; // Reemplaza con la ubicación real de tus archivos de rutas
import roleRoutes from './role.routes.js';
import loginRoutes from './login.routes.js'

const router = Router();

router.use('/login',loginRoutes);
router.use('/accounts', accountRoutes);
router.use('/roles',authenticateToken, roleRoutes);

// Middleware de ruta de error
router.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

export function mainRoutes(app) {
    app.use('/api', router);
}

