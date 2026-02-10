import styles from './Day.module.css';

interface DayProps {
  day: {
    date: Date;
    isPast: boolean;
    isToday: boolean;
    isFuture: boolean;
  };
}

export function Day(props: DayProps) {
  const { day } = props;
  let dayTypeClass = '';
  if (day.isPast) {
    dayTypeClass = styles.day__container_past;
  } else if (day.isToday) {
    dayTypeClass = styles.day__container_today;
  } else if (day.isFuture) {
    dayTypeClass = styles.day__container_future;
  }
  console.log(day.date.getDate());

  return (
    <>
      <div className={`${styles.day__container} ${dayTypeClass}`}>
        <span className={styles.date}>{day.date.getDate()}</span>
      </div>
    </>
  );
}
