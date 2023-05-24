import * as Yup from 'yup';
import { CryptoCurrency } from './CryptoCurrency';

const CryptoCurrencyValidationScheme = Yup.object().shape({
  id: Yup.string().required('uuidIsRequired'),
  symbol: Yup.string().nullable(),
  name: Yup.string().nullable(),
  image: Yup.string().nullable(),
  market_cap: Yup.string().nullable(),
  current_price: Yup.string().nullable(),
  price_change_percentage_24h: Yup.string().nullable(),
  total_volume: Yup.string().nullable(),
});

export type CryptoCurrencyDto = Yup.InferType<
  typeof CryptoCurrencyValidationScheme
>;

export function convertToCryptoCurrency(
  dto: CryptoCurrencyDto,
): CryptoCurrency {
  return {
    id: dto.id.toString(),
    symbol: dto.symbol?.toUpperCase() ?? '',
    name: dto.name ?? '',
    iconUrl: dto.image ?? '',
    marketCap: dto.market_cap ?? '0.0',
    price: dto.current_price ?? '0.0',
    change: parseFloat(dto.price_change_percentage_24h ?? '0.0')
      .toFixed(2)
      .toString(),
    volume: dto.total_volume ?? '0.0',
  };
}
