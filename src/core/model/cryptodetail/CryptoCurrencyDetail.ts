import { ListItem } from '../ListItem';

export interface CryptoCurrencyDetail extends ListItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
  image: string;
  marketCap: string;
  marketCapRank: string;
  fullyDilutedValuation: string;
  price: string;
  btcPrice: string;
  change: string;
  volume: string;
  supply: string;
  circulatingSupply: string;
  high24: string;
  low24: string;
}
