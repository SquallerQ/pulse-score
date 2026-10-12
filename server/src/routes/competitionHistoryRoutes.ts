import { Router } from 'express';

import {
  getCompetitionSeasonHistoryHandler,
  getCompetitionSeasonsHandler,
  getCompetitionsHandler,
  getChampionsLeagueSeasonsHandler,
  getChampionsLeagueSeasonHistoryHandler,
} from '../handlers/competitionHistoryHandlers';

import { getHonoursHandler } from '../handlers/honoursHistoryHandlers';
import { getAllTimeScorersHandler } from '../handlers/recordsHistoryHandlers';

export const historyRoute = Router();

historyRoute.get('/competitions', getCompetitionsHandler);
historyRoute.get('/competitions/:competitionCode/seasons', getCompetitionSeasonsHandler);
historyRoute.get('/competitions/:competitionCode/seasons/:season', getCompetitionSeasonHistoryHandler);
historyRoute.get('/championsLeague/seasons', getChampionsLeagueSeasonsHandler);
historyRoute.get('/championsLeague/seasons/:season', getChampionsLeagueSeasonHistoryHandler);

historyRoute.get('/honours/:competitionCode', getHonoursHandler);
historyRoute.get('/records/:competitionCode/all-time-scorers', getAllTimeScorersHandler);
