import { Router } from 'express';
import { getRoles, createRole, updateRole, deleteRole } from '../modules/roles/role.controller.js';

const router = Router();

// Rutas para gestionar roles
router.get('/viewRoles', getRoles);
router.post('/createRole', createRole);
router.put('/updateRole/:id', updateRole);
router.delete('/deleteRole/:id', deleteRole);

export default router;