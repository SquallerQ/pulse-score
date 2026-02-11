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
  const monthShort = day.date.toLocaleDateString('en-US', { month: 'short' });
  // console.log(monthShort);

  return (
    <>
      <div className={`${styles.day__container} ${dayTypeClass}`}>
        <div className={styles.date}>
          <span className={styles.day}>{day.date.getDate()}</span>
          <span className={styles.month}>{monthShort}</span>
        </div>
      </div>
    </>
  );
}
