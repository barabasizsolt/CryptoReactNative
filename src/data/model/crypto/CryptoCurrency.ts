import { ListItem } from '../ListItem';

export interface CryptoCurrency extends ListItem {
  id: string;
  symbol: string;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  change: string;
  volume: string;
}
