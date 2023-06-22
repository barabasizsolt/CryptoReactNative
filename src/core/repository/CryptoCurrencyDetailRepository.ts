import { CryptoCurrencyDetail } from '../model/cryptodetail/CryptoCurrencyDetail';
import {
  CryptoCurrencyDetailDto,
  convertToCryptoCurrencyDetail,
} from '../model/cryptodetail/CryptoCurrencyDetailDto';
import { executeGet } from '../api/ApiResultWrapper';

export const fetchCryptoCurrencyDetail = (id: string = 'bitcoin') =>
  executeGet<CryptoCurrencyDetailDto, CryptoCurrencyDetail>(
    `coins/${id}?localization=false`,
    (dto: any): CryptoCurrencyDetail => convertToCryptoCurrencyDetail(dto),
  );
