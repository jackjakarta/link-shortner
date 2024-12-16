import { capitalizeFirstLetter, getFirstCapitalLetter } from './format';

describe('capitalizeFirstLetter', () => {
  test('should capitalize the first letter of a word', () => {
    expect(capitalizeFirstLetter({ word: 'hello' })).toBe('Hello');
  });

  test('should handle an empty string', () => {
    expect(capitalizeFirstLetter({ word: '' })).toBe('');
  });

  test('should handle a single character word', () => {
    expect(capitalizeFirstLetter({ word: 'h' })).toBe('H');
  });

  test('should handle mixed case words', () => {
    expect(capitalizeFirstLetter({ word: 'hElLo' })).toBe('Hello');
  });

  test('should handle words with spaces around them', () => {
    expect(capitalizeFirstLetter({ word: '  world  ' })).toBe('World');
  });
});

describe('getFirstCapitalLetter', () => {
  test('should return the first capitalized letter of a string', () => {
    expect(getFirstCapitalLetter('hello')).toBe('H');
  });

  test('should handle an empty string', () => {
    expect(getFirstCapitalLetter('')).toBe('');
  });

  test('should return the first capitalized letter of a trimmed string', () => {
    expect(getFirstCapitalLetter('  hello')).toBe('H');
  });

  test('should handle a string with only spaces', () => {
    expect(getFirstCapitalLetter('   ')).toBe('');
  });

  test('should handle strings with non-alphabetic characters', () => {
    expect(getFirstCapitalLetter('123abc')).toBe('A');
  });

  test('should handle strings with no alphabetic characters', () => {
    expect(getFirstCapitalLetter('123')).toBe('');
  });
});
