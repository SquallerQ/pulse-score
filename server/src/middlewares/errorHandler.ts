import type { Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandlerMiddleware = (err: unknown, _req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error('Unhandled error:', err);

  return res.status(500).json({
    message: 'Internal server error',
  });
};
