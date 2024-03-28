import { Router } from 'express';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { insertUserSchema, selectUserSchema } from '../users/users.schema.js';
import { currentSessionHandler, loginHandler, signOutHandler, signUpHandler } from './auth.controller.js';
import { validateSession } from '../../middlewares/validateSession.js';

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
