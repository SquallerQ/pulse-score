type ClubReference =
  | {
      clubKey: string;
      clubName?: string;
    }
  | {
      clubKey?: never;
      clubName: string;
    };

export type ChampionBySeason = ClubReference & {
  season: number;
};

export type ClubTitle = ClubReference & {
  titles: number;
};

export type CompetitionHonours = {
  competitionCode: string;
  championsBySeason: ChampionBySeason[];
  allTimeTitles: ClubTitle[];
};
