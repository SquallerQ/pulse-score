import styles from './TeamInfo.module.css';
import type { TeamMatches } from '../../api/api.ts';

type selectedTeam = {
  id: number;
  name: string;
  logo: string;
  color: string;
};

type TeamInfoProps = {
  selectedTeam: selectedTeam | null;
  matchesList: TeamMatches[];
};

export function TeamInfo({ selectedTeam, matchesList }: TeamInfoProps) {
  // console.log(selectedTeam);
  // console.log(matchesList);

  function winOrLose(match: TeamMatches) {
    if (selectedTeam?.name === match.awayTeam.name) {
      if (match.score.winner === 'HOME_TEAM') {
        return <span className={styles.lose}>L</span>;
      } else if (match.score.winner === 'AWAY_TEAM') {
        return <span className={styles.win}>W</span>;
      } else {
        return <span className={styles.draw}>D</span>;
      }
    } else if (selectedTeam?.name === match.homeTeam.name) {
      if (match.score.winner === 'HOME_TEAM') {
        return <span className={styles.win}>W</span>;
      } else if (match.score.winner === 'AWAY_TEAM') {
        return <span className={styles.lose}>L</span>;
      } else {
        return <span className={styles.draw}>D</span>;
      }
    }
    return <span className={styles.draw}>D</span>;
  }

  function homeOrAway(match: TeamMatches) {
    if (selectedTeam?.name === match.awayTeam.name) {
      return <span className={styles.stadium}>A</span>;
    } else if (selectedTeam?.name === match.homeTeam.name) {
      return <span className={styles.stadium}>H</span>;
    } else {
      return <span className={styles.stadium}>?</span>;
    }
  }

  function rival(match: TeamMatches) {
    if (selectedTeam?.name === match.homeTeam.name) {
      return (
        <div>
          <img className={styles.rival_logo} src={match.awayTeam.crest}></img>
        </div>
      );
    } else if (selectedTeam?.name === match.awayTeam.name) {
      return (
        <div>
          <img className={styles.rival_logo} src={match.homeTeam.crest}></img>
        </div>
      );
    } else {
      return <span>?</span>;
    }
  }

  return selectedTeam === null ? (
    <div className={styles.container}>No Info</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.name}>{selectedTeam.name}</div>
      <div className={styles.last_matches_container}>
        <div className={styles.last_matches}>
          {selectedTeam ? matchesList.map((item) => <span key={item.id}>{homeOrAway(item)}</span>) : <span>Net</span>}
        </div>
        <div className={styles.last_matches}>
          {selectedTeam ? matchesList.map((item) => <span key={item.id}>{winOrLose(item)}</span>) : <span>NO</span>}
        </div>

        <div className={styles.last_matches}>
          {selectedTeam ? matchesList.map((item) => <span key={item.id}>{rival(item)}</span>) : <span>net</span>}
        </div>
      </div>
    </div>
  );
}
