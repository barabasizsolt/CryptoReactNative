import { wrapToResult, Result } from '../data/Result';
import { CryptoCurrency } from '../data/model/crypto/CryptoCurrency';
import {
  cryptoCurrencyConverter,
  fetchCryptoCurrencies,
} from '../data/service/CryptoCurrencyService';

export let getCryptoCurrencies = async (): Promise<
  Result<Array<CryptoCurrency>>
> => wrapToResult(fetchCryptoCurrencies, cryptoCurrencyConverter);
