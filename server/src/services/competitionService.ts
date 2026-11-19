import { competitionsByCode } from '../data/competitions';

export function getCompetitionDetails(competitionCode: string, assetOrigin?: string) {
  const competition = competitionsByCode[competitionCode as keyof typeof competitionsByCode];

  if (!competition) {
    throw new Error(`Missing competition for code: ${competitionCode}`);
  }

  const competitionLogoUrl =
    assetOrigin && 'logoFileName' in competition
      ? `${assetOrigin}/assets/leagues-crests/${encodeURIComponent(competition.logoFileName)}`
      : undefined;

  return {
    competitionCode: competition.code,
    competitionName: competition.name,
    competitionLogoUrl,
  };
}
