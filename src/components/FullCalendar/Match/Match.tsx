import styles from './Match.module.css';
import type { TeamMatches, SelectedTeam } from '../../../api/types';

type matchProp = {
  match: TeamMatches;
  selectedTeam: SelectedTeam | null;
};

export function Match({ match, selectedTeam: selectedTeam }: matchProp) {
  console.log(selectedTeam);
  console.log(match);
  const matchDate = new Date(match.utcDate);
  const dateLabel = Number.isNaN(matchDate.getTime())
    ? ''
    : matchDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

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

  if (match.status === 'FINISHED') {
    return (
      <div className={styles.finished}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div>{SelectedTeamResult()}</div>
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamsContainer}>
          <div className={styles.teamContainer}>
            <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
            <div className={styles.teamName}>{match.awayTeam.name}</div>
            <div className={styles.score}>{match.score.home}</div>
          </div>
          <div className={styles.teamContainer}>
            <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
            <div className={styles.teamName}>{match.homeTeam.name}</div>
            <div className={styles.score}>{match.score.away}</div>
          </div>
        </div>
      </div>
    );
  } else if (match.status === 'TIMED') {
    return (
      <div className={styles.timed}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div className={styles.teamName}>{match.awayTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div className={styles.teamName}>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  } else if (match.status === 'POSTPONED') {
    return (
      <div className={styles.postponed}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div className={styles.teamName}>{match.awayTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div className={styles.teamName}>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.matchContainer}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div className={styles.teamName}>{match.awayTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div className={styles.teamName}>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  }
}
