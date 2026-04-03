import styles from './Table.module.css';

import type { TableRow } from '../../api/types';

type TableProps = {
  leagueTable: LeagueTable | null;
};

export type LeagueTable = {
  table: TableRow[];
};

export function Table({ leagueTable }: TableProps) {
  console.log(leagueTable);

  if (!leagueTable || !leagueTable.table) {
    return <div>No data</div>;
  }

  return (
    <div>
      {leagueTable.table.map((item: TableRow) => {
        {
          return (
            <div key={item.team.id} className={styles.tableRow}>
              <div className={styles.position}>{item.position}</div>

              <div className={styles.team}>
                <img className={styles.tableLogo} src={item.team.crest} alt="" />
                <span>{item.team.shortName}</span>
              </div>

              <div className={styles.points}>{item.points}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
