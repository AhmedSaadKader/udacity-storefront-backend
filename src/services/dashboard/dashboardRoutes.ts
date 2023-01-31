import { Router } from 'express';
import auth from '../../middleware/auth';
import {
  products_in_orders,
  popular_products,
  productsByCategory
} from './dashboardController';

const router = Router();

router.use(auth);
router.get('/products_in_orders', products_in_orders);
router.get('/popular_products', popular_products);
router.get('/category_Products', productsByCategory);

export default router;
