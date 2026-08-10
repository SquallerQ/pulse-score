export const premierLeagueHistory = [
  {
    competitionCode: 'PL',
    season: 2019,
    standingsTop: [
      { place: 1, teamName: 'Liverpool', points: 99 },
      { place: 2, teamName: 'Manchester City', points: 81 },
      { place: 3, teamName: 'Manchester United', points: 66 },
    ],
  },
  {
    competitionCode: 'PL',
    season: 2018,
    standingsTop: [
      { place: 1, teamName: 'Manchester City', points: 100 },
      { place: 2, teamName: 'Manchester United', points: 81 },
      { place: 3, teamName: 'Tottenham Hotspur', points: 77 },
    ],
  },
] as const;
