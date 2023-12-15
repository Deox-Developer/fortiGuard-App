import { Router } from 'express';
import { getAccounts, createAccount, updateAccount, softDeleteAccount, deleteAccount } from '../modules/accounts/account.controller.js'
import { authenticateToken } from '../modules/middleware/auth.controller.js'; // Importa el middleware

const router = Router();

router.get('/viewAccounts',authenticateToken, getAccounts);
router.post('/createAccount', createAccount);
router.put('/updateAccount/:id',authenticateToken, updateAccount);
router.put('/softDeleteAccount/:id',authenticateToken, softDeleteAccount);
router.delete('/deleteAccount/:id',authenticateToken, deleteAccount)

export default router;