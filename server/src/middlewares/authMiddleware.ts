import type { NextFunction, Request, Response } from 'express';

import { jwtVerify } from 'jose';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization token required',
    });
  }

  const token = authorization.slice(7);

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return next(new Error('JWT_SECRET is not configured'));
  }

  const secret = new TextEncoder().encode(jwtSecret);

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
      requiredClaims: ['sub', 'iat', 'exp'],
    });

    if (!payload.sub) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    res.locals.userId = payload.sub;

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};
