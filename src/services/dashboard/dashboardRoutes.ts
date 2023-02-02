import { Router } from 'express';
import auth from '../../middleware/auth';
import {
  products_in_orders,
  popular_products,
  productsByCategory,
  getCompletedOrdersByUser
} from './dashboardController';

const router = Router();

router.use(auth);
router.get('/products_in_orders', products_in_orders);
router.get('/popular_products', popular_products);
router.post('/category_Products', productsByCategory);
router.get('/completed_orders', getCompletedOrdersByUser);

export default router;
