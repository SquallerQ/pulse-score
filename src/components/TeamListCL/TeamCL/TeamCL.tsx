import styles from './TeamCL.module.css';

type TeamProps = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
};

export function TeamCL({ team }: TeamProps) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={team.logo} alt={team.name} />
    </div>
  );
}
