import { Express } from 'express';
import { usersRoutes } from './domains/users/users.routes.js';
import { authRoutes } from './domains/auth/auth.routes.js';

export const routes = (app: Express) => {
  app.use('/api/users', usersRoutes);
  app.use('/api/auth', authRoutes);
};
