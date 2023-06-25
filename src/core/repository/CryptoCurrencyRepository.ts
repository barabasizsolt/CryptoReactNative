import { CryptoCurrency } from '../model/crypto/CryptoCurrency';
import {
  CryptoCurrencyDto,
  convertToCryptoCurrency,
} from '../model/crypto/CryptoCurrencyDto';
import { executeGet } from '../api/ApiResultWrapper';
import { Environment } from '../../environment';

export const fetchCryptoCurrencies = () =>
  executeGet<CryptoCurrencyDto[], CryptoCurrency[]>(
    `coins`,
    (result: any): CryptoCurrency[] =>
      result.data.coins.map((dto: CryptoCurrencyDto) =>
        convertToCryptoCurrency(dto),
      ),
    Environment.coinRankingUrl,
  );
