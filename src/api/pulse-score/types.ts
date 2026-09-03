import { z } from 'zod';
export type PulseScoreHistorySeasonResponseSchema = z.infer<typeof pulseScoreHistorySeasonSchema>;
export type CompetitionSeasonsResponseSchema = z.infer<typeof competitionSeasonsSchema>;

export const pulseScoreHistorySeasonSchema = z.object({
  competition: z.string(),
  season: z.number(),
  standings: z.array(
    z.object({
      id: z.number(),
      place: z.number(),
      name: z.string(),
      points: z.number(),
    })
  ),
  topScorers: z.array(
    z.object({
      id: z.number(),
      place: z.number(),
      playerName: z.string(),
      teamName: z.string(),
      goals: z.number(),
    })
  ),
});

export const competitionSeasonsSchema = z.object({
  competitionCode: z.string(),
  seasons: z.array(z.number()),
});
