import { Result, ResultType, wrapToResult } from '../data/Result';
import { CryptoCurrencyDetail } from '../data/model/cryptodetail/CryptoCurrencyDetail';
import {
  cryptoCurrencyDetailConverter,
  fetchCryptoCurrencyDetail,
} from '../data/service/CryptoCurrencyDetailService';

export let getCryptoCurrencyDetail = async (
  id: string,
): Promise<Result<CryptoCurrencyDetail>> =>
  wrapToResult(
    () => fetchCryptoCurrencyDetail(id),
    cryptoCurrencyDetailConverter,
  );

let printCryptoCurrencyDetail = async (id: string) => {
  let result: Result<CryptoCurrencyDetail> = await getCryptoCurrencyDetail(id);
  switch (result.kind) {
    case ResultType.Success:
      console.log(result.data);
      break;
    case ResultType.Failure:
      console.log(result.errorMessage);
      break;
  }
};

//printCryptoCurrencyDetail("bitcoin")
