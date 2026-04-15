import styles from './Playoffs.module.css';

export function Playoffs({ match }) {
  console.log(match);

  return (
    <div className={styles.container}>
      {match[0].status === 'FINISHED' ? (
        <div>
          <div className={styles.teamsContainer}>
            <div className={styles.teamContainer}>
              <div>
                <img className={styles.teamLogo} src={match[0].awayTeam.crest} alt="" />
              </div>
              <div>{match[0].awayTeam.name}</div>
              <div></div>
            </div>
            <div className={styles.teamContainer}>
              <div>
                <img className={styles.teamLogo} src={match[0].homeTeam.crest} alt="" />
              </div>
              <div>{match[0].homeTeam.name}</div>
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
