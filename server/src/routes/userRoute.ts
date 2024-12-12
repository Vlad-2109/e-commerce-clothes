import { Router } from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin', adminLogin);

export default router;





