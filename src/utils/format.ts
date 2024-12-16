export function capitalizeFirstLetter({ word }: { word: string }): string {
  if (!word) {
    return '';
  }

  const trimmedWord = word.trim();
  return trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase();
}

export function getFirstCapitalLetter(input: string): string {
  if (typeof input !== 'string' || input.length === 0) {
    return '';
  }

  const trimmedInput = input.trim();
  const firstAlphabetic = trimmedInput.match(/[a-zA-Z]/);

  return firstAlphabetic ? firstAlphabetic[0].toUpperCase() : '';
}
