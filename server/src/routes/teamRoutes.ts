import { Router } from 'express';
import { crashTestHandler, createTeamHandler, teamNotFoundDemoHandler } from '../handlers/teamHandlers.js';

export const teamRouter = Router();

teamRouter.post('/teams', createTeamHandler);
teamRouter.get('/crash-test', crashTestHandler);
teamRouter.get('/teams/not-found-demo', teamNotFoundDemoHandler);
