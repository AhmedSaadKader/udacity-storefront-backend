import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem
} from '../controllers/itemController';

const router = Router();

router.get('/', getAllItems);

router.post('/', createItem);

router.get('/:id', getItem);

router.delete('/:id', deleteItem);

export default router;
