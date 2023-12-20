import { Router } from 'express';
import {
    getPermissions,
    getPermissionDetails,
    createPermission,
    updatePermission,
    softDeletePermission,
    deletePermission
} from '../modules/permissions/permission.controller.js';
import { authenticateToken } from '../modules/middleware/auth.controller.js';

const router = Router();

router.get('/viewPermissions', getPermissions);
router.post('/viewPermission',  getPermissionDetails);
router.post('/createPermission',  createPermission);
router.put('/updatePermission',  updatePermission);
router.put('/softDeletePermission',  softDeletePermission);
router.delete('/deletePermission', deletePermission);

export default router;