import styles from './Team.module.css';

type TeamProps = {
  id: number;
  name: string;
  crest: string;
  isActive: boolean;
  onClick: (teamId: number) => void;
};

export function Team(props: TeamProps) {
  const { id, name, crest, isActive, onClick } = props;

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => onClick(id)} aria-pressed={isActive}>
        <img className={styles.logo} src={crest} alt={name} />
        <span>{name}</span>
      </button>
    </div>
  );
}
