import { Router } from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController';
import upload from '../middleware/multer';
import adminAuth from '../middleware/adminAuth';

const router = Router();

router.post(
  '/add', adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct,
);
router.post('/remove', adminAuth, removeProduct);
router.get('/single', singleProduct);
router.get('/list', listProducts);

export default router;





