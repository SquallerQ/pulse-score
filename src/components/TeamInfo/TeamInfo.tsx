import styles from './TeamInfo.module.css';
import type { TeamMatches } from '../../api/api.ts';

type selectedTeam = {
  id: number;
  name: string;
  logo: string;
  color: string;
};

type TeamInfoProps = {
  selectedTeam: selectedTeam | null;
  matchesList: TeamMatches;
};

export function TeamInfo({ selectedTeam, matchesList }: TeamInfoProps) {
  // console.log(selectedTeam);
  //   console.log(matchesList);

  //  const date = new Date();

  //   console.log(date);

  //   const LastFiveMatches = matchesList.map((item) => ({

  //   }));

  return selectedTeam === null ? (
    <div className={styles.container}>No Info</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.name}>{selectedTeam.name}</div>
    </div>
  );
}
