import { formatDate } from './helper';

describe('formatDate', () => {
  test('properly formats a valid date', () => {
    const date = formatDate('2022-01-25');

    expect(date).toBe('January 25, 2022');
  });

  test('returns proper value when the date is undefined', () => {
    const date = formatDate(undefined);

    expect(date).toBe('No date defined');
  });

  test('returns an error when the date has an invalid format', () => {
    const date1 = formatDate('05-01-2022');
    const date2 = formatDate('date');
    const date3 = formatDate('2022-41-01');
    const date4 = formatDate('2022-01-41');

    expect(date1).toBe('No date defined');
    expect(date2).toBe('No date defined');
    expect(date3).toBe('No date defined');
    expect(date4).toBe('No date defined');
  });
});

export {}