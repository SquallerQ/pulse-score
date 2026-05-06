import styles from './ChampionsLeagueTeamCard.module.css';

type TeamProps = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
};

export function ChampionsLeagueTeamCard({ team }: TeamProps) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={team.logo} alt={team.name} />
      <span className={styles.teamName}>{team.name}</span>
    </div>
  );
}
