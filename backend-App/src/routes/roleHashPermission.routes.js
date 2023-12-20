import { Router } from 'express';
import {
    getRoleHashPermissions,
    getRoleHashPermissionDetails,
    createRoleHashPermission,
    updateRoleHashPermission,
    softDeleteRoleHashPermission,
    deleteRoleHashPermission
} from '../modules/rolesHashPermissions/roleHashPermission.controller.js';
import { authenticateToken } from '../modules/middleware/auth.controller.js';

const router = Router();

router.get('/viewRoleHashPermissions',  getRoleHashPermissions);
router.post('/viewRoleHashPermission',  getRoleHashPermissionDetails);
router.post('/createRoleHashPermission', createRoleHashPermission);
router.put('/updateRoleHashPermission',  updateRoleHashPermission);
router.put('/softDeleteRoleHashPermission',  softDeleteRoleHashPermission);
router.delete('/deleteRoleHashPermission',  deleteRoleHashPermission);

export default router;