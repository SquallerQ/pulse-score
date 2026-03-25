export type ListItemForRender = {
  id: number;
  shortName: string;
  crest: string;
  clubColors: string;
};

export type CompetitionItem = {
  area: {
    id: number;
    flag: string;
    name: string;
  };
  emblem: string;
  name: string;
  code: string;
};

export type CompetitionsResponse = {
  competitions: CompetitionItem[];
};

export type TeamMatches = {
  id: number;
  awayTeam: {
    id: number;
    crest: string;
    name: string;
    shortName: string;
    tla: string;
  };
  homeTeam: {
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
    winner: string;
  };
  competition: {
    emblem: string;
    name: string;
  };
  stage: string;
  status: string;
  utcDate: string;
};

export type TeamMatchesResponse = {
  matches: TeamMatches[];
  competitions: string[];
};

export type TeamMatchApi = {
  id: number;
  awayTeam: {
    id: number;
    crest: string;
    name: string;
    shortName: string;
    tla: string;
  };
  homeTeam: {
    id: number;
    crest: string;
    name: string;
    shortName: string;
    tla: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
    winner: string | null;
    duration: string;
  };
  season: {
    id: number;
    currentMatchday: number;
    endDate: string;
    startDate: string;
    winner: string;
  };
  competition: {
    emblem: string;
    name: string;
  };
  stage: string;
  status: string;
  utcDate: string;
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
    name: string;
    crest: string;
  };
};

export type ChampionsLeagueMatchApi = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
    winner: string | null;
  };
};

export type ChampionsLeagueStageMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
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
  stage: string;
  matches: ChampionsLeagueStageMatch[];
};

export type SelectedTeam = {
  color: string;
  id: number;
  leagueEmblem: string;
  leagueName: string;
  logo: string;
  name: string;
};
