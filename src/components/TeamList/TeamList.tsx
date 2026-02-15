import { Team } from './Team/Team';
import styles from './TeamList.module.css';

type TeamListItem = {
  id: number;
  name: string;
  crest: string;
};

type TeamListProps = {
  teams: TeamListItem[];
  selectedTeamId: number | null;
  onSelectTeam: (teamId: number) => void;
};

export function TeamList({ teams, selectedTeamId, onSelectTeam }: TeamListProps) {
  return (
    <div className={styles.container}>
      {teams.map((team) => {
        return (
          <Team
            key={team.id}
            id={team.id}
            name={team.name}
            crest={team.crest}
            isActive={team.id === selectedTeamId}
            onClick={onSelectTeam}
          />
        );
      })}
    </div>
  );
}
