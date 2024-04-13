import { Router } from 'express';
import * as usersController from './users.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { insertUserSchema } from './users.schema';

const router = Router();

router.get('/', usersController.getUsersHandler);
router.get('/:id', usersController.getUserbyIdHandler);

router.post('/', validateSchema(insertUserSchema), usersController.createUserHandler);

router.patch('/:id', validateSchema(insertUserSchema.partial()), usersController.updateUserHandler);

router.delete('/:id', usersController.deleteUserHandler);

export const usersRoutes = router;
