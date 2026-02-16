import { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
import { fetchPremierLeagueTeams, fetchTeamMatches } from '../../api/api';
import { queryKeys } from '../../api/queryKeys';
import { useQuery } from '@tanstack/react-query';

import styles from './MainPage.module.css';

type SelectedTeam = {
  leagueCode: string;
  teamId: number;
};

export function MainPage() {
  const leagueCode = 'PL';
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam | null>(null);

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams(leagueCode, '2025'),
    queryFn: fetchPremierLeagueTeams,
  });

  const matchesQuery = useQuery({
    queryKey: queryKeys.teamMatches(selectedTeam?.leagueCode ?? '', selectedTeam?.teamId ?? 0),
    queryFn: () => fetchTeamMatches(selectedTeam!.teamId),
    enabled: selectedTeam !== null,
  });

  console.log('team matches:', matchesQuery.data);

  return (
    <div className={styles.main__container}>
      <TeamList
        teams={teamsQuery.data ?? []}
        leagueCode={leagueCode}
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
      />
      <Calendar />
    </div>
  );
}
