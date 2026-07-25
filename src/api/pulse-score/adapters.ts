import type { PulseScoreHistorySeasonResponseSchema } from './types';

export function mapPulseScoreHistorySeason(data: PulseScoreHistorySeasonResponseSchema) {
  return {
    competition: data.competition,
    season: data.season,
    places: data.places.map((item) => ({
      id: item.id,
      place: item.place,
      name: item.name,
      points: item.points,
    })),
  };
}
