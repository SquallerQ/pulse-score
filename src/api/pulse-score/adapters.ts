import type { PulseScoreHistorySeasonResponseSchema } from './types';

export function mapPulseScoreHistorySeason(data: PulseScoreHistorySeasonResponseSchema) {
  return {
    competition: data.competition,
    season: data.season,
    standings: data.standings.map((item) => ({
      id: item.id,
      place: item.place,
      name: item.name,
      points: item.points,
    })),
    topScorers: data.topScorers.map((item) => ({
      id: item.id,
      place: item.place,
      playerName: item.playerName,
      teamName: item.teamName,
      goals: item.goals,
    })),
  };
}
