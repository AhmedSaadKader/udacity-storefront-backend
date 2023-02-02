import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  addProductToOrder,
  getUserOrders,
  getOrderWithProducts
} from '../controllers/orderController';
import auth from '../middleware/auth';

const router = Router();

router.use(auth);

router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/myorders', getUserOrders);
router.get('/:orderId', getOrder);
router.delete('/:orderId', deleteOrder);
router.patch('/:orderId', updateOrder);

router.post('/:orderId/products', addProductToOrder);
router.get('/order_products/:orderId', getOrderWithProducts);
export default router;
