import styles from './LeagueInfo.module.css';

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
};

export function LeagueInfo({ leagueInfo }: LeagueInfoProps) {
  const champion = leagueInfo?.standings?.[0];
  const topThree = leagueInfo?.standings?.slice(0, 3) ?? [];
  const championsHistory = leagueInfo?.championsHistory ?? [];

  if (!champion) {
    return <div className={styles.container}>Loading league info...</div>;
  }

  return (
    <div className={styles.container}>
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
            {leagueInfo?.season ? <div className={styles.seasonBadge}>{leagueInfo.season}</div> : null}
          </div>

          <div className={`${styles.section} ${styles.historyCard}`}>
            <p className={styles.sectionTitle}>Champions by season</p>
            <div className={styles.historyList}>
              {championsHistory.map((item) => (
                <div key={item.season} className={styles.listRow}>
                  <div className={styles.listTeam}>
                    <span className={styles.seasonPill}>{item.season}</span>
                    <img className={styles.teamLogo} src={item.team.logo} alt={item.team.name} />
                    <span className={styles.teamName}>{item.team.name}</span>
                  </div>
                </div>
              ))}
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
                  <p className={styles.teamPoints}>{item.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
