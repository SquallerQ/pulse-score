import type { Request, Response } from 'express';
import {
  allTimeScorersByCompetitionCode,
  type AllTimeScorersCompetitionCode,
} from '../data/history/records/allTimeScorers';
import { getClubDetails } from '../services/clubService';

type CompetitionParams = {
  competitionCode: string;
};

function isSupportedAllTimeScorersCompetitionCode(value: string): value is AllTimeScorersCompetitionCode {
  return Object.hasOwn(allTimeScorersByCompetitionCode, value);
}

export const getAllTimeScorersHandler = (req: Request<CompetitionParams>, res: Response) => {
  const { competitionCode } = req.params;
  const host = req.get('host');
  const assetOrigin = host ? `${req.protocol}://${host}` : undefined;

  if (!isSupportedAllTimeScorersCompetitionCode(competitionCode)) {
    return res.status(404).json({
      message: 'All-time scoring records not found',
    });
  }

  const records = allTimeScorersByCompetitionCode[competitionCode];

  return res.status(200).json({
    competitionCode: records.competitionCode,
    scorers: records.scorers.map((scorer) => {
      const club = getClubDetails({ clubName: scorer.clubName }, assetOrigin);

      return {
        ...scorer,
        clubName: club.clubName,
        clubKey: club.clubKey,
        crestUrl: club.crestUrl,
      };
    }),
  });
};
