import { Router } from 'express';
import { healthRouter } from './healthRoutes';

import { historyRoute } from './competitionHistoryRoutes';

export const apiRouter = Router();
apiRouter.use(historyRoute);

export const rootRouter = Router();

rootRouter.use(healthRouter);
rootRouter.use('/api', apiRouter);
