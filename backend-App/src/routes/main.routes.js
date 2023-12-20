import { Router } from 'express';
import { authenticateToken } from '../modules/middleware/auth.controller.js';
import accountRoutes from './account.routes.js';
import roleRoutes from './role.routes.js';
import loginRoutes from './login.routes.js';
import personRoutes from './person.routes.js';
import typeIdentificationRoutes from './typeIdentification.routes.js';
import roleHashPermissionRoutes from './roleHashPermission.routes.js';
import permissionRoutes from './permission.routes.js';

const router = Router();

router.use('/login', loginRoutes);
router.use('/accounts', accountRoutes);
router.use('/roles',  roleRoutes);
router.use('/persons', personRoutes);
router.use('/typeidentifications',  typeIdentificationRoutes);
router.use('/rolehashpermissions',  roleHashPermissionRoutes);
router.use('/permissions', permissionRoutes);

// Middleware de ruta de error
router.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

export function mainRoutes(app) {
    app.use('/api', router);
}

