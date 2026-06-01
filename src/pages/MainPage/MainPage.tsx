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

import { getPreviousSeasonYear } from '../../api/api-football/client';

import type { TeamMatch } from '../../api/football-data/types';
import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { useLeagueParams } from '../../features/filters/useLeagueParams';
import { useCompetitionSelection } from '../../features/filters/useCompetitionSelection';
import { useLeagues } from '../../features/leagues/queries/useLeaguesQuery';
import { useSharedTopScorersQuery } from '../../features/shared/queries/useSharedTopScorersQuery';
import { useRecentChampionsQuery } from '../../features/leagues/queries/useRecentChampionsQuery';
import { useLeagueTeamsQuery } from '../../features/leagues/queries/useLeagueTeamsQuery';
import { useTeamMatchesQuery } from '../../features/leagues/queries/useTeamMatchesQuery';
import { useChampionsLeagueTeamsQuery } from '../../features/champions-league/queries/useChampionsLeagueTeamsQuery';
import { useChampionsLeagueStagesQuery } from '../../features/champions-league/queries/useChampionsLeagueStagesQuery';
import { useLeagueTableQuery } from '../../features/leagues/queries/useLeagueTableQuery';
import { useChampionsLeagueTableQuery } from '../../features/champions-league/queries/useChampionsLeagueTableQuery';

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

export function MainPage() {
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam | null>(null);
  const [calendarView, setCalendarView] = useState<'fullCalendar' | 'compactCalendar'>('compactCalendar');

  const { leagueCode, mode } = useLeagueParams();
  const { leagues, currentLeague } = useLeagues(leagueCode);
  const { selectLeague, selectCup } = useCompetitionSelection({ onAfterSelect: () => setSelectedTeam(null) });
  const { leagueInfoTopScorersQuery } = useSharedTopScorersQuery({
    seasonOverride: getPreviousSeasonYear().toString(),
  });
  const { leagueInfoQuery } = useRecentChampionsQuery(3);

  const { leagueTeamsQuery, teamsList } = useLeagueTeamsQuery();
  const { championsLeagueTeamsQuery, championsLeagueTeams } = useChampionsLeagueTeamsQuery();
  const { leagueTableQuery, leagueTable } = useLeagueTableQuery();
  const { championsLeagueTableQuery, championsLeagueTable } = useChampionsLeagueTableQuery();
  const { teamMatches } = useTeamMatchesQuery(selectedTeam?.leagueCode, selectedTeam?.teamId);
  const hasChampionsLeague = teamMatches?.competitions?.includes('CL') ?? false;
  const { championsLeagueStagesQuery, championsLeagueStages } = useChampionsLeagueStagesQuery(
    mode === 'cup' || hasChampionsLeague
  );

  const TopThreeScorersLastSeason = leagueInfoTopScorersQuery.data?.slice(0, 3);
  const shouldShowLeagueInfoSkeleton =
    (leagueInfoQuery.isPending && !leagueInfoQuery.data) ||
    (leagueInfoTopScorersQuery.isPending && !leagueInfoTopScorersQuery.data);
  const isLeagueInfoUpdating = leagueInfoQuery.isFetching || leagueInfoTopScorersQuery.isFetching;
  const shouldShowTableSkeleton = leagueTableQuery.isPending && !leagueTableQuery.data;
  const isTableUpdating = leagueTableQuery.isFetching;
  const shouldShowTeamListSkeleton = leagueTeamsQuery.isPending && !leagueTeamsQuery.data;
  const isTeamListUpdating = leagueTeamsQuery.isFetching;
  const shouldShowChampionsLeagueTableSkeleton = championsLeagueTableQuery.isPending && !championsLeagueTableQuery.data;
  const isChampionsLeagueTableUpdating = championsLeagueTableQuery.isFetching;
  const shouldShowChampionsLeagueTeamsSkeleton = championsLeagueTeamsQuery.isPending && !championsLeagueTeamsQuery.data;
  const shouldShowChampionsLeagueBracketSkeleton =
    championsLeagueStagesQuery.isPending && !championsLeagueStagesQuery.data;
  const isChampionsLeagueUpdating = championsLeagueTeamsQuery.isFetching || championsLeagueStagesQuery.isFetching;

  function handleSelectCalendarFormat(switchFormatTo: string): void {
    if (switchFormatTo === 'compactCalendar') {
      setCalendarView('compactCalendar');
    } else if (switchFormatTo === 'fullCalendar') {
      setCalendarView('fullCalendar');
    }
  }

  const selectedTeamData = teamsList.find((item: SelectedTeamInfo) => item.id === selectedTeam?.teamId) ?? null;

  const lastFiveLeagueMatches = useMemo(() => {
    if (!teamMatches?.matches || !currentLeague) return [];

    return teamMatches.matches
      .filter((match: TeamMatch) => match.competition.name === currentLeague.name)
      .filter((match: TeamMatch) => match.status === 'FINISHED')
      .slice(-5);
  }, [teamMatches, currentLeague]);

  return (
    <div className={styles.main__container}>
      <aside className={styles.sidebar}>
        <LeaguesList
          leagues={leagues}
          selectedLeague={currentLeague}
          mode={mode}
          onSelectLeague={selectLeague}
          onSelectCup={selectCup}
        />
      </aside>

      <section className={styles.content}>
        {mode === 'league' ? (
          <>
            {shouldShowTeamListSkeleton ? (
              <TeamListSkeleton />
            ) : (
              <TeamList
                teams={teamsList}
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
                championsLeagueStages={championsLeagueStages}
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
                disabled={selectedTeam === null}
                onClick={() => handleSelectCalendarFormat('compactCalendar')}
                className={calendarView === 'compactCalendar' ? styles.active : ''}
              >
                Calendar
              </button>
              <button
                disabled={selectedTeam === null}
                onClick={() => handleSelectCalendarFormat('fullCalendar')}
                className={calendarView === 'fullCalendar' ? styles.active : ''}
              >
                Full Calendar
              </button>
            </div>

            <div className={styles.calendarTableContainer}>
              <div className={styles.calendarContainer}>
                {calendarView === 'compactCalendar' ? (
                  <Calendar matches={teamMatches?.matches ?? []} />
                ) : (
                  <FullCalendar matches={teamMatches?.matches ?? []} selectedTeam={selectedTeamData} />
                )}
              </div>
              <div className={styles.TableContainer}>
                {shouldShowTableSkeleton ? (
                  <TableSkeleton />
                ) : (
                  <Table
                    leagueTable={leagueTable ?? null}
                    selectedTeam={selectedTeamData}
                    isUpdating={isTableUpdating}
                  ></Table>
                )}
              </div>
            </div>
          </>
        ) : (
          <ChampionsLeagueSection
            teams={championsLeagueTeams}
            championsLeagueStages={championsLeagueStages}
            leagueTable={championsLeagueTable ?? null}
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
