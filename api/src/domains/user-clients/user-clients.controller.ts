import { NextFunction, Request, Response } from 'express';
import { addUserClients } from './user-clients.service';

export const addUserClientHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await addUserClients(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
