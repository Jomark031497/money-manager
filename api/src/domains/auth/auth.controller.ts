import { getCurrentAuthenticatedUser, login, signOut, signUp } from './auth.service';
import { lucia } from '../../lib/lucia';
import { NextFunction, Request, Response } from 'express';

export const signUpHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await signUp(req.body);
    return res
      .appendHeader('Set-Cookie', lucia.createSessionCookie(data.session.id).serialize())
      .status(200)
      .json(data.user)
      .end();
  } catch (error) {
    return next(error);
  }
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await login(req.body);
    return res
      .appendHeader('Set-Cookie', lucia.createSessionCookie(data.session.id).serialize())
      .status(200)
      .json(data.user)
      .end();
  } catch (error) {
    return next(error);
  }
};

export const signOutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await signOut(res.locals.sessionId);
    return res
      .setHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
      .status(200)
      .json({
        message: 'sign out success',
      })
      .end();
  } catch (error) {
    return next(error);
  }
};

export const currentSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCurrentAuthenticatedUser(res.locals.sessionId);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
