import { Calendar } from '../../components/Calendar/Calendar';
import styles from './MainPage.module.css';

export function MainPage() {
  return (
    <div className={styles.main__container}>
      <Calendar />
    </div>
  );
}
