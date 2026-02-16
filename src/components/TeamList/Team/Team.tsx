import styles from './Team.module.css';

type TeamProps = {
  name: string;
  crest: string;
  isActive: boolean;
  onClick: () => void;
};

export function Team(props: TeamProps) {
  const { name, crest, isActive, onClick } = props;

  return (
    <div className={styles.container}>
      <button type="button" onClick={onClick} aria-pressed={isActive}>
        <img className={styles.logo} src={crest} alt={name} />
        <span>{name}</span>
      </button>
    </div>
  );
}
