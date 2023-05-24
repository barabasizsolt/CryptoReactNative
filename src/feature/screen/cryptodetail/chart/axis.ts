import { ColorValue, processColor } from "react-native"
import { xAxis, yAxis } from "react-native-charts-wrapper"

export const getChartXAxis = (color: ColorValue | string): xAxis => {
    return {
        valueFormatter: "date",
        valueFormatterPattern: "d. MMM",
        drawLabels: true,
        position: 'BOTTOM',
        textColor: processColor(color)
    }
}

export const getLeftChartYAxis = (color: ColorValue | string): yAxis => {
    return {
        valueFormatter: '$',
        drawLabels: true,
        drawGridLines: true,
        textColor: processColor(color)
    }
}