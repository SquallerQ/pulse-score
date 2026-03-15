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

    for (const stageData of championsLeagueStage) {
      if (stageData.matches && stageData.matches.length > 0) {
        const teamMatchAway = stageData.matches.find((match) => match.awayTeam.name === selectedTeam.name);
        const teamMatchHome = stageData.matches.find((match) => match.homeTeam.name === selectedTeam.name);

        if (teamMatchAway || teamMatchHome) {
          const firstMatch = teamMatchAway!.utcDate > teamMatchHome!.utcDate;
          // console.log();

          switch (stageData.stage) {
            case 'LAST_16':
              // return '1/8';
              console.log(teamMatchAway, teamMatchHome);
              console.log('NAME', teamMatchAway?.awayTeam.name);

              return (
                <div>
                  {firstMatch === true ? (
                    <div>
                      <span>{teamMatchAway?.awayTeam.name}</span>
                      {teamMatchAway?.status === 'FINISHED' ? (
                        <>
                          <span>{teamMatchAway.score.home}</span>
                          <span>{teamMatchAway.score.away}</span>
                        </>
                      ) : (
                        <span>no</span>
                      )}
                      <span>{teamMatchAway?.homeTeam.name}</span>
                    </div>
                  ) : (
                    <div>
                      <span>{teamMatchHome?.awayTeam.name}</span>
                      {teamMatchAway?.status === 'FINISHED' ? (
                        <>
                          <span>{teamMatchAway.score.home}</span>
                          <span>{teamMatchAway.score.away}</span>
                        </>
                      ) : (
                        <span>no</span>
                      )}
                      <span>{teamMatchHome?.homeTeam.name}</span>
                    </div>
                  )}
                </div>
              );
            case 'LAST_8':
              return '1/4';
            case 'LAST_4':
              return '1/2';
            case 'LAST_2':
              return 'FINAL';
            default:
              return stageData.stage;
          }
        }
      }
    }

    return 'lost in group stage';
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
