import styles from './Table.module.css';

import type { TableRow } from '../../api/types';

type TableProps = {
  leagueTable: LeagueTable | null;
};

export type LeagueTable = {
  table: TableRow[];
};

export function Table({ leagueTable }: TableProps) {
  if (!leagueTable || !leagueTable.table) {
    return <div>No data</div>;
  }

  return (
    <div>
      {leagueTable.table.map((item: TableRow) => {
        {
          return (
            <div key={item.team.id} className={styles.tableContainer}>
              <div>{item.position}</div>
              <div>
                <img className={styles.tableLogo} src={item.team.crest} alt="" />
              </div>
              <div>{item.team.name}</div>
              <div>{item.points}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
