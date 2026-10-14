export type ChampionBySeason = {
  season: number;
  clubName: string;
  clubKey?: string;
};

export type ClubTitle = {
  clubName: string;
  titles: number;
  clubKey?: string;
};

export type CompetitionHonours = {
  competitionCode: string;
  championsBySeason: ChampionBySeason[];
  allTimeTitles: ClubTitle[];
};
