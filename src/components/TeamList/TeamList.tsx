import { Team } from './Team/Team';
import styles from './TeamList.module.css';

type TeamListItem = {
  name: string;
  crest: string;
};

type TeamListProps = {
  teams: TeamListItem[];
};

export function TeamList(props: TeamListProps) {
  const { teams = [] } = props;
  // console.log(props);

  // console.log(teams);

  return (
    <div className={styles.container}>
      {teams.map((team) => {
        return <Team key={team.name} name={team.name} crest={team.crest} />;
      })}
    </div>
  );
}
