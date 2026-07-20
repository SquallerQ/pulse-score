import type { Request, Response, NextFunction } from 'express';
import { createTeamSchema } from '../schemas/index.js';
import { AppError } from '../errors/AppError.js';

export const createTeamHandler = (req: Request, res: Response) => {
  const result = createTeamSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  return res.status(201).json({
    message: 'Team received successfully',
    team: result.data,
  });
};

export const crashTestHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new Error('Crash test'));
};

export const teamNotFoundDemoHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Team not found', 404));
};
