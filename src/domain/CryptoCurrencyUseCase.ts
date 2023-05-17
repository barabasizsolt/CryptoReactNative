import { wrapToResult, Result, ResultType } from '../data/Result'
import { CryptoCurrency } from '../data/model/CryptoCurrency'
import { cryptoCurrencyConverter, fetchCryptoCurrencies } from '../data/service/CryptoCurrencyService'

export let getCryptoCurrencies = async (): Promise<Result<Array<CryptoCurrency>>> => wrapToResult(fetchCryptoCurrencies, cryptoCurrencyConverter)

let printCryptoCurrencies = async () => {
    let result: Result<CryptoCurrency[]> = await getCryptoCurrencies()
    switch (result.kind) {
        case ResultType.Success:
            console.log(result.data)
            break
        case ResultType.Failure:
            console.log(result.errorMessage)
            break
    }
}

//printCryptoCurrencies()
