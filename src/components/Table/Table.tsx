import styles from './Table.module.css';

import type { TableRow } from '../../api/api';

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
  console.log(leagueTable.table);

  return (
    <div>
      {leagueTable.table.map((item: TableRow) => {
        {
          return (
            <div className={styles.tableContainer}>
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
