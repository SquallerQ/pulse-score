export function generateDates() {
  const today = new Date();
  let dateArray = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    if (i === 0) {
      const dateObj = {
        date: date,
        isPast: false,
        isToday: true,
        isFuture: false,
      };
      dateArray.push(dateObj);
    } else {
      const dateObj = {
        date: date,
        isPast: true,
        isToday: false,
        isFuture: false,
      };
      dateArray.push(dateObj);
    }
  }
  dateArray = dateArray.reverse();
  for (let i = 1; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateObj = {
      date: date,
      isPast: false,
      isToday: false,
      isFuture: true,
    };
    dateArray.push(dateObj);
  }
  return dateArray;
}
