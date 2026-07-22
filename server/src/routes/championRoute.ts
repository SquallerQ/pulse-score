import { Router } from 'express';

import { top3Handler } from '../handlers/champion';

export const plChampion2019Route = Router();

plChampion2019Route.get('/top3', top3Handler);
