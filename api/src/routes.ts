import { Express } from 'express';
import { usersRoutes } from './domains/users/users.routes';
import { authRoutes } from './domains/auth/auth.routes';

export const routes = (app: Express) => {
  app.use('/api/users', usersRoutes);
  app.use('/api/auth', authRoutes);
};
