import { AxiosResponse } from 'axios';
import { CryptoCurrencyDetail } from '../model/cryptodetail/CryptoCurrencyDetail';
import axiosInstance from '../Network';
import { convertToCryptoCurrencyDetail } from '../model/cryptodetail/CryptoCurrencyDetailDto';

export let fetchCryptoCurrencyDetail = (
  id: string = 'bitcoin',
): Promise<AxiosResponse<CryptoCurrencyDetail>> =>
  axiosInstance.get(`coins/${id}`, { params: { localization: false } });

export let cryptoCurrencyDetailConverter = (dto: any): CryptoCurrencyDetail =>
  convertToCryptoCurrencyDetail(dto);
