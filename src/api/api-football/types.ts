import { z } from 'zod';

export const leagueSeasonStandingsSchema = z.object({
  response: z.array(
    z.object({
      league: z.object({
        id: z.number(),
        name: z.string(),
        country: z.string(),
        logo: z.string(),
        flag: z.string().nullable(),
        season: z.number(),
        standings: z.array(
          z.array(
            z.object({
              rank: z.number(),
              points: z.number(),
              team: z.object({
                id: z.number(),
                name: z.string(),
                logo: z.string(),
              }),
            })
          )
        ),
      }),
    })
  ),
});

export type LeagueSeasonStandingsResponse = z.infer<typeof leagueSeasonStandingsSchema>;
export type LeagueSeasonStandings = LeagueSeasonStandingsResponse['response'][number]['league'];
export type LeagueSeasonStandingRow = LeagueSeasonStandings['standings'][number][number];
export type TeamStanding = Pick<LeagueSeasonStandingRow, 'rank' | 'points'> & {
  team: LeagueSeasonStandingRow['team'];
};
export type ChampionHistoryItem = {
  season: number;
  team: LeagueSeasonStandingRow['team'];
};
export type LeagueInfo = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  standings: TeamStanding[];
  championsHistory: ChampionHistoryItem[];
};

export const topScorersApiResponseSchema = z.object({
  response: z.array(
    z.object({
      player: z.object({
        id: z.number(),
        name: z.string(),
        photo: z.string(),
        nationality: z.string().nullable(),
      }),
      statistics: z.array(
        z.object({
          team: z.object({
            name: z.string(),
            logo: z.string(),
          }),
          goals: z.object({
            total: z.number().nullable(),
            assists: z.number().nullable(),
          }),
        })
      ),
    })
  ),
});

export type TopScorersApiResponse = z.infer<typeof topScorersApiResponseSchema>;

export type TopScorer = {
  id: number;
  name: string;
  photo: string;
  nationality: string | null;
  goals: number | null;
  assists: number | null;
  team: {
    name: string;
    logo: string;
  };
};

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
