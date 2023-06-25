import * as Yup from 'yup';
import { CryptoCurrency } from './CryptoCurrency';
import { iconUrlConverter } from '../../util/Converter';

const CryptoCurrencyValidationScheme = Yup.object().shape({
  uuid: Yup.string().required('uuidIsRequired'),
  symbol: Yup.string().nullable(),
  name: Yup.string().nullable(),
  iconUrl: Yup.string().nullable(),
  marketCap: Yup.string().nullable(),
  price: Yup.string().nullable(),
  change: Yup.string().nullable(),
  '24hVolume': Yup.string().nullable(),
});

export type CryptoCurrencyDto = Yup.InferType<
  typeof CryptoCurrencyValidationScheme
>;

export function convertToCryptoCurrency(
  dto: CryptoCurrencyDto,
): CryptoCurrency {
  return {
    id: dto.uuid.toString(),
    symbol: dto.symbol?.toUpperCase() ?? '',
    name: dto.name ?? '',
    iconUrl: iconUrlConverter(dto.iconUrl ?? ''),
    marketCap: dto.marketCap ?? '0.0',
    price: dto.price ?? '0.0',
    change: parseFloat(dto.change ?? '0.0')
      .toFixed(2)
      .toString(),
    volume: dto['24hVolume'] ?? '0.0',
  };
}
