import { CandleStickValue } from "react-native-charts-wrapper";

export function convertToCryptoCurrencyHistory(dto: Array<number>): CandleStickValue {
    return {
        //x: dto[0],
        open: dto[1],
        shadowH: dto[2],
        shadowL: dto[3],
        close: dto[4]
    }
}