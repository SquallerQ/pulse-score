export type Club = {
  key: string;
  name: string;
  country: string;
  crestFileName?: string;
};

export const clubsByKey: Record<string, Club | undefined> = {
  arsenal: {
    key: 'arsenal',
    name: 'Arsenal',
    country: 'England',
    crestFileName: 'arsenal.png',
  },
  liverpool: {
    key: 'liverpool',
    name: 'Liverpool',
    country: 'England',
    crestFileName: 'liverpool.png',
  },
  chelsea: {
    key: 'chelsea',
    name: 'Chelsea',
    country: 'England',
    crestFileName: 'chelsea.png',
  },
  'manchester-city': {
    key: 'manchester-city',
    name: 'Manchester City',
    country: 'England',
    crestFileName: 'manchester-city.png',
  },
  'manchester-united': {
    key: 'manchester-united',
    name: 'Manchester United',
    country: 'England',
    crestFileName: 'manchester-united.png',
  },
  'aston-villa': {
    key: 'aston-villa',
    name: 'Aston Villa',
    country: 'England',
    crestFileName: 'aston-villa.png',
  },
  bournemouth: {
    key: 'bournemouth',
    name: 'Bournemouth',
    country: 'England',
    crestFileName: 'bournemouth.png',
  },
  brentford: {
    key: 'brentford',
    name: 'Brentford',
    country: 'England',
    crestFileName: 'brentford.png',
  },
  'brighton-and-hove-albion': {
    key: 'brighton-and-hove-albion',
    name: 'Brighton & Hove Albion',
    country: 'England',
    crestFileName: 'brighton-and-hove-albion.png',
  },
  'coventry-city': {
    key: 'coventry-city',
    name: 'Coventry City',
    country: 'England',
    crestFileName: 'coventry-city.png',
  },
  'crystal-palace': {
    key: 'crystal-palace',
    name: 'Crystal Palace',
    country: 'England',
    crestFileName: 'crystal-palace.png',
  },
  everton: {
    key: 'everton',
    name: 'Everton',
    country: 'England',
    crestFileName: 'everton.png',
  },
  fulham: {
    key: 'fulham',
    name: 'Fulham',
    country: 'England',
    crestFileName: 'fulham.png',
  },
  'hull-city': {
    key: 'hull-city',
    name: 'Hull City',
    country: 'England',
    crestFileName: 'hull-city.png',
  },
  'ipswich-town': {
    key: 'ipswich-town',
    name: 'Ipswich Town',
    country: 'England',
    crestFileName: 'ipswich-town.png',
  },
  'leeds-united': {
    key: 'leeds-united',
    name: 'Leeds United',
    country: 'England',
    crestFileName: 'leeds-united.png',
  },
  'newcastle-united': {
    key: 'newcastle-united',
    name: 'Newcastle United',
    country: 'England',
    crestFileName: 'newcastle-united.png',
  },
  'nottingham-forest': {
    key: 'nottingham-forest',
    name: 'Nottingham Forest',
    country: 'England',
    crestFileName: 'nottingham-forest.png',
  },
  sunderland: {
    key: 'sunderland',
    name: 'Sunderland',
    country: 'England',
    crestFileName: 'sunderland.png',
  },
  'tottenham-hotspur': {
    key: 'tottenham-hotspur',
    name: 'Tottenham Hotspur',
    country: 'England',
    crestFileName: 'tottenham-hotspur.png',
  },
};
