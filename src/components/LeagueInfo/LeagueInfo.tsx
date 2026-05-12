import styles from './LeagueInfo.module.css';

import type { TopScorer } from '../../api/apiFootballApi';

type LeagueInfoData = {
  name?: string;
  country?: string;
  logo?: string;
  season?: number;
  championsHistory?: {
    season: number;
    team: {
      logo: string;
      name: string;
    };
  }[];
  standings?: {
    rank: number;
    points: number;
    team: {
      logo: string;
      name: string;
    };
  }[];
};

type LeagueInfoProps = {
  leagueInfo: LeagueInfoData | null;
  topScorers: TopScorer[] | null;
  isUpdating?: boolean;
};

export function LeagueInfo({ leagueInfo, topScorers, isUpdating = false }: LeagueInfoProps) {
  const champion = leagueInfo?.standings?.[0];
  const topThree = leagueInfo?.standings?.slice(0, 3) ?? [];
  const championsHistory = leagueInfo?.championsHistory ?? [];
  const secondPlace = topThree[1];
  const gapToSecond = champion && secondPlace ? champion.points - secondPlace.points : null;

  if (!champion) {
    return <div className={styles.container}>Loading league info...</div>;
  }

  return (
    <div className={styles.container}>
      {isUpdating ? (
        <div className={styles.updatingBadge}>
          <span className={styles.updatingSpinner}></span>
          <span>Updating...</span>
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.championContainer}>
          <div className={styles.championGlow}></div>
          <img className={styles.championLogo} src={champion.team.logo} alt={champion.team.name} />
          <p className={styles.championText}>Last season champion</p>
          <p className={styles.championName}>{champion.team.name}</p>
          <p className={styles.championPoints}>{topThree[0]?.points} pts</p>
        </div>

        <div className={styles.middleColumn}>
          <div className={styles.middleHeader}>
            <div className={styles.leagueMeta}>
              {leagueInfo?.logo ? (
                <img className={styles.leagueLogo} src={leagueInfo.logo} alt={leagueInfo.name ?? 'League'} />
              ) : null}
              <div>
                <p className={styles.leagueLabel}>Previous season snapshot</p>
                <h3 className={styles.leagueTitle}>{leagueInfo?.name ?? 'League'}</h3>
              </div>
            </div>
          </div>

          <div className={`${styles.section} ${styles.snapshotCard}`}>
            <p className={styles.sectionTitle}>Title Race Snapshot</p>
            <div className={styles.snapshotList}>
              <div className={styles.snapshotRow}>
                <span className={styles.snapshotLabel}>Champion</span>
                <span className={styles.snapshotValue}>{champion.points} pts</span>
              </div>
              <div className={styles.snapshotRow}>
                <span className={styles.snapshotLabel}>Gap to 2nd</span>
                <span className={styles.snapshotValue}>{gapToSecond !== null ? `+${gapToSecond}` : '-'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.topThreeSection}`}>
          <p className={styles.sectionTitle}>Top 3 last season</p>
          <div className={styles.podium}>
            {topThree.map((item, index) => (
              <div
                key={item.team.name}
                className={`${styles.teamCard} ${
                  index === 0 ? styles.firstPlace : index === 1 ? styles.secondPlace : styles.thirdPlace
                }`}
              >
                <div className={styles.rankBadge}>{item.rank}</div>
                <img className={styles.teamLogo} src={item.team.logo} alt={item.team.name} />
                <div className={styles.teamInfo}>
                  <p className={styles.teamName}>{item.team.name}</p>
                </div>
                <div className={styles.teamPoints}>{item.points} pts</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.section} ${styles.topScorersSection}`}>
          <p className={styles.sectionTitle}>Top Scorers last season</p>
          <div className={styles.topScorersContainer}>
            {topScorers?.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.topScorer} ${
                  index === 0
                    ? styles.topScorerFirstPlace
                    : index === 1
                      ? styles.topScorerSecondPlace
                      : styles.topScorerThirdPlace
                }`}
              >
                <div className={styles.topScorerPlace}>{index + 1}</div>
                <img className={styles.topScorerPhoto} src={item.photo} alt={item.name} />
                <div className={styles.topScorerInfo}>
                  <div className={styles.topScorerName}>{item.name}</div>
                  <div className={styles.topScorerMeta}>
                    <img className={styles.topScorerTeamLogo} src={item.team.logo} alt={item.team.name} />
                    <span className={styles.topScorerTeamName}>{item.team.name}</span>
                  </div>
                </div>
                <div className={styles.topScorerStats}>
                  <div className={styles.topScorerStat}>
                    <span className={styles.topScorerStatLabel}>G</span>
                    <span className={styles.topScorerStatValue}>{item.goals}</span>
                  </div>
                  <div className={styles.topScorerStat}>
                    <span className={styles.topScorerStatLabel}>A</span>
                    <span className={styles.topScorerStatValue}>{item.assists ?? '-'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.timelineColumn}>
          {leagueInfo?.season ? (
            <div className={styles.timelineBadge}>
              <div className={styles.seasonBadge}>{leagueInfo.season}</div>
            </div>
          ) : null}

          <div className={`${styles.section} ${styles.timelineCard}`}>
            <p className={styles.sectionTitle}>Champions by season</p>
            <div className={styles.timelineList}>
              {championsHistory.map((item) => (
                <div key={item.season} className={styles.timelineRow}>
                  <span className={styles.seasonPill}>{item.season}</span>
                  <span className={styles.timelineDot}></span>
                  <img className={styles.timelineLogo} src={item.team.logo} alt={item.team.name} />
                  <span className={styles.timelineTeam}>{item.team.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
