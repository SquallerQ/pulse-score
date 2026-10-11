import { useEffect } from 'react';
import { useCompetitionHonoursQuery } from '../../../../features/history/queries/useCompetitionHonoursQuery';

export function ClubsTitles() {
  const { competitionHonoursQuery } = useCompetitionHonoursQuery();

  useEffect(() => {
    if (competitionHonoursQuery.data) {
      console.log('Competition honours:', competitionHonoursQuery.data);
    }
  }, [competitionHonoursQuery.data]);

  return <div>ClubsTitles</div>;
}
