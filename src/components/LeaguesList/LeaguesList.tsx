import { League } from './League/League';

import styles from './LeaguesList.module.css';


export function LeaguesList({ leagues }) {
  // const {leagues} = props.leagues;
  // console.log(league);

  // console.log(leagues);

  return <div className={styles.container}>{<League />}</div>;
}
