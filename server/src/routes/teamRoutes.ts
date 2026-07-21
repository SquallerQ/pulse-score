import { Router } from 'express';
import {
  crashTestHandler,
  createTeamHandler,
  teamNotFoundDemoHandler,
  getTeamByIdHandler,
  getTeamsHandler,
} from '../handlers/teamHandlers.js';

export const teamRouter = Router();

teamRouter.get('/teams', getTeamsHandler);
teamRouter.get('/teams/:id', getTeamByIdHandler);
teamRouter.post('/teams', createTeamHandler);
teamRouter.get('/crash-test', crashTestHandler);
teamRouter.get('/teams/not-found-demo', teamNotFoundDemoHandler);
