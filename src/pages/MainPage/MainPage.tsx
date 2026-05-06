import { useState, useMemo } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { FullCalendar } from '../../components/FullCalendar/FullCalendar';
import { TeamList } from '../../components/TeamList/TeamList';
import { TeamListSkeleton } from '../../components/TeamList/TeamListSkeleton';
import { ChampionsLeagueSection } from '../../components/ChampionsLeagueSection/ChampionsLeagueSection';
import { TeamInfo } from '../../components/TeamInfo/TeamInfo';
import { LeagueInfo } from '../../components/LeagueInfo/LeagueInfo';
import { LeagueInfoSkeleton } from '../../components/LeagueInfo/LeagueInfoSkeleton';
import { Table } from '../../components/Table/Table';
import { TableSkeleton } from '../../components/Table/TableSkeleton';

import {
  fetchLeagueTeams,
  fetchTeamMatches,
  fetchAllLeagues,
  fetchChampionsLeagueTeams,
  fetchChampionsLeagueStages,
  fetchLeagueTable,
  championsLeagueTable,
} from '../../api/api';

import { fetchLastSeasonChampion, fetchTopScorers } from '../../api/api-football';

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
  const [calendarView, setCalendarView] = useState<'fullCalendar' | 'compactCalendar'>('compactCalendar');

  const cupTeamsQuery = useQuery({
    queryKey: queryKeys.championsLeagueTeams(),
    queryFn: () => fetchChampionsLeagueTeams(),
    enabled: competitionType === 'cup',
    placeholderData: (previousData) => previousData,
  });

  // console.log(cupTeamsQuery.data);

  const championsLeagueQuery = useQuery({
    queryKey: queryKeys.championsLeagueMatches(),
    queryFn: () => fetchChampionsLeagueStages(),
    // enabled: competitionType === 'cup',
    placeholderData: (previousData) => previousData,
  });

  const leaguesQuery = useQuery({
    queryKey: queryKeys.leagues('all'),
    queryFn: fetchAllLeagues,
  });

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams(leagueCode, '2025'),
    queryFn: () => fetchLeagueTeams(leagueCode),
    enabled: competitionType === 'league',
    placeholderData: (previousData) => previousData,
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
    placeholderData: (previousData) => previousData,
  });

  const championsLeagueTableQuery = useQuery({
    queryKey: queryKeys.championsLeagueTable(),
    queryFn: championsLeagueTable,
    enabled: competitionType === 'cup',
    placeholderData: (previousData) => previousData,
  });

  const leagueInfoQuery = useQuery({
    queryKey: queryKeys.leagueInfo(leagueCode),
    queryFn: () => fetchLastSeasonChampion(leagueCode),
    placeholderData: (previousData) => previousData,
  });

  const leagueInfoTopScorersQuery = useQuery({
    queryKey: queryKeys.leagueInfoTopScorers(leagueCode),
    queryFn: () => fetchTopScorers(leagueCode),
    placeholderData: (previousData) => previousData,
  });

  const TopThreeScorersLastSeason = leagueInfoTopScorersQuery.data?.slice(0, 3);
  const shouldShowLeagueInfoSkeleton =
    (leagueInfoQuery.isPending && !leagueInfoQuery.data) ||
    (leagueInfoTopScorersQuery.isPending && !leagueInfoTopScorersQuery.data);
  const isLeagueInfoUpdating = leagueInfoQuery.isFetching || leagueInfoTopScorersQuery.isFetching;
  const shouldShowTableSkeleton = leagueTableQuery.isPending && !leagueTableQuery.data;
  const isTableUpdating = leagueTableQuery.isFetching;
  const shouldShowTeamListSkeleton = teamsQuery.isPending && !teamsQuery.data;
  const isTeamListUpdating = teamsQuery.isFetching;
  const shouldShowChampionsLeagueTableSkeleton = championsLeagueTableQuery.isPending && !championsLeagueTableQuery.data;
  const isChampionsLeagueTableUpdating = championsLeagueTableQuery.isFetching;
  const shouldShowChampionsLeagueTeamsSkeleton = cupTeamsQuery.isPending && !cupTeamsQuery.data;
  const shouldShowChampionsLeagueBracketSkeleton = championsLeagueQuery.isPending && !championsLeagueQuery.data;
  const isChampionsLeagueUpdating = cupTeamsQuery.isFetching || championsLeagueQuery.isFetching;

  function handleSelectLeague(league: LeagueItem) {
    setLeagueCode(league.code);
    setCompetitionType('league');
    setSelectedTeam(null);
  }
  function handleSelectCup() {
    setCompetitionType('cup');
    setSelectedTeam(null);
  }
  function handleSelectCalendarFormat(switchFormatTo: string): void {
    if (switchFormatTo === 'compactCalendar') {
      setCalendarView('compactCalendar');
    } else if (switchFormatTo === 'fullCalendar') {
      setCalendarView('fullCalendar');
    }
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
          <>
            {shouldShowTeamListSkeleton ? (
              <TeamListSkeleton />
            ) : (
              <TeamList
                teams={teamsQuery.data ?? []}
                leagueCode={leagueCode}
                selectedTeam={selectedTeam}
                onSelectTeam={setSelectedTeam}
                isUpdating={isTeamListUpdating}
              />
            )}
            {selectedTeam !== null ? (
              <TeamInfo
                selectedTeam={selectedTeamData}
                lastMatches={lastFiveLeagueMatches}
                hasChampionsLeague={hasChampionsLeague}
                championsLeagueStages={championsLeagueQuery.data}
              />
            ) : shouldShowLeagueInfoSkeleton ? (
              <LeagueInfoSkeleton />
            ) : (
              <LeagueInfo
                leagueInfo={leagueInfoQuery.data ?? null}
                topScorers={TopThreeScorersLastSeason ?? null}
                isUpdating={isLeagueInfoUpdating}
              />
            )}

            <div className={styles.calendarButtonContainer}>
              <button
                onClick={() => handleSelectCalendarFormat('compactCalendar')}
                className={calendarView === 'compactCalendar' ? styles.active : ''}
              >
                Calendar
              </button>
              <button
                onClick={() => handleSelectCalendarFormat('fullCalendar')}
                className={calendarView === 'fullCalendar' ? styles.active : ''}
              >
                Full Calendar
              </button>
            </div>

            <div className={styles.calendarTableContainer}>
              <div className={styles.calendarContainer}>
                {calendarView === 'compactCalendar' ? (
                  <Calendar matches={matchesQuery.data?.matches ?? []} />
                ) : (
                  <FullCalendar matches={matchesQuery.data?.matches ?? []} selectedTeam={selectedTeamData} />
                )}
              </div>
              <div className={styles.TableContainer}>
                {shouldShowTableSkeleton ? (
                  <TableSkeleton />
                ) : (
                  <Table
                    leagueTable={leagueTableQuery.data ?? null}
                    selectedTeam={selectedTeamData}
                    isUpdating={isTableUpdating}
                  ></Table>
                )}
              </div>
            </div>
          </>
        ) : (
          <ChampionsLeagueSection
            teams={cupTeamsQuery.data?.teamsArray ?? []}
            championsLeagueStages={championsLeagueQuery.data}
            leagueTable={championsLeagueTableQuery.data ?? null}
            showTableSkeleton={shouldShowChampionsLeagueTableSkeleton}
            isTableUpdating={isChampionsLeagueTableUpdating}
            showTeamsSkeleton={shouldShowChampionsLeagueTeamsSkeleton}
            showBracketSkeleton={shouldShowChampionsLeagueBracketSkeleton}
            isUpdating={isChampionsLeagueUpdating}
          />
        )}
      </section>
    </div>
  );
}
