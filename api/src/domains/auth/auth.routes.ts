import { Router } from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { insertUserSchema } from '../users/users.schema';
import { currentSessionHandler, loginHandler, signOutHandler, signUpHandler } from './auth.controller';
import { validateSession } from '../../middlewares/validateSession';

const router = Router();

router.post('/sign-up', validateSchema(insertUserSchema), signUpHandler);

router.post(
  '/login',
  validateSchema(
    insertUserSchema.pick({
      username: true,
      password: true,
    }),
  ),
  loginHandler,
);

router.delete('/sign-out', validateSession, signOutHandler);

router.get('/me', validateSession, currentSessionHandler);

export const authRoutes = router;
