import { useCompetitionHonoursQuery } from '../../../../features/history/queries/useCompetitionHonoursQuery';
import { HistoryQueryState } from '../HistoryQueryState/HistoryQueryState';
import './ClubsTitles.css';

export function ClubsTitles() {
  const { competitionHonoursQuery } = useCompetitionHonoursQuery();

  if (competitionHonoursQuery.isPending && !competitionHonoursQuery.data) {
    return <HistoryQueryState state="loading" />;
  }

  if (competitionHonoursQuery.isError) {
    return <HistoryQueryState state="error" error={competitionHonoursQuery.error} />;
  }

  if (!competitionHonoursQuery.data) {
    return <HistoryQueryState state="empty" />;
  }

  const { competitionCode, recentChampions, allTimeTitles } = competitionHonoursQuery.data;

  return (
    <section className="clubsTitles">
      <header className="clubsTitlesHeader">
        <span className="clubsTitlesEyebrow">Competition honours</span>
        <h1 className="clubsTitlesTitle">{competitionCode} Champions</h1>
        <p className="clubsTitlesDescription">A record of league winners and the clubs with the most titles.</p>
      </header>

      <div className="clubsTitlesGrid">
        <section className="clubsTitlesPanel">
          <div className="clubsTitlesPanelHeader">
            <div>
              <span className="clubsTitlesPanelEyebrow">Season by season</span>
              <h2>Past Champions</h2>
            </div>
            <span className="clubsTitlesCount">{recentChampions.length} seasons</span>
          </div>

          <div className="championsList">
            {recentChampions.map((champion) => (
              <article key={champion.season} className="championRow">
                <span className="championSeason">{champion.season}</span>
                <strong className="championClub">{champion.clubName}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="clubsTitlesPanel">
          <div className="clubsTitlesPanelHeader">
            <div>
              <span className="clubsTitlesPanelEyebrow">All-time ranking</span>
              <h2>Club Titles</h2>
            </div>
            <span className="clubsTitlesCount">{allTimeTitles.length} clubs</span>
          </div>

          {allTimeTitles.length > 0 ? (
            <div className="titlesList">
              {allTimeTitles.map((club, index) => (
                <article key={club.clubName} className="titleRow">
                  <span className="titleRank">{index + 1}</span>
                  <strong className="titleClub">{club.clubName}</strong>
                  <span className="titleTotal">
                    {club.titles} {club.titles === 1 ? 'title' : 'titles'}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="titlesEmptyState">
              <span className="titlesEmptyMark">#</span>
              <p>All-time title records will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
