import { Router } from 'express';
import { teamRouter } from './teamRoutes';
import { healthRouter } from './healthRoutes';

export const apiRouter = Router();
apiRouter.use(teamRouter);

export const rootRouter = Router();

rootRouter.use(healthRouter);
rootRouter.use('/api', apiRouter);
