import type { Request, Response } from 'express';
import {
  allTimeScorersByCompetitionCode,
  type AllTimeScorersCompetitionCode,
} from '../data/history/records/allTimeScorers';

type CompetitionParams = {
  competitionCode: string;
};

function isSupportedAllTimeScorersCompetitionCode(value: string): value is AllTimeScorersCompetitionCode {
  return Object.hasOwn(allTimeScorersByCompetitionCode, value);
}

export const getAllTimeScorersHandler = (req: Request<CompetitionParams>, res: Response) => {
  const { competitionCode } = req.params;

  if (!isSupportedAllTimeScorersCompetitionCode(competitionCode)) {
    return res.status(404).json({
      message: 'All-time scoring records not found',
    });
  }

  const records = allTimeScorersByCompetitionCode[competitionCode];

  return res.status(200).json(records);
};
