import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateUser
} from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);

router.post('/', registerUser);

router.post('/login', loginUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;
