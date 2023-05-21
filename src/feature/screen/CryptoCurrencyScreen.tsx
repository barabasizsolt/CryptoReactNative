import { useEffect, useState } from "react";
import { Result, ResultType } from "../../data/Result";
import { CryptoCurrency } from "../../data/model/crypto/CryptoCurrency";
import { getCryptoCurrencies } from "../../domain/CryptoCurrencyUseCase";
import CryptoCurrencyCard from "../catalog/CryptoCurrencyCard";
import { formatCompactDollarValue, formatDollarValue } from "../../data/util/Converter";
import { EdgeToEdgeScrollableContent } from "../catalog/EdgeToEdgeScrollableContent";

const CryptoCurrencyScreen = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([])

    const getAllCryptoCurrency = async () => {
        let result: Result<CryptoCurrency[]> = await getCryptoCurrencies()
        switch (result.kind) {
        case ResultType.Success:
            setCryptoCurrencies(result.data)
            setIsLoading(false)
            break
        case ResultType.Failure:
            break
        }
    }

    useEffect(() => 
        { getAllCryptoCurrency() },
        []
    )

    return(
        <EdgeToEdgeScrollableContent
        isLoading={ isLoading }
        listItems={ cryptoCurrencies } 
        renderItem={ ({ item }) => {
            const cryptoItem = item as CryptoCurrency;
            return (
                <CryptoCurrencyCard
                    name={ cryptoItem.name }
                    symbol={ cryptoItem.symbol }
                    logoUrl={ cryptoItem.iconUrl }
                    price={ formatDollarValue(cryptoItem.price) }
                    change={ cryptoItem.change}
                    volume={ formatCompactDollarValue(cryptoItem.volume) }
                    marketCap={ formatCompactDollarValue(cryptoItem.marketCap) }/>
                )}
            }
        />
    )
}

export default CryptoCurrencyScreen