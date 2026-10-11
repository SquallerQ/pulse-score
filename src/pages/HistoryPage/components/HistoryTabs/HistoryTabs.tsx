import styles from './HistoryTabs.module.css';

type HistoryTabsProps = {
  activeTab: 'recent-seasons' | 'archive' | 'clubs-titles';
  onSelectRecentSeasons: () => void;
  onSelectArchive: () => void;
  onSelectTitles: () => void;
};

export function HistoryTabs({ activeTab, onSelectRecentSeasons, onSelectArchive, onSelectTitles }: HistoryTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="History sections">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'recent-seasons'}
        className={`${styles.tabButton} ${activeTab === 'recent-seasons' ? styles.tabButtonActive : ''}`}
        onClick={onSelectRecentSeasons}
      >
        Recent seasons
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'archive'}
        className={`${styles.tabButton} ${activeTab === 'archive' ? styles.tabButtonActive : ''}`}
        onClick={onSelectArchive}
      >
        Archive
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'clubs-titles'}
        className={`${styles.tabButton} ${activeTab === 'clubs-titles' ? styles.tabButtonActive : ''}`}
        onClick={onSelectTitles}
      >
        Clubs Titles
      </button>
    </div>
  );
}
