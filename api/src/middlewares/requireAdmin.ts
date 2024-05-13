import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../domains/users/users.service';
import { AppError } from '../utils/AppError';

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(res.locals.sessionId);
    if (!user) throw new AppError(401, 'unauthorized');

    if (user.role !== 'admin') throw new AppError(401, 'unauthorized', { role: 'admin role is required' });

    return next();
  } catch (error) {
    return next(error);
  }
};
