import { Router } from 'express';
import { teamRouter } from './teamRoutes';
import { healthRouter } from './healthRoutes';

import { historyRoute } from './competitionHistoryRoutes';

export const apiRouter = Router();
apiRouter.use(teamRouter);
apiRouter.use(historyRoute);

export const rootRouter = Router();

rootRouter.use(healthRouter);
rootRouter.use('/api', apiRouter);
