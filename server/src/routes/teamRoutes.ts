import { Router } from 'express';
import { createTeamHandler } from '../handlers/teamHandlers.js';

export const teamRouter = Router();

teamRouter.post('/teams', createTeamHandler);
