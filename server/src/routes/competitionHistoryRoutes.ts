import { Router } from 'express';

import {
  getCompetitionSeasonHistoryHandler,
  getCompetitionSeasonsHandler,
  getCompetitionsHandler,
  getChampionsLeagueSeasonHistoryHandler,
} from '../handlers/competitionHistoryHandlers';

export const historyRoute = Router();

historyRoute.get('/competitions', getCompetitionsHandler);
historyRoute.get('/competitions/:competitionCode/seasons', getCompetitionSeasonsHandler);
historyRoute.get('/competitions/:competitionCode/seasons/:season', getCompetitionSeasonHistoryHandler);
historyRoute.get('/championsLeague/seasons/:season', getChampionsLeagueSeasonHistoryHandler);
