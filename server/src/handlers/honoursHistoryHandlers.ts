import type { Request, Response } from 'express';
import { championsByCompetitionCode } from '../data/history/honours/championsByCompetitionCode';
import type { CompetitionHonours } from '../data/history/honours/types';

type HonoursParams = {
  competitionCode: string;
};

export const getHonoursHandler = (req: Request<HonoursParams>, res: Response) => {
  const { competitionCode } = req.params;
  const host = req.get('host');
  const honours: CompetitionHonours | undefined = Object.values(championsByCompetitionCode).find(
    (competition) => competition.competitionCode === competitionCode
  );

  if (!honours) {
    return res.status(404).json({
      message: 'Competition honours not found',
    });
  }

  const getCrestUrl = (clubKey?: string): string | undefined => {
    if (!clubKey || !host) {
      return undefined;
    }

    return `${req.protocol}://${host}/assets/club-crests/${encodeURIComponent(clubKey)}.png`;
  };

  return res.status(200).json({
    competitionCode: honours.competitionCode,
    championsBySeason: honours.championsBySeason.map((champion) => ({
      ...champion,
      crestUrl: getCrestUrl(champion.clubKey),
    })),
    allTimeTitles: honours.allTimeTitles.map((club) => ({
      ...club,
      crestUrl: getCrestUrl(club.clubKey),
    })),
  });
};
