import styles from './TeamListCL.module.css';
import { TeamCL } from './TeamCL/TeamCL';

type PropsType = {
  teams: TeamListCLItem[];
};

type TeamListCLItem = {
  id: number;
  name: string;
  logo: string;
};

export function TeamListCL({ teams }: PropsType) {
  return (
    <div className={styles.container}>
      {teams.map((item) => {
        return <TeamCL team={item} key={item.id} />;
      })}
    </div>
  );
}
