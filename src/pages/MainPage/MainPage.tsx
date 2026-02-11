import { useEffect } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import styles from './MainPage.module.css';

export function MainPage() {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_APISPORTS_KEY;
    const myHeaders = new Headers();
    myHeaders.append('x-apisports-key', apiKey);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const getData = async (_requestOptions: RequestInit) => {
      const response = await fetch('https://v3.football.api-sports.io/leagues', _requestOptions);
      const data = await response.json();
      console.log(data);
    };
    getData(requestOptions);
  });

  return (
    <div className={styles.main__container}>
      <Calendar />
    </div>
  );
}
