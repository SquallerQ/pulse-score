import type { Request, Response } from 'express';

import { competitions } from '../data/competitions';
import { premierLeagueHistory } from '../data/history/premierLeague';

const historyByCompetitionCode = {
  PL: premierLeagueHistory,
} as const;

type SupportedCompetitionCode = keyof typeof historyByCompetitionCode;

type CompetitionParams = {
  competitionCode: string;
};

type CompetitionSeasonParams = {
  competitionCode: string;
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

  return res.status(200).json({
    competition: seasonHistory.competitionCode,
    season: seasonHistory.season,
    standings: seasonHistory.standingsTop.map((item, index) => ({
      id: index + 1,
      place: item.place,
      name: item.teamName,
      points: item.points,
    })),
  });
};
