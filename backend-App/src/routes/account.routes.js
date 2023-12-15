import { Router } from 'express';
import { getAccounts, createAccount, updateAccount, softDeleteAccount, deleteAccount } from '../modules/accounts/account.controller.js'

const router = Router();

router.get('/viewAccounts', getAccounts);
router.post('/createAccount', createAccount);
router.put('/updateAccount/:id', updateAccount);
router.put('/softDeleteAccount/:id', softDeleteAccount);
router.delete('/deleteAccount/:id', deleteAccount)

export default router;