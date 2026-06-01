import { leagueConfig } from '../../../utils/leagueConfig';
import type { LeagueTeamItem, TeamMatch } from '../../../api/football-data/types';
import styles from './Match.module.css';

type MatchProps = {
  match: TeamMatch;
  selectedTeam: LeagueTeamItem | null;
};

export function Match({ match, selectedTeam }: MatchProps) {
  const matchDate = new Date(match.utcDate);
  const day = !isNaN(matchDate.getTime()) ? matchDate.toLocaleDateString('en-GB', { day: '2-digit' }) : '';
  const month = !isNaN(matchDate.getTime()) ? matchDate.toLocaleDateString('en-GB', { month: 'short' }) : '';

  function SelectedTeamResult() {
    if (selectedTeam?.name === match.homeTeam.name) {
      if (match.score.winner === 'HOME_TEAM') {
        return <div className={styles.resultWon}>WON</div>;
      } else if (match.score.winner === 'DRAW') {
        return <div className={styles.resultDraw}>DRAW</div>;
      } else {
        return <div className={styles.resultLost}>LOST</div>;
      }
    } else if (selectedTeam?.name === match.awayTeam.name) {
      if (match.score.winner === 'AWAY_TEAM') {
        return <div className={styles.resultWon}>WON</div>;
      } else if (match.score.winner === 'DRAW') {
        return <div className={styles.resultDraw}>DRAW</div>;
      } else {
        return <div className={styles.resultLost}>LOST</div>;
      }
    }
  }

  function isWinner(team: 'home' | 'away') {
    if (team === 'home') return match.score.winner === 'HOME_TEAM';
    return match.score.winner === 'AWAY_TEAM';
  }
  const isChampionsLeague = match.competition.name === 'UEFA Champions League';

  function getPenaltyWinnerLabel() {
    if (!isChampionsLeague || !match.score.wonOnPenalties) return null;

    if (match.score.winner === 'HOME_TEAM') {
      return `${match.homeTeam.name} won on pens`;
    }

    if (match.score.winner === 'AWAY_TEAM') {
      return `${match.awayTeam.name} won on pens`;
    }

    return null;
  }

  function getLeagueLogo(code: string) {
    return leagueConfig[code]?.logo ?? match.competition.emblem;
  }

  if (match.status === 'FINISHED') {
    return (
      <div className={`${styles.finished} ${isChampionsLeague ? styles.championsLeagueCard : ''}`}>
        <div className={styles.tourneyAndDateContainer}>
          <img
            className={`${styles.tourneyLogo} ${isChampionsLeague ? styles.championsLeague : ''}`}
            src={getLeagueLogo(match.competition.code)}
            alt={match.competition.name}
          />
          <div>{SelectedTeamResult()}</div>
          <div className={styles.date}>
            <span className={`${styles.day} ${isChampionsLeague ? styles.championsLeagueDay : ''}`}>{day}</span>{' '}
            <span className={styles.month}>{month}</span>
          </div>
        </div>
        <div className={styles.teamsContainer}>
          <div className={styles.teamContainer}>
            <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
            <div className={`${styles.teamName} ${isWinner('home') ? styles.winner : ''}`}>{match.homeTeam.name}</div>

            <div className={styles.score}>{match.score.home}</div>
          </div>
          <div className={styles.teamContainer}>
            <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
            <div className={`${styles.teamName} ${isWinner('away') ? styles.winner : ''}`}>{match.awayTeam.name}</div>
            <div className={styles.score}>{match.score.away}</div>
          </div>
        </div>
        {getPenaltyWinnerLabel() ? <div className={styles.penaltyInfo}>{getPenaltyWinnerLabel()}</div> : null}
      </div>
    );
  } else if (match.status === 'POSTPONED') {
    return (
      <div className={`${styles.postponed} ${isChampionsLeague ? styles.championsLeagueCard : ''}`}>
        <div className={styles.tourneyAndDateContainer}>
          <img
            className={`${styles.tourneyLogo} ${isChampionsLeague ? styles.championsLeague : ''}`}
            src={getLeagueLogo(match.competition.code)}
            alt={match.competition.name}
          />
          <div className={styles.postponedInfo}>Postponed</div>
          <div className={styles.date}>
            <span className={`${styles.day} ${isChampionsLeague ? styles.championsLeagueDay : ''}`}>{day}</span>{' '}
            <span className={styles.month}>{month}</span>
          </div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div className={`${styles.teamName} ${isWinner('home') ? styles.winner : ''}`}>{match.homeTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div className={`${styles.teamName} ${isWinner('away') ? styles.winner : ''}`}>{match.awayTeam.name}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${styles.matchContainer} ${isChampionsLeague ? styles.championsLeagueCard : ''}`}>
        <div className={styles.tourneyAndDateContainer}>
          <img
            className={`${styles.tourneyLogo} ${isChampionsLeague ? styles.championsLeague : ''}`}
            src={getLeagueLogo(match.competition.code)}
            alt={match.competition.name}
          />
          <div className={styles.date}>
            <span className={`${styles.day} ${isChampionsLeague ? styles.championsLeagueDay : ''}`}>{day}</span>{' '}
            <span className={styles.month}>{month}</span>
          </div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div className={`${styles.teamName} ${isWinner('home') ? styles.winner : ''}`}>{match.homeTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div className={`${styles.teamName} ${isWinner('away') ? styles.winner : ''}`}>{match.awayTeam.name}</div>
        </div>
      </div>
    );
  }
}
