import { Team } from './Team/Team';
import styles from './TeamList.module.css';

type TeamListItem = {
  id: number;
  name: string;
  logo: string;
};

type SelectedTeam = {
  leagueCode: string;
  teamId: number;
};

type TeamListProps = {
  teams: TeamListItem[];
  leagueCode: string;
  selectedTeam: SelectedTeam | null;
  onSelectTeam: (team: SelectedTeam) => void;
};

export function TeamList({ teams, leagueCode, selectedTeam, onSelectTeam }: TeamListProps) {
  return (
    <div className={styles.container}>
      {teams.map((team) => {
        return (
          <Team
            key={team.id}
            name={team.name}
            logo={team.logo}
            isActive={selectedTeam?.leagueCode === leagueCode && selectedTeam.teamId === team.id}
            onClick={() => onSelectTeam({ leagueCode, teamId: team.id })}
          />
        );
      })}
    </div>
  );
}
