import { ColorValue, processColor } from "react-native"
import { CandleStickData, CandleStickValue } from "react-native-charts-wrapper"

export const getChartData = (
    highlightColor: ColorValue,
    coinName: string,
    values: Array<CandleStickValue>
): CandleStickData => {
    return {
        dataSets: [
            {
                values: values,
                label: `${coinName}'s price changes`,
                config: {
                    highlightColor: processColor(highlightColor),
                    shadowWidth: 1,
                    shadowColorSameAsCandle: true,
                    increasingColor: processColor('#71BD6A'),
                    increasingPaintStyle: 'FILL',
                    decreasingColor: processColor('#D14B5A'),
                    neutralColor: processColor('lightblue'),
                    drawValues: false
                }
            }
        ]
    }
}

export const getMarker = (markerColor: ColorValue, textColor: ColorValue) =>  {
    return {
        enabled: true,
        markerColor: processColor(markerColor),
        textColor: processColor(textColor),
    }
}