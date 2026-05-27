import { z } from 'zod';

export const championsLeagueWinnerApiResponseSchema = z.object({
  response: z.array(
    z.object({
      teams: z.object({
        home: z.object({
          winner: z.boolean(),
          logo: z.string(),
          name: z.string(),
        }),
        away: z.object({
          winner: z.boolean(),
          logo: z.string(),
          name: z.string(),
        }),
      }),
    })
  ),
});

export type ChampionsLeagueWinnerApiResponse = z.infer<typeof championsLeagueWinnerApiResponseSchema>;

export type ChampionsLeagueWinner = {
  winnerLogo: string;
  winnerName: string;
  loserLogo: string;
  loserName: string;
};
