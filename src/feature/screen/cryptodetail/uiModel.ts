import { CandleStickValue } from 'react-native-charts-wrapper';
import { CryptoCurrencyDetail } from '../../../core/model/cryptodetail/CryptoCurrencyDetail';
import { ListItem } from '../../../core/model/ListItem';
import {
  formatCompactDollarValue,
  formatCompactNumber,
  formatDollarValue,
} from '../../../core/util/Converter';

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
  allTimeHighPrice: string;
  allTimeHigDate: string;
  btcPrice: string;
  websiteUrl: string;
  numberOfMarkets: string;
  numberOfExchanges: string;
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
      allTimeHighPrice: formatDollarValue(detail.allTimeHighPrice),
      allTimeHigDate: detail.allTimeHighDate,
      btcPrice: detail.btcPrice,
      websiteUrl: detail.website,
      numberOfMarkets: detail.numberOfMarkets,
      numberOfExchanges: detail.numberOfExchanges,
      description: detail.description,
    },
  ];
};
