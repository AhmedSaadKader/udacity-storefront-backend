import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct
} from '../controllers/productController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProduct);

router.use(auth);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

export default router;
