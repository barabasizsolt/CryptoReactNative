import * as Yup from 'yup';
import { CryptoCurrencyDetail } from './CryptoCurrencyDetail';

const CryptoCurrencyDetailDescriptionValidationScheme = Yup.object().shape({
    en: Yup.string().nullable()
})

const CryptoCurrencyDetailImageValidationScheme = Yup.object().shape({
    large: Yup.string().nullable()
})

const CryptoCurrencyDetailPriceValidationScheme = Yup.object().shape({
    usd: Yup.string().nullable(),
    btc: Yup.string().nullable()
})

const CryptoCurrencyDetailGeneralPriceValidationScheme = Yup.object().shape({
    usd: Yup.string().nullable()
})

const CryptoCurrencyDetailMarketDataValidationScheme = Yup.object().shape({
    current_price: CryptoCurrencyDetailPriceValidationScheme,
    price_change_percentage_24h_in_currency: CryptoCurrencyDetailGeneralPriceValidationScheme,
    total_volume: CryptoCurrencyDetailGeneralPriceValidationScheme,
    market_cap: CryptoCurrencyDetailGeneralPriceValidationScheme,
    total_supply: Yup.string().nullable(),
    circulating_supply: Yup.string().nullable()
})

const CryptoCurrencyDetailValidationScheme = Yup.object().shape({
    id: Yup.string().required('uuidIsRequired'),
    symbol: Yup.string().nullable(),
    name: Yup.string().nullable(),
    market_cap_rank: Yup.string().nullable(),
    description: CryptoCurrencyDetailDescriptionValidationScheme,
    image: CryptoCurrencyDetailImageValidationScheme,
    market_data: CryptoCurrencyDetailMarketDataValidationScheme
})

export type CryptoCurrencyDetailDto = Yup.InferType<typeof CryptoCurrencyDetailValidationScheme>

export function convertToCryptoCurrencyDetail(dto: CryptoCurrencyDetailDto): CryptoCurrencyDetail {
    return {
        id: dto.id.toString(),
        symbol: dto.symbol?.toUpperCase() ?? '',
        name: dto.name ?? '',
        description: dto.description.en ?? 'No description found',
        image: dto.image.large ?? '',
        marketCap: dto.market_data.market_cap.usd ?? '0.00',
        marketCapRank: dto.market_cap_rank ?? '0',
        price: dto.market_data.current_price.usd ?? '0.00',
        btcPrice: dto.market_data.current_price.btc ?? '0.00',
        change: parseFloat(dto.market_data.price_change_percentage_24h_in_currency.usd ?? '0.00').toFixed(2).toString(),
        volume: dto.market_data.total_volume.usd ?? '0.00',
        supply: dto.market_data.total_supply ?? '0.00',
        circulatingSupply: dto.market_data.circulating_supply ?? '0.00'
    }
}