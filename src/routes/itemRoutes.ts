import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem
} from '../controllers/itemController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', getAllItems);

router.get('/:id', getItem);

router.use(auth);

router.post('/', createItem);

router.delete('/:id', deleteItem);

router.patch('/:id', updateItem);

export default router;
