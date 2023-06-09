export function formatDollarValue(value: string): string {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return '';
  }

  return numericValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: numericValue <= 10 ? 6 : 2,
  });
}

export function formatCompactDollarValue(value: string): string {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return '';
  }

  const abbreviations = ['', 'K', 'M', 'B', 'T'];

  let formattedValue: string;

  if (numericValue < 1000) {
    formattedValue = `$${numericValue.toFixed(2)}`;
  } else {
    const tier = Math.floor(Math.log10(numericValue) / 3);
    const scaledValue = numericValue / Math.pow(1000, tier);
    formattedValue = `$${scaledValue.toFixed(2)}${abbreviations[tier]}`;
  }

  return formattedValue;
}

export function formatCompactNumber(value: string): string {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return '';
  }

  const abbreviations = ['', 'K', 'M', 'B', 'T'];

  let formattedValue: string;

  if (numericValue < 1000) {
    formattedValue = numericValue.toFixed(2);
  } else {
    const tier = Math.floor(Math.log10(numericValue) / 3);
    const scaledValue = numericValue / Math.pow(1000, tier);
    formattedValue = `${scaledValue.toFixed(2)}${abbreviations[tier]}`;
  }

  return formattedValue;
}

export const formatTimestamp = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate: string = new Intl.DateTimeFormat(
    'en-US',
    options,
  ).format(timestamp);

  return formattedDate;
};

export const iconUrlConverter = (url: string): string => {
  return url.endsWith('svg') ? url.replace('svg', 'png') : url;
};
