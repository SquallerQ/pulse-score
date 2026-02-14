import { useEffect, useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { TeamList } from '../../components/TeamList/TeamList';
import styles from './MainPage.module.css';

type TeamApiItem = {
  shortName: string;
  crest: string;
};

type TeamListItem = {
  name: string;
  crest: string;
};

export function MainPage() {
  const [teamsList, setTeamsList] = useState<TeamListItem[]>([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY;

    const getData = async () => {
      // const TEAM_ID = 64;
      const response = await fetch(`/api/v4/competitions/PL/teams`, {
        headers: {
          'X-Auth-Token': apiKey,
        },
      });

      const data = await response.json();
      const dataForRender = data.teams.map((item: TeamApiItem) => {
        return { name: item.shortName, crest: item.crest };
      });
      setTeamsList(dataForRender);
      // console.log(dataForRender);
    };
    getData();
  }, []);

  return (
    <div className={styles.main__container}>
      <TeamList teams={teamsList} />
      <Calendar />
    </div>
  );
}
