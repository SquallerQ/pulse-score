import { Router } from 'express';
import { crashTestHandler, createTeamHandler } from '../handlers/teamHandlers.js';

export const teamRouter = Router();

teamRouter.post('/teams', createTeamHandler);
teamRouter.get('/crash-test', crashTestHandler);
