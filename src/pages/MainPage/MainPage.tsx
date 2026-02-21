import { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
import { fetchPremierLeagueTeams, fetchTeamMatches, fetchAllLeagues } from '../../api/api';
import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { queryKeys } from '../../api/queryKeys';
import { useQuery } from '@tanstack/react-query';

import styles from './MainPage.module.css';

type SelectedTeam = {
  leagueCode: string;
  teamId: number;
};

type LeagueItem = {
  id: number;
  flag: string;
  country: string;
  emblem: string;
  name: string;
  code: string;
};

export function MainPage() {
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<LeagueItem | null>(null);
  const [leagueCode, setLeagueCode] = useState('PL');

  const LeaguesQuery = useQuery({
    queryKey: queryKeys.leagues('all'),
    queryFn: fetchAllLeagues,
  });

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams(leagueCode, '2025'),
    queryFn: () => fetchPremierLeagueTeams(leagueCode),
  });

  const leagues = LeaguesQuery.data ?? [];
  const currentLeague = selectedLeague ?? leagues[0] ?? null;

  const matchesQuery = useQuery({
    queryKey: queryKeys.teamMatches(selectedTeam?.leagueCode ?? '', selectedTeam?.teamId ?? 0),
    queryFn: () => fetchTeamMatches(selectedTeam!.teamId),
    enabled: selectedTeam !== null,
  });

  function handleSelectLeague(league: LeagueItem) {
    setSelectedLeague(league);
    setLeagueCode(league.code);
  }

  console.log('team matches:', matchesQuery.data);

  return (
    <div className={styles.main__container}>
      <LeaguesList leagues={leagues} selectedLeague={currentLeague} setSelectedLeague={handleSelectLeague} />
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
