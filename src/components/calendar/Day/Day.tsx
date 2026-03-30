import styles from './Day.module.css';
// import CLLogo from '../../../assets/champ-league-logo.svg';

import type { TeamMatches } from '../../../api/types';

import CLLogo from '../../../assets/icons/cl-logo-small.svg';
import PLLogo from '../../../assets/icons/epl-logo-small.svg';
import FL1Logo from '../../../assets/icons/fr-logo-small.svg';
import SALogo from '../../../assets/icons/seriea-logo-small.svg';
import LaLigaLogo from '../../../assets/icons/laliga-logo-small.svg';
import bundesligaLogo from '../../../assets/icons/bundesliga-logo-small.svg';

// const leagueLogos: Record<string, string> = {
//   PL: PLLogo,
//   CL: CLLogo,
//   FL1: FL1Logo,
//   SA: SALogo,
//   PD: LaLigaLogo,
//   BL1: bundesligaLogo,
// };

type LeagueConfig = {
  logo: string;
  className: string;
};

const leagueConfig: Record<string, LeagueConfig> = {
  PL: { logo: PLLogo, className: 'dayContainerPL' },
  CL: { logo: CLLogo, className: 'dayContainerCL' },
  FL1: { logo: FL1Logo, className: 'dayContainerFL1' },
  SA: { logo: SALogo, className: 'dayContainerSA' },
  PD: { logo: LaLigaLogo, className: 'dayContainerPD' },
  BL1: { logo: bundesligaLogo, className: 'dayContainerBL1' },
};

type Day = {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
};

type DayProps = {
  day: Day;
  matches: TeamMatches[];
};

export function Day({ day, matches }: DayProps) {
  console.log(matches);

  let dayTypeClass = '';
  if (day.isPast) {
    dayTypeClass = styles.dayContainerPast;
  } else if (day.isToday) {
    dayTypeClass = styles.dayContainerToday;
  } else if (day.isFuture) {
    dayTypeClass = styles.dayContainerFuture;
  }
  const monthShort = day.date.toLocaleDateString('en-US', { month: 'short' });
  const isEmpty = matches.length === 0;

  function getLeagueLogo(code: string) {
    return leagueConfig[code]?.logo ?? '';
    // return leagueLogos[code] ?? match.competition.emblem;
  }

  function getDayLeagueClass() {
    if (matches.some((m) => m.competition.code === 'CL')) {
      return styles[leagueConfig['CL'].className];
    }
    for (const match of matches) {
      const config = leagueConfig[match.competition.code];
      if (config) return styles[config.className];
    }
    return '';
  }

  function dayMatch(match: TeamMatches) {
    {
      return match.status === 'FINISHED' ? (
        <div className={styles.teamsContainer}>
          <div className={styles.teamContainer}>
            <img className={styles.image} src={match.awayTeam.crest} alt={match.awayTeam.name} />
            <div className={styles.score}>{match.score.away}</div> -{' '}
          </div>
          <div className={styles.teamContainer}>
            <div className={styles.score}>{match.score.home}</div>
            <img className={styles.image} src={match.homeTeam.crest} alt={match.homeTeam.name} />
          </div>
        </div>
      ) : (
        <div className={styles.teamsContainer}>
          <div className={styles.teamContainer}>
            <img className={styles.teamContainerImage} src={match.homeTeam.crest} alt={match.homeTeam.name} />
            <div className={styles.teamContainerName}>{match.homeTeam.name}</div>
          </div>

          <div className={styles.teamContainer}>
            <img className={styles.teamContainerImage} src={match.awayTeam.crest} alt={match.awayTeam.name} />
            <div className={styles.teamContainerName}>{match.awayTeam.name}</div>
          </div>
        </div>
      );
    }
  }
  // console.log(matches);

  return (
    <div
      className={`${styles.dayContainer} ${dayTypeClass} ${isEmpty ? styles.dayContainerEmpty : ''} ${getDayLeagueClass()}`}
    >
      <div className={styles.date}>
        <span className={styles.day}>{day.date.getDate()}</span>
        <span className={styles.month}>{monthShort}</span>
      </div>
      <div className={styles.matches}>
        {isEmpty ? (
          <span className={styles.empty}></span>
        ) : (
          matches.map((match) => (
            <div className={styles.cardContainer} key={match.id}>
              <img
                className={`${styles.tourneyLogo} ${match.competition.code === 'CL' ? styles.championsLeague : ''}`}
                src={getLeagueLogo(match.competition.code)}
                alt="league logo"
              />
              <div className={styles.imageContainer}>{dayMatch(match)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
