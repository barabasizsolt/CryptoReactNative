import { ListItem } from '../ListItem';

export interface CryptoCurrencyDetail extends ListItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
  image: string;
  website: string;
  marketCap: string;
  marketCapRank: string;
  fullyDilutedValuation: string;
  price: string;
  btcPrice: string;
  change: string;
  volume: string;
  supply: string;
  circulatingSupply: string;
  allTimeHighPrice: string;
  allTimeHighDate: string;
  numberOfMarkets: string;
  numberOfExchanges: string;
}
