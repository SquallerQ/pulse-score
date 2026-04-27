import styles from './LeagueInfo.module.css';

export function LeagueInfo(props) {
  console.log(props);

  return (
    <div className={styles.container}>
      <img src={props.leagueInfo.standings[0].team.logo} alt="" />
      Current Champion: {props.leagueInfo.standings[0].team.name}
    </div>
  );
}
