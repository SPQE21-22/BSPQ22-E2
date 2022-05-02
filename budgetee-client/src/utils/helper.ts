interface Months {
  [key: string]: string;
}

const months: Months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

export const formatDate = (date: string | undefined): string => {
  const re = /[0-9]{4}-[0-1][0-9]-[0-3][0-9]/;
  if (!date || !re.test(date)) return 'No date defined';


  const splitDate = date.split('-');
  const year = splitDate[0];
  const month = months[splitDate[1]];
  const day = splitDate[2];
  return `${month} ${day}, ${year}`;
};