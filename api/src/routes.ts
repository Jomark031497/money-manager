import { Express } from 'express';
import { usersRoutes } from './domains/users/users.routes';
import { authRoutes } from './domains/auth/auth.routes';
import { roomsRoute } from './domains/rooms/rooms.routes';
import { userClientsRoutes } from './domains/user-clients/user-clients.routes';

export const routes = (app: Express) => {
  app.use('/api/users', usersRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/rooms', roomsRoute);
  app.use('/api/user-clients', userClientsRoutes);
};
