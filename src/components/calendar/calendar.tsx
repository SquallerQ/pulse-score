import { generateDates } from '../../utils/utils.tsx';
import { Day } from '../day/day.tsx';

export function Calendar() {
  console.log(generateDates());

  return (
    <>
      <Day />
    </>
  );
}
