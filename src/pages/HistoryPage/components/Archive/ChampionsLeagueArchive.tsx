import styles from './ChampionsLeagueArchive.module.css';

import type { PulseScoreChampionsLeagueSeasonResponseSchema } from '../../../../api/pulse-score/types';

import { useCompetitionSeasonsQuery } from '../../../../features/history/queries/useCompetitionSeasonsQuery';
import { usePulseScoreChampionsLeagueSeasonQuery } from '../../../../features/history/queries/usePulseScoreChampionsLeagueSeasonQuery';
import { useLeagueParams } from '../../../../features/filters/useLeagueParams';

import { Season } from '../../components/Season/Season';
import { HistoryQueryState } from '../HistoryQueryState/HistoryQueryState';

type ChampionsLeagueTie =
  | PulseScoreChampionsLeagueSeasonResponseSchema['roundOf16'][number]
  | PulseScoreChampionsLeagueSeasonResponseSchema['quarterFinals'][number]
  | PulseScoreChampionsLeagueSeasonResponseSchema['semiFinals'][number];

type KnockoutRoundProps = {
  title: string;
  ties: ChampionsLeagueTie[];
};

function KnockoutRound({ title, ties }: KnockoutRoundProps) {
  return (
    <section className={styles.roundSection}>
      <h2 className={styles.roundTitle}>{title}</h2>

      <div className={styles.tiesList}>
        {ties.map((tie) => (
          <article key={tie.id} className={styles.tieCard}>
            <div className={styles.tieTeams}>
              <span className={tie.winner === tie.homeTeam ? styles.winner : styles.team}>{tie.homeTeam}</span>
              <span className={tie.winner === tie.awayTeam ? styles.winner : styles.team}>{tie.awayTeam}</span>
            </div>

            {'score' in tie ? (
              <div className={styles.singleMatchScore}>
                <span>Single match</span>
                <strong>
                  {tie.score.home} - {tie.score.away}
                </strong>
              </div>
            ) : (
              <div className={styles.scores}>
                <div className={styles.legScore}>
                  <span>First leg</span>
                  <strong>
                    {tie.firstLeg.home} - {tie.firstLeg.away}
                  </strong>
                </div>
                <div className={styles.legScore}>
                  <span>Second leg</span>
                  <strong>
                    {tie.secondLeg.home} - {tie.secondLeg.away}
                  </strong>
                </div>
                <div className={styles.aggregateScore}>
                  <span>Aggregate</span>
                  <strong>
                    {tie.aggregate.home} - {tie.aggregate.away}
                  </strong>
                </div>
              </div>
            )}

            {tie.note ? <p className={styles.tieNote}>{tie.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function ChampionsLeagueArchive() {
  const { competitionSeasons, competitionSeasonsQuery } = useCompetitionSeasonsQuery();
  const { pulseScoreChampionsLeagueData, pulseScoreChampionsLeagueSeasonQuery } =
    usePulseScoreChampionsLeagueSeasonQuery();
  const { season, setSeason } = useLeagueParams();

  const isLoading =
    (competitionSeasonsQuery.isPending && !competitionSeasonsQuery.data) ||
    (pulseScoreChampionsLeagueSeasonQuery.isPending && !pulseScoreChampionsLeagueSeasonQuery.data);

  if (isLoading) {
    return <HistoryQueryState state="loading" />;
  }

  if (competitionSeasonsQuery.isError) {
    return <HistoryQueryState state="error" error={competitionSeasonsQuery.error} />;
  }

  if (pulseScoreChampionsLeagueSeasonQuery.isError) {
    return <HistoryQueryState state="error" error={pulseScoreChampionsLeagueSeasonQuery.error} />;
  }

  if (!pulseScoreChampionsLeagueData) {
    return <HistoryQueryState state="empty" />;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.yearsContainer}>
        <div className={styles.yearsContainerInner}>
          {competitionSeasons.map((item) => (
            <Season key={item} year={item.toString()} setSeason={setSeason} isActive={season === item.toString()} />
          ))}
        </div>
      </aside>

      <main className={styles.content}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Champions League archive</span>
          <h1 className={styles.title}>{pulseScoreChampionsLeagueData.season} knockout stage</h1>
        </header>

        <section className={styles.finalSection}>
          <span className={styles.finalLabel}>Final</span>
          <div className={styles.finalTeams}>
            <span
              className={
                pulseScoreChampionsLeagueData.final.winner === pulseScoreChampionsLeagueData.final.homeTeam
                  ? styles.winner
                  : styles.team
              }
            >
              {pulseScoreChampionsLeagueData.final.homeTeam}
            </span>
            <strong className={styles.finalScore}>
              {pulseScoreChampionsLeagueData.final.score.home} - {pulseScoreChampionsLeagueData.final.score.away}
            </strong>
            <span
              className={
                pulseScoreChampionsLeagueData.final.winner === pulseScoreChampionsLeagueData.final.awayTeam
                  ? styles.winner
                  : styles.team
              }
            >
              {pulseScoreChampionsLeagueData.final.awayTeam}
            </span>
          </div>
        </section>

        <KnockoutRound title="Semi-finals" ties={pulseScoreChampionsLeagueData.semiFinals} />
        <KnockoutRound title="Quarter-finals" ties={pulseScoreChampionsLeagueData.quarterFinals} />
        <KnockoutRound title="Round of 16" ties={pulseScoreChampionsLeagueData.roundOf16} />

        <section className={styles.groupStageSection}>
          <h2 className={styles.roundTitle}>Eliminated in the group stage</h2>
          <div className={styles.eliminatedTeams}>
            {pulseScoreChampionsLeagueData.groupStageEliminated.map((team) => (
              <span key={team} className={styles.eliminatedTeam}>
                {team}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
