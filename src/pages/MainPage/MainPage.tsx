import { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
import { fetchPremierLeagueTeams, fetchTeamMatches } from '../../api/api';
import { queryKeys } from '../../api/queryKeys';
import { useQuery } from '@tanstack/react-query';

import styles from './MainPage.module.css';

export function MainPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams('PL', '2025'),
    queryFn: fetchPremierLeagueTeams,
  });

  const matchesQuery = useQuery({
    queryKey: queryKeys.teamMatches(selectedTeamId ?? 0),
    queryFn: () => fetchTeamMatches(selectedTeamId as number),
    enabled: selectedTeamId !== null,
  });

  console.log('team matches:', matchesQuery.data);

  return (
    <div className={styles.main__container}>
      <TeamList teams={teamsQuery.data ?? []} selectedTeamId={selectedTeamId} onSelectTeam={setSelectedTeamId} />
      <Calendar />
    </div>
  );
}
