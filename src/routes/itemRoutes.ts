import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem
} from '../controllers/itemController';

const router = Router();

router.get('/', getAllItems);

router.post('/', createItem);

router.get('/:id', getItem);

router.delete('/:id', deleteItem);

router.patch('/:id', updateItem);

export default router;
