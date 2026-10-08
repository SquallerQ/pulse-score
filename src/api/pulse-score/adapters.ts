import type { PulseScoreHistorySeasonResponseSchema, PulseScoreChampionsLeagueSeasonResponseSchema } from './types';

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

export function mapPulseScoreChampionsLeagueSeason(data: PulseScoreChampionsLeagueSeasonResponseSchema) {
  return {
    competition: data.competition,
    season: data.season,
    groupStageEliminated: data.groupStageEliminated,
    roundOf16: data.roundOf16.map((item) => ({
      id: item.id,
      homeTeam: item.homeTeam,
      awayTeam: item.awayTeam,
      firstLeg: {
        home: item.firstLeg.home,
        away: item.firstLeg.away,
        playedAt: item.firstLeg.playedAt,
      },
      secondLeg: {
        home: item.secondLeg.home,
        away: item.secondLeg.away,
        playedAt: item.secondLeg.playedAt,
      },
      aggregate: {
        home: item.aggregate.home,
        away: item.aggregate.away,
      },
      winner: item.winner,
      note: item.note,
    })),
    quarterFinals: data.quarterFinals.map((item) => {
      if ('score' in item) {
        return {
          id: item.id,
          homeTeam: item.homeTeam,
          awayTeam: item.awayTeam,
          score: item.score,
          winner: item.winner,
          note: item.note,
        };
      }

      return {
        id: item.id,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        firstLeg: item.firstLeg,
        secondLeg: item.secondLeg,
        aggregate: item.aggregate,
        winner: item.winner,
        note: item.note,
      };
    }),
    semiFinals: data.semiFinals.map((item) => {
      if ('score' in item) {
        return {
          id: item.id,
          homeTeam: item.homeTeam,
          awayTeam: item.awayTeam,
          score: item.score,
          winner: item.winner,
          note: item.note,
        };
      }

      return {
        id: item.id,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        firstLeg: item.firstLeg,
        secondLeg: item.secondLeg,
        aggregate: item.aggregate,
        winner: item.winner,
        note: item.note,
      };
    }),
    final: {
      id: data.final.id,
      homeTeam: data.final.homeTeam,
      awayTeam: data.final.awayTeam,
      score: {
        home: data.final.score.home,
        away: data.final.score.away,
      },
      winner: data.final.winner,
      note: data.final.note,
    },
    topScorers: data.topScorers.map((item) => ({
      id: item.id,
      place: item.place,
      playerName: item.playerName,
      teamName: item.teamName,
      goals: item.goals,
    })),
  };
}
