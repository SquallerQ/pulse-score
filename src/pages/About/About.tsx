import styles from './About.module.css';

const githubRepositoryUrl = 'https://github.com/SquallerQ';
const footballDataUrl = 'https://www.football-data.org/';
const apiFootballUrl = 'https://www.api-football.com/';

export function About() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>About Pulse Score</div>
        <h1 className={styles.title}>A football dashboard built for learning, exploration, and UI practice.</h1>
        <p className={styles.lead}>
          Pulse Score is an educational React project focused on league tables, match calendars, Champions League
          bracket visualization, and seasonal football statistics in a clean, interactive interface.
        </p>
      </section>

      <section className={styles.cardGrid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Project Overview</h2>
          <p className={styles.cardText}>
            The project combines data fetching, React Query caching, URL-driven filters, responsive layouts, and typed
            API integration to present football information in a way that is both practical and easy to explore.
          </p>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Data Sources</h2>
          <p className={styles.cardText}>Football data is loaded from two public APIs:</p>
          <ul className={styles.list}>
            <li>
              <a className={styles.inlineLink} href={footballDataUrl} target="_blank" rel="noreferrer">
                football-data.org
              </a>{' '}
              - league teams, match schedules, standings, and Champions League structure
            </li>
            <li>
              <a className={styles.inlineLink} href={apiFootballUrl} target="_blank" rel="noreferrer">
                api-football.com
              </a>{' '}
              - historical top scorers, league winners, and selected competition history data
            </li>
          </ul>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>API Limitations</h2>
          <p className={styles.cardText}>
            This project uses the free tiers of the APIs above. Because of that, the number of available requests is
            limited and some data may temporarily stop loading after the daily or monthly quota is reached. These limits
            come from the API providers and cannot be controlled from inside the application.
          </p>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Educational Use</h2>
          <p className={styles.cardText}>
            All visuals, code experiments, and third-party data integrations are used for educational purposes only. The
            project is intended as a learning exercise in frontend architecture, typed API work, and responsive UI
            design.
          </p>
        </article>
      </section>

      <section className={styles.footerCard}>
        <h2 className={styles.cardTitle}>GitHub</h2>
        <p className={styles.cardText}>Source code and future updates can be found on GitHub:</p>
        <a className={styles.link} href={githubRepositoryUrl} target="_blank" rel="noreferrer">
          {githubRepositoryUrl}
        </a>
      </section>
    </main>
  );
}
