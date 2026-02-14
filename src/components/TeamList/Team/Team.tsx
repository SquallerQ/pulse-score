import styles from './Team.module.css';

type TeamData = {
  name: string;
  crest: string;
};

export function Team(props: TeamData) {
  const { name, crest } = props;
  console.log(props);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={crest} alt={`${name} logo`} loading="lazy" />
      <div className={styles.name}>{name}</div>
    </div>
  );
}
