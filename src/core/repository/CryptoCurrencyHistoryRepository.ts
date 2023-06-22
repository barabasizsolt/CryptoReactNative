import { convertToCryptoCurrencyHistory } from '../model/cryptodetail/CryptoCurrencyHistoryDto';
import { CandleStickValue } from 'react-native-charts-wrapper';
import { executeGet } from '../api/ApiResultWrapper';

export const fetchCryptoCurrencyHistory = (
  id: string = 'bitcoin',
  vs_currency: string = 'usd',
  days: string = '7',
) =>
  executeGet<number[], CandleStickValue[]>(
    `coins/${id}/ohlc?vs_currency=${vs_currency}&days=${days}`,
    (result: any): CandleStickValue[] =>
      result.map((dto: Array<number>) => convertToCryptoCurrencyHistory(dto)),
  );
