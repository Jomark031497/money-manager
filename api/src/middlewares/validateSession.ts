import { NextFunction, Request, Response } from 'express';
import { lucia } from '../lib/lucia.js';

export const validateSession = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  if (!sessionId) return res.status(401).json({ message: 'unauthenticated' });

  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    res.appendHeader('Set-Cookie', lucia.createSessionCookie(result.session.id).serialize());
  }
  if (!result.session) {
    res.appendHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize());
  }

  res.locals.sessionId = result.user?.id ?? '';

  return next();
};
