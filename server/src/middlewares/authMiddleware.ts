import type { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '../services/jwtService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization token required',
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = await verifyAccessToken(token);

    if (!payload.sub) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    res.locals.userId = payload.sub;

    return next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};
