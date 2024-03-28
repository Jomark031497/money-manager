import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';

export const errorHandler = (error: AppError | Error, _req: Request, res: Response, next: NextFunction) => {
  if (!error) next();

  logger.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: error.data,
    });
  }

  return res.status(500).json({ message: 'Something went wrong' });
};
