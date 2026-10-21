import { Router } from 'express';
import { healthRouter } from './healthRoutes';

import { historyRoute } from './competitionHistoryRoutes';
import { authRouter } from './authRoutes';

export const apiRouter = Router();
apiRouter.use(historyRoute);
apiRouter.use(authRouter);

export const rootRouter = Router();

rootRouter.use(healthRouter);
rootRouter.use('/api', apiRouter);
