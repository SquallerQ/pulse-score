import { z } from 'zod';

export const allLeaguesResponseSchema = z.object({
  competitions: z.array(
    z.object({
      area: z.object({
        id: z.number(),
        flag: z.string(),
        name: z.string(),
      }),
      name: z.string(),
      emblem: z.string(),
      code: z.string(),
    })
  ),
});

export type AllLeaguesResponse = z.infer<typeof allLeaguesResponseSchema>;

export type LeagueListItem = {
  id: number;
  flag: string;
  country: string;
  emblem: string;
  name: string;
  code: string;
};

export const championsLeagueTeamsResponseSchema = z.object({
  competition: z.object({
    id: z.number(),
    emblem: z.string(),
    name: z.string(),
    code: z.string(),
  }),
  teams: z.array(
    z.object({
      id: z.number(),
      crest: z.string(),
      shortName: z.string(),
    })
  ),
});

export type ChampionsLeagueTeamsResponse = z.infer<typeof championsLeagueTeamsResponseSchema>;

export type ChampionsLeagueTeams = {
  id: number;
  emblem: string;
  name: string;
  code: string;
  teamsArray: {
    logo: string;
    name: string;
    id: number;
  }[];
};

export const leagueTeamsResponseSchema = z.object({
  competition: z.object({
    emblem: z.string(),
    name: z.string(),
  }),
  teams: z.array(
    z.object({
      id: z.number(),
      shortName: z.string(),
      crest: z.string(),
      clubColors: z.string(),
    })
  ),
});

export type LeagueTeamsResponse = z.infer<typeof leagueTeamsResponseSchema>;

export type LeagueTeamItem = {
  id: number;
  name: string;
  logo: string;
  color: string;
  leagueEmblem: string;
  leagueName: string;
};

export const teamMatchesResponseSchema = z.object({
  resultSet: z.object({
    competitions: z.string().nullable(),
  }),
  matches: z.array(
    z.object({
      id: z.number(),
      awayTeam: z.object({
        id: z.number(),
        crest: z.string(),
        name: z.string(),
        shortName: z.string(),
        tla: z.string(),
      }),
      homeTeam: z.object({
        id: z.number(),
        crest: z.string(),
        name: z.string(),
        shortName: z.string(),
        tla: z.string(),
      }),
      score: z.object({
        fullTime: z.object({
          home: z.number().nullable(),
          away: z.number().nullable(),
        }),
        winner: z.string().nullable(),
        duration: z.string(),
      }),
      season: z.object({
        id: z.number(),
        currentMatchday: z.number(),
        endDate: z.string(),
        startDate: z.string(),
        winner: z.string().nullable(),
      }),
      competition: z.object({
        emblem: z.string(),
        name: z.string(),
        code: z.string(),
      }),
      stage: z.string(),
      status: z.string(),
      utcDate: z.string(),
    })
  ),
});

export type TeamMatchesApiResponse = z.infer<typeof teamMatchesResponseSchema>;

export type TeamMatch = {
  id: number;
  homeTeam: {
    id: number;
    crest: string;
    name: string;
    shortName: string;
    tla: string;
  };
  awayTeam: {
    id: number;
    crest: string;
    name: string;
    shortName: string;
    tla: string;
  };
  score: {
    home: number | null;
    away: number | null;
    winner: string | null;
    duration: string;
  };
  season: {
    id: number;
    currentMatchday: number;
    endDate: string;
    startDate: string;
    winner: string | null;
  };
  competition: {
    emblem: string;
    name: string;
    code: string;
  };
  stage: string;
  status: string;
  utcDate: string;
};

export type TeamMatchesResult = {
  matches: TeamMatch[];
  competitions: string[];
};

export type TableRow = {
  position: number;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  team: {
    id: number;
    shortName: string;
    crest: string;
  };
};

export type LeagueTable = {
  competition: {
    id: number;
    emblem: string;
    code: string;
    name: string;
  };
  table: TableRow[];
};

export const leagueTableResponseSchema = z.object({
  competition: z.object({
    id: z.number(),
    emblem: z.string(),
    code: z.string(),
    name: z.string(),
  }),
  standings: z.array(
    z.object({
      table: z.array(
        z.object({
          position: z.number(),
          playedGames: z.number(),
          won: z.number(),
          draw: z.number(),
          lost: z.number(),
          points: z.number(),
          goalsFor: z.number(),
          goalsAgainst: z.number(),
          goalDifference: z.number(),
          team: z.object({
            id: z.number(),
            shortName: z.string(),
            crest: z.string(),
          }),
        })
      ),
    })
  ),
});

export type LeagueTableResponse = z.infer<typeof leagueTableResponseSchema>;

export type ChampionsLeagueStageName = 'PLAYOFFS' | 'LAST_16' | 'QUARTER_FINALS' | 'SEMI_FINALS' | 'FINAL';

export const championsLeagueStageResponseSchema = z.object({
  matches: z.array(
    z.object({
      id: z.number(),
      utcDate: z.string(),
      status: z.string(),
      matchday: z.number().nullable(),
      homeTeam: z.object({
        id: z.number(),
        name: z.string(),
        shortName: z.string().nullable(),
        crest: z.string(),
      }),
      awayTeam: z.object({
        id: z.number(),
        name: z.string(),
        shortName: z.string().nullable(),
        crest: z.string(),
      }),
      score: z.object({
        fullTime: z.object({
          home: z.number().nullable(),
          away: z.number().nullable(),
        }),
        winner: z.string().nullable(),
      }),
    })
  ),
});

export type ChampionsLeagueStageApiResponse = z.infer<typeof championsLeagueStageResponseSchema>;

export type ChampionsLeagueStageMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  homeTeam: {
    id: number;
    name: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    crest: string;
  };
  score: {
    home: number | null;
    away: number | null;
    winner: string | null;
  };
};

export type ChampionsLeagueStage = {
  stage: ChampionsLeagueStageName;
  matches: ChampionsLeagueStageMatch[];
};
