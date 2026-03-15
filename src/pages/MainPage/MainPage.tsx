import { useState, useMemo } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
import { TeamListCL } from '../../components/TeamListCL/TeamListCL';
import { TeamInfo } from '../../components/TeamInfo/TeamInfo';
import { Table } from '../../components/Table/Table';

import {
  fetchLeagueTeams,
  fetchTeamMatches,
  fetchAllLeagues,
  fetchChampionsLeagueTeams,
  fetchChampionsLeagueStages,
  fetchLeagueTable,
} from '../../api/api';
import type { TeamMatches, TeamMatchesResponse } from '../../api/types';
import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { queryKeys } from '../../api/queryKeys';
import { useQuery } from '@tanstack/react-query';

import styles from './MainPage.module.css';

type SelectedTeam = {
  leagueCode: string;
  teamId: number;
};

type SelectedTeamInfo = {
  id: number;
  name: string;
  color: string;
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
  const [leagueCode, setLeagueCode] = useState('PL');
  const [competitionType, setCompetitionType] = useState<'league' | 'cup'>('league');

  const cupTeamsQuery = useQuery({
    queryKey: queryKeys.championsLeagueTeams(),
    queryFn: () => fetchChampionsLeagueTeams(),
    enabled: competitionType === 'cup',
  });

  // console.log(cupTeamsQuery.data);

  const championsLeagueQuery = useQuery({
    queryKey: queryKeys.championsLeagueMatches(),
    queryFn: () => fetchChampionsLeagueStages(),
    // enabled: competitionType === 'cup',
  });
  // console.log(championsLeagueQuery.data);

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
  const currentLeague = leagues.find((league) => league.code === leagueCode) ?? leagues[0] ?? null;

  const matchesQuery = useQuery<TeamMatchesResponse>({
    queryKey: queryKeys.teamMatches(selectedTeam?.leagueCode ?? '', selectedTeam?.teamId ?? 0),
    queryFn: () => fetchTeamMatches(selectedTeam!.teamId),
    enabled: selectedTeam !== null,
  });

  const leagueTableQuery = useQuery({
    queryKey: queryKeys.leagueTable(leagueCode),
    queryFn: () => fetchLeagueTable(leagueCode),
  });

  // console.log(leagueTableQuery.data);

  function handleSelectLeague(league: LeagueItem) {
    setLeagueCode(league.code);
    setCompetitionType('league');
    setSelectedTeam(null);
  }
  function handleSelectCup() {
    setCompetitionType('cup');
    setSelectedTeam(null);
  }

  const selectedTeamData = teamsQuery.data?.find((item: SelectedTeamInfo) => item.id === selectedTeam?.teamId) ?? null;

  const lastFiveLeagueMatches = useMemo(() => {
    if (!matchesQuery.data?.matches || !currentLeague) return [];

    return matchesQuery.data.matches
      .filter((match: TeamMatches) => match.competition.name === currentLeague.name)
      .filter((match: TeamMatches) => match.status === 'FINISHED')
      .slice(-5);
  }, [matchesQuery.data, currentLeague]);

  const hasChampionsLeague = matchesQuery.data?.competitions?.includes('CL') ?? false;

  return (
    <div className={styles.main__container}>
      <aside className={styles.sidebar}>
        <LeaguesList
          leagues={leagues}
          selectedLeague={currentLeague}
          competitionType={competitionType}
          onSelectLeague={handleSelectLeague}
          onSelectCup={handleSelectCup}
        />
      </aside>

      <section className={styles.content}>
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
        <TeamInfo
          selectedTeam={selectedTeamData}
          lastMatches={lastFiveLeagueMatches}
          hasChampionsLeague={hasChampionsLeague}
          championsLeagueStage={championsLeagueQuery.data}
        />
        <Calendar matches={matchesQuery.data?.matches ?? []} />
        <Table leagueTable={leagueTableQuery.data ?? null}></Table>
      </section>
    </div>
  );
}
