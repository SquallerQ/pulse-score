import type { Request, Response } from 'express';
import {
  championsByCompetitionCode,
  type SupportedChampionsCompetitionCode,
} from '../data/history/honours/championsByCompetitionCode';

type HonoursParams = {
  competitionCode: string;
};

function isSupportedChampionsCompetitionCode(value: string): value is SupportedChampionsCompetitionCode {
  return Object.hasOwn(championsByCompetitionCode, value);
}

export const getHonoursHandler = (req: Request<HonoursParams>, res: Response) => {
  const { competitionCode } = req.params;

  if (!isSupportedChampionsCompetitionCode(competitionCode)) {
    return res.status(404).json({
      message: 'Competition honours not found',
    });
  }

  const honours = championsByCompetitionCode[competitionCode];

  return res.status(200).json({
    competitionCode: honours.competitionCode,
    recentChampions: honours.recentChampions,
    allTimeTitles: honours.allTimeTitles,
  });
};
