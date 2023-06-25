import { CryptoCurrencyDetail } from '../model/cryptodetail/CryptoCurrencyDetail';
import {
  CryptoCurrencyDetailDto,
  convertToCryptoCurrencyDetail,
} from '../model/cryptodetail/CryptoCurrencyDetailDto';
import { executeGet } from '../api/ApiResultWrapper';
import { Environment } from '../../environment';

export const fetchCryptoCurrencyDetail = (id: string) =>
  executeGet<CryptoCurrencyDetailDto, CryptoCurrencyDetail>(
    `coin/${id}`,
    (dto: any): CryptoCurrencyDetail =>
      convertToCryptoCurrencyDetail(dto.data.coin),
    Environment.coinRankingUrl,
  );
