import { CandleStickData, CandleStickValue } from 'react-native-charts-wrapper';
import { Result, ResultType, wrapToResult } from '../data/Result';
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

let printCryptoCurrencyHistory = async (id: string) => {
  let result: Result<Array<CandleStickValue>> = await getCryptoCurrencyHistory(
    id,
  );
  switch (result.kind) {
    case ResultType.Success:
      console.log(result.data);
      break;
    case ResultType.Failure:
      console.log(result.errorMessage);
      break;
  }
};

//printCryptoCurrencyHistory("bitcoin")
