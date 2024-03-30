import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUserbyIdHandler,
  getUsersHandler,
  updateUserHandler,
} from './users.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { insertUserSchema } from './users.schema';

const router = Router();

router.get('/', getUsersHandler);
router.get('/:id', getUserbyIdHandler);
router.post('/', validateSchema(insertUserSchema), createUserHandler);
router.patch('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

export const usersRoutes = router;
