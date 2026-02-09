export function generateDates() {
  const today = new Date();
  const dateArray = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateObj = {
      date: date,
      isPaste: true,
      isToday: false,
      isFuture: false,
    };
    dateArray.push(dateObj);
  }

  console.log(dateArray);
  return today;
}
