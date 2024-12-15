export function capitalizeFirstLetter({ word }: { word: string }): string {
  if (!word) {
    return '';
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getFirstCapitalLetter(input: string): string {
  if (typeof input !== 'string' || input.length === 0) {
    return '';
  }
  return input.trim().charAt(0).toUpperCase();
}
