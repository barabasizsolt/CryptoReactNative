import { CandleStickValue } from 'react-native-charts-wrapper';

export const fetchCryptoCurrencyHistory = (price: number): CandleStickValue[] =>
  Array.from({ length: 30 }, () => generateOHLC(price)); // 30 means 30 days

const generateOHLC = (price: number): CandleStickValue => {
  return {
    open: price,
    shadowH: price + Math.random() * 15,
    shadowL: price - Math.random() * 10,
    close: price + (Math.random() - 0.5) * 20,
  };
};
