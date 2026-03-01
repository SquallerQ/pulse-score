import { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
import { TeamListCL } from '../../components/TeamListCL/TeamListCL';
import {
  fetchLeagueTeams,
  fetchTeamMatches,
  fetchAllLeagues,
  fetchChampionsLeagueTeams,
  fetchChampionsLeagueMatches,
} from '../../api/api';
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
  const [competitionType, setCompetitionType] = useState<'league' | 'cup'>('league');

  const cupTeamsQuery = useQuery({
    queryKey: queryKeys.championsLeagueTeams(),
    queryFn: () => fetchChampionsLeagueTeams(),
    enabled: competitionType === 'cup',
  });

  console.log(cupTeamsQuery.data);

  const cupMatchesQuery = useQuery({
    queryKey: queryKeys.championsLeagueMatches(),
    queryFn: () => fetchChampionsLeagueMatches(),
    enabled: competitionType === 'cup',
  });
  console.log(cupMatchesQuery.data);

  const leaguesQuery = useQuery({
    queryKey: queryKeys.leagues('all'),
    queryFn: fetchAllLeagues,
  });

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams(leagueCode, '2025'),
    queryFn: () => fetchLeagueTeams(leagueCode),
    enabled: competitionType === 'league',
  });

  const leagues = leaguesQuery.data ?? [];
  const currentLeague = selectedLeague ?? leagues[0] ?? null;

  const matchesQuery = useQuery({
    queryKey: queryKeys.teamMatches(selectedTeam?.leagueCode ?? '', selectedTeam?.teamId ?? 0),
    queryFn: () => fetchTeamMatches(selectedTeam!.teamId),
    enabled: selectedTeam !== null,
  });

  function handleSelectLeague(league: LeagueItem) {
    setSelectedLeague(league);
    setLeagueCode(league.code);
    setCompetitionType('league');
    setSelectedTeam(null);
  }
  function handleSelectCup() {
    setCompetitionType('cup');
    setSelectedLeague(null);
    setSelectedTeam(null);
  }

  // console.log('team matches:', matchesQuery.data);
  // console.log('championsLeague', cupTeamsQuery.data);

  return (
    <div className={styles.main__container}>
      <LeaguesList
        leagues={leagues}
        selectedLeague={currentLeague}
        competitionType={competitionType}
        onSelectLeague={handleSelectLeague}
        onSelectCup={handleSelectCup}
      />
      {competitionType === 'league' ? (
        <TeamList
          teams={teamsQuery.data ?? []}
          leagueCode={leagueCode}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />
      ) : (
        <TeamListCL teams={cupTeamsQuery.data?.teamsArray ?? []} />
      )}

      <Calendar />
    </div>
  );
}
