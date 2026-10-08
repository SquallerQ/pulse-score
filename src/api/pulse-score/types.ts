import { z } from 'zod';
export type PulseScoreHistorySeasonResponseSchema = z.infer<typeof pulseScoreHistorySeasonSchema>;
export type CompetitionSeasonsResponseSchema = z.infer<typeof competitionSeasonsSchema>;
export type PulseScoreChampionsLeagueSeasonsResponseSchema = z.infer<typeof pulseScoreChampionsLeagueSeasonsSchema>;
export type PulseScoreChampionsLeagueSeasonResponseSchema = z.infer<typeof pulseScoreChampionsLeagueSeasonSchema>;

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

export const pulseScoreChampionsLeagueSeasonsSchema = z.object({
  competitionCode: z.string(),
  seasons: z.array(z.number()),
});

export const pulseScoreChampionsLeagueSeasonSchema = z.object({
  competition: z.string(),
  season: z.number(),
  groupStageEliminated: z.array(z.string()),
  roundOf16: z.array(
    z.object({
      id: z.string(),
      homeTeam: z.string(),
      awayTeam: z.string(),
      firstLeg: z.object({
        home: z.number(),
        away: z.number(),
        playedAt: z.enum(['home', 'away']),
      }),
      secondLeg: z.object({
        home: z.number(),
        away: z.number(),
        playedAt: z.enum(['home', 'away']),
      }),
      aggregate: z.object({
        home: z.number(),
        away: z.number(),
      }),
      winner: z.string(),
      note: z.string().optional(),
    })
  ),
  quarterFinals: z.array(
    z.union([
      z.object({
        id: z.string(),
        homeTeam: z.string(),
        awayTeam: z.string(),
        firstLeg: z.object({
          home: z.number(),
          away: z.number(),
          playedAt: z.enum(['home', 'away']),
        }),
        secondLeg: z.object({
          home: z.number(),
          away: z.number(),
          playedAt: z.enum(['home', 'away']),
        }),
        aggregate: z.object({
          home: z.number(),
          away: z.number(),
        }),
        winner: z.string(),
        note: z.string().optional(),
      }),
      z.object({
        id: z.string(),
        homeTeam: z.string(),
        awayTeam: z.string(),
        score: z.object({
          home: z.number(),
          away: z.number(),
        }),
        winner: z.string(),
        note: z.string().optional(),
      }),
    ])
  ),
  semiFinals: z.array(
    z.union([
      z.object({
        id: z.string(),
        homeTeam: z.string(),
        awayTeam: z.string(),
        firstLeg: z.object({
          home: z.number(),
          away: z.number(),
          playedAt: z.enum(['home', 'away']),
        }),
        secondLeg: z.object({
          home: z.number(),
          away: z.number(),
          playedAt: z.enum(['home', 'away']),
        }),
        aggregate: z.object({
          home: z.number(),
          away: z.number(),
        }),
        winner: z.string(),
        note: z.string().optional(),
      }),
      z.object({
        id: z.string(),
        homeTeam: z.string(),
        awayTeam: z.string(),
        score: z.object({
          home: z.number(),
          away: z.number(),
        }),
        winner: z.string(),
        note: z.string().optional(),
      }),
    ])
  ),
  final: z.object({
    id: z.string(),
    homeTeam: z.string(),
    awayTeam: z.string(),
    score: z.object({
      home: z.number(),
      away: z.number(),
    }),
    winner: z.string(),
    note: z.string().optional(),
  }),
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
