import { createUser, deleteUser, getUserById, getUsers, updateUser } from './users.service';
import { Request, Response, NextFunction } from 'express';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getUsers();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getUserbyIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getUserById(req.params.id as string);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateUser(req.params.id as string, req.body);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteUser(req.params.id as string);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
