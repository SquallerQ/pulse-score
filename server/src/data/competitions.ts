export const competitions = [
  {
    code: 'PL',
    name: 'Premier League',
    type: 'league',
    country: 'England',
    logoFileName: 'pl.svg',
  },
  { code: 'PD', name: 'La Liga', type: 'league', country: 'Spain' },
  { code: 'CL', name: 'Champions League', type: 'cup', country: 'Europe' },
  { code: 'BL1', name: 'Bundesliga', type: 'league', country: 'Germany' },
  { code: 'SA', name: 'Serie A', type: 'league', country: 'Italy' },
  { code: 'FL1', name: 'Ligue 1', type: 'league', country: 'France' },
] as const;

export type Competition = (typeof competitions)[number];
export type CompetitionCode = Competition['code'];

export const competitionsByCode: Record<CompetitionCode, Competition> = {
  PL: competitions[0],
  PD: competitions[1],
  CL: competitions[2],
  BL1: competitions[3],
  SA: competitions[4],
  FL1: competitions[5],
};
