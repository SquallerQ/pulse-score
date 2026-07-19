import type { NextFunction, Request, Response } from 'express';

export const errorHandlerMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);

  return res.status(500).json({
    message: 'Internal server error',
  });
};
