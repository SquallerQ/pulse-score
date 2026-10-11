export type RecentChampion = {
  season: number;
  clubName: string;
};

export type ClubTitle = {
  clubName: string;
  titles: number;
};

export type CompetitionHonours = {
  competitionCode: string;
  recentChampions: RecentChampion[];
  allTimeTitles: ClubTitle[];
};
