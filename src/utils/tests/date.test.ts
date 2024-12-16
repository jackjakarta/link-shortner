import { formatDateToDayMonthYear, formatDateToDayMonthYearTime } from '../date';

describe('formatDateToDayMonthYear', () => {
  test('should format a valid date to "day month year" format', () => {
    const date = new Date('2023-12-16T10:00:00Z');
    const result = formatDateToDayMonthYear(date);

    expect(result).toBe('16 December 2023');
  });

  test('should return undefined for undefined date', () => {
    const result = formatDateToDayMonthYear(undefined);
    expect(result).toBeUndefined();
  });

  test('should handle edge cases (e.g., epoch time)', () => {
    const date = new Date(0);
    const result = formatDateToDayMonthYear(date);

    expect(result).toBe('1 January 1970');
  });
});

describe('formatDateToDayMonthYearTime', () => {
  test('should format a valid date to "day month year, time" format', () => {
    const date = new Date('2023-12-16T10:30:00Z');
    const result = formatDateToDayMonthYearTime(date);

    expect(result).toBe('16 December 2023 at 10:30');
  });

  test('should return undefined for undefined date', () => {
    const result = formatDateToDayMonthYearTime(undefined);
    expect(result).toBeUndefined();
  });

  test('should handle different time zones correctly', () => {
    const date = new Date('2023-12-16T23:59:00Z');
    const result = formatDateToDayMonthYearTime(date);

    expect(result).toBe('16 December 2023 at 23:59');
  });
});
