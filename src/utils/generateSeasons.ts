export const seasonsArray = [] as number[];

function generateSeasons() {
  const date = new Date();
  const lastSeason = date.getFullYear() - 2;
  for (let i = 0; i < 3; i++) {
    const year = lastSeason - i;
    seasonsArray.push(year);
  }
}
generateSeasons();
