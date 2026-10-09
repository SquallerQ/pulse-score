import styles from './HistoryQueryState.module.css';

type HistoryQueryStateProps = {
  state: 'loading' | 'empty' | 'error';
  error?: unknown;
};

const stateContent = {
  loading: {
    title: 'Loading season data',
    description: 'The archive is being prepared.',
  },
  empty: {
    title: 'No data for this season',
    description: 'Choose another season or competition from the available archive.',
  },
};

export function HistoryQueryState({ state, error }: HistoryQueryStateProps) {
  const content =
    state === 'error'
      ? {
          title: 'Could not load season data',
          description: error instanceof Error ? error.message : 'Please try again in a moment.',
        }
      : stateContent[state];

  return (
    <section className={styles.container} aria-live="polite">
      {state === 'loading' ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <h2 className={styles.title}>{content.title}</h2>
      <p className={styles.description}>{content.description}</p>
    </section>
  );
}
