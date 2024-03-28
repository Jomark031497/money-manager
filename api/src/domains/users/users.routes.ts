import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUserbyIdHandler,
  getUsersHandler,
  updateUserHandler,
} from './users.controller.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { insertUserSchema } from './users.schema.js';

const router = Router();

router.get('/', getUsersHandler);
router.get('/:id', getUserbyIdHandler);
router.post('/', validateSchema(insertUserSchema), createUserHandler);
router.patch('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

export const usersRoutes = router;
