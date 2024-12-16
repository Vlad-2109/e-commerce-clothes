import { Router } from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController';
import authUser from '../middleware/auth';

const router = Router();

router.get('/get', authUser, getUserCart);
router.post('/add', authUser, addToCart);
router.post('/update', authUser, updateCart);

export default router;





