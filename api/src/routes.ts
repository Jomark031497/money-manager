import { Express } from 'express';
import { usersRoutes } from './domains/users/users.routes.js';

export const routes = (app: Express) => {
  app.use('/api/users', usersRoutes);
};
