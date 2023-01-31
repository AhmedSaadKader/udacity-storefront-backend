import { Router } from 'express';
import auth from '../../middleware/auth';
import { items_in_orders } from './dashboardController';

const router = Router();

router.use(auth);
router.get('/items_in_orders', items_in_orders);

export default router;
