import { CandleStickValue } from 'react-native-charts-wrapper';
import { CryptoCurrencyDetail } from '../../../data/model/cryptodetail/CryptoCurrencyDetail';
import { ListItem } from '../../../data/model/ListItem';

export enum CryptoDetailUiModelType {
  Header,
  Chart,
  Body1,
  Body2,
}

export type CryptoDetailUiModel = Header | Chart | Body1 | Body2;

export type Header = {
  imageUrl: string;
  name: string;
  symbol: string;
};

export type Chart = {
  values: Array<CandleStickValue>;
};

export type Body1 = {
  marketCap: string;
  price: string;
  change: string;
  volume: string;
};

export type Body2 = {
  marketCapRank: string;
  supply: string;
  circulatingSupply: string;
  btcPrice: string;
  description: string;
};

export type CryptoDetailUiModelList = Array<CryptoDetailUiModel & ListItem>;

export const getCryptoDetailUiModelList = (
  detail: CryptoCurrencyDetail,
  history: Array<CandleStickValue>,
): CryptoDetailUiModelList => {
  return [
    {
      id: CryptoDetailUiModelType.Header,
      imageUrl: detail.image,
      name: detail.name,
      symbol: detail.symbol,
    },
    {
      id: CryptoDetailUiModelType.Chart,
      values: history,
    },
    {
      id: CryptoDetailUiModelType.Body1,
      marketCap: detail.marketCap,
      price: detail.price,
      change: detail.change,
      volume: detail.volume,
    },
    {
      id: CryptoDetailUiModelType.Body2,
      marketCapRank: detail.marketCapRank,
      supply: detail.supply,
      circulatingSupply: detail.circulatingSupply,
      btcPrice: detail.btcPrice,
      description: detail.description,
    },
  ];
};
