import { z } from 'zod';
export type PulseScoreHistorySeasonResponseSchema = z.infer<typeof pulseScoreHistorySeasonSchema>;

export const pulseScoreHistorySeasonSchema = z.object({
  competition: z.string(),
  season: z.number(),
  places: z.array(
    z.object({
      id: z.number(),
      place: z.number(),
      name: z.string(),
      points: z.number(),
    })
  ),
});
