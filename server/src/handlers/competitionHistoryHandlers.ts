import type { Request, Response } from 'express';

import { competitions } from '../data/competitions';
import { premierLeagueHistory } from '../data/history/premierLeague';
import { laLigaHistory } from '../data/history/laLiga';
import { bundesligaHistory } from '../data/history/bundesLiga';
import { ligue1History } from '../data/history/league1';
import { serieAHistory } from '../data/history/serieA';
import { championsLeagueHistory } from '../data/history/championsLeague';

const historyByCompetitionCode = {
  PL: premierLeagueHistory,
  PD: laLigaHistory,
  BL1: bundesligaHistory,
  FL1: ligue1History,
  SA: serieAHistory,
} as const;

type SupportedCompetitionCode = keyof typeof historyByCompetitionCode;

type CompetitionParams = {
  competitionCode: string;
};

type CompetitionSeasonParams = {
  competitionCode: string;
  season: string;
};

type ChampionsLeagueSeasonParams = {
  season: string;
};

function isSupportedCompetitionCode(value: string): value is SupportedCompetitionCode {
  return value in historyByCompetitionCode;
}

export const getCompetitionsHandler = (_req: Request, res: Response) => {
  return res.status(200).json({
    competitions,
  });
};

export const getCompetitionSeasonsHandler = (req: Request<CompetitionParams>, res: Response) => {
  const { competitionCode } = req.params;

  if (!competitionCode || !isSupportedCompetitionCode(competitionCode)) {
    return res.status(404).json({
      message: 'Competition history not found',
    });
  }

  const seasons = historyByCompetitionCode[competitionCode].map((item) => item.season);

  return res.status(200).json({
    competitionCode,
    seasons,
  });
};

export const getCompetitionSeasonHistoryHandler = (req: Request<CompetitionSeasonParams>, res: Response) => {
  const { competitionCode, season } = req.params;
  const numericSeason = Number(season);

  if (!competitionCode || !isSupportedCompetitionCode(competitionCode)) {
    return res.status(404).json({
      message: 'Competition history not found',
    });
  }

  const seasonHistory = historyByCompetitionCode[competitionCode].find((item) => item.season === numericSeason);

  if (!seasonHistory) {
    return res.status(404).json({
      message: 'Season history not found',
    });
  }

  const topScorers = 'topScorers' in seasonHistory ? seasonHistory.topScorers : [];

  return res.status(200).json({
    competition: seasonHistory.competitionCode,
    season: seasonHistory.season,
    standings: seasonHistory.standingsTop.map((item, index) => ({
      id: index + 1,
      place: item.place,
      name: item.teamName,
      points: item.points,
    })),
    topScorers: topScorers.map((item, index) => ({
      id: index + 1,
      place: item.place,
      playerName: item.playerName,
      teamName: item.teamName,
      goals: item.goals,
    })),
  });
};

export const getChampionsLeagueSeasonsHandler = (_req: Request, res: Response) => {
  return res.status(200).json({
    competitionCode: 'CL',
    seasons: championsLeagueHistory.map((item) => item.season),
  });
};

export const getChampionsLeagueSeasonHistoryHandler = (req: Request<ChampionsLeagueSeasonParams>, res: Response) => {
  const { season } = req.params;
  const numericSeason = Number(season);

  if (!Number.isInteger(numericSeason)) {
    return res.status(400).json({
      message: 'Season must be a whole number',
    });
  }

  const seasonHistory = championsLeagueHistory.find((item) => item.season === numericSeason);

  if (!seasonHistory) {
    return res.status(404).json({
      message: 'Season history not found',
    });
  }

  return res.status(200).json({
    competition: seasonHistory.competitionCode,
    season: seasonHistory.season,
    groupStageEliminated: seasonHistory.groupStageEliminated,
    roundOf16: seasonHistory.roundOf16.map((item, index) => ({
      ...item,
      id: `round-of-16-${index + 1}`,
    })),
    quarterFinals: seasonHistory.quarterFinals.map((item, index) => ({
      ...item,
      id: `quarter-final-${index + 1}`,
    })),
    semiFinals: seasonHistory.semiFinals.map((item, index) => ({
      ...item,
      id: `semi-final-${index + 1}`,
    })),
    final: {
      ...seasonHistory.final,
      id: 'final',
    },
    topScorers: seasonHistory.topScorers.map((item, index) => ({
      id: index + 1,
      place: item.place,
      playerName: item.playerName,
      teamName: item.teamName,
      goals: item.goals,
    })),
  });
};
