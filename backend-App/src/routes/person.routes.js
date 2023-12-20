import { Router } from 'express';
import { getPersons, getPersonDetails, createPerson, updatePerson, softDeletePerson, deletePerson } from '../modules/persons/person.controller.js';
import { authenticateToken } from '../modules/middleware/auth.controller.js'; // Importa el middleware

const router = Router();

router.get('/viewPersons',  getPersons);
router.post('/viewPerson',  getPersonDetails);
router.post('/createPerson', createPerson);
router.put('/updatePerson',  updatePerson);
router.put('/softDeletePerson',  softDeletePerson);
router.delete('/deletePerson',  deletePerson);

export default router;