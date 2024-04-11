import { NextFunction, Request, Response } from 'express';
import { createRoom, deleteRoom, getRooms, updateRoom } from './rooms.service';

export const createRoomHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createRoom(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getRoomsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getRooms();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const updateRoomHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateRoom(req.params.id as string, req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteRoomHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteRoom(req.params.id as string);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
