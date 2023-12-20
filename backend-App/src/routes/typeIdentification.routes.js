import { Router } from 'express';
import {
    getTypeIdentifications,
    getTypeIdentificationDetails,
    createTypeIdentification,
    updateTypeIdentification,
    softDeleteTypeIdentification,
    deleteTypeIdentification
} from '../modules/typeIdentifications/typeIdentification.controller.js';
import { authenticateToken } from '../modules/middleware/auth.controller.js';

const router = Router();

router.get('/viewTypeIdentifications',  getTypeIdentifications);
router.post('/viewTypeIdentification/:id',  getTypeIdentificationDetails);
router.post('/createTypeIdentification',  createTypeIdentification);
router.put('/updateTypeIdentification/:id',  updateTypeIdentification);
router.put('/softDeleteTypeIdentification/:id',  softDeleteTypeIdentification);
router.delete('/deleteTypeIdentification/:id',  deleteTypeIdentification);

export default router;