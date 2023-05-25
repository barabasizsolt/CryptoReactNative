export const getOrdinal = (numberStr: string): string => {
  const number = Number(numberStr);
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const absNumber = Math.abs(number);
  const lastDigit = absNumber % 10;
  const lastTwoDigits = absNumber % 100;

  // Special case for 11, 12, and 13
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${number}th`;
  }

  const suffix = suffixes[lastDigit] || 'th';
  return `${number}${suffix}`;
};
