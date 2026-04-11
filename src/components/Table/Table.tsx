import { leagueConfig } from '../../utils/leagueConfig';
import type { TableRow } from '../../api/types';

import styles from './Table.module.css';

type SelectedTeam = {
  id: number;
  name: string;
  logo: string;
  color: string;
  leagueEmblem: string;
  leagueName: string;
};

type TableProps = {
  leagueTable: LeagueTable | null;
  selectedTeam: SelectedTeam;
};

export type LeagueTable = {
  table: TableRow[];
  competition: {
    emblem: string;
    name: string;
    code: string;
  };
};

export function Table({ leagueTable, selectedTeam }: TableProps) {
  if (!leagueTable || !leagueTable.table) {
    return <div>No data</div>;
  }

  const config = leagueConfig[leagueTable.competition.code];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.teamHeader}>
          <img
            className={styles.leagueEmblem}
            src={config?.logo || leagueTable.competition.emblem}
            alt={leagueTable.competition.name}
          />
          <span className={styles.leagueName}>{leagueTable.competition.name}</span>
        </div>
        <span className={styles.stat}>P</span>
        <span className={styles.win}>W</span>
        <span className={styles.draw}>D</span>
        <span className={styles.loss}>L</span>
        <span className={styles.pts}>Pts</span>
      </div>
      {leagueTable.table.map((item: TableRow) => {
        {
          return (
            <div
              key={item.team.id}
              className={`${styles.row} ${selectedTeam?.id === item.team.id ? styles.selectedTeam : ''}`}
            >
              <div className={styles.position}>{item.position}</div>

              <div className={styles.team}>
                <img className={styles.logo} src={item.team.crest} alt="" />
                <span>{item.team.shortName}</span>
              </div>

              <div>{item.playedGames}</div>
              <div>{item.playedGames - item.draw - item.lost}</div>
              <div>{item.draw}</div>
              <div>{item.lost}</div>
              <div className={styles.points}>{item.points}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
