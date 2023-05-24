import { AxiosResponse } from 'axios';
import axiosInstance from '../Network';
import { convertToCryptoCurrencyHistory } from '../model/cryptodetail/CryptoCurrencyHistoryDto';
import { CandleStickValue } from 'react-native-charts-wrapper';

export let fetchCryptoCurrencyHistory = (
  id: string = 'bitcoin',
  vs_currency: string = 'usd',
  days: string = '7',
): Promise<AxiosResponse<Array<CandleStickValue>>> =>
  axiosInstance.get(`coins/${id}/ohlc`, {
    params: {
      vs_currency: vs_currency,
      days: days,
    },
  });

export let cryptoCurrencyHistoryConverter = (
  result: any,
): Array<CandleStickValue> =>
  result.map((dto: Array<number>) => convertToCryptoCurrencyHistory(dto));
