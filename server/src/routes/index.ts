import { Router } from 'express';
import { teamRouter } from './teamRoutes';
import { healthRouter } from './healthRoutes';

import { plChampion2019Route } from './championRoute';

export const apiRouter = Router();
apiRouter.use(teamRouter);
apiRouter.use(plChampion2019Route);

export const rootRouter = Router();

rootRouter.use(healthRouter);
rootRouter.use('/api', apiRouter);
