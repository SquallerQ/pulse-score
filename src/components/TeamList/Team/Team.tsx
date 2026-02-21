import styles from './Team.module.css';

type TeamProps = {
  name: string;
  logo: string;
  isActive: boolean;
  onClick: () => void;
};

export function Team(props: TeamProps) {
  const { name, logo, isActive, onClick } = props;

  return (
    <div className={styles.container}>
      <button type="button" onClick={onClick} aria-pressed={isActive}>
        <img className={styles.logo} src={logo} alt={name} />
        <span>{name}</span>
      </button>
    </div>
  );
}
