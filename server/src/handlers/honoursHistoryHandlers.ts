import type { Request, Response } from 'express';
import { championsByCompetitionCode } from '../data/history/honours/championsByCompetitionCode';
import type { CompetitionHonours } from '../data/history/honours/types';
import { getClubDetails } from '../services/clubService';

type HonoursParams = {
  competitionCode: string;
};

export const getHonoursHandler = (req: Request<HonoursParams>, res: Response) => {
  const { competitionCode } = req.params;
  const host = req.get('host');
  const assetOrigin = host ? `${req.protocol}://${host}` : undefined;
  const honours: CompetitionHonours | undefined = Object.values(championsByCompetitionCode).find(
    (competition) => competition.competitionCode === competitionCode
  );

  if (!honours) {
    return res.status(404).json({
      message: 'Competition honours not found',
    });
  }

  return res.status(200).json({
    competitionCode: honours.competitionCode,
    championsBySeason: honours.championsBySeason.map((champion) => ({
      season: champion.season,
      ...getClubDetails(champion, assetOrigin),
    })),
    allTimeTitles: honours.allTimeTitles.map((club) => ({
      titles: club.titles,
      ...getClubDetails(club, assetOrigin),
    })),
  });
};
