import styles from './TeamInfo.module.css';
import plLogo from '../../assets/pl-league-logo.svg';
import clLogo from '../../assets/champ-league-white-logo.svg';
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
  championsLeagueStages?: ChampionsLeagueStage[];
};

export function TeamInfo({ selectedTeam, lastMatches, hasChampionsLeague, championsLeagueStages }: TeamInfoProps) {
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

  type CLMatch = ChampionsLeagueStage['matches'][number];

  function getChampionsLeagueStage() {
    if (!hasChampionsLeague || !selectedTeam || !championsLeagueStages?.length) {
      return null;
    }

    const reversedStages = [...championsLeagueStages].reverse();

    let actualStage: string | undefined;
    for (const stageData of championsLeagueStages) {
      if (stageData.matches.length === 0) continue;

      const allFinished = stageData.matches.every((m) => m.status === 'FINISHED');
      const hasActiveMatches = stageData.matches.some((m) => m.status === 'TIMED' || m.status === 'SCHEDULED');

      if (hasActiveMatches) {
        actualStage = stageData.stage;
        break;
      }

      if (!allFinished) {
        actualStage = stageData.stage;
        break;
      }
      actualStage = stageData.stage;
    }

    for (const stageData of reversedStages) {
      if (stageData.matches && stageData.matches.length > 0) {
        const teamMatchAway = stageData.matches.find((match) => match.awayTeam.name === selectedTeam.name);
        const teamMatchHome = stageData.matches.find((match) => match.homeTeam.name === selectedTeam.name);

        if (teamMatchAway || teamMatchHome) {
          let stage;
          switch (stageData.stage) {
            case 'PLAYOFFS':
              stage = 'PLAYOFFS';
              break;
            case 'LAST_16':
              stage = 'LAST_16';
              break;
            case 'QUARTER_FINALS':
              stage = 'QUARTER_FINALS';
              break;
            case 'SEMI_FINALS':
              stage = 'SEMI_FINALS';
              break;
            case 'FINAL':
              stage = 'FINAL';
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

  function championsLeagueStatus(
    _teamMatchAway: CLMatch | undefined,
    _teamMatchHome: CLMatch | undefined,
    _stage: string,
    _actualStage: string | undefined
  ) {
    const isActive = _stage === _actualStage;

    let stage;
    switch (_stage) {
      case 'PLAYOFFS':
        stage = 'Playoffs';
        break;
      case 'LAST_16':
        stage = '1/8';
        break;
      case 'QUARTER_FINALS':
        stage = '1/4';
        break;
      case 'SEMI_FINALS':
        stage = '1/2';
        break;
      case 'FINAL':
        stage = 'Final';
        break;
      default:
        stage = _stage;
    }

    if (!_teamMatchAway || !_teamMatchHome) {
      return (
        <div className={styles.CLcontainer}>
          {isActive ? <div className={styles.CLactive}>Active</div> : <div className={styles.CLinactive}>Inactive</div>}
          {isActive ? <span>Stage: {stage}</span> : <span>Lost in {stage}</span>}
          <div className={styles.CLmatchContainer}>
            <span>No match data</span>
          </div>
        </div>
      );
    }

    const matchArray: CLMatch[] =
      _teamMatchAway.utcDate < _teamMatchHome.utcDate
        ? [_teamMatchAway, _teamMatchHome]
        : [_teamMatchHome, _teamMatchAway];

    return (
      <div className={styles.CLcontainer}>
        {isActive === true ? (
          <div className={styles.CLactive}>Active</div>
        ) : (
          <div className={styles.CLinactive}>Inactive</div>
        )}
        {isActive === true ? (
          <div className={styles.stage}>Stage: {stage}</div>
        ) : (
          <div className={styles.stage}>Lost in {stage}</div>
        )}
        <div className={styles.CLmatchesContainer}>
          <div className={styles.CLmatchContainer}>
            {matchArray[0].status === 'FINISHED' ? (
              <div className={styles.matchRow}>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[0].homeTeam.crest}
                    alt={matchArray[0].homeTeam.name}
                  />
                </div>
                <div className={styles.teamName}>{matchArray[0].homeTeam.name} </div>
                <div className={styles.scoreBox}>{matchArray[0].score.home}</div>
                <div className={styles.scoreBox}>-</div>
                <div className={styles.scoreBox}>{matchArray[0].score.away}</div>
                <div className={styles.teamName}>{matchArray[0].awayTeam.name}</div>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[0].awayTeam.crest}
                    alt={matchArray[0].awayTeam.name}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.matchRow}>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[0].homeTeam.crest}
                    alt={matchArray[0].homeTeam.name}
                  />
                </div>
                <div className={styles.teamName}>{matchArray[0].homeTeam.name}</div>
                <div className={styles.scoreBox}></div>
                <div className={styles.scoreBox}></div>
                <div className={styles.scoreBox}></div>
                <div className={styles.teamName}>{matchArray[0].awayTeam.name}</div>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[0].awayTeam.crest}
                    alt={matchArray[0].awayTeam.name}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.CLmatchContainer}>
            {matchArray[1].status === 'FINISHED' ? (
              <div className={styles.matchRow}>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[1].homeTeam.crest}
                    alt={matchArray[1].homeTeam.name}
                  />
                </div>
                <div className={styles.teamName}>{matchArray[1].homeTeam.name}</div>
                <div className={styles.scoreBox}>{matchArray[1].score.home}</div>
                <div className={styles.scoreBox}>-</div>
                <div className={styles.scoreBox}>{matchArray[1].score.away}</div>
                <div className={styles.teamName}>{matchArray[1].awayTeam.name}</div>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[1].awayTeam.crest}
                    alt={matchArray[1].awayTeam.name}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.matchRow}>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[1].homeTeam.crest}
                    alt={matchArray[1].homeTeam.name}
                  />
                </div>
                <div className={styles.teamName}>{matchArray[1].homeTeam.name}</div>
                <div className={styles.scoreBox}></div>
                <div className={styles.scoreBox}></div>
                <div className={styles.scoreBox}></div>
                <div className={styles.teamName}>{matchArray[1].awayTeam.name}</div>
                <div>
                  <img
                    className={styles.CLlogoSmall}
                    src={matchArray[1].awayTeam.crest}
                    alt={matchArray[1].awayTeam.name}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return selectedTeam === null ? (
    <div className={styles.container}>No Info</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.teamContainer}>
        <div className={styles.teamGlow}></div>
        <img className={styles.teamLogo} src={selectedTeam.logo} alt={selectedTeam.name}></img>
        <div className={styles.teamLabel}>Selected team</div>
        <div className={styles.teamNameLogo}>{selectedTeam.name}</div>
        <div className={styles.teamLeagueName}>{selectedTeam.leagueName}</div>
      </div>
      <div className={styles.tourneyContainer}>
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
    </div>
  );
}
