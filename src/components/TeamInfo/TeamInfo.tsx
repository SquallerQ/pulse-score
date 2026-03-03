import styles from './TeamInfo.module.css';

type TeamInfoProps = {
  selectedTeam: {
    leagueCode: string;
    teamId: number;
  } | null;
};

export function TeamInfo({ selectedTeam }: TeamInfoProps) {
  console.log(selectedTeam);

  return selectedTeam === null ? (
    <div className={styles.container}>Not Info</div>
  ) : (
    <div className={styles.container}></div>
  );
}
