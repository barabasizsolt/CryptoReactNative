import { AxiosResponse } from 'axios';
import axiosInstance from '../Network';
import { CryptoCurrency } from '../model/crypto/CryptoCurrency';
import {
  CryptoCurrencyDto,
  convertToCryptoCurrency,
} from '../model/crypto/CryptoCurrencyDto';

export let fetchCryptoCurrencies = (
  vsCurrency: string = 'usd',
): Promise<AxiosResponse<Array<CryptoCurrency>>> =>
  axiosInstance.get('coins/markets', { params: { vs_currency: vsCurrency } });

export let cryptoCurrencyConverter = (result: any): Array<CryptoCurrency> =>
  result.map((dto: CryptoCurrencyDto) => convertToCryptoCurrency(dto));
