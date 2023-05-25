import { Result, wrapToResult } from '../data/Result';
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
