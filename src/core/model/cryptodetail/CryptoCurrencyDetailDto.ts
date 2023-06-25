import * as Yup from 'yup';
import { CryptoCurrencyDetail } from './CryptoCurrencyDetail';
import { formatTimestamp, iconUrlConverter } from '../../util/Converter';

const CryptoCurrencyDetailSupplyValidationScheme = Yup.object().shape({
  max: Yup.string().nullable(),
  circulating: Yup.string().nullable(),
});

const CryptoCurrencyDetailAllTimeHighValidationScheme = Yup.object().shape({
  price: Yup.string().nullable(),
  timestamp: Yup.number().nullable(),
});

const CryptoCurrencyDetailValidationScheme = Yup.object().shape({
  uuid: Yup.string().required('uuidIsRequired'),
  symbol: Yup.string().nullable(),
  name: Yup.string().nullable(),
  description: Yup.string().nullable(),
  websiteUrl: Yup.string().nullable(),
  iconUrl: Yup.string().nullable(),
  price: Yup.string().nullable(),
  marketCap: Yup.string().nullable(),
  '24hVolume': Yup.string().nullable(),
  rank: Yup.number().nullable(),
  fullyDilutedMarketCap: Yup.string().nullable(),
  btcPrice: Yup.string().nullable(),
  change: Yup.string().nullable(),
  numberOfMarkets: Yup.number().nullable(),
  numberOfExchanges: Yup.number().nullable(),
  supply: CryptoCurrencyDetailSupplyValidationScheme,
  allTimeHigh: CryptoCurrencyDetailAllTimeHighValidationScheme,
});

export type CryptoCurrencyDetailDto = Yup.InferType<
  typeof CryptoCurrencyDetailValidationScheme
>;

export function convertToCryptoCurrencyDetail(
  dto: CryptoCurrencyDetailDto,
): CryptoCurrencyDetail {
  return {
    id: dto.uuid.toString(),
    symbol: dto.symbol ?? '',
    name: dto.name ?? '',
    description: dto.description ?? 'No description found',
    image: iconUrlConverter(dto.iconUrl ?? ''),
    website: dto.websiteUrl ?? '',
    price: dto.price ?? '0.00',
    marketCap: dto.marketCap ?? '0.00',
    marketCapRank: (dto.rank ?? '0').toString(),
    volume: dto['24hVolume'] ?? '0.00',
    fullyDilutedValuation: dto.fullyDilutedMarketCap ?? '0',
    btcPrice: parseFloat(dto.btcPrice ?? '0.00')
      .toFixed(6)
      .toString(),
    change: parseFloat(dto.change ?? '0.00')
      .toFixed(2)
      .toString(),
    supply: dto.supply.max ?? '0.00',
    circulatingSupply: dto.supply.circulating ?? '0.00',
    allTimeHighPrice: dto.allTimeHigh.price ?? '0.00',
    allTimeHighDate: formatTimestamp(1636502400 ?? 0),
    numberOfMarkets: (dto.numberOfMarkets ?? 0).toString(),
    numberOfExchanges: (dto.numberOfExchanges ?? 0).toString(),
  };
}
