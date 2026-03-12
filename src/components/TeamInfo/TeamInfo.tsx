import styles from './TeamInfo.module.css';
import plLogo from '../../assets/pl-league-logo.svg';
import clLogo from '../../assets/champ-league-logo.svg';
import type { TeamMatches } from '../../api/api.ts';

type SelectedTeam = {
  id: number;
  name: string;
  logo: string;
  color: string;
  leagueEmblem: string;
  leagueName: string;
};

type TeamInfoProps = {
  selectedTeam: SelectedTeam | null;
  lastMatches: TeamMatches[];
  hasChampionsLeague: boolean;
};

export function TeamInfo({ selectedTeam, lastMatches, hasChampionsLeague }: TeamInfoProps) {
  console.log(selectedTeam);
  console.log(lastMatches);

  function getResultBadge(match: TeamMatches) {
    if (selectedTeam?.name === match.awayTeam.name) {
      if (match.score.winner === 'HOME_TEAM') {
        return <span className={styles.matchResult_lose}>L</span>;
      } else if (match.score.winner === 'AWAY_TEAM') {
        return <span className={styles.matchResult_win}>W</span>;
      } else {
        return <span className={styles.matchResult_draw}>D</span>;
      }
    } else if (selectedTeam?.name === match.homeTeam.name) {
      if (match.score.winner === 'HOME_TEAM') {
        return <span className={styles.matchResult_win}>W</span>;
      } else if (match.score.winner === 'AWAY_TEAM') {
        return <span className={styles.matchResult_lose}>L</span>;
      } else {
        return <span className={styles.matchResult_draw}>D</span>;
      }
    }
    return <span className={styles.matchResult_draw}>D</span>;
  }

  function getVenueBadge(match: TeamMatches) {
    if (selectedTeam?.name === match.awayTeam.name) {
      return <span className={styles.stadium}>A</span>;
    } else if (selectedTeam?.name === match.homeTeam.name) {
      return <span className={styles.stadium}>H</span>;
    } else {
      return <span className={styles.stadium}>?</span>;
    }
  }

  function getOpponentBadge(match: TeamMatches) {
    if (selectedTeam?.name === match.homeTeam.name) {
      return (
        <div>
          <img className={styles.rivalLogo} src={match.awayTeam.crest}></img>
        </div>
      );
    } else if (selectedTeam?.name === match.awayTeam.name) {
      return (
        <div>
          <img className={styles.rivalLogo} src={match.homeTeam.crest}></img>
        </div>
      );
    } else {
      return <span>?</span>;
    }
  }

  function leagueEmblem(): string {
    return selectedTeam?.leagueName !== 'Premier League' ? (selectedTeam?.leagueEmblem ?? plLogo) : plLogo;
  }

  return selectedTeam === null ? (
    <div className={styles.container}>No Info</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.teamName}>{selectedTeam.name}</div>
      {hasChampionsLeague ? <img className={styles.clEmblem} src={clLogo} alt="Champions League" /> : null}
      <div className={styles.lastMatchesLeagueContainer}>
        <img className={styles.leagueEmblem} src={leagueEmblem()} alt={selectedTeam.leagueName} />
        <div className={styles.lastMatchesContainer}>
          <div className={styles.lastMatches}>
            {selectedTeam ? (
              lastMatches.map((item) => <span key={item.id}>{getVenueBadge(item)}</span>)
            ) : (
              <span>No Info</span>
            )}
          </div>
          <div className={styles.lastMatches}>
            {selectedTeam ? (
              lastMatches.map((item) => <span key={item.id}>{getResultBadge(item)}</span>)
            ) : (
              <span>No Info</span>
            )}
          </div>

          <div className={styles.lastMatches}>
            {selectedTeam ? (
              lastMatches.map((item) => <span key={item.id}>{getOpponentBadge(item)}</span>)
            ) : (
              <span>No Info</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
