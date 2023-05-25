import { CandleStickValue } from 'react-native-charts-wrapper';
import { CryptoCurrencyDetail } from '../../../data/model/cryptodetail/CryptoCurrencyDetail';
import { ListItem } from '../../../data/model/ListItem';
import {
  formatCompactDollarValue,
  formatCompactNumber,
  formatDollarValue,
} from '../../../data/util/Converter';

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
  symbol: string;
};

export type Body2 = {
  marketCapRank: string;
  marketCap: string;
  volume: string;
  supply: string;
  circulatingSupply: string;
  fullyDiluatedValue: string;
  high24: string;
  low24: string;
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
      marketCap: formatCompactDollarValue(detail.marketCap),
      price: formatDollarValue(detail.price),
      change: detail.change,
      volume: formatCompactDollarValue(detail.volume),
      symbol: detail.symbol,
    },
    {
      id: CryptoDetailUiModelType.Body2,
      marketCapRank: detail.marketCapRank,
      marketCap: formatCompactDollarValue(detail.marketCap),
      volume: formatCompactDollarValue(detail.volume),
      supply: formatCompactNumber(detail.supply),
      circulatingSupply: formatCompactNumber(detail.circulatingSupply),
      fullyDiluatedValue: formatCompactNumber(detail.fullyDilutedValuation),
      high24: formatDollarValue(detail.high24),
      low24: formatDollarValue(detail.low24),
      btcPrice: detail.btcPrice,
      description: detail.description,
    },
  ];
};
