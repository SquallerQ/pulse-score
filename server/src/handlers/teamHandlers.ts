import type { Request, Response, NextFunction } from 'express';

import { teams } from '../data/teams.js';
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

  const newTeam = {
    id: teams.length + 1,
    ...result.data,
  };

  teams.push(newTeam);

  return res.status(201).json({
    message: 'Team created successfully',
    team: newTeam,
  });
};

export const getTeamsHandler = (_req: Request, res: Response) => {
  return res.status(200).json({
    teams,
  });
};

export const getTeamByIdHandler = (req: Request, res: Response, next: NextFunction) => {
  const teamId = Number(req.params.id);

  const team = teams.find((item) => item.id === teamId);

  if (!team) {
    return next(new AppError('Team not found', 404));
  }

  return res.status(200).json({
    team,
  });
};

export const crashTestHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new Error('Crash test'));
};

export const teamNotFoundDemoHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Team not found', 404));
};
