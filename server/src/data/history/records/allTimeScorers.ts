export type AllTimeScorer = {
  place: number;
  playerName: string;
  clubName: string;
  goals: number;
};

export type CompetitionAllTimeScorers = {
  competitionCode: string;
  scorers: AllTimeScorer[];
};

export const ALL_TIME_SCORERS_COMPETITION_CODES = ['PL', 'PD', 'BL1', 'FL1', 'SA', 'CL'] as const;

export type AllTimeScorersCompetitionCode = (typeof ALL_TIME_SCORERS_COMPETITION_CODES)[number];

export const allTimeScorersByCompetitionCode: Record<AllTimeScorersCompetitionCode, CompetitionAllTimeScorers> = {
  PL: {
    competitionCode: 'PL',
    scorers: [
      { place: 1, playerName: 'Alan Shearer', clubName: 'Newcastle United', goals: 260 },
      { place: 2, playerName: 'Harry Kane', clubName: 'Tottenham Hotspur', goals: 213 },
      { place: 3, playerName: 'Wayne Rooney', clubName: 'Manchester United', goals: 208 },
      { place: 4, playerName: 'Andrew Cole', clubName: 'Manchester United', goals: 187 },
      { place: 5, playerName: 'Sergio Agüero', clubName: 'Manchester City', goals: 184 },
      { place: 6, playerName: 'Frank Lampard', clubName: 'Chelsea', goals: 177 },
      { place: 7, playerName: 'Thierry Henry', clubName: 'Arsenal', goals: 175 },
      { place: 8, playerName: 'Mohamed Salah', clubName: 'Liverpool', goals: 175 },
      { place: 9, playerName: 'Robbie Fowler', clubName: 'Liverpool', goals: 163 },
      { place: 10, playerName: 'Jermain Defoe', clubName: 'Tottenham Hotspur', goals: 162 },
    ],
  },
  PD: {
    competitionCode: 'PD',
    scorers: [
      { place: 1, playerName: 'Lionel Messi', clubName: 'Barcelona', goals: 474 },
      { place: 2, playerName: 'Cristiano Ronaldo', clubName: 'Real Madrid', goals: 311 },
      { place: 3, playerName: 'Telmo Zarra', clubName: 'Athletic Bilbao', goals: 254 },
      { place: 4, playerName: 'Karim Benzema', clubName: 'Real Madrid', goals: 238 },
      { place: 5, playerName: 'Hugo Sánchez', clubName: 'Real Madrid', goals: 234 },
      { place: 6, playerName: 'Raúl González', clubName: 'Real Madrid', goals: 228 },
      { place: 7, playerName: 'Alfredo Di Stéfano', clubName: 'Real Madrid', goals: 227 },
      { place: 8, playerName: 'César Rodríguez', clubName: 'Barcelona', goals: 221 },
      { place: 9, playerName: 'Quini', clubName: 'Barcelona', goals: 219 },
      { place: 10, playerName: 'Pahiño', clubName: 'Real Madrid', goals: 214 },
    ],
  },
  BL1: {
    competitionCode: 'BL1',
    scorers: [
      { place: 1, playerName: 'Gerd Müller', clubName: 'Bayern München', goals: 365 },
      { place: 2, playerName: 'Robert Lewandowski', clubName: 'Bayern München', goals: 312 },
      { place: 3, playerName: 'Klaus Fischer', clubName: 'Schalke 04', goals: 268 },
      { place: 4, playerName: 'Jupp Heynckes', clubName: 'Borussia Mönchengladbach', goals: 220 },
      { place: 5, playerName: 'Manfred Burgsmüller', clubName: 'Borussia Dortmund', goals: 213 },
      { place: 6, playerName: 'Claudio Pizarro', clubName: 'Bayern München', goals: 197 },
      { place: 7, playerName: 'Ulf Kirsten', clubName: 'Bayer Leverkusen', goals: 182 },
      { place: 8, playerName: 'Stefan Kuntz', clubName: '1. FC Kaiserslautern', goals: 179 },
      { place: 9, playerName: 'Dieter Müller', clubName: '1. FC Köln', goals: 177 },
      { place: 10, playerName: 'Klaus Allofs', clubName: 'Werder Bremen', goals: 177 },
    ],
  },
  FL1: {
    competitionCode: 'FL1',
    scorers: [
      { place: 1, playerName: 'Delio Onnis', clubName: 'Monaco', goals: 299 },
      { place: 2, playerName: 'Bernard Lacombe', clubName: 'Lyon', goals: 255 },
      { place: 3, playerName: 'Hervé Revelli', clubName: 'Saint-Étienne', goals: 216 },
      { place: 4, playerName: 'Roger Courtois', clubName: 'Sochaux', goals: 210 },
      { place: 5, playerName: 'Thadée Cisowski', clubName: 'Racing Club de France', goals: 206 },
      { place: 6, playerName: 'Roger Piantoni', clubName: 'Reims', goals: 203 },
      { place: 7, playerName: 'Kylian Mbappé', clubName: 'Paris Saint-Germain', goals: 191 },
      { place: 8, playerName: 'Joseph Ujlaki', clubName: 'Nice', goals: 190 },
      { place: 9, playerName: 'Fleury Di Nallo', clubName: 'Lyon', goals: 187 },
      { place: 10, playerName: 'Carlos Bianchi', clubName: 'Paris Saint-Germain', goals: 179 },
    ],
  },
  SA: {
    competitionCode: 'SA',
    scorers: [
      { place: 1, playerName: 'Silvio Piola', clubName: 'Lazio', goals: 274 },
      { place: 2, playerName: 'Francesco Totti', clubName: 'Roma', goals: 250 },
      { place: 3, playerName: 'Gunnar Nordahl', clubName: 'AC Milan', goals: 225 },
      { place: 4, playerName: 'Giuseppe Meazza', clubName: 'Inter Milan', goals: 216 },
      { place: 5, playerName: 'José Altafini', clubName: 'AC Milan', goals: 216 },
      { place: 6, playerName: 'Antonio Di Natale', clubName: 'Udinese', goals: 209 },
      { place: 7, playerName: 'Roberto Baggio', clubName: 'Juventus', goals: 205 },
      { place: 8, playerName: 'Ciro Immobile', clubName: 'Lazio', goals: 201 },
      { place: 9, playerName: 'Kurt Hamrin', clubName: 'Fiorentina', goals: 190 },
      { place: 10, playerName: 'Giuseppe Signori', clubName: 'Lazio', goals: 188 },
    ],
  },
  CL: {
    competitionCode: 'CL',
    scorers: [
      { place: 1, playerName: 'Cristiano Ronaldo', clubName: 'Real Madrid', goals: 140 },
      { place: 2, playerName: 'Lionel Messi', clubName: 'Barcelona', goals: 129 },
      { place: 3, playerName: 'Robert Lewandowski', clubName: 'Bayern München', goals: 109 },
      { place: 4, playerName: 'Karim Benzema', clubName: 'Real Madrid', goals: 90 },
      { place: 5, playerName: 'Raúl González', clubName: 'Real Madrid', goals: 71 },
      { place: 6, playerName: 'Kylian Mbappé', clubName: 'Real Madrid', goals: 71 },
      { place: 7, playerName: 'Erling Haaland', clubName: 'Manchester City', goals: 59 },
      { place: 8, playerName: 'Thomas Müller', clubName: 'Bayern München', goals: 57 },
      { place: 9, playerName: 'Ruud van Nistelrooy', clubName: 'Manchester United', goals: 56 },
      { place: 10, playerName: 'Harry Kane', clubName: 'Bayern München', goals: 55 },
    ],
  },
};
