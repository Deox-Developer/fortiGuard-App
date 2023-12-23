import { Router } from 'express';
import {
    getAccounts,
    getAccountDetails,
    createAccount,
    updateAccount,
    softDeleteAccount,
    deleteAccount
} from '../modules/accounts/account.controller.js'
import { authenticateToken } from '../modules/middleware/auth.controller.js'; // Importa el middleware

const router = Router();

router.get('/viewAccounts/', getAccounts);
router.post('/viewAccount/', getAccountDetails);
router.post('/createAccount', createAccount);
router.put('/updateAccount/', updateAccount);
router.put('/softDeleteAccount/',softDeleteAccount);
router.delete('/deleteAccount/:id',  deleteAccount)

export default router;
