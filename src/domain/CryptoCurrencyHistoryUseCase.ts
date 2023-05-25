import { CandleStickValue } from 'react-native-charts-wrapper';
import { Result, wrapToResult } from '../data/Result';
import {
  cryptoCurrencyHistoryConverter,
  fetchCryptoCurrencyHistory,
} from '../data/service/CryptoCurrencyHistoryService';

export let getCryptoCurrencyHistory = async (
  id: string,
): Promise<Result<Array<CandleStickValue>>> =>
  wrapToResult(
    () => fetchCryptoCurrencyHistory(id),
    cryptoCurrencyHistoryConverter,
  );
