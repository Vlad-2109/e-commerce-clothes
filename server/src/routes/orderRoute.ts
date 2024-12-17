import { Router } from 'express';
import adminAuth from '../middleware/adminAuth';
import authUser from '../middleware/auth';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController';

const router = Router();

// Admin Features
router.get('/list', adminAuth, allOrders);
router.post('/status', adminAuth, updateStatus);

// Payment Features
router.post('/place', authUser, placeOrder);
router.post('/stripe', authUser, placeOrderStripe);
router.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature
router.get('/user-orders', authUser, userOrders);

export default router;





