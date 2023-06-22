import { CryptoCurrency } from '../model/crypto/CryptoCurrency';
import {
  CryptoCurrencyDto,
  convertToCryptoCurrency,
} from '../model/crypto/CryptoCurrencyDto';
import { executeGet } from '../api/ApiResultWrapper';

export const fetchCryptoCurrencies = (vsCurrency: string) =>
  executeGet<CryptoCurrencyDto[], CryptoCurrency[]>(
    `/coins/markets?vs_currency=${vsCurrency}`,
    (result: any): CryptoCurrency[] =>
      result.map((dto: CryptoCurrencyDto) => convertToCryptoCurrency(dto)),
  );
