import { Router } from 'express';
import {
    getRoles,
    getRoleDetails,
    createRole,
    updateRole,
    softDeleteRole,
    deleteRole
} from '../modules/roles/role.controller.js';
import { authenticateToken } from '../modules/middleware/auth.controller.js';

const router = Router();

router.get('/viewRoles',  getRoles);
router.post('/viewRole/:id',  getRoleDetails);
router.post('/createRole',  createRole);
router.put('/updateRole/:id',  updateRole);
router.put('/softDeleteRole/:id',  softDeleteRole);
router.delete('/deleteRole/:id',  deleteRole);

export default router;