import { Router } from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { insertUserSchema, selectUserSchema } from '../users/users.schema';
import { currentSessionHandler, loginHandler, signOutHandler, signUpHandler } from './auth.controller';
import { validateSession } from '../../middlewares/validateSession';

const router = Router();

router.post('/sign-up', validateSchema(insertUserSchema), signUpHandler);

router.post(
  '/login',
  validateSchema(
    selectUserSchema.pick({
      email: true,
      password: true,
    }),
  ),
  loginHandler,
);

router.get('/protected', validateSession, (req, res) => {
  return res.send('Hello World!');
});

router.delete('/sign-out', validateSession, signOutHandler);

router.get('/me', validateSession, currentSessionHandler);

export const authRoutes = router;
