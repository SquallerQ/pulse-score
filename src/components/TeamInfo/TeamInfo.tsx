import styles from './TeamInfo.module.css';
import plLogo from '../../assets/pl-league-logo.svg';
import clLogo from '../../assets/champ-league-logo.svg';
import type { TeamMatches, ChampionsLeagueStage } from '../../api/types';

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
  championsLeagueStage?: ChampionsLeagueStage[];
};

export function TeamInfo({ selectedTeam, lastMatches, hasChampionsLeague, championsLeagueStage }: TeamInfoProps) {
  console.log(selectedTeam);
  console.log(championsLeagueStage);

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

  function getChampionsLeagueStage() {
    if (!hasChampionsLeague || !selectedTeam || !championsLeagueStage?.length) {
      return null;
    }

    const reversedStages = [...championsLeagueStage].reverse();

    let actualStage;
    for (let i = 0; i < championsLeagueStage.length; i++) {
      if (championsLeagueStage[i].matches.length === 0) {
        actualStage = championsLeagueStage[i - 1].stage;
        break;
      }
    }

    console.log(actualStage);

    for (const stageData of reversedStages) {
      if (stageData.matches && stageData.matches.length > 0) {
        const teamMatchAway = stageData.matches.find((match) => match.awayTeam.name === selectedTeam.name);
        const teamMatchHome = stageData.matches.find((match) => match.homeTeam.name === selectedTeam.name);

        if (teamMatchAway || teamMatchHome) {
          let stage;
          switch (stageData.stage) {
            case 'LAST_16':
              stage = 'LAST_16';
              break;
            case 'LAST_8':
              stage = 'LAST_8';
              break;
            case 'LAST_4':
              stage = 'LAST_4';
              break;
            case 'LAST_2':
              stage = 'LAST_2';
              break;
            default:
              stage = stageData.stage;
          }
          return championsLeagueStatus(teamMatchAway, teamMatchHome, stage, actualStage);
        }
      }
    }
    return 'lost in group stage';
  }

  function championsLeagueStatus(_teamMatchAway, _teamMatchHome, _stage, _actualStage) {
    const isActive = _stage === _actualStage;
    console.log(_actualStage);

    const matchArray = [];
    if (_teamMatchAway!.utcDate < _teamMatchHome!.utcDate) {
      matchArray.push(_teamMatchAway);
      matchArray.push(_teamMatchHome);
    } else {
      matchArray.push(_teamMatchHome);
      matchArray.push(_teamMatchAway);
    }

    return (
      <div>
        {isActive === true ? <span>{_actualStage}</span> : <span>`Lost in {_stage}`</span>}
        <div>
          <span>{matchArray[0].homeTeam.name}</span>
          {matchArray[0].status === 'FINISHED' ? (
            <>
              <span>{matchArray[0].score.home}</span>
              <span>{matchArray[0].score.away}</span>
            </>
          ) : (
            <span></span>
          )}
          <span>{matchArray[0].awayTeam.name}</span>
        </div>
        <div>
          <span>{matchArray[1].homeTeam.name}</span>
          {matchArray[1].status === 'FINISHED' ? (
            <>
              <span>{matchArray[1].score.home}</span>
              <span>{matchArray[1].score.away}</span>
            </>
          ) : (
            <span> - </span>
          )}
          <span>{matchArray[1].awayTeam.name}</span>
        </div>
      </div>
    );
  }

  return selectedTeam === null ? (
    <div className={styles.container}>No Info</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.teamName}>{selectedTeam.name}</div>
      {hasChampionsLeague ? (
        <div className={styles.championsLeagueContainer}>
          <img className={styles.clEmblem} src={clLogo} alt="Champions League" />
          <div>{getChampionsLeagueStage()}</div>
        </div>
      ) : null}
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
