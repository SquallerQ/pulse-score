import styles from './Match.module.css';
import type { TeamMatches } from '../../../api/types';

type matchProp = {
  match: TeamMatches;
};

export function Match({ match }: matchProp) {
  console.log(match);
  return <div className={styles.matchContainer}>{match.status}</div>;
}
