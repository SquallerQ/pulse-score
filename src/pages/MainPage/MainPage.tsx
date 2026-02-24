import { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
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
  const [leagueOrCup, setleagueOrCup] = useState('league');

  const cupTeamsQuery = useQuery({
    queryKey: queryKeys.championsLeagueTeams(),
    queryFn: () => fetchChampionsLeagueTeams(),
  });

  console.log(cupTeamsQuery.data);
  
  
  const cupMatchesQuery = useQuery({
    queryKey: queryKeys.championsLeagueMatches(),
    queryFn: () => fetchChampionsLeagueMatches(),
  });
  console.log(cupMatchesQuery.data);

  const leaguesQuery = useQuery({
    queryKey: queryKeys.leagues('all'),
    queryFn: fetchAllLeagues,
  });

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams(leagueCode, '2025'),
    queryFn: () => fetchLeagueTeams(leagueCode),
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
  }

  function consoleChampionsLeagueMatches() {
    console.log(cupMatchesQuery.data);
    
  }

  // console.log('team matches:', matchesQuery.data);
  console.log('championsLeague', cupTeamsQuery.data);

  return (
    <div className={styles.main__container}>
      <LeaguesList
        leagueOrCup={leagueOrCup}
        leagues={leagues}
        selectedLeague={currentLeague}
        onSelectLeague={handleSelectLeague}
        championsLeagueTeams={cupTeamsQuery.data}
        championsLeagueMatches={cupMatchesQuery.data}
        consoleChampionsLeagueMatches={consoleChampionsLeagueMatches}
      />
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
