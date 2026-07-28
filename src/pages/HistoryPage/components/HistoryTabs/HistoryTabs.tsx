import styles from './HistoryTabs.module.css';

type HistoryTabsProps = {
  activeTab: 'recent-seasons' | 'archive';
  onSelectRecentSeasons: () => void;
  onSelectArchive: () => void;
};

export function HistoryTabs({ activeTab, onSelectRecentSeasons, onSelectArchive }: HistoryTabsProps) {
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
    </div>
  );
}
